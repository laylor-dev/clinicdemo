'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EtherealShadow } from './ui/etheral-shadow';
import { useLanguage } from '@/i18n/LanguageContext';

export default function BringingToLife() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const breathingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Autonomous "Breathing" Loop (Inner Container)
    // Disabled to maintain 1:1 crisp unzoomed pixels per user request for frame-by-frame match
    /*
    if (breathingRef.current) {
      gsap.to(breathingRef.current, {
        scale: 1.05,
        duration: 10,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }
    */

    // 2. Scroll-Linked Parallax (Outer Container)
    if (parallaxRef.current) {
      gsap.to(parallaxRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }

    // 3. Staggered Text Entrance
    if (textRef.current) {
      const titles = textRef.current.querySelectorAll('h2');
      gsap.fromTo(titles, 
        { 
          opacity: 0, 
          y: 60,
          rotateX: -10
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen min-h-[800px] bg-[#14151d] overflow-hidden">
      
      {/* Standard Container - no sticky scroll trap */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        
        <div 
          ref={parallaxRef}
          className="absolute inset-0 w-full h-full will-change-transform z-0"
        >
        {/* Ethereal Shadow Animated Background - Lighter/White to contrast the dark silhouette */}
        <div ref={breathingRef} className="relative w-full h-full will-change-transform bg-[#14151d]">
          <EtherealShadow 
            className="absolute inset-0 w-full h-full opacity-90"
            color="#e2e8f0" // Light grey/white as requested: "make it like white as it was before"
            animation={{ scale: 80, speed: 40 }}
            noise={{ opacity: 0.6, scale: 1.2 }}
            sizing="fill"
          />
          {/* Doctor Silhouette Layered on Top - Desktop & Tablet */}
          <div className="hidden md:block absolute inset-0 z-10 pointer-events-none">
            <Image
              src="/assets/prefooter-horizontal.webp"
              alt="Dental Silhouette"
              fill
              className="object-cover object-center"
              quality={100}
              sizes="(min-width: 768px) 100vw, 100vw"
              priority
            />
          </div>
          
          {/* Doctor Silhouette Layered on Top - Mobile */}
          <div className="block md:hidden absolute inset-0 z-10 pointer-events-none">
            <Image
              src="/assets/pre-footer-mob.webp"
              alt="Dental Silhouette Mobile"
              fill
              className="object-cover object-top"
              quality={100}
              sizes="100vw"
              priority
            />
          </div>
        </div>
        
        {/* Top blend gradient from Testimonials section */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#14151d] to-transparent z-10" />

        {/* Subtle bottom fade only for text readability and to blend seamlessly into the dark navy footer */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#14151d] via-[#14151d]/60 to-transparent z-10" />
      </div>

      {/* Cinematic Text Content - LAYERED ABOVE GRADIENTS */}
      <div 
        ref={textRef}
        className="absolute inset-0 z-20 w-full h-full flex flex-col justify-end px-6 lg:px-20 pb-24 lg:pb-32 text-white pointer-events-none mix-blend-difference"
      >
        <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 items-end">
          
          <div className="lg:col-span-5 mb-0 lg:mb-0">
            <h2 className="font-serif italic text-[clamp(3.5rem,10vw,12rem)] leading-[0.75] tracking-tighter drop-shadow-sm">
              {t.bringingToLife.part1}
            </h2>
          </div>

          <div className="lg:col-span-7 flex flex-col items-start lg:items-end mt-4 lg:mt-0">
            <div className="flex flex-col items-start lg:items-end w-full lg:max-w-[800px]">
              <h2 className="font-serif text-[clamp(4.5rem,12vw,14rem)] leading-[0.75] tracking-tighter lg:mb-[-0.1em] lg:mr-[0.5em] drop-shadow-sm">
                {t.bringingToLife.part2}
              </h2>
              
              <div className="flex flex-col lg:flex-row items-start lg:items-end gap-2 lg:gap-12 w-full justify-start lg:justify-end mt-4 lg:mt-0">
                <span className="font-sans text-[10px] lg:text-[11px] uppercase tracking-[0.4em] font-bold text-white/50 mb-2 lg:mb-8 border-l border-white/20 pl-4 text-left lg:text-right">
                   {t.bringingToLife.dentalText1}<br/>{t.bringingToLife.dentalText2}
                </span>
                <h2 className="font-serif italic text-[clamp(3.5rem,10vw,12rem)] leading-[0.75] tracking-tighter whitespace-nowrap drop-shadow-sm">
                  {t.bringingToLife.part3}
                </h2>
              </div>
            </div>
          </div>

        </div>
      </div>
      </div>
    </section>
  );
}

'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function BringingToLife() {
  const containerRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const breathingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Autonomous "Breathing" Loop (Inner Container)
    if (breathingRef.current) {
      gsap.to(breathingRef.current, {
        scale: 1.05,
        duration: 10,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }

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
    <section ref={containerRef} className="relative w-full h-[85vh] lg:h-[110vh] bg-white overflow-hidden flex items-center justify-center">
      
      {/* Outer Parallax Container (Handles Scrolling) */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 w-full h-full will-change-transform z-0"
      >
        {/* Inner Breathing Wrapper (Handles Autonomous Loop) */}
        <div ref={breathingRef} className="relative w-full h-full will-change-transform">
          {/* Mobile Asset */}
          <div className="lg:hidden relative w-full h-full">
            <Image
              src="/assets/pre-footer-mob.webp"
              alt="Dental Silhouette Mobile"
              fill
              className="object-cover object-bottom brightness-[1.05] contrast-[1.1]"
              priority
            />
          </div>
          {/* Desktop Asset */}
          <div className="hidden lg:block relative w-full h-full">
            <Image
              src="/assets/pre-footer.webp"
              alt="Dental Silhouette Desktop"
              fill
              className="object-cover object-bottom brightness-[1.1] contrast-[1.1]"
              priority
            />
          </div>
        </div>
        
        {/* Simplified Premium Gradient System (No Banding) */}
        {/* Single expansive radial blending fog */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,white_100%)] opacity-80" />
        
        {/* Subtle Bottom mask for footer transition */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white via-white/40 to-transparent z-10" />
      </div>

      {/* Cinematic Text Content - LAYERED ABOVE GRADIENTS */}
      <div 
        ref={textRef}
        className="relative z-20 max-w-[1440px] w-full px-6 lg:px-20 h-full flex flex-col justify-end pb-24 lg:pb-32 text-navy pointer-events-none"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-end">
          
          <div className="lg:col-span-5 mb-4 lg:mb-0">
            <h2 className="font-serif italic text-[clamp(3.5rem,10vw,12rem)] leading-[0.75] tracking-tighter drop-shadow-sm">
              Your Perfect
            </h2>
          </div>

          <div className="lg:col-span-7 flex flex-col items-start lg:items-end">
            <div className="flex flex-col items-start lg:items-end w-full lg:max-w-[800px]">
              <h2 className="font-serif text-[clamp(4.5rem,12vw,14rem)] leading-[0.75] tracking-tighter lg:mb-[-0.1em] lg:mr-[0.5em] drop-shadow-sm">
                Bringing
              </h2>
              
              <div className="flex flex-col lg:flex-row items-end gap-6 lg:gap-12 w-full justify-end">
                <span className="font-sans text-[10px] lg:text-[11px] uppercase tracking-[0.4em] font-bold text-navy/40 mb-4 lg:mb-8 border-l border-navy/10 pl-4 text-right">
                   Premium esthetic<br/>dentistry
                </span>
                <h2 className="font-serif italic text-[clamp(3.5rem,10vw,12rem)] leading-[0.75] tracking-tighter whitespace-nowrap drop-shadow-sm">
                  Smile to Life
                </h2>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

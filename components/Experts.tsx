'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function Experts() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (bgRef.current) {
      gsap.to(bgRef.current, {
        yPercent: 15, // Reduced parallax for smoother performance
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.char');
      gsap.fromTo(chars, 
        { opacity: 0, y: 60, rotateX: -45 }, // Reduced rotation/y for performance
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.015,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 75%',
            end: '+=15%',
            scrub: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char inline-block origin-bottom">{char === ' ' ? '\u00A0' : char}</span>
    ));
  };

  return (
    <section ref={containerRef} className="bg-navy text-beige py-24 lg:py-48 relative overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 w-full h-[120%] -top-[10%] opacity-40 mix-blend-luminosity pointer-events-none will-change-transform">
        <div ref={bgRef} className="absolute inset-0 w-full h-full">
          <Image 
            src="/assets/clinic_lobby.png"
            alt="Clinic background"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/0 via-navy/80 to-navy" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <h2 ref={titleRef} className="font-serif text-[clamp(4.5rem,12vw,12rem)] leading-[0.8] tracking-tight text-center mb-40 mix-blend-color-dodge perspective-[1000px] will-change-transform">
          <span className="block overflow-hidden">{splitText(t.experts.teamSplit1)}</span>
          <span className="block overflow-hidden"><em className="italic">{splitText(t.experts.teamSplit2)}</em></span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 lg:gap-24 mb-32 lg:mb-44">
          {t.experts.team.map((member: any, idx: number) => (
            <div key={idx} className="flex flex-col gap-8 group cursor-pointer will-change-[transform,opacity]">
              <div className="border-t border-white/10 pt-8 transition-colors duration-500 group-hover:border-beige">
                <h3 className="font-sans text-2xl lg:text-3xl font-bold tracking-tight transition-transform duration-500 group-hover:translate-x-2">{member.name}</h3>
                <p className="font-sans text-[10px] xl:text-xs font-bold text-beige/40 mt-3 uppercase tracking-[0.3em] transition-transform duration-500 group-hover:translate-x-2">{member.role}</p>
              </div>
              <p className="font-sans text-sm lg:text-base leading-relaxed text-beige/60 transition-opacity duration-500 group-hover:text-beige max-w-sm">
                {member.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16 border-t border-white/10 pt-16">
          <p className="font-sans text-xl lg:text-2xl font-medium leading-tight max-w-sm text-beige/80">
            <strong className="font-bold text-beige">{t.experts.skilledProfessionals}</strong><br/>
            {t.experts.deliveringCare}<br/>
            {t.experts.advancedTech}
          </p>

          <div className="text-left lg:text-right flex flex-col items-start lg:items-end w-full lg:w-auto">
            <p className="font-serif text-[2.2rem] lg:text-5xl tracking-tight mb-12 lg:mb-10 leading-[1.1]">
              {t.experts.ourTeamDedicated} <br className="hidden lg:block" />
              <em className="italic block lg:inline mt-2 lg:mt-0">{t.experts.exceptionalResults}</em>
            </p>
            <Link href="/about" className="w-full lg:w-auto">
              <button className="flex w-full lg:w-fit items-center justify-center gap-3 px-10 py-5 rounded-full bg-beige text-navy hover:bg-white transition-colors font-sans text-sm font-bold uppercase tracking-widest group overflow-hidden relative">
                <span className="relative z-10 group-hover:-translate-y-full transition-transform duration-500 ease-[0.22,1,0.36,1]">{t.experts.meetTheTeam}</span>
                <span className="absolute inset-0 flex items-center justify-center z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]">{t.experts.meetTheTeam}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(3);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="bg-[#14151d] text-[#eae8e8] py-44 lg:py-48 px-6 lg:px-24 will-change-[transform,opacity]">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-24 lg:gap-32">
        {/* Left Nav */}
        <div className="w-full lg:w-1/3 flex flex-col">
          <p className="font-sans font-bold text-[10px] uppercase tracking-[0.4em] text-white/30 mb-12 lg:mb-16">{t.testimonials.patientStories}</p>
          <h3 className="font-serif italic text-4xl lg:text-5xl mb-12 lg:mb-16">{t.testimonials.title}</h3>
          <div className="flex flex-col gap-4 lg:gap-2">
            {t.testimonials.items.map((test: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`text-left font-sans text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 flex items-center gap-3 ${activeIndex === idx ? 'text-white' : 'text-white/20 hover:text-white/60'}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full border border-current ${activeIndex === idx ? 'bg-gold border-gold' : 'bg-transparent'}`} />
                {test.category}
              </button>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-2/3 border-t lg:border-t-0 lg:border-l border-white/10 pt-16 lg:pt-0 lg:pl-16 min-h-[300px] flex flex-col justify-between">
          <p className="font-sans text-xl lg:text-3xl font-medium leading-[1.4] tracking-tight mb-16 lg:mb-20 text-white/90">
            {t.testimonials.items[activeIndex].text}
          </p>
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-gold/60">
            {t.testimonials.items[activeIndex].author}
          </p>
        </div>
      </div>
    </section>
  );
}

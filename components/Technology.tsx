'use client';

import { motion, useScroll } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';

export default function Technology() {
  const { t } = useLanguage();

  const technologies = t.technology.items.map((item: any, i: number) => ({
    ...item,
    image: [
      '/assets/tech_cadcam.png',
      '/assets/tech_solea.png',
      '/assets/tech_ct.png',
      '/assets/tech_cadcam.png',
      '/assets/tech_ct.png',
      '/assets/tech_solea.png'
    ][i]
  }));
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.char');
      gsap.fromTo(chars, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          }
        }
      );
    }

    // Performance optimization for GSAP animations
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item) => {
      gsap.fromTo(item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char inline-block origin-bottom">{char === ' ' ? '\u00A0' : char}</span>
    ));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % technologies.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + technologies.length) % technologies.length);
  };

  return (
    <section ref={containerRef} className="bg-beige relative py-28 lg:py-48">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* ── MOBILE: Science Overhaul ── */}
        <div className="lg:hidden flex flex-col items-center">
          <h2 className="font-serif text-[4.2rem] leading-[0.85] tracking-tight text-navy text-center mb-20 whitespace-normal overflow-visible">
            {t.technology.mobileTitleLine1} <br/>
            <em className="italic">{t.technology.mobileTitleLine2}</em> <br/>
            {t.technology.mobileTitleLine3}
          </h2>

          <div className="relative w-full overflow-hidden mb-12">
            <div className="flex justify-center items-center gap-4">
              {/* Previous card peek */}
              <div className="w-16 h-[320px] shrink-0 opacity-20 overflow-hidden rounded-[1.5rem] grayscale pointer-events-none">
                <Image 
                  src={technologies[(currentIndex - 1 + technologies.length) % technologies.length].image}
                  alt="prev" fill className="object-cover"
                />
              </div>

              {/* Main Card */}
              <motion.div 
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[280px] flex flex-col items-center"
              >
                <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden mb-10 shadow-xl">
                  <Image 
                    src={technologies[currentIndex].image}
                    alt={technologies[currentIndex].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-serif text-[2.4rem] leading-none tracking-tight text-navy text-center mb-6">
                  {technologies[currentIndex].title}
                </h3>
                <Link href="/technology" className="font-sans text-xs font-bold uppercase tracking-widest text-navy/40 border-b border-navy/10 pb-1">
                  {t.technology.learnMore}
                </Link>
              </motion.div>

              {/* Next card peek */}
              <div className="w-16 h-[320px] shrink-0 opacity-20 overflow-hidden rounded-[1.5rem] grayscale pointer-events-none">
                <Image 
                  src={technologies[(currentIndex + 1) % technologies.length].image}
                  alt="next" fill className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between w-full max-w-[320px] mt-8">
            <button 
              onClick={prevSlide}
              className="w-20 h-20 rounded-full bg-[#d6d1d0] flex items-center justify-center hover:bg-[#c9c3c2] transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-navy" />
            </button>
            
            <span className="font-sans text-sm font-bold text-navy/40 tracking-widest">
              {String(currentIndex + 1).padStart(2, '0')} / {String(technologies.length).padStart(2, '0')}
            </span>

            <button 
              onClick={nextSlide}
              className="w-20 h-20 rounded-full bg-[#d6d1d0] flex items-center justify-center hover:bg-[#c9c3c2] transition-colors"
            >
              <ArrowRight className="w-6 h-6 text-navy" />
            </button>
          </div>
        </div>

        {/* ── DESKTOP: Original Grid Layout ── */}
        <div className="hidden lg:block">
          {/* Title Area */}
          <div className="w-full mb-32 lg:mb-40">
            <p className="font-sans text-xs font-medium mb-6 text-navy/40 uppercase tracking-[0.4em]">{t.technology.precisionCare}</p>
            <h2 ref={titleRef} className="font-serif text-[clamp(2.5rem,5.5vw,5.5rem)] text-navy leading-[1.1] will-change-transform">
              <span className="block overflow-hidden">{splitText(t.technology.desktopTitle1)}</span>
              <span className="block overflow-hidden"><em className="italic">{splitText(t.technology.desktopTitle2)}</em> {splitText(t.technology.desktopTitle3)}</span>
              <span className="block overflow-hidden">{splitText(t.technology.desktopTitle4)}</span>
            </h2>
          </div>

          {/* Technologies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 lg:gap-16">
            {technologies.map((tech: any) => (
              <Link 
                key={tech.id}
                href="/technology" 
                className="tech-item flex flex-col group cursor-pointer will-change-[transform,opacity]"
              >
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-10 shadow-lg bg-navy/5">
                  <Image 
                    src={tech.image}
                    alt={tech.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-navy/10 group-hover:bg-navy/0 transition-colors duration-500 pointer-events-none" />
                </div>

                <div className="flex items-center justify-between border-b border-navy/10 pb-6 group-hover:border-navy transition-colors duration-300">
                  <h3 className="font-serif text-[1.8rem] lg:text-3xl tracking-tight text-navy">
                    {tech.title}
                  </h3>
                  <ArrowUpRight className="w-6 h-6 text-navy/40 group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

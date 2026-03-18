'use client';

import { motion, useScroll } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';

const DOCTOR_IMG = 'https://api.aventuradentalarts.com/uploads/DSC_03466_2_6fe88d5827.webp';

export default function Services() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const services = t.services.items.map((item: any, i: number) => ({
    ...item,
    image: [
      '/assets/tech_cadcam.png',
      '/assets/tech_ct.png',
      '/assets/clinic_lobby.png',
      '/assets/tech_solea.png'
    ][i]
  }));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Fade in services as you scroll
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item) => {
      gsap.fromTo(item, 
        { opacity: 0, y: 30 }, // Reduced y distance for smoother feel
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, // Slightly faster duration
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

  return (
    <section 
      ref={containerRef} 
      className="relative z-20 bg-navy text-beige py-32 lg:py-48 mt-0 lg:-mt-[100vh] shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.5)]"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="mb-32 lg:mb-32">
          <p className="font-sans text-xs font-medium mb-6 text-beige/40 uppercase tracking-[0.4em]">{t.services.ourSolutions}</p>
          <h2 className="font-serif text-[clamp(2.5rem,5.5vw,5.5rem)] text-beige leading-[1.1] max-w-2xl">
            {t.services.designingSmiles} <br /> <em className="italic">{t.services.beyondSmile}</em>
          </h2>
        </div>

        <div className="flex flex-col gap-40 lg:gap-48">
          {services.map((service: any, idx: number) => (
            <div 
              key={service.id} 
              className={`service-item flex flex-col lg:flex-row items-center gap-16 lg:gap-24 will-change-[transform,opacity] ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 aspect-[4/5] relative rounded-[2rem] overflow-hidden shadow-2xl bg-white/5">
                <Image
                  src={service.image}
                  alt={service.title.replace('\n', ' ')}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover opacity-80 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-navy/20 pointer-events-none" />
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 text-beige mt-4 lg:mt-0">
                <h3 className="font-serif text-[2.5rem] lg:text-6xl leading-[1] mb-8 lg:mb-10 whitespace-pre-line">
                  {service.title.split('\n').map((line: string, i: number) => (
                    <span key={i} className={i === 0 ? 'italic block' : 'block'}>{line}</span>
                  ))}
                </h3>
                <p className="font-sans text-lg lg:text-xl text-beige/60 mb-12 lg:mb-16 leading-relaxed max-w-md font-medium">
                  {service.description}
                </p>
                
                <ul className="border-t border-white/10 mb-12 lg:mb-16">
                  {service.procedures.map((proc: string, i: number) => (
                    <li key={i} className="border-b border-white/10">
                      <Link href={`/services/${service.id}`} className="w-full py-5 flex items-center justify-between group text-beige/60 hover:text-beige transition-colors">
                        <span className="font-sans text-sm font-bold uppercase tracking-widest transition-transform duration-500 group-hover:translate-x-2">{proc}</span>
                        <div className="relative w-5 h-5 overflow-hidden flex-shrink-0 ml-4 group-hover:text-gold transition-colors duration-300">
                          <ArrowUpRight className="w-5 h-5" />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link href={`/services/${service.id}`} className="inline-flex w-full lg:w-fit items-center justify-center gap-3 px-10 py-5 rounded-full bg-beige text-navy hover:bg-white transition-colors font-sans text-sm font-bold uppercase tracking-widest overflow-hidden">
                  {t.services.learnMore}
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

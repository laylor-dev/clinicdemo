'use client';

import { motion, useScroll } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const technologies = [
  {
    id: 'itero',
    title: 'iTero Digital Impressions',
    image: 'https://api.aventuradentalarts.com/uploads/1_3f23996a52.webp'
  },
  {
    id: 'solea',
    title: 'Solea Laser',
    image: 'https://api.aventuradentalarts.com/uploads/Solea_Convergent_Dental_3ee452e2c8.webp'
  },
  {
    id: 'camera',
    title: 'Intra Oral Camera',
    image: 'https://api.aventuradentalarts.com/uploads/intra_oral_pic_e9dbe162cb.webp'
  },
  {
    id: 'imaging',
    title: 'Digital Imaging',
    image: 'https://api.aventuradentalarts.com/uploads/3_da46eccda1.webp'
  },
  {
    id: 'cadcam',
    title: 'CAD/CAM Restorations',
    image: 'https://api.aventuradentalarts.com/uploads/image_asset_b9eef2f596.webp'
  },
  {
    id: 'scan',
    title: '3D CAT Scan',
    image: 'https://api.aventuradentalarts.com/uploads/CT_Scanner_4ec6304a0d.webp'
  }
];

export default function Technology() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

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

    // Individual tech items fade in
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item) => {
      gsap.fromTo(item,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
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
      <span key={index} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
    ));
  };

  return (
    <section ref={containerRef} className="bg-beige relative py-24 lg:py-32">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Title Area */}
        <div className="w-full mb-24 lg:mb-32">
          <h2 ref={titleRef} className="font-serif text-5xl lg:text-7xl text-navy leading-tight">
            <span className="block overflow-hidden">{splitText('Technology-Driven')}</span>
            <span className="block overflow-hidden"><em className="italic">{splitText('Dentistry for')}</em> {splitText('Exceptional')}</span>
            <span className="block overflow-hidden">{splitText('Results')}</span>
          </h2>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {technologies.map((tech) => (
            <div 
              key={tech.id} 
              className="tech-item flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-8 shadow-lg">
                <Image 
                  src={tech.image}
                  alt={tech.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-navy/10 group-hover:bg-navy/0 transition-colors duration-500" />
              </div>

              <div className="flex items-center justify-between border-b border-navy/10 pb-4">
                <h3 className="font-serif text-2xl lg:text-3xl tracking-tight text-navy">
                  {tech.title}
                </h3>
                <ArrowUpRight className="w-6 h-6 text-navy/40 group-hover:text-navy group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

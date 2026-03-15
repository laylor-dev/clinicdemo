'use client';

import { motion, useScroll } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const DOCTOR_IMG = 'https://api.aventuradentalarts.com/uploads/DSC_03466_2_6fe88d5827.webp';

const services = [
  {
    id: 'esthetic',
    title: 'Esthetic\nDentistry',
    description: 'From teeth whitening and veneers to complete smile makeovers, we use the latest techniques to create natural, stunning results.',
    image: 'https://api.aventuradentalarts.com/uploads/makeover_13a55bbf44.webp',
    procedures: ['Smile Makeovers', 'Esthetic Bonding & Contouring', 'Teeth Whitening', 'Porcelain Veneers']
  },
  {
    id: 'restorative',
    title: 'Restorative\nDentistry',
    description: 'Expert restorative treatments to rebuild, protect, and restore your teeth, giving you confidence in both function and appearance.',
    image: 'https://api.aventuradentalarts.com/uploads/implants_188a0a4d10.webp',
    procedures: ['Implant Restoration', 'Crowns and bridges', 'Full Mouth Rehabilitation', 'Tooth-Colored Fillings']
  },
  {
    id: 'preventive',
    title: 'Preventive\nCare',
    description: 'Routine exams, cleanings, and screenings designed to maintain oral health and prevent issues before they arise.',
    image: 'https://api.aventuradentalarts.com/uploads/medium_Intra_Oral_Camera_8_50c3ea5d8d.webp',
    procedures: ['Oral Cancer Screenings', 'Comprehensive Exams', 'Deep Cleanings', 'Fluoride Treatments', 'Prophylaxis']
  },
  {
    id: 'beyond',
    title: 'Beyond\nthe Smile',
    description: 'Discover expert care in facial aesthetics and sleep health with treatments customized for your comfort, confidence, and wellness.',
    image: 'https://api.aventuradentalarts.com/uploads/bot_d2ebd2c3b7.webp',
    procedures: ['Neurotoxins (Aesthetic & TMJ Relief)', 'Dermal Fillers', 'Custom Nightguards', 'Oral Appliance Therapy']
  }
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Fade in services as you scroll
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item) => {
      gsap.fromTo(item, 
        { opacity: 0, y: 50 },
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

  return (
    <section ref={containerRef} className="bg-navy relative py-24 lg:py-32">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="mb-24 lg:mb-32">
          <p className="font-sans text-sm font-medium mb-4 text-beige/60 uppercase tracking-[0.3em]">Our Solutions</p>
          <h2 className="font-serif text-5xl lg:text-7xl text-beige leading-tight max-w-2xl">
            Designing smiles that are <br /> <em className="italic">beyond the smile.</em>
          </h2>
        </div>

        <div className="flex flex-col gap-32 lg:gap-48">
          {services.map((service, idx) => (
            <div 
              key={service.id} 
              className={`service-item flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={service.image}
                  alt={service.title.replace('\n', ' ')}
                  fill
                  className="object-cover opacity-80 hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-navy/20" />
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 text-beige">
                <h3 className="font-serif text-4xl lg:text-6xl leading-tight mb-8 whitespace-pre-line">
                  {service.title.split('\n').map((line, i) => (
                    <span key={i} className={i === 0 ? 'italic block' : 'block'}>{line}</span>
                  ))}
                </h3>
                <p className="font-sans text-lg lg:text-xl text-beige/80 mb-12 leading-relaxed max-w-md">
                  {service.description}
                </p>
                
                <ul className="border-t border-white/15 mb-12">
                  {service.procedures.map((proc, i) => (
                    <li key={i} className="border-b border-white/15">
                      <div className="w-full py-4 flex items-center justify-between group text-beige/80">
                        <span className="font-sans text-base font-medium transition-transform duration-500 group-hover:translate-x-2">{proc}</span>
                        <div className="relative w-5 h-5 overflow-hidden flex-shrink-0 ml-4">
                          <ArrowUpRight className="w-5 h-5" />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <button className="flex items-center gap-3 px-8 py-4 rounded-full bg-beige text-navy hover:bg-white transition-colors font-sans text-sm font-bold">
                  Learn More
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

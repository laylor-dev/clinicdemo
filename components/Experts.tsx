'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

export default function Experts() {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const team = [
    {
      name: 'Dr. Joel Gale',
      role: 'Senior partner',
      desc: 'Expert in esthetic and implant dentistry, known for precision, empathy, and artistry. Creates natural, camera-ready smiles through advanced veneers, implants, and full-mouth rehabilitations.'
    },
    {
      name: 'Dr. Nuria Otero',
      role: 'Partner',
      desc: 'Prosthodontist with 20+ years of experience in complex restorations and smile transformations. Combines technical mastery with esthetic vision in full-mouth reconstructions and veneers.'
    },
    {
      name: 'Dr. Larry Grillo',
      role: 'Senior partner',
      desc: 'Renowned expert in advanced restorative and cosmetic dentistry. Merges innovation and artistry to craft functional, long-lasting, and naturally beautiful smiles.'
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (bgRef.current) {
      gsap.to(bgRef.current, {
        yPercent: 20,
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
        { opacity: 0, y: 100, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.02,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          }
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
    <section ref={containerRef} className="bg-navy text-beige py-32 lg:py-48 relative overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 w-full h-[120%] -top-[10%] opacity-40 mix-blend-luminosity pointer-events-none">
        <div ref={bgRef} className="absolute inset-0 w-full h-full">
          <Image 
            src="https://api.aventuradentalarts.com/uploads/ADA_Patients_WEB_76_81a8343bfe_1_2_a3ba88e376.webp"
            alt="Clinic background"
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/0 via-navy/80 to-navy" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <h2 ref={titleRef} className="font-serif text-6xl lg:text-[12rem] leading-[0.8] tracking-tight text-center mb-32 mix-blend-color-dodge perspective-[1000px]">
          <span className="block overflow-hidden">{splitText('Team')}</span>
          <span className="block overflow-hidden"><em className="italic">{splitText('of Experts')}</em></span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24 mb-32">
          {team.map((member, idx) => (
            <div key={idx} className="flex flex-col gap-6 group cursor-pointer">
              <div className="border-t border-beige/20 pt-6 transition-colors duration-500 group-hover:border-beige">
                <h3 className="font-sans text-2xl font-semibold transition-transform duration-500 group-hover:translate-x-2">{member.name}</h3>
                <p className="font-sans text-xs font-medium text-beige/60 mt-2 uppercase tracking-widest transition-transform duration-500 group-hover:translate-x-2">{member.role}</p>
              </div>
              <p className="font-sans text-sm leading-relaxed text-beige/80 transition-opacity duration-500 group-hover:text-beige">
                {member.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-end gap-12 border-t border-beige/20 pt-12">
          <p className="font-sans text-xl font-medium leading-tight max-w-sm">
            <strong className="font-bold">Skilled professionals</strong><br/>
            delivering expert care with<br/>
            advanced technology.
          </p>

          <div className="text-right flex flex-col items-end">
            <p className="font-serif text-4xl lg:text-5xl tracking-tight mb-8">
              Our team is dedicated to providing <br/>
              <em className="italic">exceptional results</em>
            </p>
            <button className="flex items-center gap-3 px-8 py-4 rounded-full bg-beige text-navy hover:bg-white transition-colors font-sans text-sm font-bold group overflow-hidden relative">
              <span className="relative z-10 group-hover:-translate-y-full transition-transform duration-500 ease-[0.22,1,0.36,1]">Meet The Team</span>
              <span className="absolute inset-0 flex items-center justify-center z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]">Meet The Team</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

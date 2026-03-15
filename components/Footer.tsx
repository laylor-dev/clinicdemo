'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

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

    if (circleRef.current) {
      gsap.to(circleRef.current, {
        yPercent: -10,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

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
    <footer ref={containerRef} className="bg-navy-light text-beige pt-32 pb-8 px-6 lg:px-12 relative overflow-hidden">
      {/* Large Background Gradient Circle */}
      <div ref={circleRef} className="absolute top-0 left-1/2 -translate-x-1/2 w-[150vw] h-[150vw] bg-gradient-to-b from-[#2a2b35] to-[#010203] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto flex flex-col min-h-[80vh] justify-between">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0">
          <div className="flex flex-col gap-12">
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full bg-gray-dark/40 flex items-center justify-center hover:bg-beige hover:text-navy transition-all duration-300 hover:scale-110">
                In
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-gray-dark/40 flex items-center justify-center hover:bg-beige hover:text-navy transition-all duration-300 hover:scale-110">
                Li
              </a>
            </div>
            
            <div className="grid grid-cols-2 gap-12">
              <div>
                <p className="font-sans text-sm font-medium text-beige/60 mb-6">Services</p>
                <ul className="flex flex-col gap-2 font-sans text-xl font-semibold">
                  {['Esthetic Dentistry', 'Restorative Dentistry', 'Preventive Care', 'Beyond the Smile'].map((item, i) => (
                    <li key={i} className="overflow-hidden">
                      <Link href="#" className="group flex items-center gap-2">
                        <span className="relative overflow-hidden">
                          <span className="block transition-transform duration-500 group-hover:-translate-y-full">{item}</span>
                          <span className="absolute inset-0 block translate-y-full transition-transform duration-500 group-hover:translate-y-0">{item}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-sans text-sm font-medium text-beige/60 mb-6">Our Clinic</p>
                <ul className="flex flex-col gap-2 font-sans text-xl font-semibold">
                  {['Home', 'About us', 'Technology', 'Contact'].map((item, i) => (
                    <li key={i} className="overflow-hidden">
                      <Link href="#" className="group flex items-center gap-2">
                        <span className="relative overflow-hidden">
                          <span className="block transition-transform duration-500 group-hover:-translate-y-full">{item}</span>
                          <span className="absolute inset-0 block translate-y-full transition-transform duration-500 group-hover:translate-y-0">{item}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start lg:items-end">
            <h3 ref={titleRef} className="font-serif text-4xl lg:text-5xl tracking-tight mb-12 text-left lg:text-right max-w-md">
              <span className="block overflow-hidden">{splitText('Ready to Transform')}</span>
              <span className="block overflow-hidden">{splitText('Your Smile?')}</span>
              <span className="block overflow-hidden"><em className="italic">{splitText('Book a call.')}</em></span>
            </h3>

            <form className="w-full max-w-xl flex flex-col gap-2">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-full bg-transparent border border-white/15 rounded-full px-8 py-6 font-sans text-sm focus:border-beige outline-none transition-colors"
                />
                <input 
                  type="tel" 
                  placeholder="Phone number" 
                  className="w-full bg-transparent border border-white/15 rounded-full px-8 py-6 font-sans text-sm focus:border-beige outline-none transition-colors"
                />
              </div>
              <div className="flex gap-2">
                <textarea 
                  placeholder="Message" 
                  rows={1}
                  className="w-full bg-transparent border border-white/15 rounded-[2rem] px-8 py-6 font-sans text-sm focus:border-beige outline-none transition-colors resize-none"
                />
                <button type="submit" className="w-20 h-20 shrink-0 rounded-full bg-beige text-navy flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-105 group">
                  <ArrowUpRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Locations Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-16 border-y border-white/15 my-16">
          <div className="flex flex-col gap-4 group cursor-pointer">
            <h4 className="font-sans text-xl font-semibold underline underline-offset-4 transition-colors duration-300 group-hover:text-white">Aventura</h4>
            <p className="font-sans text-xs text-beige/80 transition-colors duration-300 group-hover:text-beige">18851 NE 29th Avenue Suite 301, Aventura, FL 33180</p>
            <p className="font-sans text-sm font-bold transition-colors duration-300 group-hover:text-white">(305) 682-1414</p>
          </div>
          <div className="flex flex-col gap-4 border-l border-white/15 pl-8 group cursor-pointer">
            <h4 className="font-sans text-xl font-semibold underline underline-offset-4 transition-colors duration-300 group-hover:text-white">Bay Harbor</h4>
            <p className="font-sans text-xs text-beige/80 transition-colors duration-300 group-hover:text-beige">1031 Kane Concourse, Bay Harbor Islands, FL 33154</p>
            <p className="font-sans text-sm font-bold transition-colors duration-300 group-hover:text-white">(305) 864-1656</p>
          </div>
          <div className="flex flex-col gap-4 border-l border-white/15 pl-8 group cursor-pointer">
            <h4 className="font-sans text-xl font-semibold underline underline-offset-4 transition-colors duration-300 group-hover:text-white">Coral Gables</h4>
            <p className="font-sans text-xs text-beige/80 transition-colors duration-300 group-hover:text-beige">6705 S Red Rd Suite 614, Coral Gables, FL 33143</p>
            <p className="font-sans text-sm font-bold transition-colors duration-300 group-hover:text-white">(305) 668-1811</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 font-sans text-xs text-beige/60">
          <p>Copyright © 2026 <br/> Aventura Dental Arts</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-beige transition-colors">Privacy Policy</Link>
            <span>,</span>
            <Link href="#" className="hover:text-beige transition-colors">Accessibility Statement</Link>
            <span>,</span>
            <Link href="#" className="hover:text-beige transition-colors">Terms & Conditions</Link>
          </div>
          <p>Developed by TFTL</p>
        </div>

      </div>
    </footer>
  );
}

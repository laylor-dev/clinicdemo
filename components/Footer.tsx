'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  
  const containerRef = useRef<HTMLElement>(null);
  const morphRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Fluid Adaptive Morph Reveal (Homepage Only)
    if (isHome && morphRef.current) {
      gsap.fromTo(morphRef.current,
        {
          clipPath: 'ellipse(20% 0% at 50% 0%)',
          backgroundColor: '#1a1b23',
        },
        {
          clipPath: 'ellipse(150% 100% at 50% 100%)',
          backgroundColor: '#14151d',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'top 20%',
            scrub: true,
          },
        }
      );
    }

    // 2. Content Fade In
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 50%',
          }
        }
      );
    }

    // 3. Staggered Title Reveal
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
    <footer ref={containerRef} className="relative bg-white overflow-hidden">
      
      {/* Morphing Background Container */}
      <div 
        ref={morphRef}
        className={`absolute inset-0 w-full h-full z-0 will-change-transform ${!isHome ? 'bg-navy' : ''}`}
        style={!isHome ? { clipPath: 'none' } : undefined}
      />

      <div ref={contentRef} className="relative z-10 max-w-[1440px] mx-auto flex flex-col min-h-[80vh] justify-between pt-32 pb-8 px-6 lg:px-12 text-beige">
        
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
                  {[
                    { name: 'Esthetic Dentistry', href: '/services/esthetic-dentistry' },
                    { name: 'Restorative Dentistry', href: '/services/restorative-dentistry' },
                    { name: 'Preventive Care', href: '/services/preventive-care' },
                    { name: 'Beyond the Smile', href: '/services/beyond-the-smile' }
                  ].map((item, i) => (
                    <li key={i} className="overflow-hidden">
                      <Link href={item.href} className="group flex items-center gap-2">
                        <span className="relative overflow-hidden">
                          <span className="block transition-transform duration-500 group-hover:-translate-y-full">{item.name}</span>
                          <span className="absolute inset-0 block translate-y-full transition-transform duration-500 group-hover:translate-y-0">{item.name}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-sans text-sm font-medium text-beige/60 mb-6">Our Clinic</p>
                <ul className="flex flex-col gap-2 font-sans text-xl font-semibold">
                  {[
                    { name: 'Home', href: '/' },
                    { name: 'About us', href: '/about' },
                    { name: 'Technology', href: '/technology' },
                    { name: 'Contact', href: '/contact' }
                  ].map((item, i) => (
                    <li key={i} className="overflow-hidden">
                      <Link href={item.href} className="group flex items-center gap-2">
                        <span className="relative overflow-hidden">
                          <span className="block transition-transform duration-500 group-hover:-translate-y-full">{item.name}</span>
                          <span className="absolute inset-0 block translate-y-full transition-transform duration-500 group-hover:translate-y-0">{item.name}</span>
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
            <a href="https://api.aventuradentalarts.com/uploads/Hipaa_Notices_of_Privacy_Practices_docx_1_9be446a7d0.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-beige transition-colors">Privacy Policy</a>
            <span>,</span>
            <a href="https://api.aventuradentalarts.com/uploads/ADA_Accessibility_Statement_docx_79cdbf0746.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-beige transition-colors">Accessibility Statement</a>
            <span>,</span>
            <a href="https://api.aventuradentalarts.com/uploads/Hipaa_Notices_of_Privacy_Practices_docx_1_9be446a7d0.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-beige transition-colors">Terms & Conditions</a>
          </div>
          <p>Developed by TFTL</p>
        </div>

      </div>
    </footer>
  );
}

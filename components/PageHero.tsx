'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface PageHeroProps {
  title: React.ReactNode;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
}

export default function PageHero({ title, subtitle, imageSrc, imageAlt }: PageHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial load animation
    const tl = gsap.timeline();
    
    tl.fromTo(imageRef.current,
      { scale: 1.2, filter: 'blur(10px)' },
      { scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }
    );

    if (titleRef.current) {
      tl.fromTo(titleRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' },
        '-=1.0'
      );
    }

    // Parallax scroll effect
    if (imageRef.current && containerRef.current) {
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[70vh] lg:h-[85vh] overflow-hidden flex items-end justify-center pb-24 lg:pb-32 bg-navy">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          ref={imageRef}
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover opacity-60 mix-blend-luminosity"
          referrerPolicy="no-referrer"
        />
        {/* Gradient Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1440px] px-6 lg:px-12 text-center">
        <div ref={titleRef}>
          <h1 className="font-serif text-5xl lg:text-[7rem] leading-[0.9] tracking-tight text-beige mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="font-sans text-lg lg:text-xl text-beige/80 max-w-2xl mx-auto font-medium">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

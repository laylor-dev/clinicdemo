'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

export default function OurGoal() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const photoHolderRef = useRef<HTMLDivElement>(null);
  const photoWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 1024px)", () => {
      const parent = containerRef.current;
      const photoHolder = photoHolderRef.current;
      const photoWrap = photoWrapperRef.current;

      if (!parent || !photoHolder || !photoWrap) return;

      // Pin the section length
      ScrollTrigger.create({
        trigger: parent,
        start: 'top top',
        end: '+=400%', // 4 full sections of scroll depth
        pin: true,
        pinSpacing: true, 
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parent,
          start: 'top top',
          end: '+=400%', 
          scrub: true,
        }
      });

      // We start with the photo positioned exactly where the placeholder is in the grid
      const initialRect = photoHolder.getBoundingClientRect();
      
      // Calculate how far to move to reach top-left (0,0) of the viewport
      gsap.set(photoWrap, {
        position: 'absolute',
        top: initialRect.top - parent.getBoundingClientRect().top,
        left: initialRect.left,
        width: initialRect.width,
        height: initialRect.height,
        borderRadius: '8px',
        zIndex: 50,
      });

      // Split text into words for stagger highlighting
      if (textRef.current) {
        const raw = textRef.current.textContent ?? '';
        const words = raw.trim().split(/\s+/);
        textRef.current.innerHTML = words
          .map(w => `<span class="ogw" style="opacity:0.12">${w}</span>`)
          .join(' ');

        // Highlight text progressively (Takes 1.5 scroll units)
        tl.to('.ogw', {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          duration: 1.5,
          force3D: true, // Force GPU for better stagger performance
        }, 0); 
      }

      // 1. Photo zooms to fill left 50% seamlessly for next section (Takes 1.5 scroll units)
      tl.to(photoWrap, {
        top: 0,
        left: 0,
        width: '50vw',
        height: '100vh',
        borderRadius: '0px',
        ease: 'power2.inOut',
        duration: 1.5
      }, 0);

      // 2. Fade out the title on the left
      tl.to('.og-title', { opacity: 0, x: -40, ease: 'power2.inOut', duration: 0.5 }, 0.2);

      // 3. Fade out the team info on the right
      tl.to('.og-team', { opacity: 0, y: -30, ease: 'power2.inOut', duration: 0.5 }, 0.2);

      // --- THE DELAY ZONE ---
      // From 1.5 to 2.5, NOTHING happens. The user just scrolls and reads the text.
      // ----------------------

      // 4. Parallax Lift fade-out - starts at 2.5 after the user finishes reading
      tl.to(parent, {
        opacity: 0,
        ease: 'power2.inOut',
        duration: 0.5,
        force3D: true,
      }, 2.5); // Fades from 2.5 to 3.0

      // 5. Pad the timeline strictly to 4.0 so math aligns perfectly
      // The overlap slide-up from Services.tsx happens strictly in the final 1.0 (from 3.0 to 4.0)
      tl.set({}, {}, 4.0);
      
    });

    return () => matchMedia.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-beige min-h-screen lg:min-h-[900px] overflow-hidden flex items-center justify-center">

      {/* Main Grid Layout Container */}
      <div className="w-full max-w-[1600px] px-6 lg:px-12 flex flex-col lg:flex-row items-center lg:items-center justify-between h-full relative z-10 w-full lg:gap-8 pt-24 pb-20 lg:pt-0 lg:pb-0">

        {/* ── MOBILE: Consolidated Text/Team Block ── */}
        <div className="lg:hidden w-full flex flex-col gap-14">
          <h2 className="font-serif text-[2.8rem] leading-[1.05] tracking-tight text-navy">
            {t.ourGoal.mobileTitle}
          </h2>
          
          <div className="flex flex-col gap-8">
            <div className="flex -space-x-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-20 h-20 rounded-full border-2 border-beige overflow-hidden relative bg-gray-300">
                  <Image
                    src="/assets/dental_team.png"
                    alt={`Team member ${i}`} fill className="object-cover grayscale"
                  />
                </div>
              ))}
              <div className="w-20 h-20 rounded-full border-2 border-beige bg-[#e0dbda] flex items-center justify-center font-serif text-3xl text-navy">
                +20
              </div>
            </div>
            
            <p className="font-sans text-[15px] leading-relaxed text-gray-dark font-medium max-w-[320px] opacity-70">
              {t.ourGoal.teamText}
            </p>
          </div>

          <Link href="/about">
            <button className="flex w-full items-center justify-center gap-2 px-8 py-5 rounded-[2rem] bg-navy text-[#eae8e8] font-sans text-sm tracking-wide font-semibold hover:bg-navy/80 transition-colors">
              {t.ourGoal.aboutUs} <Plus className="w-3 h-3 ml-2" />
            </button>
          </Link>
        </div>

        {/* ── DESKTOP: Original Animated Layout ── */}
        {/* LEFT COLUMN: "Our goal is" */}
        <div className="hidden lg:flex w-3/12 xl:w-[25%] flex-col justify-end lg:h-[560px] xl:h-[600px] lg:pb-8 og-title will-change-[transform,opacity]">
          <h2 className="font-serif text-[clamp(2.8rem,5.5vw,5.5rem)] text-navy tracking-tight leading-[1] whitespace-nowrap">
            {t.ourGoal.desktopTitleStart}
          </h2>
        </div>

        {/* MIDDLE COLUMN: Photo Placeholder */}
        <div className="hidden lg:flex w-4/12 xl:w-[28%] justify-start items-center lg:h-[560px] xl:h-[600px]">
          <div
            ref={photoHolderRef}
            className="invisible flex-shrink-0 w-full max-w-[380px] h-[480px] lg:w-[340px] xl:w-[380px] lg:h-[480px] xl:h-[560px]"
          />
        </div>

        {/* RIGHT COLUMN: Team & Main Text */}
        <div className="hidden lg:flex w-5/12 xl:w-[47%] flex-col justify-between lg:h-[560px] xl:h-[600px] pr-8 xl:pr-10 z-20">
          
          {/* Top: Team Info */}
          <div className="flex flex-row items-center gap-8 xl:gap-8 w-full og-team will-change-[transform,opacity]">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-sans text-[12px] xl:text-[14px] text-gray-dark font-medium max-w-[280px] leading-relaxed opacity-70"
            >
              {t.ourGoal.teamText}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex -space-x-4 shrink-0"
            >
              {[1, 2, 3].map(i => (
                <div key={i} className="w-14 h-14 xl:w-20 xl:h-20 rounded-full border-2 border-beige overflow-hidden relative bg-gray-300">
                  <Image
                    src="/assets/dental_team.png"
                    alt={`Team member ${i}`} fill className="object-cover grayscale mix-blend-multiply"
                  />
                </div>
              ))}
              <div className="w-14 h-14 xl:w-20 xl:h-20 rounded-full border-2 border-beige bg-[#e0dbda] flex items-center justify-center font-serif text-xl xl:text-3xl text-navy">
                +20
              </div>
            </motion.div>
          </div>

          {/* Bottom: Main Text */}
          <div className="mt-auto">
            <h3
              ref={textRef}
              className="font-serif text-[clamp(2.8rem,4.5vw,4.5rem)] leading-[1] tracking-tight text-navy mb-6 max-w-[750px] will-change-opacity"
            >
              {t.ourGoal.desktopTitleEnd}
            </h3>
 
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link href="/about">
                <button className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-navy text-[#eae8e8] font-sans text-[12px] xl:text-[13px] tracking-wide font-semibold hover:bg-navy/80 transition-colors">
                  {t.ourGoal.aboutUs} <span className="text-sm font-light leading-none">+</span>
                </button>
              </Link>
            </motion.div>
          </div>

        </div>
      </div>

      {/* THE ACTUAL PHOTO THAT ANIMATES */}
      <div
        ref={photoWrapperRef}
        className="hidden lg:block overflow-hidden will-change-transform z-50 shadow-[0_10px_60px_-15px_rgba(0,0,0,0.3)]"
      >
        <Image
          src="/assets/founder_portrait.png"
          alt="Doctor portrait"
          fill
          className="object-cover object-top grayscale"
          sizes="50vw"
        />
      </div>

    </section>
  );
}

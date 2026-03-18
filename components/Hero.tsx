'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

// Lazy-load Spline so its runtime doesn't block the Hero text animation
const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

export default function Hero() {
  const { t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef  = useRef<HTMLDivElement>(null);
  const stickyRef     = useRef<HTMLDivElement>(null);
  const leftRef       = useRef<HTMLDivElement>(null);
  const rightRef      = useRef<HTMLDivElement>(null);
  const titleRef      = useRef<HTMLDivElement>(null);
  const marqueeInner  = useRef<HTMLDivElement>(null);
  const marqueeWrap   = useRef<HTMLDivElement>(null);
  const servicesRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    setIsDesktop(window.innerWidth >= 1024);
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* ── entrance char animation ── */
      const chars1 = containerRef.current?.querySelectorAll('.h1a');
      const chars2 = containerRef.current?.querySelectorAll('.h1b');
      const tl = gsap.timeline({ paused: true });
      if (chars1?.length)
        tl.fromTo(chars1,
          { opacity: 0, y: 60, rotateX: -60 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.025, ease: 'power4.out' });
      if (chars2?.length)
        tl.fromTo(chars2,
          { opacity: 0, y: 60, rotateX: -60 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.025, ease: 'power4.out' },
          '-=0.65');

      /* Sync with Loader: start entrance when Loader finishes fading out */
      const hasLoaded = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('ada-loaded');
      if (hasLoaded && document.querySelector('[data-loader-active]') === null) {
        // Loader already done (repeat visit in same session)
        tl.play();
      } else {
        const onLoaderDone = () => { tl.play(); };
        window.addEventListener('loader-complete', onLoaderDone, { once: true });
        // Fallback: if event never fires (e.g. Loader skipped), play after 4.5s
        setTimeout(() => { if (tl.paused()) tl.play(); }, 4500);
      }

      /* ── scroll timeline ── */
      // Set initial widths so both panels are visible immediately
      gsap.set(leftRef.current, { width: '50%' });
      gsap.set(rightRef.current, { width: '50%' });

      const st = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%', // Reduced slightly for faster progression
          pin: stickyRef.current,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      st
        // fade title
        .to(titleRef.current,   { opacity: 0, y: -30, duration: 0.25 }, 0)
        // fade out the bottom right caption
        .to(leftRef.current?.querySelector('.caption-left') ?? null, { opacity: 0, duration: 0.2 }, 0.05)
        .to(rightRef.current?.querySelector('.caption-right') ?? null, { opacity: 0, duration: 0.2 }, 0.05)
        // expand/shrink panels
        .to(leftRef.current,    { width: '0%', duration: 0.5, ease: 'power2.inOut' }, 0.05)
        .to(rightRef.current,   { width: '100%', duration: 0.5, ease: 'power2.inOut' }, 0.05)
        // scroll marquee left across the screen (starts right and moves left)
        .fromTo(marqueeInner.current, 
          { x: '100vw', xPercent: 0 }, 
          { 
            x: window.innerWidth >= 1024 ? '95vw' : '85vw', // Bring the right edge inside the screen
            xPercent: -100, // Move left by its full width
            duration: 1.25, // Natural scroll timing
            ease: 'none' 
          }, 
          0.05
        )
        // reveal service labels and bottom-right phrase smoothly
        .fromTo(
          servicesRef.current?.querySelectorAll('.reveal-text') ?? [],
          { opacity: 0, y: 30, filter: 'blur(10px)' },
          { 
            opacity: 1, 
            y: 0, 
            filter: 'blur(0px)',
            stagger: 0.1, 
            duration: 0.8, 
            ease: 'power3.out' 
          },
          0.8 // Start while marquee is finishing
        )
        // PARALLAX CURTAIN REVEAL: Pull the Hero clip-path up to reveal what's underneath
        .to(stickyRef.current, { 
            clipPath: 'inset(0px 0px 100vh 0px)', 
            ease: 'none', 
            duration: 1.2 // Longer duration for the reveal itself
        }, 1.6); // Start reveal IMMEDIATELY after labels begin showing
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* helper: split to animated spans */
  const split = (t: string, cls: string) =>
    t.split('').map((c, i) => (
      <span key={i} className={`${cls} inline-block`}>{c === ' ' ? '\u00A0' : c}</span>
    ));

  const MARQUEE = t.hero.marquee;

  return (
    <div ref={containerRef} className="relative w-full z-20">

      {/* sticky layer */}
      <div 
        ref={stickyRef} 
        className="w-full h-screen flex flex-row overflow-hidden will-change-transform bg-navy origin-top"
        style={{ clipPath: 'inset(0px 0px 0px 0px)' }}
      >

        {/* ── LEFT panel ── */}
        <div
          ref={leftRef}
          className="relative inset-y-0 left-0 bg-beige z-10 overflow-hidden h-full"
          style={{ width: '50%' }}
        >
          {/* Spline 3D Scene — desktop only, skip on mobile to save GPU */}
          <div className="absolute top-0 left-0 h-full w-full lg:w-[50vw] z-0 pointer-events-auto hidden lg:flex items-center justify-center mix-blend-multiply opacity-90 overflow-hidden">
            {isMounted && isDesktop && (
              <Spline 
                scene="https://prod.spline.design/aepdXI8IUIN8L9Lb/scene.splinecode" 
                className="w-full h-full scale-[2.8] lg:scale-[1.6] -translate-y-[10%] lg:-translate-y-[5%] origin-center"
                style={{ background: 'transparent' }}
              />
            )}
          </div>
          
          <div className="caption-left absolute inset-x-0 bottom-0 p-8 lg:p-12 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="mb-8 lg:mb-14"
            >
              <p className="font-sans text-[11px] font-medium text-navy/40 mb-2 tracking-widest uppercase">{t.hero.basedIn}</p>
              <div className="flex flex-col gap-1 font-sans text-sm font-semibold text-navy">
                {t.hero.locations.map((loc: string) => (
                  <Link key={loc} href="/contact">
                    <p className="hover:translate-x-2 transition-transform cursor-pointer w-fit">{loc}</p>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── RIGHT panel ── */}
        <div
          ref={rightRef}
          className="relative inset-y-0 right-0 bg-navy overflow-hidden z-10 h-full"
          style={{ width: '50%' }}
        >
          <video autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="https://api.aventuradentalarts.com/uploads/hero_poster.png"
          >
            <source src="https://api.aventuradentalarts.com/uploads/Final_ADA_f13c7df4ea.webm" type="video/webm" />
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/20 to-transparent pointer-events-none z-20" />

          {/* MARQUEE */}
          <div
            ref={marqueeWrap}
            className="absolute inset-0 flex items-center z-30 pointer-events-none"
          >
            <div
              ref={marqueeInner}
              className="flex will-change-transform w-max shrink-0"
            >
              <span className="font-serif text-[15vw] lg:text-[12vw] leading-none tracking-tight text-white whitespace-nowrap px-[4vw]">
                {MARQUEE}
              </span>
            </div>
          </div>
        </div>

        {/* ── SERVICE LABELS & BOTTOM PHRASE ── */}
        <div ref={servicesRef} className="absolute inset-x-0 bottom-16 lg:bottom-20 px-8 lg:px-14 z-30 pointer-events-none">
          {/* Three labels in one horizontal line */}
          <div className="flex justify-between items-center w-full mb-6 lg:mb-8">
            <span className="reveal-text font-sans text-[9px] lg:text-xs font-bold tracking-[0.15em] text-white/80 uppercase">
              {t.hero.services[0]}
            </span>
            <span className="reveal-text font-sans text-[9px] lg:text-xs font-bold tracking-[0.15em] text-white/80 uppercase">
              {t.hero.services[1]}
            </span>
            <span className="reveal-text font-sans text-[9px] lg:text-xs font-bold tracking-[0.15em] text-white/80 uppercase">
              {t.hero.services[2]}
            </span>
          </div>
          {/* Phrase below, right-aligned */}
          <div className="flex justify-end">
            <div className="reveal-text text-right mr-[-4px]">
              <p className="font-serif italic text-[14px] lg:text-[18px] leading-[1.2] text-white/90">
                {t.hero.combinedScience.split('\n').map((line: string, i: number) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </p>
            </div>
          </div>
        </div>

        {/* ── TITLE overlay ── */}
        <div ref={titleRef} className="absolute inset-0 pointer-events-none z-40">
          <TitleLayer color="text-gray-dark" clip={false} t={t} />
          <TitleLayer color="text-white" clip t={t} />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Reusable title layer (avoids JSX repetition)
   ────────────────────────────────────────────── */
function TitleLayer({ color, clip, t }: { color: string; clip: boolean; t: any }) {
  const split = (text: string, cls: string) =>
    text.split('').map((c, i) => (
      <span key={i} className={`${cls} inline-block origin-bottom`}>{c === ' ' ? '\u00A0' : c}</span>
    ));

  return (
    <div
      className={`absolute inset-0 ${color} flex flex-col`}
      style={clip ? { clipPath: 'inset(0 0 0 50%)' } : undefined}
    >
      {/* Big centered title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center px-4 perspective-[1000px]">
        <h1 className="font-serif leading-[0.88] tracking-tight" style={{ fontSize: 'clamp(3rem, 9.5vw, 11rem)' }}>
          <div className="block overflow-hidden pb-1">
            {split(t.hero.titleLine1[0], 'h1a')}
          </div>
          <div className="flex justify-center gap-[5vw] overflow-hidden">
            <span>{split(t.hero.titleLine1[1], 'h1b')}</span>
            <em className="font-serif italic">{split(t.hero.titleLine1[2], 'h1b')}</em>
          </div>
        </h1>
      </div>

      {/* Bottom subtitle */}
      <div className="absolute bottom-12 lg:bottom-16 left-1/2 -translate-x-1/2 text-center w-full px-6">
        <h2 className="font-serif leading-[0.95] tracking-tight mx-auto" style={{ fontSize: 'clamp(1.2rem, 2vw, 2.2rem)', maxWidth: '380px' }}>
          <span className="block mb-1">{t.hero.subtitle1}</span>
          <em className="italic block mb-1 opacity-85">{t.hero.subtitle2}</em>
          <em className="italic block opacity-85">{t.hero.subtitle3}</em>
        </h2>
      </div>
    </div>
  );
}

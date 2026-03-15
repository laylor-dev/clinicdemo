'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';

export default function Hero() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const stickyRef     = useRef<HTMLDivElement>(null);
  const leftRef       = useRef<HTMLDivElement>(null);
  const rightRef      = useRef<HTMLDivElement>(null);
  const titleRef      = useRef<HTMLDivElement>(null);
  const marqueeInner  = useRef<HTMLDivElement>(null);
  const marqueeWrap   = useRef<HTMLDivElement>(null);
  const servicesRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* ── entrance char animation ── */
      const chars1 = containerRef.current?.querySelectorAll('.h1a');
      const chars2 = containerRef.current?.querySelectorAll('.h1b');
      const tl = gsap.timeline({ delay: 0.3 });
      if (chars1?.length)
        tl.fromTo(chars1,
          { opacity: 0, y: 60, rotateX: -60 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.025, ease: 'power4.out' });
      if (chars2?.length)
        tl.fromTo(chars2,
          { opacity: 0, y: 60, rotateX: -60 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.025, ease: 'power4.out' },
          '-=0.65');

      /* ── scroll timeline ── */
      const st = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%', // Extended slightly to give room for the reveal
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
          { x: '100vw' }, 
          { x: '-38vw', duration: 0.95, ease: 'none' }, 
          0.05
        )
        // reveal service tags at bottom
        .fromTo(
          servicesRef.current?.querySelectorAll('span') ?? [],
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.2, ease: 'power2.out' },
          0.65
        )
        // PARALLAX CURTAIN REVEAL: Pull the Hero clip-path up to reveal what's underneath
        .to(stickyRef.current, { 
            clipPath: 'inset(0px 0px 100vh 0px)', 
            ease: 'none', 
            duration: 0.8 
        }, 1.2); 
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* helper: split to animated spans */
  const split = (t: string, cls: string) =>
    t.split('').map((c, i) => (
      <span key={i} className={`${cls} inline-block`}>{c === ' ' ? '\u00A0' : c}</span>
    ));

  const MARQUEE = 'Your smile, effortlessly enhanced\u2002\u2002\u2002\u2002\u2002';

  return (
    <div ref={containerRef} className="relative w-full z-20">

      {/* sticky layer */}
      <div 
        ref={stickyRef} 
        className="w-full h-screen flex overflow-hidden will-change-transform bg-navy origin-top"
        style={{ clipPath: 'inset(0px 0px 0px 0px)' }}
      >

        {/* ── LEFT beige panel ── */}
        <div
          ref={leftRef}
          className="absolute inset-y-0 left-0 bg-beige z-10 overflow-hidden"
          style={{ width: '50%' }}
        >
          {/* Subtle horizontal gradient to blend into the video */}
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-transparent to-white/10 pointer-events-none" />
          
          <div className="caption-left absolute inset-x-0 bottom-0 p-8 lg:p-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="mb-8 lg:mb-14"
            >
              <p className="font-sans text-[11px] font-medium text-navy/40 mb-2 tracking-widest uppercase">Based in:</p>
              <div className="flex flex-col gap-1 font-sans text-sm font-semibold text-navy">
                {['Aventura', 'Bay Harbor', 'Coral Gables'].map(loc => (
                  <p key={loc} className="hover:translate-x-2 transition-transform cursor-pointer w-fit">{loc}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── RIGHT video panel ── */}
        <div
          ref={rightRef}
          className="absolute inset-y-0 right-0 bg-navy overflow-hidden z-10"
          style={{ width: '50%' }}
        >
          <video autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="https://api.aventuradentalarts.com/uploads/hero_poster.png"
          >
            <source src="https://api.aventuradentalarts.com/uploads/Final_ADA_f13c7df4ea.webm" type="video/webm" />
          </video>
          
          {/* Dark overlay for text readability and horizontal blend */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/20 to-transparent pointer-events-none z-20" />

          {/* MARQUEE inside the video panel so it gets naturally clipped on the left edge if video isn't full width */}
          <div
            ref={marqueeWrap}
            className="absolute inset-0 flex items-center z-30 pointer-events-none"
          >
            <div
              ref={marqueeInner}
              className="flex will-change-transform w-max"
            >
              {[0].map(n => (
                <span
                  key={n}
                  className="font-serif text-[12vw] leading-none tracking-tight text-white whitespace-nowrap"
                  style={{ display: 'inline-block', paddingRight: '4vw' }}
                >
                  {MARQUEE}
                </span>
              ))}
            </div>
          </div>

          {/* bottom-right caption */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="caption-right absolute bottom-10 right-10 text-right font-sans text-[11px] text-white/70 max-w-[190px] leading-snug z-30 hidden lg:block"
          >
            We combine advanced science<br />with an artist&apos;s touch.
          </motion.p>
        </div>

        {/* ── SERVICE LABELS (spans full width, fade in later) ── */}
        <div ref={servicesRef} className="absolute bottom-10 left-10 right-10 flex justify-between z-30 pointer-events-none">
          {['Implant Restoration', 'Advanced Esthetic', 'Restorative Dentistry'].map(s => (
            <span key={s} className="font-sans text-[11px] font-semibold tracking-[0.02em] text-white opacity-0">{s}</span>
          ))}
        </div>

        {/* ── TITLE overlay (dual-layer clip-path for split color) ── */}
        <div ref={titleRef} className="absolute inset-0 pointer-events-none z-40">
          {/* dark layer */}
          <TitleLayer color="text-gray-dark" clip={false} />
          {/* white layer clipped to right half */}
          <TitleLayer color="text-white" clip />
        </div>

        {/* ── Bottom fade bridge removed for sharp parallax curtain ── */}

      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Reusable title layer (avoids JSX repetition)
   ────────────────────────────────────────────── */
function TitleLayer({ color, clip }: { color: string; clip: boolean }) {
  const split = (t: string, cls: string) =>
    t.split('').map((c, i) => (
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
            {split('Premium', 'h1a')}
          </div>
          <div className="flex justify-center gap-[5vw] overflow-hidden">
            <span>{split('Esthetic', 'h1b')}</span>
            <em className="font-serif italic">{split('Dentistry', 'h1b')}</em>
          </div>
        </h1>
      </div>

      {/* Bottom subtitle */}
      <div className="absolute bottom-12 lg:bottom-16 left-1/2 -translate-x-1/2 text-center w-full px-6">
        <h2 className="font-serif leading-[0.95] tracking-tight mx-auto" style={{ fontSize: 'clamp(1.2rem, 2vw, 2.2rem)', maxWidth: '380px' }}>
          <span className="block mb-1">Designing smiles that are</span>
          <em className="italic block mb-1 opacity-85">as healthy as they are</em>
          <em className="italic block opacity-85">beautiful</em>
        </h2>
      </div>
    </div>
  );
}

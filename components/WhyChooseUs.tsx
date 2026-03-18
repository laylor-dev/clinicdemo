'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';

export default function WhyChooseUs() {
  const { t } = useLanguage();

  // Bubble data matching the reference image layout
  // Positioned inside the bottom-half bowl arc
  const bubbles = [
    {
      id: 'b-locations',
      title: '3',
      subtitle: t.whyChooseUs.bubbles.locations,
      bg: '#8b929e',
      color: '#eae8e8',
      w: 150, h: 150,
      // left side, lower bowl (sitting on bowl edge)
      left: '12%', bottom: '14%',
      delay: 0.25,
    },
    {
      id: 'b-years',
      title: '35',
      subtitle: t.whyChooseUs.bubbles.yearsOfService,
      bg: '#4a5568',
      color: '#eae8e8',
      w: 175, h: 175,
      // left-center, slightly higher up
      left: '22%', bottom: '28%',
      delay: 0.15,
    },
    {
      id: 'b-patients',
      title: '20K+',
      subtitle: t.whyChooseUs.bubbles.satisfiedPatients,
      bg: '#c8bfb2',
      color: '#14151d',
      w: 240, h: 240,
      // Large — center-left, bottom of bowl
      left: '33%', bottom: '8%',
      delay: 0,
    },
    {
      id: 'b-veneers',
      title: '15k',
      subtitle: t.whyChooseUs.bubbles.veneersPlaced,
      bg: '#f5f3f0',
      color: '#14151d',
      w: 195, h: 195,
      // Center, slightly above — resting on shoulder of bowl
      left: '50%', bottom: '32%',
      transform: 'translateX(-50%)',
      delay: 0.1,
    },
    {
      id: 'b-crowns',
      title: '27K',
      subtitle: t.whyChooseUs.bubbles.crownsPlaced,
      bg: '#c8bfb2',
      color: '#14151d',
      w: 220, h: 220,
      // Right-center, bottom
      left: '57%', bottom: '8%',
      delay: 0.05,
    },
    {
      id: 'b-education',
      title: '2k',
      subtitle: t.whyChooseUs.bubbles.hoursEducation,
      bg: '#4a5568',
      color: '#eae8e8',
      w: 160, h: 160,
      // Right side, on the bowl rim
      left: '76%', bottom: '20%',
      delay: 0.2,
    },
  ];
  const containerRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLHeadingElement>(null);
  const textRightRef = useRef<HTMLHeadingElement>(null);
  const textTopRef = useRef<HTMLParagraphElement>(null);
  const textBottomRef = useRef<HTMLHeadingElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const matchMedia = gsap.matchMedia();

    matchMedia.add({
      isMobile: "(max-width: 1023px)",
      isDesktop: "(min-width: 1024px)"
    }, (context) => {
      const { isMobile } = context.conditions as { isMobile: boolean };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=220%',
          scrub: 1.5,
          pin: true,
        }
      });

      // Phase 1 (0–0.4): surrounding texts fade and float away
      tl.to([textLeftRef.current, textRightRef.current, textTopRef.current], {
        y: -60,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.05,
      }, 0);

      // Phase 1: "Your Smile" rises to the top
      tl.to(textBottomRef.current, {
        top: isMobile ? '10%' : '6%',
        scale: isMobile ? 0.7 : 0.9,
        duration: 0.8,
        ease: 'power2.inOut',
      }, 0);

      // Phase 1–2: circle scales up
      tl.to(circleRef.current, {
        scale: isMobile ? 8 : 5.5,
        y: isMobile ? '35%' : '20%',
        opacity: 1,
        duration: 2,
        ease: 'power3.inOut',
      }, 0);

      // Phase 2 (0.5–1): Bubbles rain down with gravity + bounce
      if (bubblesRef.current) {
        const els = Array.from(bubblesRef.current.children) as HTMLElement[];
        tl.set(bubblesRef.current, { visibility: 'visible' }, 0.5);
        els.forEach((el, i) => {
          const bubble = bubbles[i];
          tl.fromTo(
            el,
            { y: -600, opacity: 0, scale: 0.3 },
            {
              y: 0,
              opacity: 1,
              scale: isMobile ? 0.75 : 1, // Scale down bubbles on mobile
              duration: 1.2,
              ease: 'bounce.out',
            },
            0.55 + bubble.delay
          );
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-[#14151d] h-screen w-full relative overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">

        {/* The big circle — starts small, expands to a bowl */}
        <div
          ref={circleRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-0 opacity-40 will-change-transform"
          style={{
            width: 'min(50vw, 550px)',
            height: 'min(50vw, 550px)',
            border: '1px solid rgba(234,232,232,0.15)',
          }}
        />

        {/* Surrounding text - phase 1 */}
        <h2
          ref={textLeftRef}
          className="font-serif text-[clamp(2.5rem,8vw,8rem)] tracking-tight text-[#eae8e8]/80 absolute left-[6%] top-[38%] -translate-y-1/2 z-10 whitespace-nowrap will-change-[transform,opacity]"
        >
          {t.whyChooseUs.weAre} <em className="italic">{t.whyChooseUs.here}</em>
        </h2>

        <p
          ref={textTopRef}
          className="font-sans text-[10px] lg:text-[11px] font-bold text-[#eae8e8]/30 text-center absolute top-[36%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 leading-relaxed tracking-widest uppercase will-change-[transform,opacity]"
        >
          {t.whyChooseUs.why}<br />{t.whyChooseUs.chooseUs}
        </p>

        <h2
          ref={textRightRef}
          className="font-serif text-[clamp(2.5rem,8vw,8rem)] tracking-tight text-[#eae8e8]/80 absolute right-[6%] top-[38%] -translate-y-1/2 z-10 whitespace-nowrap will-change-[transform,opacity]"
        >
          {t.whyChooseUs.to} <em className="italic">{t.whyChooseUs.enhance}</em>
        </h2>

        {/* "Your Smile" - rises to top in phase 1 */}
        <h2
          ref={textBottomRef}
          className="font-serif text-[clamp(3.5rem,10vw,8rem)] tracking-tight text-[#eae8e8] absolute top-[54%] left-1/2 -translate-x-1/2 z-20 whitespace-nowrap will-change-[transform,opacity]"
        >
          {t.whyChooseUs.yourSmile}
        </h2>

        {/* Bubbles — rendered at their absolute positions within the bowl */}
        <div
          ref={bubblesRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-30 invisible origin-center"
        >
          {bubbles.map((b) => (
            <div
              key={b.id}
              className="absolute flex flex-col items-center justify-center text-center shadow-2xl rounded-full will-change-transform"
              style={{
                width: b.w,
                height: b.h,
                background: b.bg,
                color: b.color,
                left: b.left,
                bottom: b.bottom,
                transform: b.transform ?? undefined,
              }}
            >
              <span className="font-serif leading-none tracking-tight" style={{ fontSize: Math.round(b.w * 0.3) }}>
                {b.title}
              </span>
              <span className="font-sans font-bold uppercase tracking-widest whitespace-pre-line px-3 leading-tight" style={{ fontSize: Math.round(b.w * 0.08), opacity: 0.6 }}>
                {b.subtitle}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const bubbles = [
  {
    id: 'b-locations',
    title: '3',
    subtitle: 'LOCATIONS',
    style: 'bg-[#9ba1ac] text-navy w-[20vw] h-[20vw] lg:w-[15vw] lg:h-[15vw]',
    pos: 'left-[15%] bottom-[5%]',
  },
  {
    id: 'b-years',
    title: '35',
    subtitle: 'YEARS OF\nSERVICE',
    style: 'bg-navy-light text-beige w-[22vw] h-[22vw] lg:w-[17vw] lg:h-[17vw]',
    pos: 'left-[25%] bottom-[30%]',
  },
  {
    id: 'b-patients',
    title: '20K+',
    subtitle: 'SATISFIED\nPATIENTS',
    style: 'bg-beige-dark text-navy w-[30vw] h-[30vw] lg:w-[24vw] lg:h-[24vw]',
    pos: 'left-[40%] bottom-[0%]',
  },
  {
    id: 'b-veneers',
    title: '15k',
    subtitle: 'VENEERS\nPLACED',
    style: 'bg-white text-navy w-[24vw] h-[24vw] lg:w-[18vw] lg:h-[18vw]',
    pos: 'left-[50%] bottom-[42%] -translate-x-1/2',
  },
  {
    id: 'b-crowns',
    title: '27K',
    subtitle: 'CROWNS\nPLACED',
    style: 'bg-beige text-navy w-[28vw] h-[28vw] lg:w-[22vw] lg:h-[22vw]',
    pos: 'right-[20%] bottom-[8%]',
  },
  {
    id: 'b-education',
    title: '2k',
    subtitle: 'HOURS OF CONTINUED\nEDUCATION',
    style: 'bg-navy-light text-beige w-[22vw] h-[22vw] lg:w-[16vw] lg:h-[16vw]',
    pos: 'right-[5%] bottom-[28%]',
  },
];

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  
  const textLeftRef = useRef<HTMLHeadingElement>(null);
  const textRightRef = useRef<HTMLHeadingElement>(null);
  const textTopRef = useRef<HTMLParagraphElement>(null);
  const textBottomRef = useRef<HTMLHeadingElement>(null);
  const bubblesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: 1,
        pin: true,
      }
    });

    // Animate texts fading out/moving up
    tl.to([textLeftRef.current, textRightRef.current, textTopRef.current], {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
    }, 0);

    // Animate "Your Smile" moving to top
    tl.to(textBottomRef.current, {
      top: '10%',
      y: 0,
      scale: 1.1,
      duration: 1,
      ease: 'power2.inOut',
    }, 0);

    // Expand the circle massively
    tl.to(circleRef.current, {
      scale: 3.5,
      opacity: 0.5,
      y: '20%',
      duration: 1.5,
      ease: 'power2.inOut',
    }, 0);

    // Drop in the bubbles
    if (bubblesContainerRef.current) {
      const bubbleElements = bubblesContainerRef.current.children;
      tl.fromTo(bubbleElements, 
        { y: 300, opacity: 0, scale: 0.5 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1, 
          stagger: 0.1, 
          ease: 'back.out(1.2)' 
        }, 
        0.5 // Start halfway through the circle expansion
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="bg-navy h-screen w-full relative overflow-hidden">
      <div ref={pinRef} className="absolute inset-0 w-full h-full flex items-center justify-center">
        
        {/* The expanding circle */}
        <div 
          ref={circleRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] border border-white/20 rounded-full z-0"
        />

        {/* Initial Texts */}
        <h2 ref={textLeftRef} className="font-serif text-5xl lg:text-8xl tracking-tight text-beige absolute left-[10%] lg:left-[15%] top-[40%] -translate-y-1/2 z-10 transition-transform">
          We are <em className="italic">here</em>
        </h2>
        
        <p ref={textTopRef} className="font-sans text-xs font-medium text-beige text-center absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          Why<br/>choose us?
        </p>
        
        <h2 ref={textRightRef} className="font-serif text-5xl lg:text-8xl tracking-tight text-beige absolute right-[10%] lg:right-[15%] top-[40%] -translate-y-1/2 z-10">
          to <em className="italic">Enhance</em>
        </h2>

        <h2 ref={textBottomRef} className="font-serif text-6xl lg:text-[10rem] tracking-tight text-beige absolute top-[55%] left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
          Your Smile
        </h2>

        {/* The bubbles container */}
        <div ref={bubblesContainerRef} className="absolute inset-0 w-full h-full pointer-events-none z-30 max-w-[1440px] mx-auto">
          {bubbles.map((bubble) => (
            <div 
              key={bubble.id}
              className={`absolute ${bubble.pos} ${bubble.style} rounded-full flex flex-col items-center justify-center text-center shadow-2xl`}
            >
              <span className="font-serif text-4xl lg:text-6xl tracking-tight mb-1">{bubble.title}</span>
              <span className="font-sans text-[10px] lg:text-xs font-medium tracking-wider whitespace-pre-line opacity-80">{bubble.subtitle}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

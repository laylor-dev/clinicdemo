'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';

export default function OurGoal() {
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
        end: '+=400%',
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

        // Highlight text progressively over the whole scroll
        tl.to('.ogw', {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          duration: 0.8
        }, 0); 
      }

      // 1. Photo zooms to fill left 50% seamlessly for next section
      tl.to(photoWrap, {
        top: 0,
        left: 0,
        width: '50vw',
        height: '100vh',
        borderRadius: '0px',
        ease: 'power2.inOut',
        duration: 0.8
      }, 0);

      // 2. Fade out the title on the left
      tl.to('.og-title', {
        opacity: 0,
        x: -40,
        ease: 'power2.inOut',
        duration: 0.3
      }, 0.1);

      // 3. Fade out the team info on the right
      tl.to('.og-team', {
        opacity: 0,
        y: -30,
        ease: 'power2.inOut',
        duration: 0.3
      }, 0.1);

    });

    return () => matchMedia.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-beige h-screen overflow-hidden flex items-center justify-center">

      {/* Main Grid Layout Container - 3 Columns */}
      <div className="w-full max-w-[1600px] px-6 lg:px-12 flex flex-col lg:flex-row items-center lg:items-center justify-between h-full relative z-10 w-full lg:gap-8 pt-32 pb-24 lg:pt-0 lg:pb-0">

        {/* LEFT COLUMN: "Our goal is" */}
        <div className="w-full lg:w-3/12 xl:w-[25%] flex flex-col justify-end lg:h-[480px] lg:pb-8 og-title mb-8 lg:mb-0">
          <h2 className="font-serif text-[clamp(4rem,5.5vw,5.5rem)] text-navy tracking-tight leading-[1] whitespace-nowrap">
            Our goal is
          </h2>
        </div>

        {/* MIDDLE COLUMN: Photo Placeholder */}
        <div className="w-full lg:w-4/12 xl:w-[28%] flex justify-center lg:justify-start items-center lg:h-[480px]">
          <div
            ref={photoHolderRef}
            className="invisible flex-shrink-0 w-full max-w-[380px] h-[520px] lg:w-[340px] xl:w-[380px] lg:h-[460px] xl:h-[520px]"
          />
        </div>

        {/* RIGHT COLUMN: Team & Main Text */}
        <div className="w-full lg:w-5/12 xl:w-[47%] flex flex-col justify-between lg:h-[520px] pr-0 lg:pr-8 xl:pr-10 z-20">
          
          {/* Top: Team Info */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 xl:gap-8 w-full og-team mt-8 lg:mt-0">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-sans text-[12px] xl:text-[14px] text-gray-dark font-medium max-w-[280px] leading-relaxed"
            >
              With decades of combined experience and ongoing advanced education, our team delivers care rooted in knowledge, precision, and an unwavering dedication to excellence.
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
                    src={`https://api.aventuradentalarts.com/uploads/team_${i === 1 ? '34_363d172ace' : i === 2 ? '35_356a3a9724' : '2_261e39af4e'}.webp`}
                    alt={`Team member ${i}`} fill className="object-cover grayscale mix-blend-multiply" referrerPolicy="no-referrer"
                  />
                </div>
              ))}
              <div className="w-14 h-14 xl:w-20 xl:h-20 rounded-full border-2 border-beige bg-[#e0dbda] flex items-center justify-center font-serif text-xl xl:text-3xl text-navy">
                +20
              </div>
            </motion.div>
          </div>

          {/* Bottom: Main Text */}
          <div className="mt-8 lg:mt-auto">
            <h3
              ref={textRef}
              className="font-serif text-[2.4rem] lg:text-[clamp(2.8rem,4.5vw,4.5rem)] leading-[0.9] tracking-tight text-navy lg:mb-8 mb-6 max-w-[750px]"
            >
              to deliver world-class dental and aesthetic care through advanced techniques, customized treatments, and a bespoke level of service that makes every patient feel valued.
            </h3>
 
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <button className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-navy text-[#eae8e8] font-sans text-[12px] xl:text-[13px] tracking-wide font-semibold hover:bg-navy/80 transition-colors">
                About Us <span className="text-sm font-light leading-none">+</span>
              </button>
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
          src="https://api.aventuradentalarts.com/uploads/DSC_03466_2_6fe88d5827.webp"
          alt="Doctor portrait"
          fill
          className="object-cover object-top grayscale"
          referrerPolicy="no-referrer"
          sizes="50vw"
        />
      </div>

    </section>
  );
}

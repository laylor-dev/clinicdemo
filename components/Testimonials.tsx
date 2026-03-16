'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const testimonials = [
  {
    category: 'Implant Restoration',
    text: '"The care I received for my implant restoration was fully beyond my expectations. Dr. Gale and his team are true artists. I highly recommend them to anyone seeking quality care."',
    author: 'Michael T.',
  },
  {
    category: 'Crowns and bridges',
    text: '"I had a fantastic experience at my recent dentist appointment. The staff was incredibly friendly and professional from start to finish. The office was clean and welcoming, and everything ran right on schedule. Dr. Gale and his assistants explained everything clearly and made sure I was comfortable the entire time. I left feeling confident and well cared for. Highly recommend!"',
    author: 'Ashanti I.',
  },
  {
    category: 'Full Mouth Rehabilitation',
    text: '"Dr. Nuria Otero completely transformed my smile. The full mouth rehabilitation process was explained so well, and the results are life-changing. I could not be happier with my new teeth."',
    author: 'Sarah M.',
  },
  {
    category: 'Deep Cleanings',
    text: '"I had an excellent experience at Aventura Dental Arts with Dr. Laura Lugo for my routine check-up. The doctor was thorough, explained everything clearly, and made me feel completely at ease. The staff was friendly, and the office was clean and welcoming. My teeth feel amazing, and I\'m already looking forward to my next visit. Highly recommend this practice for top-notch dental care."',
    author: 'Alessandro B.',
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(3);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="bg-[#14151d] text-[#eae8e8] py-44 lg:py-48 px-6 lg:px-24 will-change-[transform,opacity]">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-24 lg:gap-32">
        {/* Left Nav */}
        <div className="w-full lg:w-1/3 flex flex-col">
          <p className="font-sans font-bold text-[10px] uppercase tracking-[0.4em] text-white/30 mb-12 lg:mb-16">Patient Stories</p>
          <h3 className="font-serif italic text-4xl lg:text-5xl mb-12 lg:mb-16">Testimonials</h3>
          <div className="flex flex-col gap-4 lg:gap-2">
            {testimonials.map((test, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`text-left font-sans text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 flex items-center gap-3 ${activeIndex === idx ? 'text-white' : 'text-white/20 hover:text-white/60'}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full border border-current ${activeIndex === idx ? 'bg-gold border-gold' : 'bg-transparent'}`} />
                {test.category}
              </button>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-2/3 border-t lg:border-t-0 lg:border-l border-white/10 pt-16 lg:pt-0 lg:pl-16 min-h-[300px] flex flex-col justify-between">
          <p className="font-sans text-xl lg:text-3xl font-medium leading-[1.4] tracking-tight mb-16 lg:mb-20 text-white/90">
            {testimonials[activeIndex].text}
          </p>
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-gold/60">
            {testimonials[activeIndex].author}
          </p>
        </div>
      </div>
    </section>
  );
}

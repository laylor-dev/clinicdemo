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
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="bg-[#14151d] text-[#eae8e8] py-32 px-6 lg:px-24">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-24 lg:gap-32">
        {/* Left Nav */}
        <div className="w-full lg:w-1/3 flex flex-col">
          <h3 className="font-sans font-semibold text-xl mb-12">Testimonials</h3>
          <div className="flex flex-col gap-2">
            {testimonials.map((test, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`text-left font-sans text-xs transition-colors duration-300 flex items-center gap-2 ${activeIndex === idx ? 'text-white font-medium' : 'text-white/40 hover:text-white/80'}`}
              >
                <span className={`w-2 h-2 rounded-full border border-current ${activeIndex === idx ? 'bg-white' : 'bg-transparent'}`} />
                {test.category}
              </button>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-2/3 border-l border-white/10 pl-8 lg:pl-16 min-h-[300px] flex flex-col justify-between">
          <p className="font-sans text-xl lg:text-2xl font-medium leading-relaxed tracking-tight mb-12">
            {testimonials[activeIndex].text}
          </p>
          <p className="font-sans text-xs text-white/40">
            {testimonials[activeIndex].author}
          </p>
        </div>
      </div>
    </section>
  );
}

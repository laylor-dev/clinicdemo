'use client';

import Link from 'next/link';
import { ArrowUpRight, Menu, Plus } from 'lucide-react';
import { motion, useScroll } from 'motion/react';
import { useState, useEffect } from 'react';
import MagneticButton from './MagneticButton';

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-700 ${
        isScrolled ? 'bg-beige text-navy py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Left Section */}
        <div className={`flex items-center gap-12 lg:gap-32 transition-colors duration-700 ${isScrolled ? 'text-navy' : 'text-navy'}`}>
          <Link href="/" className="flex items-center gap-3 group">
            <svg width="46" height="24" viewBox="0 0 74 37" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current transition-colors duration-500">
              <path fillRule="evenodd" clipRule="evenodd" d="M18.5632 0.134186C18.3733 0.207789 18.0756 0.465946 17.9015 0.707917C17.2903 1.55785 8.76434 18.1165 8.76434 18.4537C8.76434 19.7309 10.2552 20.4883 11.2672 19.725C11.5634 19.5017 12.9034 17.0963 15.4282 12.2558C17.4766 8.32886 19.1885 5.116 19.2329 5.116C19.2772 5.116 21.0224 8.39266 23.1114 12.3974C27.1047 20.0534 27.1053 20.0544 28.1645 20.0544C28.3822 20.0544 28.7806 19.862 29.05 19.6265C30.0414 18.7606 30.1725 19.1009 25.0938 9.35478C21.1232 1.73525 20.3894 0.425644 19.9755 0.220396C19.4412 -0.0444505 19.0814 -0.0663938 18.5632 0.134186ZM31.9366 0.205456C31.2629 0.414283 30.7354 1.28149 30.9 1.90984C31.1079 2.70407 31.6453 3.04532 32.8804 3.16685C36.541 3.52755 39.2332 6.05059 39.6921 9.55085C39.9349 11.4014 39.0474 13.7325 37.556 15.1624C36.6409 16.0397 36.0044 16.4121 34.4945 16.9538C33.2021 17.4173 32.7783 18.3014 33.38 19.278C33.665 19.7406 34.2134 20.0544 34.7366 20.0544C35.3303 20.0544 37.2059 19.2756 38.3154 18.5685C39.7519 17.6528 40.8941 16.3986 41.7088 14.8416C42.5708 13.1944 42.8479 12.0658 42.8479 10.2019C42.8479 7.24955 41.9486 5.16829 39.7732 3.08702C38.3724 1.74661 37.2465 1.05026 35.6535 0.539083C34.5351 0.180249 32.5832 0.00503182 31.9366 0.205456ZM53.8408 0.227087C53.4753 0.417085 52.5271 2.11773 48.7688 9.32351C46.2264 14.198 44.1463 18.323 44.1463 18.4904C44.1463 19.2865 44.9354 20.0544 45.7536 20.0544C46.7241 20.0544 46.7821 19.9653 50.7337 12.3993C52.8257 8.39343 54.5723 5.116 54.6148 5.116C54.6573 5.116 56.4039 8.39343 58.4959 12.3993C62.4475 19.9653 62.5055 20.0544 63.476 20.0544C64.2942 20.0544 65.0833 19.2865 65.0833 18.4904C65.0833 18.323 63.0029 14.1973 60.4601 9.32211C56.5095 1.7477 55.767 0.423463 55.3557 0.21946C54.761 -0.0752629 54.4189 -0.0735494 53.8408 0.227087ZM0.869454 17.0966C0.352196 17.2967 0 17.8722 0 18.5175C0 19.1947 0.628923 20.052 2.95099 22.54C10.0452 30.1415 20.269 35.2951 30.8844 36.6207C44.878 38.3684 58.6579 34.0236 68.7483 24.6826C70.7978 22.7852 73.3754 19.9854 73.8233 19.17C74.119 18.6314 74.0429 18.093 73.5998 17.588C73.1326 17.0557 72.4699 16.8606 71.8706 17.0791C71.645 17.1612 70.8384 17.9519 70.0783 18.836C66.2908 23.2415 61.3109 27.0779 56.1932 29.5327C49.4442 32.77 43.2176 34.0749 35.5606 33.8568C31.0748 33.7289 27.4631 33.1341 23.5339 31.8765C15.7187 29.3748 8.53241 24.5701 3.61594 18.5594C2.35631 17.0196 1.81438 16.731 0.869454 17.0966Z" />
            </svg>
            <div className="flex flex-col font-sans font-medium text-sm leading-tight tracking-tight overflow-hidden">
              <motion.span className="inline-block" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>Aventura</motion.span>
              <motion.span className="inline-block" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>Dental Arts</motion.span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 font-sans text-sm font-medium">
            <button className="flex items-center gap-2 hover:opacity-70 transition-opacity group">
              Menu <Menu className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            </button>
            <button className="flex items-center gap-2 hover:opacity-70 transition-opacity group">
              Services <span className="text-[10px] group-hover:rotate-180 transition-transform duration-500">▼</span>
            </button>
          </nav>
        </div>

        {/* Right Section */}
        <div className={`hidden lg:flex items-center gap-8 font-sans text-sm font-medium transition-colors duration-700 ${isScrolled ? 'text-navy' : 'text-white'}`}>
          <Link href="#" className="flex items-center gap-1 group overflow-hidden relative">
            <span className="relative z-10 group-hover:-translate-y-full transition-transform duration-500 ease-[0.22,1,0.36,1]">Patient form</span>
            <span className="absolute inset-0 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]">Patient form</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
          </Link>
          
          <div className="flex flex-col items-end group cursor-pointer">
            <div className="flex items-center gap-1 hover:opacity-70 transition-opacity">
              (305) 682-1414 <span className="text-[10px] group-hover:rotate-180 transition-transform duration-500">▼</span>
            </div>
            <span className="text-xs opacity-60">Aventura</span>
          </div>

          <MagneticButton className={`flex items-center gap-3 px-6 py-3 rounded-full transition-colors duration-500 ${
            isScrolled ? 'bg-navy text-beige hover:bg-navy-light' : 'bg-white text-navy hover:bg-beige'
          }`}>
            Book A Call <Plus className="w-4 h-4" />
          </MagneticButton>
        </div>
      </div>
    </motion.header>
  );
}

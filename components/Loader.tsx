'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Only show the loader once per browser session
    if (typeof sessionStorage !== 'undefined') {
      const hasLoaded = sessionStorage.getItem('ada-loaded');
      if (hasLoaded) {
        setIsLoading(false);
        return;
      }
      sessionStorage.setItem('ada-loaded', 'true');
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // Pre-hydration state (SSR): Render a solid navy block to prevent FOUC
  if (!mounted) {
    return (
      <div className="fixed inset-0 z-[200] bg-navy flex items-center justify-center overflow-hidden pointer-events-none" />
    );
  }

  // If already loaded in this session, don't render anything
  if (!isLoading && typeof sessionStorage !== 'undefined' && sessionStorage.getItem('ada-loaded')) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ 
        y: isLoading ? 0 : '-100%',
        opacity: isLoading ? 1 : 0,
      }}
      transition={{ 
        duration: 2.2, /* Increased duration for smoother exit */
        ease: [0.87, 0, 0.13, 1], /* Buttery smooth Expo easing curve */
        delay: isLoading ? 0 : 0.3
      }}
      className="fixed inset-0 z-[200] bg-navy flex items-center justify-center overflow-hidden pointer-events-none"
      style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
    >
      <div className="relative w-48 h-48 flex items-center justify-center">
        
        {/* Spinning Circle that draws itself then fades */}
        <motion.svg
          width="160"
          height="160"
          viewBox="0 0 100 100"
          className="absolute pointer-events-none"
          initial={{ rotate: -90, opacity: 1 }}
          animate={{ 
            rotate: 270,
            opacity: isLoading ? [1, 1, 0] : 0,
          }}
          transition={{ 
            rotate: { duration: 2, ease: "easeInOut" },
            opacity: { duration: 0.5, delay: 1.8, ease: "easeOut" }
          }}
        >
          <motion.circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="#eae8e8"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </motion.svg>

        {/* ADA Logo fades in as circle finishes */}
        <motion.div
          className="absolute"
          initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
          animate={{ scale: isLoading ? 1 : 0.8, opacity: isLoading ? 1 : 0, filter: isLoading ? 'blur(0px)' : 'blur(10px)' }}
          transition={{ 
            duration: 1, 
            delay: 1.5,
            ease: [0.22, 1, 0.36, 1] 
          }}
        >
          <svg width="64" height="32" viewBox="0 0 74 37" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-[#eae8e8]">
            {/* Same SVG path as before */}
            <path fillRule="evenodd" clipRule="evenodd" d="M18.5632 0.134186C18.3733 0.207789 18.0756 0.465946 17.9015 0.707917C17.2903 1.55785 8.76434 18.1165 8.76434 18.4537C8.76434 19.7309 10.2552 20.4883 11.2672 19.725C11.5634 19.5017 12.9034 17.0963 15.4282 12.2558C17.4766 8.32886 19.1885 5.116 19.2329 5.116C19.2772 5.116 21.0224 8.39266 23.1114 12.3974C27.1047 20.0534 27.1053 20.0544 28.1645 20.0544C28.3822 20.0544 28.7806 19.862 29.05 19.6265C30.0414 18.7606 30.1725 19.1009 25.0938 9.35478C21.1232 1.73525 20.3894 0.425644 19.9755 0.220396C19.4412 -0.0444505 19.0814 -0.0663938 18.5632 0.134186ZM31.9366 0.205456C31.2629 0.414283 30.7354 1.28149 30.9 1.90984C31.1079 2.70407 31.6453 3.04532 32.8804 3.16685C36.541 3.52755 39.2332 6.05059 39.6921 9.55085C39.9349 11.4014 39.0474 13.7325 37.556 15.1624C36.6409 16.0397 36.0044 16.4121 34.4945 16.9538C33.2021 17.4173 32.7783 18.3014 33.38 19.278C33.665 19.7406 34.2134 20.0544 34.7366 20.0544C35.3303 20.0544 37.2059 19.2756 38.3154 18.5685C39.7519 17.6528 40.8941 16.3986 41.7088 14.8416C42.5708 13.1944 42.8479 12.0658 42.8479 10.2019C42.8479 7.24955 41.9486 5.16829 39.7732 3.08702C38.3724 1.74661 37.2465 1.05026 35.6535 0.539083C34.5351 0.180249 32.5832 0.00503182 31.9366 0.205456ZM53.8408 0.227087C53.4753 0.417085 52.5271 2.11773 48.7688 9.32351C46.2264 14.198 44.1463 18.323 44.1463 18.4904C44.1463 19.2865 44.9354 20.0544 45.7536 20.0544C46.7241 20.0544 46.7821 19.9653 50.7337 12.3993C52.8257 8.39343 54.5723 5.116 54.6148 5.116C54.6573 5.116 56.4039 8.39343 58.4959 12.3993C62.4475 19.9653 62.5055 20.0544 63.476 20.0544C64.2942 20.0544 65.0833 19.2865 65.0833 18.4904C65.0833 18.323 63.0029 14.1973 60.4601 9.32211C56.5095 1.7477 55.767 0.423463 55.3557 0.21946C54.761 -0.0752629 54.4189 -0.0735494 53.8408 0.227087ZM0.869454 17.0966C0.352196 17.2967 0 17.8722 0 18.5175C0 19.1947 0.628923 20.052 2.95099 22.54C10.0452 30.1415 20.269 35.2951 30.8844 36.6207C44.878 38.3684 58.6579 34.0236 68.7483 24.6826C70.7978 22.7852 73.3754 19.9854 73.8233 19.17C74.119 18.6314 74.0429 18.093 73.5998 17.588C73.1326 17.0557 72.4699 16.8606 71.8706 17.0791C71.645 17.1612 70.8384 17.9519 70.0783 18.836C66.2908 23.2415 61.3109 27.0779 56.1932 29.5327C49.4442 32.77 43.2176 34.0749 35.5606 33.8568C31.0748 33.7289 27.4631 33.1341 23.5339 31.8765C15.7187 29.3748 8.53241 24.5701 3.61594 18.5594C2.35631 17.0196 1.81438 16.731 0.869454 17.0966Z" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

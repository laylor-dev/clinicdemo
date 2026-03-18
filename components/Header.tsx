'use client';

import Link from 'next/link';
import { ArrowUpRight, Menu as MenuIcon, Plus, X, ChevronDown, Instagram, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import MagneticButton from './MagneticButton';
import { useLanguage } from '@/i18n/LanguageContext';

const serviceCards = [
  { title: 'Esthetic Dentistry',     href: '/services/esthetic-dentistry',    img: '/assets/tech_cadcam.png' },
  { title: 'Restorative Dentistry',  href: '/services/restorative-dentistry', img: '/assets/tech_ct.png' },
  { title: 'Preventive Care',        href: '/services/preventive-care',       img: '/assets/clinic_lobby.png' },
  { title: 'Beyond the Smile',       href: '/services/beyond-the-smile',      img: '/assets/tech_solea.png' },
];

const menuContainerVariants = {
  open: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const menuItemVariants = {
  closed: { y: 20, opacity: 0 },
  open: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] as any }
  }
};

export default function Header() {
  const { t, language, setLanguage } = useLanguage();

  const translatedServiceCards = [
    { title: t.header.estheticDentistry, href: '/services/esthetic-dentistry', img: '/assets/tech_cadcam.png' },
    { title: t.header.restorativeDentistry, href: '/services/restorative-dentistry', img: '/assets/tech_ct.png' },
    { title: t.header.preventiveCare, href: '/services/preventive-care', img: '/assets/clinic_lobby.png' },
    { title: t.header.beyondSmile, href: '/services/beyond-the-smile', img: '/assets/tech_solea.png' },
  ];

  // ── visibility state ────────────────────────────────────────────────────────
  // Always start visible. Use native scroll listener so it fires immediately.
  const [isHidden,      setIsHidden]      = useState(false);
  const [isScrolled,    setIsScrolled]    = useState(false);
  const [isMenuOpen,    setIsMenuOpen]    = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);

      if (y < 80) {
        // At the very top — always show
        setIsHidden(false);
      } else if (y > lastY.current && y > 80) {
        // Scrolling DOWN past threshold — hide
        setIsHidden(true);
      } else {
        // Scrolling UP — reveal
        setIsHidden(false);
      }
      lastY.current = y;
    };

    // Run once immediately to sync with current scroll position on mount
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── derived colours ──────────────────────────────────────────────────────────
  // Left group sits over the BEIGE panel → use dark text when transparent
  // Right group sits over the DARK video panel → use light text when transparent
  const leftColor  = isMenuOpen ? 'text-[#eae8e8]' : isScrolled ? 'text-navy' : 'text-navy';
  const rightColor = isMenuOpen ? 'text-[#eae8e8]' : isScrolled ? 'text-navy' : 'text-[#eae8e8]';

  return (
    <>
      {/* ── NAV BAR ──────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: isMenuOpen ? 0 : isHidden ? '-100%' : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-[60] transition-colors duration-500 ${
          isMenuOpen  ? 'bg-transparent'
          : isScrolled ? 'bg-[#eae8e8] shadow-sm'
          :              'bg-transparent'
        }`}
      >
        <div
          style={{ paddingTop: '1.2rem', paddingBottom: '1.2rem' }}
          className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between gap-4 lg:gap-8"
        >

          {/* ── LEFT: Logo + Menu + Services ─────────────────────────────── */}
          <div className={`flex items-center gap-4 lg:gap-10 ${leftColor} transition-colors duration-500`}>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0" onClick={() => setIsMenuOpen(false)}>
              <svg width="58" height="30" viewBox="0 0 74 37" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current">
                <path fillRule="evenodd" clipRule="evenodd" d="M18.5632 0.134186C18.3733 0.207789 18.0756 0.465946 17.9015 0.707917C17.2903 1.55785 8.76434 18.1165 8.76434 18.4537C8.76434 19.7309 10.2552 20.4883 11.2672 19.725C11.5634 19.5017 12.9034 17.0963 15.4282 12.2558C17.4766 8.32886 19.1885 5.116 19.2329 5.116C19.2772 5.116 21.0224 8.39266 23.1114 12.3974C27.1047 20.0534 27.1053 20.0544 28.1645 20.0544C28.3822 20.0544 28.7806 19.862 29.05 19.6265C30.0414 18.7606 30.1725 19.1009 25.0938 9.35478C21.1232 1.73525 20.3894 0.425644 19.9755 0.220396C19.4412 -0.0444505 19.0814 -0.0663938 18.5632 0.134186ZM31.9366 0.205456C31.2629 0.414283 30.7354 1.28149 30.9 1.90984C31.1079 2.70407 31.6453 3.04532 32.8804 3.16685C36.541 3.52755 39.2332 6.05059 39.6921 9.55085C39.9349 11.4014 39.0474 13.7325 37.556 15.1624C36.6409 16.0397 36.0044 16.4121 34.4945 16.9538C33.2021 17.4173 32.7783 18.3014 33.38 19.278C33.665 19.7406 34.2134 20.0544 34.7366 20.0544C35.3303 20.0544 37.2059 19.2756 38.3154 18.5685C39.7519 17.6528 40.8941 16.3986 41.7088 14.8416C42.5708 13.1944 42.8479 12.0658 42.8479 10.2019C42.8479 7.24955 41.9486 5.16829 39.7732 3.08702C38.3724 1.74661 37.2465 1.05026 35.6535 0.539083C34.5351 0.180249 32.5832 0.00503182 31.9366 0.205456ZM53.8408 0.227087C53.4753 0.417085 52.5271 2.11773 48.7688 9.32351C46.2264 14.198 44.1463 18.323 44.1463 18.4904C44.1463 19.2865 44.9354 20.0544 45.7536 20.0544C46.7241 20.0544 46.7821 19.9653 50.7337 12.3993C52.8257 8.39343 54.5723 5.116 54.6148 5.116C54.6573 5.116 56.4039 8.39343 58.4959 12.3993C62.4475 19.9653 62.5055 20.0544 63.476 20.0544C64.2942 20.0544 65.0833 19.2865 65.0833 18.4904C65.0833 18.323 63.0029 14.1973 60.4601 9.32211C56.5095 1.7477 55.767 0.423463 55.3557 0.21946C54.761 -0.0752629 54.4189 -0.0735494 53.8408 0.227087ZM0.869454 17.0966C0.352196 17.2967 0 17.8722 0 18.5175C0 19.1947 0.628923 20.052 2.95099 22.54C10.0452 30.1415 20.269 35.2951 30.8844 36.6207C44.878 38.3684 58.6579 34.0236 68.7483 24.6826C70.7978 22.7852 73.3754 19.9854 73.8233 19.17C74.119 18.6314 74.0429 18.093 73.5998 17.588C73.1326 17.0557 72.4699 16.8606 71.8706 17.0791C71.645 17.1612 70.8384 17.9519 70.0783 18.836C66.2908 23.2415 61.3109 27.0779 56.1932 29.5327C49.4442 32.77 43.2176 34.0749 35.5606 33.8568C31.0748 33.7289 27.4631 33.1341 23.5339 31.8765C15.7187 29.3748 8.53241 24.5701 3.61594 18.5594C2.35631 17.0196 1.81438 16.731 0.869454 17.0966Z" />
              </svg>
              <div className="hidden lg:flex flex-col font-sans font-medium text-[15px] leading-[1.25] tracking-tight">
                <span>Aventura</span>
                <span>Dental Arts</span>
              </div>
            </Link>

            {/* Divider */}
            <span className="hidden lg:block w-px h-5 bg-current opacity-20" />

            {/* Menu button */}
            <button
              onClick={() => { setIsMenuOpen(!isMenuOpen); setIsServicesOpen(false); }}
              className="hidden lg:flex items-center gap-2 font-sans text-[17px] font-medium hover:opacity-60 transition-opacity"
            >
              {t.header.menu}
              {isMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>

            {/* Services button */}
            <div
              className="hidden lg:block relative"
              onMouseEnter={() => !isMenuOpen && setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                onClick={() => { setIsServicesOpen(!isServicesOpen); setIsMenuOpen(false); }}
                className="flex items-center gap-1.5 font-sans text-[17px] font-medium hover:opacity-60 transition-opacity"
              >
                {t.header.services}
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* ── RIGHT: Patient Form + Phone + CTA ───────────────────────── */}
          <div className={`hidden lg:flex items-center gap-9 font-sans text-[17px] font-medium ${rightColor} transition-colors duration-500`}>

            <button 
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className="flex items-center gap-1.5 hover:opacity-60 transition-opacity uppercase text-sm font-bold tracking-wider"
            >
              {language === 'en' ? 'FR' : 'EN'}
            </button>

            <a
              href="https://mysecurepractice.com/Truform/d645c1d1-2597-4aea-a274-eb777e61f7a1/Submission/Create"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:opacity-60 transition-opacity"
            >
              {t.header.patientForm} <ArrowUpRight className="w-4 h-4" />
            </a>

            <button className="flex items-center gap-1.5 hover:opacity-60 transition-opacity cursor-pointer">
              <div className="flex flex-col items-end">
                <span className="font-medium">(305) 682-1414</span>
                <span className="text-[13px] opacity-50 -mt-0.5">Aventura</span>
              </div>
              <ChevronDown className="w-4 h-4 opacity-60" />
            </button>

            <Link href="/contact">
              <MagneticButton
                className="flex items-center gap-3 px-6 py-3 rounded-full text-[15px] font-semibold bg-white text-navy hover:bg-[#f0eeeb] transition-colors duration-500"
              >
                {t.header.bookCall} <Plus className="w-4 h-4" />
              </MagneticButton>
            </Link>
          </div>

          {/* Mobile hamburger & lang toggle */}
          <div className="flex items-center gap-4 lg:hidden">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className={`uppercase text-sm font-bold tracking-wider ${leftColor} transition-colors`}
            >
              {language === 'en' ? 'FR' : 'EN'}
            </button>
            <button
              className={`lg:hidden ${leftColor} transition-colors shrink-0`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </motion.header>

      {/* ── FULL-SCREEN MENU OVERLAY ─────────────────────────────────────────── */}
      <AnimatePresence>
        {isMenuOpen && (
            <motion.div
              key="menu-overlay"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 z-[55] bg-[#16161a] text-white flex flex-col lg:flex-row pt-28 pb-12 px-6 lg:px-12 overflow-y-auto"
            >
            {/* Background Asset */}
            <div className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.45]">
              <Image 
                src="/assets/success-bg.webp"
                alt="Menu Background"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#16161a] via-transparent to-[#16161a]" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#16161a] via-transparent to-[#16161a]" />
            </div>
            {/* Left column */}
            <motion.div 
              variants={menuContainerVariants}
              initial="closed"
              animate="open"
              className="flex flex-col justify-end gap-10 lg:w-[30%] lg:h-full"
            >
              <motion.div variants={menuItemVariants} className="flex gap-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                   className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/15 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                   className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/15 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </motion.div>
              <motion.div variants={menuItemVariants} className="flex flex-col border-t border-white/10 pt-6 text-xs uppercase tracking-widest font-semibold text-white w-56">
                <a href="https://mysecurepractice.com/Truform/d645c1d1-2597-4aea-a274-eb777e61f7a1/Submission/Create"
                   target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-between py-4 hover:text-white transition-colors border-b border-white/10 group">
                  {t.header.patientForm} <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <Link href="/faq" onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between py-4 hover:text-white transition-colors border-b border-white/10 group">
                  {t.header.faq} <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right column */}
            <motion.div 
              variants={menuContainerVariants}
              initial="closed"
              animate="open"
              className="flex flex-col gap-10 lg:w-[70%] lg:h-full justify-between mt-10 lg:mt-0"
            >
              <div className="flex flex-col gap-5">
                <motion.h3 variants={menuItemVariants} className="font-serif text-4xl lg:text-7xl tracking-tight text-white mb-2">{t.header.services}:</motion.h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {translatedServiceCards.map((card, i) => (
                    <motion.div key={i} variants={menuItemVariants}>
                      <Link href={card.href} onClick={() => setIsMenuOpen(false)} className="group flex flex-col gap-3">
                        <div className="relative aspect-square overflow-hidden bg-white/5">
                          <Image src={card.img} alt={card.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                        </div>
                        <span className="text-xs font-medium tracking-wide text-white group-hover:text-white transition-colors">{card.title}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 lg:gap-8 mt-6 font-serif tracking-tight leading-none">
                {[[t.header.aboutUs, '/about'], [t.header.laboratory, '/technology'], [t.header.technology, '/technology'], [t.header.contact, '/contact']].map(([label, href]) => (
                  <motion.div key={label} variants={menuItemVariants}>
                    <Link href={href} onClick={() => setIsMenuOpen(false)}
                          className="text-4xl lg:text-[6vw] text-white hover:opacity-100 transition-opacity duration-300">
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SERVICES DROPDOWN ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {isServicesOpen && !isMenuOpen && (
          <motion.div
            key="services-pill"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed top-[68px] left-1/2 -translate-x-1/2 z-[55] bg-[#ebebeb] text-navy rounded-[2rem] p-8 shadow-2xl w-[90vw] max-w-3xl"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-sans text-sm font-medium flex items-center gap-2 text-navy/60">
                {t.header.services}
                <button onClick={() => setIsServicesOpen(false)}>
                  <X className="w-3 h-3 cursor-pointer hover:text-navy transition-colors" />
                </button>
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {translatedServiceCards.map((card, i) => (
                <Link key={i} href={card.href} onClick={() => setIsServicesOpen(false)} className="group flex flex-col gap-3">
                  <div className="relative aspect-square overflow-hidden bg-black/5 rounded-xl">
                    <Image src={card.img} alt={card.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  </div>
                  <span className="text-xs font-medium tracking-wide text-navy/60 group-hover:text-navy transition-colors">{card.title}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

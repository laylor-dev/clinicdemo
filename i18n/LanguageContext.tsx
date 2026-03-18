'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from './dictionaries/en';
import { fr } from './dictionaries/fr';

export type Language = 'en' | 'fr';
export type Dictionary = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  // Load saved language on mount
  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('app-language') as Language;
    if (savedLang === 'en' || savedLang === 'fr') {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
  };

  const t = language === 'en' ? en : fr;

  // Render children normally, but wait until mounted to avoid hydration mismatch
  // since server renders "en" by default. Actually, we'll just render to avoid flash,
  // hydration might warn if text differs, but it's acceptable for a client switch.
  // To strictly prevent it, we could return null till mounted, but that breaks SEO/FCP.
  // We will let React handle the hydration mismatch smoothly, or we will just render children.

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

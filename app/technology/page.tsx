'use client';

import PageHero from '@/components/PageHero';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function TechnologyPage() {
  const { t } = useLanguage();

  return (
    <main className="bg-beige min-h-screen">
      <Header />
      
      <PageHero
        title={
          <>
            {t.technologyPage.heroTitle1} <br /> <span className="italic">{t.technologyPage.heroTitle2}</span>
          </>
        }
        subtitle={t.technologyPage.heroSubtitle}
        imageSrc="/assets/tech_cadcam.png"
        imageAlt={t.technologyPage.heroImageAlt}
      />

      {/* Intro section */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 max-w-[1440px] mx-auto text-center">
        <p className="font-sans text-navy/40 uppercase tracking-[0.3em] text-xs mb-12">{t.technologyPage.standardLabel}</p>
        <h2 className="font-serif text-4xl lg:text-7xl text-navy leading-[1.1] max-w-4xl mx-auto mb-16">
          {t.technologyPage.introTitle1} <em className="italic">{t.technologyPage.introTitle2}</em> {t.technologyPage.introTitle3}
        </h2>
        <p className="font-sans text-lg lg:text-xl text-navy/70 leading-relaxed max-w-2xl mx-auto">
          {t.technologyPage.introDesc}
        </p>
      </section>

      {/* Technology Cards Grid */}
      <section className="bg-white/40 py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {t.technologyPage.technologies.map((tech: any) => {
              // Map local image paths based on the technology ID
              const imageMap: Record<string, string> = {
                itero: '/assets/tech_cadcam.png',
                solea: '/assets/tech_solea.png',
                camera: '/assets/clinic_lobby.png',
                imaging: '/assets/tech_ct.png',
                cadcam: '/assets/tech_cadcam.png',
                scan: '/assets/tech_ct.png'
              };
              
              return (
                <div key={tech.id} className="group">
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-8 shadow-2xl">
                    <Image 
                      src={imageMap[tech.id] || '/assets/clinic_lobby.png'}
                      alt={tech.title}
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-navy/20" />
                  </div>
                  <h3 className="font-serif text-3xl text-navy mb-4 tracking-tight">{tech.title}</h3>
                  <p className="font-sans text-navy/70 leading-relaxed mb-6">{tech.description}</p>
                  <div className="w-12 h-[1px] bg-navy/20 group-hover:w-full transition-all duration-700" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* xVM Labs Section */}
      <section className="bg-navy py-24 lg:py-40 text-beige px-6 lg:px-12 overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <p className="font-sans text-beige/40 uppercase tracking-[0.3em] text-xs mb-12">{t.technologyPage.labLabel}</p>
            <h2 className="font-serif text-5xl lg:text-8xl leading-[0.9] tracking-tight mb-12">
              {t.technologyPage.labTitle1} <br /> <em className="italic text-gold">{t.technologyPage.labTitle2}</em>
            </h2>
            <div className="space-y-8 font-sans text-lg lg:text-xl text-beige/80 leading-relaxed">
              <p>{t.technologyPage.labDesc1}</p>
              <p>{t.technologyPage.labDesc2}</p>
            </div>
            <Link href="/contact" className="inline-flex mt-16 items-center gap-3 px-8 py-4 rounded-full bg-gold text-navy hover:bg-white transition-colors font-sans text-sm font-bold">
              {t.technologyPage.labCTA}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl skew-y-2 lg:-rotate-3">
             <Image 
                src="/assets/founder_portrait.png" 
                alt={t.technologyPage.labImageAlt}
                fill
                className="object-cover opacity-80"
             />
             <div className="absolute inset-0 bg-gold/5" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

'use client';

import PageHero from '@/components/PageHero';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/i18n/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="bg-beige min-h-screen">
      <Header />
      
      <PageHero
        title={
          <>
            {t.aboutPage.heroTitle1} <span className="italic">{t.aboutPage.heroTitle2}</span>
          </>
        }
        subtitle={t.aboutPage.heroSubtitle}
        imageSrc="/assets/founder_portrait.png"
        imageAlt="Dr. Larry Grillo in his clinic"
      />

      {/* Marquee Divider */}
      <div className="w-full bg-navy py-6 overflow-hidden flex items-center">
        <div className="flex whitespace-nowrap animate-marquee text-beige/40 font-serif italic tracking-widest text-xl uppercase">
          {Array(10).fill(t.aboutPage.marqueeText).map((text, i) => (
            <span key={i} className="mx-8">{text}</span>
          ))}
        </div>
      </div>

      {/* Founder Section */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl w-full max-w-[500px] mx-auto lg:my-0">
            <Image
              src="/assets/dental_team.png"
              alt="The Aventura Dental Arts Team"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="font-serif text-5xl lg:text-7xl text-navy mb-4 tracking-tight">
              Dr. Larry <em className="italic">Grillo</em>
            </h2>
            <p className="font-sans text-navy/40 font-bold uppercase tracking-[0.2em] text-sm mb-12">
              {t.aboutPage.founderRole}
            </p>

            <div className="space-y-8 font-sans text-lg lg:text-xl text-navy/80 leading-relaxed font-medium">
              <p>{t.aboutPage.founderBio1}</p>
              <p>{t.aboutPage.founderBio2}</p>
              <p className="italic font-serif text-2xl text-navy pt-4">
                {t.aboutPage.founderQuote}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-navy py-24 lg:py-48 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto text-center">
          <p className="font-sans text-beige/50 uppercase tracking-[0.3em] text-xs mb-12">{t.aboutPage.philosophyLabel}</p>
          <h2 className="font-serif text-4xl lg:text-7xl text-beige leading-[1.1] max-w-5xl mx-auto mb-24">
            {t.aboutPage.philosophyTitle.split('science').map((part, i) =>
              i === 0 ? (
                <span key={i}>{part}<em className="italic text-gold">science</em></span>
              ) : (
                <span key={i}>{part.replace('artist.', '')}<em className="italic text-gold">artist.</em></span>
              )
            )}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 text-left">
            {t.aboutPage.pillars.map((pillar: any) => (
              <div key={pillar.number} className="space-y-6">
                <span className="font-serif text-4xl text-gold/60">{pillar.number}</span>
                <h3 className="font-serif text-2xl text-beige">{pillar.title}</h3>
                <p className="font-sans text-beige/70 leading-relaxed">{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

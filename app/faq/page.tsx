'use client';

import PageHero from '@/components/PageHero';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/i18n/LanguageContext';

export default function FAQPage() {
  const { t } = useLanguage();

  return (
    <main className="bg-beige min-h-screen">
      <Header />
      
      <PageHero
        title={
           <>
            {t.faqPage.heroTitle1} <span className="italic">{t.faqPage.heroTitle2}</span>
          </>
        }
        subtitle={t.faqPage.heroSubtitle}
        imageSrc="/assets/founder_portrait.png"
        imageAlt="ADA Dental Arts Clinic"
      />

      {/* FAQ List */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 max-w-[1440px] mx-auto min-h-[50vh]">
        <div className="max-w-3xl mx-auto divide-y divide-navy/10">
          {t.faqPage.faqs.map((faq: any, i: number) => (
            <div key={i} className="py-12 group">
              <h3 className="font-serif text-3xl lg:text-4xl text-navy tracking-tight leading-tight mb-8 transition-colors group-hover:text-gold">
                {faq.question}
              </h3>
              <p className="font-sans text-lg lg:text-xl text-navy/70 leading-relaxed font-medium">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

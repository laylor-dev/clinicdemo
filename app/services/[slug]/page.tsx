'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';
import { useLanguage } from '@/i18n/LanguageContext';

const heroImages: Record<string, string> = {
  'esthetic-dentistry': '/assets/tech_cadcam.png',
  'restorative-dentistry': '/assets/tech_ct.png',
  'preventive-care': '/assets/clinic_lobby.png',
  'beyond-the-smile': '/assets/tech_solea.png',
};

export default function ServicePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { t } = useLanguage();

  const services = t.servicesPage.services as Record<string, any>;
  const service = services[slug];

  if (!service) {
    notFound();
  }

  const heroImage = heroImages[slug] ?? '/assets/tech_cadcam.png';

  return (
    <main className="bg-beige min-h-screen">
      <Header />

      <PageHero
        title={
          <>
            {service.title.split(' ')[0]} <span className="italic">{service.title.split(' ').slice(1).join(' ')}</span>
          </>
        }
        subtitle={service.tagline}
        imageSrc={heroImage}
        imageAlt={service.title}
      />

      {/* Intro Description */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 max-w-[1440px] mx-auto text-center">
         <p className="font-sans text-navy/40 uppercase tracking-[0.3em] text-xs mb-12">{t.servicesPage.clinicalExcellence}</p>
         <h2 className="font-serif text-4xl lg:text-7xl text-navy leading-[1.1] max-w-4xl mx-auto mb-16">
           {service.tagline}
         </h2>
         <p className="font-sans text-lg lg:text-xl text-navy/70 leading-relaxed max-w-2xl mx-auto">
           {service.desc}
         </p>
      </section>

      {/* Procedures List */}
      <section className="bg-navy py-24 lg:py-40 text-beige px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <p className="font-sans text-beige/40 uppercase tracking-[0.3em] text-xs mb-16 text-center">{t.servicesPage.treatmentOptions}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            {service.procedures.map((proc: any, i: number) => (
              <div key={i} className="bg-navy p-12 lg:p-16 flex flex-col gap-6 group hover:bg-white/5 transition-all duration-500">
                <span className="font-serif text-3xl text-gold/40">0{i + 1}</span>
                <h3 className="font-serif text-3xl lg:text-4xl text-beige tracking-tight group-hover:text-gold transition-colors duration-300">
                  {proc.name}
                </h3>
                <p className="font-sans text-lg text-beige/60 leading-relaxed font-medium">
                  {proc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 text-center max-w-[1440px] mx-auto">
        <h2 className="font-serif text-4xl lg:text-7xl text-navy tracking-tight leading-tight mb-12">
          {t.servicesPage.ctaTitle1} <br /> <em className="italic">{t.servicesPage.ctaTitle2}</em>
        </h2>
        <Link 
          href="/contact" 
          className="inline-flex items-center gap-3 px-12 py-5 rounded-full bg-navy text-beige hover:bg-gold hover:text-navy transition-all duration-500 font-sans font-bold text-sm uppercase tracking-widest shadow-xl"
        >
          {t.servicesPage.bookConsultation}
          <ArrowUpRight className="w-5 h-5" />
        </Link>
      </section>

      <Footer />
    </main>
  );
}

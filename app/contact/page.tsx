'use client';

import PageHero from '@/components/PageHero';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowUpRight, Phone, MapPin, Mail, Clock } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const locationData = [
  {
    name: 'Aventura',
    phone: '(305) 682-1414',
    address: '18851 NE 29th Avenue Suite 301',
    city: 'Aventura, FL 33180',
    mapUrl: 'https://maps.google.com/?q=18851+NE+29th+Avenue+Suite+301+Aventura+FL+33180'
  },
  {
    name: 'Bay Harbor Islands',
    phone: '(305) 864-1656',
    address: '1031 Kane Concourse',
    city: 'Bay Harbor Islands, FL 33154',
    mapUrl: 'https://maps.google.com/?q=1031+Kane+Concourse+Bay+Harbor+Islands+FL+33154'
  },
  {
    name: 'Coral Gables',
    phone: '(305) 668-1811',
    address: '6705 S Red Rd Suite 614',
    city: 'Coral Gables, FL 33143',
    mapUrl: 'https://maps.google.com/?q=6705+S+Red+Rd+Suite+614+Coral+Gables+FL+33143'
  },
];

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <main className="bg-beige min-h-screen">
      <Header />
      
      <PageHero
        title={
          <>
            {t.contactPage.heroTitle1} <span className="italic">{t.contactPage.heroTitle2}</span>
          </>
        }
        subtitle={t.contactPage.heroSubtitle}
        imageSrc="/assets/success-bg.webp"
        imageAlt="Aventura Dental Arts Clinic Interior"
      />

      {/* Locations Grid */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {locationData.map((loc) => (
            <div key={loc.name} className="flex flex-col h-full bg-white/40 p-10 lg:p-12 rounded-3xl shadow-xl transition-transform hover:-translate-y-2 duration-500">
              <h3 className="font-serif text-3xl lg:text-4xl text-navy mb-8 tracking-tight border-b border-navy/10 pb-6">
                {loc.name}
              </h3>
              
              <div className="space-y-6 flex-1">
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center text-navy/40 group-hover:bg-navy group-hover:text-beige transition-colors duration-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <p className="font-sans text-navy/80 leading-snug pt-1">
                    {loc.address}<br />
                    <span className="font-bold">{loc.city}</span>
                  </p>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center text-navy/40 group-hover:bg-navy group-hover:text-beige transition-colors duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <a href={`tel:${loc.phone}`} className="font-sans font-bold text-navy hover:text-gold transition-colors">
                    {loc.phone}
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center text-navy/40">
                    <Clock className="w-5 h-5" />
                  </div>
                  <p className="font-sans text-sm text-navy/60 uppercase tracking-widest">{t.contactPage.hours}</p>
                </div>
              </div>

              <Link 
                href={loc.mapUrl}
                target="_blank"
                className="mt-12 flex items-center justify-center gap-2 w-full py-4 rounded-full border border-navy/20 text-navy font-sans text-xs font-bold uppercase tracking-widest hover:bg-navy hover:text-beige transition-all duration-500"
              >
                {t.contactPage.viewOnMap} <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Appointment Form */}
      <section className="bg-navy py-24 lg:py-48 px-6 lg:px-12 text-beige">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          <div>
            <p className="font-sans text-beige/40 uppercase tracking-[0.3em] text-xs mb-12">{t.contactPage.reservations}</p>
            <h2 className="font-serif text-5xl lg:text-7xl leading-tight tracking-tight mb-8">
              {t.contactPage.requestConsult} <em className="italic text-gold">{t.contactPage.consultation}</em>
            </h2>
            <p className="font-sans text-lg lg:text-xl text-beige/70 leading-relaxed mb-12 max-w-lg">
              {t.contactPage.consultDesc}
            </p>
            
            <div className="flex items-center gap-6 p-8 rounded-3xl bg-white/5 border border-white/10 w-fit">
              <Mail className="w-8 h-8 text-gold" />
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-beige/30 mb-1">{t.contactPage.directEmail}</p>
                <a href="mailto:info@aventuradentalarts.com" className="font-serif text-2xl text-beige hover:text-gold transition-colors">
                   info@aventuradentalarts.com
                </a>
              </div>
            </div>
          </div>

          <form className="bg-white/5 p-12 lg:p-16 rounded-[2rem] border border-white/10 backdrop-blur-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-sans text-[10px] uppercase tracking-widest text-beige/40 ml-2">{t.contactPage.form.fullName}</label>
                <input type="text" placeholder={t.contactPage.form.namePlaceholder} className="w-full bg-navy/40 border border-white/10 rounded-xl px-6 py-4 font-sans text-beige placeholder:text-beige/10 focus:border-gold outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="font-sans text-[10px] uppercase tracking-widest text-beige/40 ml-2">{t.contactPage.form.phone}</label>
                <input type="tel" placeholder={t.contactPage.form.phonePlaceholder} className="w-full bg-navy/40 border border-white/10 rounded-xl px-6 py-4 font-sans text-beige placeholder:text-beige/10 focus:border-gold outline-none transition-all" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="font-sans text-[10px] uppercase tracking-widest text-beige/40 ml-2">{t.contactPage.form.inquiryType}</label>
              <select className="w-full bg-navy/40 border border-white/10 rounded-xl px-6 py-4 font-sans text-beige outline-none focus:border-gold appearance-none cursor-pointer">
                {t.contactPage.form.inquiryOptions.map((opt: string, i: number) => (
                  <option key={i} className="bg-navy">{opt}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-sans text-[10px] uppercase tracking-widest text-beige/40 ml-2">{t.contactPage.form.message}</label>
              <textarea rows={4} placeholder={t.contactPage.form.messagePlaceholder} className="w-full bg-navy/40 border border-white/10 rounded-xl px-6 py-4 font-sans text-beige placeholder:text-beige/10 focus:border-gold outline-none transition-all resize-none" />
            </div>

            <button type="submit" className="w-full py-5 rounded-full bg-gold text-navy font-sans font-bold text-sm uppercase tracking-widest hover:bg-white transition-all duration-500 flex items-center justify-center gap-3">
              {t.contactPage.form.submit} <ArrowUpRight className="w-4 h-4" />
            </button>
          </form>

        </div>
      </section>

      <Footer />
    </main>
  );
}

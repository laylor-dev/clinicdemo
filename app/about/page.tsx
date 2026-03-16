import PageHero from '@/components/PageHero';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About Us | Aventura Dental Arts',
  description: 'Excellence in dentistry, guided by experience and care. Meet Dr. Larry Grillo and the team at Aventura Dental Arts.',
};

export default function AboutPage() {
  return (
    <main className="bg-beige min-h-screen">
      <Header />
      
      <PageHero
        title={
          <>
            Excellence <span className="italic">in dentistry.</span>
          </>
        }
        subtitle="Guided by decades of experience, precision technology, and an unwavering commitment to personalized care."
        imageSrc="/assets/founder_portrait.png"
        imageAlt="Dr. Larry Grillo in his clinic"
      />

      {/* Marquee Divider */}
      <div className="w-full bg-navy py-6 overflow-hidden flex items-center">
        <div className="flex whitespace-nowrap animate-marquee text-beige/40 font-serif italic tracking-widest text-xl uppercase">
          {Array(10).fill('EXPERTISE • EXCELLENCE • ARTISTRY • ').map((text, i) => (
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
              Founder & Master Ceramist
            </p>

            <div className="space-y-8 font-sans text-lg lg:text-xl text-navy/80 leading-relaxed font-medium">
              <p>
                Dr. Larry Grillo has dedicated his career to the pursuit of dental perfection. 
                Focusing on complex reconstructive cases and high-end esthetic smile design, he 
                developed Aventura Dental Arts into a premier destination for transformative care.
              </p>
              <p>
                A pioneer in marrying digital technology with traditional ceramic craftsmanship, 
                Dr. Grillo treats the mouth as an architectural canvas—ensuring that structural integrity 
                and breathtaking aesthetics go hand-in-hand.
              </p>
              <p className="italic font-serif text-2xl text-navy pt-4">
                "Our philosophy is simple: we never compromise. Every millimeter matters, and 
                every patient deserves the absolute best version of their smile."
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-navy py-24 lg:py-48 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto text-center">
          <p className="font-sans text-beige/50 uppercase tracking-[0.3em] text-xs mb-12">Our Philosophy</p>
          <h2 className="font-serif text-4xl lg:text-7xl text-beige leading-[1.1] max-w-5xl mx-auto mb-24">
            Where advanced <em className="italic text-gold">science</em> meets the hand of an <em className="italic text-gold">artist.</em>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 text-left">
            <div className="space-y-6">
              <span className="font-serif text-4xl text-gold/60">01</span>
              <h3 className="font-serif text-2xl text-beige">Bespoke Design</h3>
              <p className="font-sans text-beige/70 leading-relaxed">No two smiles are the same. We take a customized approach to every treatment plan, ensuring your results are as unique as you are.</p>
            </div>
            <div className="space-y-6">
              <span className="font-serif text-4xl text-gold/60">02</span>
              <h3 className="font-serif text-2xl text-beige">Precision Tech</h3>
              <p className="font-sans text-beige/70 leading-relaxed">By leveraging the world's most advanced digital imaging and CAD/CAM blocks, we achieve fits and finishes that were once thought impossible.</p>
            </div>
            <div className="space-y-6">
              <span className="font-serif text-4xl text-gold/60">03</span>
              <h3 className="font-serif text-2xl text-beige">Human Connection</h3>
              <p className="font-sans text-beige/70 leading-relaxed">Beyond the technology, we are a family-oriented practice that values the long-term relationships we build with our patients.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

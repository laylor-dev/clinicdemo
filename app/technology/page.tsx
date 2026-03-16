import PageHero from '@/components/PageHero';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export const metadata = {
  title: 'Advanced Technology | Aventura Dental Arts',
  description: 'Discover how we use state-of-the-art technology to deliver faster, more precise, and more beautiful dental results.',
};

const technologies = [
  {
    id: 'itero',
    title: 'iTero Digital Impressions',
    description: 'We capture a high-resolution 3D digital model of your teeth in minutes. No messy impressions, just perfect precision.',
    image: '/assets/tech_cadcam.png'
  },
  {
    id: 'solea',
    title: 'Solea Laser',
    description: 'The world\'s first CO2 dental laser that enables anesthesia-free, blood-free, and pain-free procedures for both hard and soft tissue.',
    image: '/assets/tech_solea.png'
  },
  {
    id: 'camera',
    title: 'Intra Oral Camera',
    description: 'See what we see. We use ultra-small cameras to project high-definition images of your mouth, so you can participate in your care.',
    image: '/assets/clinic_lobby.png'
  },
  {
    id: 'imaging',
    title: 'Digital Imaging',
    description: 'High-speed digital X-rays that use 90% less radiation than traditional films, while providing instant, crystal-clear diagnostic data.',
    image: '/assets/tech_ct.png'
  },
  {
    id: 'cadcam',
    title: 'CAD/CAM Restorations',
    description: 'Digital design and precision milling for ceramic crowns and veneers that can sometimes be completed in just one visit.',
    image: '/assets/tech_cadcam.png'
  },
  {
    id: 'scan',
    title: '3D CAT Scan',
    description: 'Cone Beam CT technology provides a comprehensive 3D view of your jaw and bone structure, essential for safe implant surgery.',
    image: '/assets/tech_ct.png'
  }
];

export default function TechnologyPage() {
  return (
    <main className="bg-beige min-h-screen">
      <Header />
      
      <PageHero
        title={
          <>
            Precision <br /> <span className="italic">redefined.</span>
          </>
        }
        subtitle="Advanced technology integrated into every step of our process for faster healing and breathtaking results."
        imageSrc="/assets/tech_cadcam.png"
        imageAlt="CAD/CAM Dental Milling Unit"
      />

      {/* Intro section */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 max-w-[1440px] mx-auto text-center">
        <p className="font-sans text-navy/40 uppercase tracking-[0.3em] text-xs mb-12">The ADA Standard</p>
        <h2 className="font-serif text-4xl lg:text-7xl text-navy leading-[1.1] max-w-4xl mx-auto mb-16">
          Innovation at the <em className="italic">Intersection</em> of Art and Science.
        </h2>
        <p className="font-sans text-lg lg:text-xl text-navy/70 leading-relaxed max-w-2xl mx-auto">
          We invest relentlessly in the world's most advanced dental technologies. Not for the sake of novelty, but to ensure that our patients experience the absolute limit of what modern dentistry can achieve.
        </p>
      </section>

      {/* Technology Cards Grid */}
      <section className="bg-white/40 py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {technologies.map((tech) => (
              <div key={tech.id} className="group">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-8 shadow-2xl">
                  <Image 
                    src={tech.image}
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
            ))}
          </div>
        </div>
      </section>

      {/* xVM Labs Section */}
      <section className="bg-navy py-24 lg:py-40 text-beige px-6 lg:px-12 overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <p className="font-sans text-beige/40 uppercase tracking-[0.3em] text-xs mb-12">In-House Artistry</p>
            <h2 className="font-serif text-5xl lg:text-8xl leading-[0.9] tracking-tight mb-12">
              ADA <br /> <em className="italic text-gold">xVM Labs</em>
            </h2>
            <div className="space-y-8 font-sans text-lg lg:text-xl text-beige/80 leading-relaxed">
              <p>
                Aventura Dental Arts is home to our very own boutique dental laboratory. This direct collaboration between our doctors and master ceramists allows for a level of customization impossible in traditional setups.
              </p>
              <p>
                Every crown, veneer, and restoration is hand-finished on-site, ensuring the shade, translucency, and texture perfectly match your natural teeth.
              </p>
            </div>
            <Link href="/contact" className="inline-flex mt-16 items-center gap-3 px-8 py-4 rounded-full bg-gold text-navy hover:bg-white transition-colors font-sans text-sm font-bold">
              Experience the Lab Standard
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl skew-y-2 lg:-rotate-3">
             <Image 
                src="/assets/founder_portrait.png" 
                alt="ADA Laboratory Master Cerami"
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

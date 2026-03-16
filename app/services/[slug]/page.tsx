import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { notFound } from 'next/navigation';

const servicesData = {
  'esthetic-dentistry': {
    title: 'Esthetic Dentistry',
    tagline: 'Designing Smiles That Tell Your Story',
    desc: 'Our esthetic dentistry treatments are designed to enhance the natural beauty of your smile through the most advanced cosmetic techniques available — all guided by decades of artistry and clinical excellence.',
    heroImage: '/assets/tech_cadcam.png',
    procedures: [
      { name: 'Porcelain Veneers', desc: 'Ultra-thin porcelain shells bonded to the front of teeth, masking imperfections and reshaping your smile in just two visits.' },
      { name: 'Teeth Whitening', desc: 'Professional-grade whitening that goes beyond over-the-counter results, delivering dramatically brighter teeth safely.' },
      { name: 'Smile Makeover', desc: 'A comprehensive plan combining multiple cosmetic procedures to achieve the complete smile transformation you envision.' },
      { name: 'Composite Bonding', desc: 'A quick and affordable way to repair chips, cracks, or gaps using tooth-colored resin sculpted directly on the teeth.' },
    ],
  },
  'restorative-dentistry': {
    title: 'Restorative Dentistry',
    tagline: 'Rebuilding Function, Restoring Confidence',
    desc: 'We restore damaged, decayed, or missing teeth using the most natural-looking and long-lasting materials — because a healthy mouth is the foundation of a beautiful smile.',
    heroImage: '/assets/tech_ct.png',
    procedures: [
      { name: 'Dental Implants', desc: 'The gold standard for tooth replacement, implants are titanium posts fused to the jaw that support realistic, permanent crowns.' },
      { name: 'Porcelain Crowns', desc: 'Custom-fabricated crowns designed to match your surrounding teeth perfectly in color, shape, and bite.' },
      { name: 'Full-Arch Restoration', desc: 'For patients missing all teeth, we offer implant-supported full arches that look, feel, and function like natural teeth.' },
      { name: 'Inlays & Onlays', desc: 'A conservative alternative to full crowns, preserving more natural tooth structure while restoring complete function.' },
    ],
  },
  'preventive-care': {
    title: 'Preventive Care',
    tagline: 'Your Best Smile Starts with Prevention',
    desc: 'Prevention is the most powerful dental tool we have. Our comprehensive preventive care protocols identify issues early and keep your teeth and gums healthy for a lifetime.',
    heroImage: '/assets/clinic_lobby.png',
    procedures: [
      { name: 'Professional Cleanings', desc: 'Thorough cleanings that remove tartar and plaque from areas your toothbrush can\'t reach, performed by our skilled hygienists.' },
      { name: 'Digital X-Rays', desc: 'Low-radiation digital imagery that gives us a complete view of your oral health — including areas invisible to the naked eye.' },
      { name: 'Gum Disease Therapy', desc: 'Early and advanced-stage periodontal treatment to halt gum disease and restore a healthy gum line.' },
      { name: 'Custom Nightguards', desc: 'Protecting your teeth from the damaging effects of nighttime clenching and grinding with precisely fitted guards.' },
    ],
  },
  'beyond-the-smile': {
    title: 'Beyond the Smile',
    tagline: 'Where Dentistry Meets Wellness',
    desc: 'We believe true dental care extends beyond just the teeth. Our comprehensive wellness programs address the full picture of oral and systemic health to help you live better.',
    heroImage: '/assets/tech_solea.png',
    procedures: [
      { name: 'Sleep Apnea Treatment', desc: 'Oral appliances custom-made to keep your airway open during sleep, offering a comfortable CPAP alternative.' },
      { name: 'TMJ/TMD Therapy', desc: 'Relief from jaw pain, headaches, and clicking through targeted treatment plans addressing the root cause of your discomfort.' },
      { name: 'Oral Cancer Screening', desc: 'Routine screenings that detect early signs of oral cancer when treatment is most effective.' },
      { name: 'Botox & Dermal Fillers', desc: 'Facial aesthetics that complement your smile, reducing fine lines and adding natural volume for a rejuvenated appearance.' },
    ],
  },
};

type ServiceKey = keyof typeof servicesData;

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData[slug as ServiceKey];
  if (!service) return {};
  return {
    title: `${service.title} | Aventura Dental Arts`,
    description: service.desc,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData[slug as ServiceKey];

  if (!service) {
    notFound();
  }

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
        imageSrc={service.heroImage}
        imageAlt={service.title}
      />

      {/* Intro Description */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 max-w-[1440px] mx-auto text-center">
         <p className="font-sans text-navy/40 uppercase tracking-[0.3em] text-xs mb-12">Clinical Excellence</p>
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
          <p className="font-sans text-beige/40 uppercase tracking-[0.3em] text-xs mb-16 text-center">Treatment Options</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            {service.procedures.map((proc, i) => (
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
          Ready to experience <br /> <em className="italic">bespoke dental care?</em>
        </h2>
        <Link 
          href="/contact" 
          className="inline-flex items-center gap-3 px-12 py-5 rounded-full bg-navy text-beige hover:bg-gold hover:text-navy transition-all duration-500 font-sans font-bold text-sm uppercase tracking-widest shadow-xl"
        >
          Book a Consultation
          <ArrowUpRight className="w-5 h-5" />
        </Link>
      </section>

      <Footer />
    </main>
  );
}

import PageHero from '@/components/PageHero';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'FAQ | Aventura Dental Arts',
  description: 'Frequently Asked Questions about our dental treatments, technology, and financing options.',
};

const faqs = [
  {
    question: 'How long does a Smile Makeover take?',
    answer: 'A smile makeover is tailored to your specific needs. Some treatments, like teeth whitening or composite bonding, can be completed in a single visit. More comprehensive cases involving porcelain veneers or implants typically take 2-4 weeks from initial design to final placement. Our CAD/CAM technology allows us to provide some restorations in a single day.',
  },
  {
    question: 'Do you offer financing options?',
    answer: 'Absolutely. We believe world-class dental care should be accessible. We accept major credit cards and partner with CareCredit and other financing groups to offer flexible, low-to-no interest monthly payment plans. Our treatment coordinators will help you find the best option during your consultation.',
  },
  {
    question: 'Are your treatments painful?',
    answer: 'Your comfort is our priority. We utilize modern anesthetics, laser dentistry, and minimally invasive techniques to ensure treatments are practically pain-free. We also offer sedation options for patients who experience dental anxiety.',
  },
  {
    question: 'How long do porcelain veneers last?',
    answer: 'With proper care, our custom porcelain veneers can last 15-20 years or longer. They are crafted from highly durable, stain-resistant ceramics. We will provide you with specific oral hygiene instructions and night guards if necessary to protect your investment.',
  },
  {
    question: 'What is a Cone Beam CT (CBCT) scan?',
    answer: 'A CBCT scan creates a highly detailed 3D image of your teeth, soft tissues, nerve pathways, and bone in a single scan. We use this advanced imaging primarily for precise, computer-guided implant placement and complex diagnostics, ensuring safer and more predictable outcomes.',
  },
  {
    question: 'Is your master ceramist in-house?',
    answer: 'Yes. Unlike most practices that send impressions to external labs, our master ceramist works directly alongside our doctors in our state-of-the-art in-house laboratory. This allows for unparalleled quality control, custom shade matching directly with you, and faster turnaround times.',
  },
];

export default function FAQPage() {
  return (
    <main className="bg-beige min-h-screen">
      <Header />
      
      <PageHero
        title={
           <>
            Clinical <span className="italic">Insights.</span>
          </>
        }
        subtitle="Frequently asked questions about our treatments, technology, and commitment to your care."
        imageSrc="https://api.aventuradentalarts.com/uploads/dr_grillo_d7d21c3b7a.webp"
        imageAlt="ADA Dental Arts Clinic"
      />

      {/* FAQ List */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 max-w-[1440px] mx-auto min-h-[50vh]">
        <div className="max-w-3xl mx-auto divide-y divide-navy/10">
          {faqs.map((faq, i) => (
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

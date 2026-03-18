import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

// Below-fold components: lazy-loaded to free main thread during Hero animation
const CinematicScroll = dynamic(() => import('@/components/CinematicScroll'));
const OurGoal         = dynamic(() => import('@/components/OurGoal'));
const Services        = dynamic(() => import('@/components/Services'));
const Technology      = dynamic(() => import('@/components/Technology'));
const Experts         = dynamic(() => import('@/components/Experts'));
const WhyChooseUs     = dynamic(() => import('@/components/WhyChooseUs'));
const Testimonials    = dynamic(() => import('@/components/Testimonials'));
const BringingToLife  = dynamic(() => import('@/components/BringingToLife'));

export default function Home() {
  return (
    <main className="min-h-screen bg-navy selection:bg-gold selection:text-white">
      <Header />
      <Hero />
      <CinematicScroll />
      <OurGoal />
      <Services />
      <Technology />
      <Experts />
      <WhyChooseUs />
      <Testimonials />
      <BringingToLife />
      <Footer />
    </main>
  );
}

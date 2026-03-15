import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CinematicScroll from '@/components/CinematicScroll';
import OurGoal from '@/components/OurGoal';
import Services from '@/components/Services';
import Technology from '@/components/Technology';
import Experts from '@/components/Experts';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

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
      <Footer />
    </main>
  );
}

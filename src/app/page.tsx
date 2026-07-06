import Hero from '@/components/Hero';
import Testimonials from '@/components/Testimonials';
import Suite from '@/components/Suite';
import WhyUs from '@/components/WhyUs';
import HowItWorks from '@/components/HowItWorks';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <Testimonials />
      <Suite />
      <WhyUs />
      <HowItWorks />
      <FAQ />
      <CTA />
    </main>
  );
}

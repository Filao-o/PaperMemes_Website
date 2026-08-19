import Hero from '@/components/Hero';
import Suite from '@/components/Suite';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <Suite />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </main>
  );
}

import Hero from '@/components/Hero';
import Testimonials from '@/components/Testimonials';
import Suite from '@/components/Suite';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <Testimonials />
      <Suite />
      <FAQ />
      <CTA />
    </main>
  );
}

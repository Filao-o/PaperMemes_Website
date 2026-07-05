import Hero from '@/components/Hero';
import Suite from '@/components/Suite';
import HowItWorks from '@/components/HowItWorks';
import WhyUs from '@/components/WhyUs';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <Suite />
      <HowItWorks />
      <WhyUs />
      <Pricing />
      <FAQ />
      <CTA />
    </main>
  );
}

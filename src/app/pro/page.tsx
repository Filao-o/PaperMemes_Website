import type { Metadata } from 'next';
import Pricing from '@/components/Pricing';

export const metadata: Metadata = {
  title: 'Avantage Pro — Papermemes',
  description: "Débloque PaperMemes Pro : journal avancé, replay de trades, classement complet et plus encore.",
};

export default function ProPage() {
  return (
    <main className="pro-page">
      <div className="container">
        <header className="pro-hero">
          <p className="section-tag">PaperMemes Pro</p>
          <h1 className="pro-hero-title">
            Passe à la <span className="text-white-dim">vitesse supérieure</span>
          </h1>
          <p className="pro-hero-desc">
            Le plan Free suffit pour apprendre. Le plan Pro te donne les outils pour progresser plus vite :
            journal avancé, replay de tes trades passés et accès au classement complet.
          </p>
        </header>
      </div>

      <Pricing />
    </main>
  );
}

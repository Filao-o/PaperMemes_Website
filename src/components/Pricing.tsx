'use client';

import { useEffect, useRef } from 'react';

const FREE_FEATURES = [
  'Wallet virtuel en SOL',
  'Prix réels en temps réel',
  'TP / SL automatiques',
  'Rugcheck intégré',
  'Historique filtrable',
];

const PREMIUM_FEATURES = [
  'Journal avancé',
  'Replay de trades passés',
  'Classement complet',
  /* [TODO] Ajouter les features Premium confirmées */
];

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    if (!reveals) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 70);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="section pricing" id="pricing" aria-labelledby="pricing-title" ref={sectionRef}>
      <div className="container">
        <header className="section-header reveal">
          <p className="section-tag">Pricing</p>
          <h2 id="pricing-title" className="section-title">
            Commence gratuitement,{' '}
            <span className="text-white-dim">passe Premium quand tu es prêt</span>
          </h2>
        </header>

        <div className="pricing-grid">
          <div className="pricing-card reveal">
            <div className="pricing-card-header">
              <h3 className="pricing-plan-name">Free</h3>
              <div className="pricing-price">
                <span className="pricing-amount font-mono">0€</span>
                <span className="pricing-period">/ pour toujours</span>
              </div>
            </div>
            <ul className="pricing-features">
              {FREE_FEATURES.map((f, i) => (
                <li key={i}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--c-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <a href="#install" className="btn btn-ghost btn-lg pricing-cta" onClick={e => scrollTo(e, '#install')}>
              Installer gratuitement
            </a>
          </div>

          <div className="pricing-card pricing-card--premium reveal">
            <div className="pricing-card-badge">Populaire</div>
            <div className="pricing-card-header">
              <h3 className="pricing-plan-name">Premium</h3>
              <div className="pricing-price">
                {/* [TODO] Remplacer par le vrai prix une fois validé */}
                <span className="pricing-amount font-mono">[TODO]€</span>
                <span className="pricing-period">/ mois</span>
              </div>
            </div>
            <ul className="pricing-features">
              {FREE_FEATURES.map((f, i) => (
                <li key={`free-${i}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--c-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {f}
                </li>
              ))}
              {PREMIUM_FEATURES.map((f, i) => (
                <li key={`prem-${i}`} className="pricing-feature--premium">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--c-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            {/* [TODO] Remplacer href par le vrai lien d'upgrade */}
            <a href="#install" className="btn btn-primary btn-lg pricing-cta">
              Passer Premium
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

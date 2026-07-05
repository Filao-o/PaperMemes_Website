'use client';

import { useEffect, useRef } from 'react';

const STEPS = [
  {
    n: '1',
    title: "Installe l'extension",
    desc: 'Ajoute Papermemes depuis le Chrome Web Store gratuitement.',
  },
  {
    n: '2',
    title: 'Ouvre une plateforme',
    desc: 'Sélectionnez votre plateforme de trading préférée Solana et configurez vos préférences.',
  },
  {
    n: '3',
    title: 'Commence a trader',
    desc: 'Débutez en simulation avec des fonds virtuels et testez vos stratégies sans risque sur des données de marché réelles.',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>('[data-glow]');
    if (!cards) return;

    const onMove = (e: PointerEvent) => {
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left).toFixed(2);
        const y = (e.clientY - rect.top).toFixed(2);
        const xp = ((e.clientX - rect.left) / rect.width).toFixed(2);
        const yp = ((e.clientY - rect.top) / rect.height).toFixed(2);
        card.style.setProperty('--x', x);
        card.style.setProperty('--y', y);
        card.style.setProperty('--xp', xp);
        card.style.setProperty('--yp', yp);
      });
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);

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

  return (
    <section className="section how" id="how" aria-labelledby="how-title" ref={sectionRef}>
      <div className="container">
        <header className="section-header">
          <h2 id="how-title" className="how-title">Lancé en quelques secondes</h2>
          <p className="how-subtitle">Aucune inscription requise. Installe et commence à trader.</p>
        </header>

        <div className="how-grid">
          {STEPS.map((step, i) => (
            <div key={i} className="how-card reveal" data-glow>
              <div className="how-circle">{step.n}</div>
              <h3 className="how-card-title">{step.title}</h3>
              <p className="how-card-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

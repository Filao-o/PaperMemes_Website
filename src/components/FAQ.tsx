'use client';

import { useEffect, useRef, useState } from 'react';

const ITEMS = [
  {
    q: "C'est quoi le paper trading ?",
    a: "Le paper trading consiste à simuler des trades avec de l'argent fictif sur de vrais prix de marché. Cela permet d'apprendre le trading, de tester des stratégies et de prendre de l'expérience sans risquer un seul euro.",
  },
  {
    q: "Faut-il de l'argent réel pour utiliser Papermemes ?",
    a: "Non, absolument pas. Papermemes est 100% gratuit et ne demande aucun dépôt. Tu reçois un capital fictif dès le lancement. Aucune connexion à un wallet ou exchange n'est nécessaire.",
  },
  {
    q: 'Les prix utilisés sont-ils réels ?',
    a: "Oui. Papermemes utilise des données de prix en temps réel. Tes trades simulés se font au vrai cours du marché, ce qui rend l'entraînement le plus réaliste possible.",
  },
  {
    q: 'Papermemes exécute-t-il de vrais trades ?',
    a: "Non. Jamais. Papermemes est un outil de simulation uniquement. Aucun trade réel n'est exécuté, aucune crypto n'est achetée ou vendue en ton nom.",
  },
  {
    q: "L'extension est-elle gratuite ?",
    a: "Oui, Papermemes est gratuit avec toutes les fonctionnalités essentielles. Un plan Premium est disponible pour débloquer le journal avancé, le replay de trades passés et l'accès au classement complet.",
  },
  {
    q: 'Quelle est la différence entre Free et Premium ?',
    a: "Le plan Free inclut le wallet virtuel, les prix réels, le TP/SL, le rugcheck intégré et l'historique filtrable. Le Premium débloque en plus le journal avancé, le replay de trades passés et l'accès au classement complet. Consulte la section Pricing pour le détail.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title" ref={sectionRef}>
      <div className="container">
        <header className="section-header">
          <p className="section-tag">FAQ</p>
          <h2 id="faq-title" className="section-title">Questions <span className="text-white-dim">fréquentes</span></h2>
        </header>

        <div className="faq-list" role="list">
          {ITEMS.map((item, i) => (
            <div key={i} className={`faq-item reveal${openIndex === i ? ' open' : ''}`} role="listitem">
              <button
                className="faq-question"
                aria-expanded={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {item.q}
                <svg className="faq-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

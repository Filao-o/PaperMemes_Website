'use client';

import { useEffect, useRef } from 'react';

const FEATURES = [
  {
    name: 'Wallet SOL',
    tag: 'Wallet',
    desc: "Un solde virtuel en SOL dès le lancement. Toggle SOL/USD, reset à tout moment — aucun wallet réel requis.",
  },
  {
    name: 'TP / SL',
    tag: 'Exécution',
    desc: "Presets Take Profit et Stop Loss de +10% à +100%. Tes ordres s'exécutent automatiquement au prix cible.",
  },
  {
    name: 'Rugcheck',
    tag: 'Sécurité',
    desc: "Score de risque, top holders et liquidité analysés avant chaque trade. Tu entres avec les yeux ouverts.",
  },
  {
    name: 'Analytics',
    tag: 'Stats',
    desc: "PnL total, win rate, meilleur trade, nombre de positions — toutes tes stats clés en un coup d'œil.",
  },
  {
    name: 'Historique',
    tag: 'Journal',
    desc: "Filtre tes trades par All, Active, Gain ou Loss. Retrouve tes meilleures et pires positions instantanément.",
  },
  {
    name: 'Calendrier',
    tag: 'Performance',
    desc: "Tes gains et pertes jour par jour, en vue hebdo ou mensuelle. Repère tes séquences et tes drawdowns.",
  },
  {
    name: 'Widget',
    tag: 'Interface',
    desc: "Widget détachable en trois blocs : wallet SOL, infos du token, et gestion des positions TP/SL.",
  },
  {
    name: 'Suivi des entrées',
    tag: 'Tracking',
    desc: "Chaque entrée sur une position avec date, heure, SOL investi et SOL retiré. Ta traçabilité complète.",
  },
];

export default function Suite() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    if (!reveals) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 60);
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
    <section className="section suite" id="suite" aria-labelledby="suite-title" ref={sectionRef}>
      <div className="container">
        <header className="section-header">
          <p className="section-tag">Fonctionnalités</p>
          <h2 id="suite-title" className="section-title">
            La suite complète<br /><span className="text-white-dim">de paper trading</span>
          </h2>
          <p className="section-desc">Survole chaque carte pour découvrir la fonctionnalité en détail.</p>
        </header>

        <div className="feat-grid">
          {FEATURES.map((f, i) => (
            <article key={i} className="feat-card reveal">
              <div className="feat-face">
                <h3 className="feat-name">{f.name}</h3>
              </div>
              <span className="feat-tag">{f.tag}</span>
              <div className="feat-desc">
                <p>{f.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="suite-wiki">
          {/* [TODO] Remplacer par le vrai lien du wiki */}
          <a href="#" className="btn btn-ghost btn-lg">
            Voir le wiki
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}

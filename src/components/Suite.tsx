'use client';

import Link from 'next/link';

interface Feature {
  name: string;
  wiki: string;
  desc: string;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
}

const FEATURES: Feature[] = [
  {
    name: 'Wallet SOL',
    wiki: 'wallet',
    desc: "Un solde virtuel en SOL dès le lancement. Toggle SOL/USD, reset à tout moment — aucun wallet réel requis.",
    iconBg: '#dbeafe', iconColor: '#2563eb',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="15" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-4 0v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
        <circle cx="12" cy="12" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'TP / SL',
    wiki: 'tp-sl',
    desc: "Presets Take Profit et Stop Loss de +10 % à +100 %. Tes ordres s'exécutent automatiquement au prix cible.",
    iconBg: '#dcfce7', iconColor: '#16a34a',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="4"/>
        <line x1="12" y1="2" x2="12" y2="4"/>
        <line x1="12" y1="20" x2="12" y2="22"/>
        <line x1="2" y1="12" x2="4" y2="12"/>
        <line x1="20" y1="12" x2="22" y2="12"/>
      </svg>
    ),
  },
  {
    name: 'Rugcheck',
    wiki: 'rugcheck',
    desc: "Score de risque, top holders et liquidité analysés avant chaque trade. Tu entres avec les yeux ouverts.",
    iconBg: '#fee2e2', iconColor: '#dc2626',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
  {
    name: 'Analytics',
    wiki: 'analytics',
    desc: "PnL total, win rate, meilleur trade, nombre de positions — toutes tes stats clés en un coup d'œil.",
    iconBg: '#ede9fe', iconColor: '#7c3aed',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
        <line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
  },
  {
    name: 'Historique',
    wiki: 'historique',
    desc: "Filtre tes trades par All, Active, Gain ou Loss. Retrouve tes meilleures et pires positions instantanément.",
    iconBg: '#fef3c7', iconColor: '#d97706',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    name: 'Calendrier',
    wiki: 'calendrier',
    desc: "Tes gains et pertes jour par jour, en vue hebdo ou mensuelle. Repère tes séquences et tes drawdowns.",
    iconBg: '#cffafe', iconColor: '#0891b2',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    name: 'Widget',
    wiki: 'widget',
    desc: "Widget détachable en trois blocs : wallet SOL, infos du token, et gestion des positions TP/SL.",
    iconBg: '#e0e7ff', iconColor: '#4f46e5',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    name: 'Suivi des entrées',
    wiki: 'suivi',
    desc: "Chaque entrée sur une position avec date, heure, SOL investi et SOL retiré. Ta traçabilité complète.",
    iconBg: '#ffedd5', iconColor: '#ea580c',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"/>
        <line x1="8" y1="12" x2="21" y2="12"/>
        <line x1="8" y1="18" x2="21" y2="18"/>
        <line x1="3" y1="6" x2="3.01" y2="6"/>
        <line x1="3" y1="12" x2="3.01" y2="12"/>
        <line x1="3" y1="18" x2="3.01" y2="18"/>
      </svg>
    ),
  },
];

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="7" y1="17" x2="17" y2="7"/>
    <polyline points="7 7 17 7 17 17"/>
  </svg>
);

export default function Suite() {
  return (
    <section className="suite" id="suite" aria-labelledby="suite-title">
      <div className="container">
        <header className="section-header">
          <p className="section-tag">Fonctionnalités</p>
          <h2 id="suite-title" className="section-title">
            La suite complète<br /><span className="text-white-dim">de paper trading</span>
          </h2>
        </header>

        <div className="feat-grid">
          {FEATURES.map((f, i) => (
            <article key={i} className="feat-card">
              <div className="feat-card-top">
                <span
                  className="feat-icon-wrap"
                  style={{ background: f.iconBg, color: f.iconColor }}
                  aria-hidden="true"
                >
                  {f.icon}
                </span>
                <Link href={`/wiki#${f.wiki}`} className="feat-link-btn" aria-label={`Voir le wiki ${f.name}`}>
                  <ArrowIcon />
                </Link>
              </div>

              <h3 className="feat-name">{f.name}</h3>
              <p className="feat-desc-text">{f.desc}</p>

              <Link href={`/wiki#${f.wiki}`} className="feat-learn-btn">
                Voir le wiki
              </Link>
            </article>
          ))}
        </div>

        <div className="suite-wiki">
          <Link href="/wiki" className="btn btn-ghost btn-lg">
            Voir toutes les fonctionnalités
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';

interface FeatureGroup {
  category: string;
  items: string[];
  highlight?: boolean;
}

const FEATURE_GROUPS: FeatureGroup[] = [
  {
    category: 'Trading',
    items: [
      'Wallet virtuel illimité',
      'Achats / ventes personnalisés',
      'TP / SL automatiques',
      'Conversion en temps réel SOL/USD',
    ],
  },
  {
    category: 'Personnalisation',
    items: [
      'Tracking des positions uniques',
      'UX personnalisable',
    ],
  },
  {
    category: 'Suivi & analyse',
    items: [
      'Dashboard intégré',
      'Historique des trades',
      'Notes de trades',
      'Calendrier de performances',
    ],
  },
];

const PRO_GROUPS: FeatureGroup[] = [
  {
    category: 'Inclus',
    items: [
      'Toutes les fonctionnalités du plan Gratuit',
    ],
  },
  {
    category: 'Fonctionnalités avancées',
    items: [
      'Dashboard Pro',
    ],
    highlight: true,
  },
  {
    category: 'Compétition',
    items: [
      'Tournoi demo mensuel',
      'Cashprize',
      'Leaderboard',
    ],
    highlight: true,
  },
];

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function FeatureList({ groups }: { groups: FeatureGroup[] }) {
  return (
    <div className="pricing-feature-groups">
      {groups.map((group, gi) => (
        <div
          key={gi}
          className={`pricing-feature-group${group.highlight ? ' pricing-feature-group--highlight' : ''}`}
        >
          <p className="pricing-feature-cat">
            {group.category}
            {group.highlight && <span className="pricing-feature-cat-tag">Exclusif Pro</span>}
          </p>
          <ul className="pricing-features">
            {group.items.map((item, i) => (
              <li key={i}>
                <span className="pricing-check"><Check /></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function Pricing() {
  return (
    <section className="pricing-section" id="pricing" aria-labelledby="pricing-title">
      <div className="container">
        <div className="pricing-header">
          <div className="pricing-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
            </svg>
            Tarifs
          </div>
          <h2 id="pricing-title" className="pricing-title">
            Commence gratuitement<span className="pricing-dot">.</span>
          </h2>
          <p className="pricing-sub">
            PaperMemes est 100 % gratuit pour t&apos;entraîner dès aujourd&apos;hui. Le plan Pro arrive bientôt, avec des outils encore plus poussés pour les traders sérieux.
          </p>
        </div>

        <div className="pricing-grid">

          {/* Free */}
          <div className="pricing-card pricing-card--free">
            <div className="pricing-plan-label">Gratuit</div>
            <div className="pricing-price-wrap">
              <span className="pricing-price">0 €</span>
              <span className="pricing-period">/ mois</span>
            </div>
            <p className="pricing-plan-desc">Tout ce qu&apos;il faut pour commencer à s&apos;entraîner.</p>
            <Link href="#install" className="pricing-btn pricing-btn--outline">
              Commencer gratuitement
            </Link>
            <FeatureList groups={FEATURE_GROUPS} />
          </div>

          {/* Pro — coming soon, fully disabled */}
          <div className="pricing-card pricing-card--pro pricing-card--disabled" aria-disabled="true">
            <div className="pricing-soon-badge">Bientôt disponible</div>
            <div className="pricing-plan-label">Pro</div>
            <div className="pricing-price-wrap">
              <span className="pricing-price">9 €</span>
              <span className="pricing-period">/ mois</span>
            </div>
            <p className="pricing-plan-desc">Pour les traders sérieux qui veulent progresser vite.</p>
            <span className="pricing-btn pricing-btn--solid pricing-btn--disabled" aria-hidden="true">
              Bientôt disponible
            </span>
            <FeatureList groups={PRO_GROUPS} />
          </div>

        </div>
      </div>
    </section>
  );
}

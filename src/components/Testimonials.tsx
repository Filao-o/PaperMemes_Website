'use client';

import { useState } from 'react';

const AVATAR_COLORS: Record<string, string> = {
  'LM': '#16a34a', 'DK': '#dc2626', 'SR': '#2563eb', 'NF': '#d97706',
  'EL': '#9333ea', 'KB': '#0891b2', 'TR': '#be185d', 'AV': '#0e7490',
  'MR': '#854d0e', 'JC': '#7c3aed', 'PL': '#047857', 'SC': '#b45309',
};

const Stars = () => (
  <div className="t-stars" aria-label="5 étoiles sur 5">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

function TAvatar({ initials, size = 'md' }: { initials: string; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <span
      className={`t-avatar t-avatar-${size}`}
      style={{ background: AVATAR_COLORS[initials] ?? '#555' }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

interface T {
  id: string;
  initials: string;
  name: string;
  handle: string;
  quote: string;
}

const SLIDES: T[][][] = [
  [
    [
      {
        id: 't1', initials: 'LM', name: 'Lucas M.', handle: '@lucasm_sol',
        quote: "J'ai enfin compris ma gestion du risque sans cramer un seul euro. Le wallet virtuel change tout. Je rejoue les mêmes setups encore et encore jusqu'à ce qu'ils deviennent un réflexe.",
      },
      {
        id: 't2', initials: 'SR', name: 'Sophie R.', handle: '@sophie_trades',
        quote: "Mon win rate simulé est passé de 41 % à 67 % en un mois. La confiance vient de la répétition.",
      },
    ],
    [
      {
        id: 't3', initials: 'DK', name: '0xDegen_K', handle: '@0xdegen_k',
        quote: "Je me suis entraîné 6 semaines avant de passer en réel. Meilleure décision de mon année crypto. Mon premier vrai trade était rentable.",
      },
      {
        id: 't4', initials: 'NF', name: 'Naima F.', handle: '@naima_defi',
        quote: "PaperMemes m'a permis de comprendre les patterns de pump sans risquer mes économies. Indispensable pour tout débutant sérieux.",
      },
    ],
    [
      {
        id: 't5', initials: 'EL', name: 'Emma L.', handle: '@emma_sol',
        quote: "Simple, efficace, gratuit. Que demander de plus ?",
      },
      {
        id: 't6', initials: 'KB', name: 'Kevin B.', handle: '@kb_onchain',
        quote: "Le meilleur outil pour passer du FOMO à une vraie stratégie. J'avais peur de rater des opportunités en attendant. En réalité PaperMemes m'a fait réaliser que je tradais trop souvent. Maintenant je suis patient et mes résultats parlent.",
      },
    ],
  ],
  [
    [
      {
        id: 't7', initials: 'TR', name: 'Thomas R.', handle: '@thomasr_onchain',
        quote: "La gamification aide vraiment. Tu veux battre ton propre record, tu rejoues encore et encore. Sans t'en rendre compte, tu intègres les patterns du marché Solana en profondeur.",
      },
      {
        id: 't8', initials: 'AV', name: 'Alex V.', handle: '@alexv_defi',
        quote: "Parfait pour apprendre sans se brûler les doigts dès le départ.",
      },
    ],
    [
      {
        id: 't9', initials: 'MR', name: 'Maxime R.', handle: '@maxr_crypto',
        quote: "Mon portefeuille virtuel était en +340 % après 6 semaines. J'ai décidé de passer en réel avec une vraie confiance, pas de l'arrogance.",
      },
      {
        id: 't10', initials: 'JC', name: 'Julie C.', handle: '@juliec_sol',
        quote: "Avant PaperMemes je perdais sur chaque trade. Maintenant je comprends la structure du marché, je gère mon risque et j'ai une stratégie claire. C'est le meilleur investissement de temps que j'ai fait.",
      },
    ],
    [
      {
        id: 't11', initials: 'PL', name: 'Pierre L.', handle: '@pierrel_memes',
        quote: "La simulation sur vrais prix change tout. Je comprends enfin pourquoi mes anciens trades échouaient et ce que je dois corriger.",
      },
      {
        id: 't12', initials: 'SC', name: 'Sara C.', handle: '@sarac_web3',
        quote: "Je n'arrivais pas à tenir mes stop-loss. Après 3 semaines sur PaperMemes à simuler des entrées et sorties, ça devient un réflexe. Je ne rate plus mes exits.",
      },
    ],
  ],
];

const STACK = ['LM', 'SR', 'NF', 'DK', 'EL', 'KB'];
const CLAMP = 130;

function TModal({ t, onClose }: { t: T; onClose: () => void }) {
  return (
    <div
      className="tbento-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Avis de ${t.name}`}
    >
      <div className="tbento-modal" onClick={e => e.stopPropagation()}>
        <button className="tbento-modal-close" onClick={onClose} aria-label="Fermer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="tbento-modal-head">
          <TAvatar initials={t.initials} size="lg" />
          <div>
            <p className="tbento-modal-name">{t.name}</p>
            <p className="tbento-modal-handle">{t.handle}</p>
          </div>
        </div>
        <Stars />
        <p className="tbento-modal-quote">{t.quote}</p>
      </div>
    </div>
  );
}

function TCard({ t }: { t: T }) {
  const [open, setOpen] = useState(false);
  const isLong = t.quote.length > CLAMP;
  const displayed = isLong ? t.quote.slice(0, CLAMP).trimEnd() + '…' : t.quote;

  return (
    <>
      <div className="tbento-tcard">
        <div className="tbento-tcard-head">
          <TAvatar initials={t.initials} size="md" />
          <div>
            <p className="tbento-tcard-name">{t.name}</p>
            <p className="tbento-tcard-handle">{t.handle}</p>
          </div>
        </div>
        <Stars />
        <p className="tbento-tcard-quote">{displayed}</p>
        {isLong && (
          <button className="tbento-read-more" onClick={() => setOpen(true)}>
            Lire la suite
          </button>
        )}
      </div>
      {open && <TModal t={t} onClose={() => setOpen(false)} />}
    </>
  );
}

function TCol({ pair }: { pair: [T, T] }) {
  return (
    <div className="tbento-col">
      {pair.map(t => <TCard key={t.id} t={t} />)}
    </div>
  );
}

export default function Testimonials() {
  const [slide, setSlide] = useState(0);
  const total = SLIDES.length;

  return (
    <section className="testimonials-section" id="avis" aria-label="Témoignages">
      <div className="tbento-container">

        <div className="tbento-header">
          <div className="tbento-header-left">
            <div className="tbento-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
              </svg>
              Testimonials
            </div>
            <h2 className="tbento-title">Expériences<span className="tbento-dot">.</span></h2>
          </div>
          <div className="tbento-nav" aria-label="Navigation avis">
            <button
              className="tbento-nav-btn"
              onClick={() => setSlide(s => Math.max(0, s - 1))}
              disabled={slide === 0}
              aria-label="Avis précédents"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <span className="tbento-nav-count">{slide + 1} / {total}</span>
            <button
              className="tbento-nav-btn"
              onClick={() => setSlide(s => Math.min(total - 1, s + 1))}
              disabled={slide === total - 1}
              aria-label="Avis suivants"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="tbento">
          <div className="tbento-card tbento-stat">
            <div className="tbento-rating-wrap">
              <span className="tbento-rating-num">4.8</span>
              <span className="tbento-rating-denom">/5</span>
            </div>
            <p className="tbento-stat-desc">
              Des traders qui progressent grâce à la simulation sur de <strong>vrais prix</strong> de marché Solana — sans jamais avoir risqué le moindre euro avant d&apos;être vraiment prêts.
            </p>
            <div className="tbento-brand">PaperMemes</div>
            <div className="tbento-stack-wrap">
              {STACK.map(i => <TAvatar key={i} initials={i} size="sm" />)}
              <span className="tbento-stack-count">+2k</span>
            </div>
            <p className="tbento-trusted">Trusted by traders worldwide</p>
            <a href="#install" className="tbento-cta-btn">Commencer gratuitement</a>
          </div>

          <div className="tbento-slider-wrap" aria-live="polite">
            <div
              className="tbento-slider-track"
              style={{ transform: `translateX(-${slide * 100}%)` }}
            >
              {SLIDES.map((cols, si) => (
                <div key={si} className="tbento-slide" aria-hidden={si !== slide}>
                  {cols.map((pair, ci) => (
                    <TCol key={ci} pair={pair as [T, T]} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

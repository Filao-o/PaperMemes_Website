'use client';

import { useState } from 'react';

const AVATAR_COLORS: Record<string, string> = {
  'LM': '#16a34a',
  'DK': '#dc2626',
  'SR': '#2563eb',
  'NF': '#d97706',
  'EL': '#9333ea',
  'KB': '#0891b2',
  'TR': '#be185d',
  'AV': '#0e7490',
  'MR': '#854d0e',
};

const Stars = () => (
  <div className="t-stars" aria-label="5 étoiles sur 5">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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

interface Testimonial {
  initials: string;
  name: string;
  handle: string;
  quote: string;
}

const SLIDES: Testimonial[][] = [
  [
    {
      initials: 'LM',
      name: 'Lucas M.',
      handle: '@lucasm_sol',
      quote: '&ldquo;J&rsquo;ai enfin compris ma gestion du risque sans cramer un seul euro. Le wallet virtuel change tout.&rdquo;',
    },
    {
      initials: 'SR',
      name: 'Sophie R.',
      handle: '@sophie_trades',
      quote: '&ldquo;Mon win rate simulé est passé de 41&nbsp;% à 67&nbsp;% en un mois. La confiance vient de la répétition.&rdquo;',
    },
    {
      initials: 'DK',
      name: '0xDegen_K',
      handle: '@0xdegen_k',
      quote: '&ldquo;Je me suis entraîné 6 semaines avant de passer en réel. Meilleure décision de mon année crypto.&rdquo;',
    },
  ],
  [
    {
      initials: 'NF',
      name: 'Naima F.',
      handle: '@naima_defi',
      quote: '&ldquo;PaperMemes m&rsquo;a permis de saisir les patterns de pump sans risquer mes économies. Indispensable.&rdquo;',
    },
    {
      initials: 'EL',
      name: 'Emma L.',
      handle: '@emma_sol',
      quote: '&ldquo;Trois semaines de simulation et je gère maintenant mes positions avec une clarté que je n&rsquo;avais jamais eue.&rdquo;',
    },
    {
      initials: 'KB',
      name: 'Kevin B.',
      handle: '@kb_onchain',
      quote: '&ldquo;Le meilleur outil pour passer du FOMO à une vraie stratégie. Je ne trade plus à l&rsquo;aveugle.&rdquo;',
    },
  ],
];

const STACK = ['LM', 'SR', 'NF', 'DK', 'EL', 'KB'];

function TestimonialCol({ t, inverted }: { t: Testimonial; inverted: boolean }) {
  return (
    <div className={`tbento-col${inverted ? ' tbento-col--inv' : ''}`}>
      {/* Author card (small) */}
      <div className="tbento-card tbento-author-card">
        <div className="tbento-author-head">
          <TAvatar initials={t.initials} size="lg" />
          <div>
            <p className="tbento-author-name">{t.name}</p>
            <p className="tbento-author-sub">{t.handle}</p>
          </div>
        </div>
      </div>
      {/* Quote card (large) */}
      <div className="tbento-card tbento-quote-card">
        <Stars />
        <p
          className="tbento-quote-text"
          dangerouslySetInnerHTML={{ __html: t.quote }}
        />
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [slide, setSlide] = useState(0);
  const total = SLIDES.length;

  return (
    <section className="testimonials-section" id="avis" aria-label="Témoignages">
      <div className="tbento-container">

        {/* Header row */}
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

        {/* Bento grid */}
        <div className="tbento">

          {/* ── Col 1 — Stat card ── */}
          <div className="tbento-card tbento-stat">
            <div className="tbento-rating-wrap">
              <span className="tbento-rating-num">4.8</span>
              <span className="tbento-rating-denom">/5</span>
            </div>
            <p className="tbento-stat-desc">
              Des traders qui progressent grâce à la simulation sur de <strong>vrais prix</strong> de marché Solana.
            </p>

            <div className="tbento-brand">PaperMemes</div>

            <div className="tbento-stack-wrap">
              {STACK.map(i => <TAvatar key={i} initials={i} size="sm" />)}
              <span className="tbento-stack-count">+2k</span>
            </div>
            <p className="tbento-trusted">Trusted by traders worldwide</p>

            <a href="#install" className="tbento-cta-btn">Commencer gratuitement</a>
          </div>

          {/* ── Slider ── */}
          <div className="tbento-slider-wrap" aria-live="polite">
            <div
              className="tbento-slider-track"
              style={{ transform: `translateX(-${slide * 100}%)` }}
            >
              {SLIDES.map((cols, si) => (
                <div key={si} className="tbento-slide" aria-hidden={si !== slide}>
                  {cols.map((t, ci) => (
                    <TestimonialCol key={t.initials} t={t} inverted={ci % 2 === 1} />
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

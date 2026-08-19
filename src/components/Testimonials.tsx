'use client';

const AVATAR_COLORS: Record<string, string> = {
  'LM': '#16a34a',
  'DK': '#dc2626',
  'SR': '#2563eb',
  'NF': '#d97706',
  'EL': '#9333ea',
  'KB': '#0891b2',
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

const STACK = ['LM', 'SR', 'NF', 'DK', 'EL', 'KB'];

export default function Testimonials() {
  return (
    <section className="testimonials-section" id="avis" aria-label="Témoignages">
      <div className="tbento-container">

        {/* Header */}
        <div className="tbento-header">
          <div className="tbento-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
            </svg>
            Testimonials
          </div>
          <h2 className="tbento-title">Expériences<span className="tbento-dot">.</span></h2>
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

          {/* ── Col 2 — Author (small/top) + Quote (large/bottom) ── */}
          <div className="tbento-col">
            <div className="tbento-card tbento-author-card">
              <div className="tbento-author-head">
                <TAvatar initials="LM" size="lg" />
                <div>
                  <p className="tbento-author-name">Lucas M.</p>
                  <p className="tbento-author-sub">@lucasm_sol</p>
                </div>
              </div>
            </div>
            <div className="tbento-card tbento-quote-card">
              <Stars />
              <p className="tbento-quote-text">
                &ldquo;J&rsquo;ai enfin compris ma gestion du risque sans cramer un seul euro. Le wallet virtuel change tout.&rdquo;
              </p>
            </div>
          </div>

          {/* ── Col 3 — Quote (large/top) + Author (small/bottom) — inverted ── */}
          <div className="tbento-col tbento-col--inv">
            <div className="tbento-card tbento-quote-card">
              <Stars />
              <p className="tbento-quote-text">
                &ldquo;Mon win rate simulé est passé de 41&nbsp;% à 67&nbsp;% en un mois. La confiance vient de la répétition.&rdquo;
              </p>
            </div>
            <div className="tbento-card tbento-author-card">
              <div className="tbento-author-head">
                <TAvatar initials="SR" size="lg" />
                <div>
                  <p className="tbento-author-name">Sophie R.</p>
                  <p className="tbento-author-sub">@sophie_trades</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Col 4 — Author (small/top) + Quote (large/bottom) ── */}
          <div className="tbento-col">
            <div className="tbento-card tbento-author-card">
              <div className="tbento-author-head">
                <TAvatar initials="DK" size="lg" />
                <div>
                  <p className="tbento-author-name">0xDegen_K</p>
                  <p className="tbento-author-sub">@0xdegen_k</p>
                </div>
              </div>
            </div>
            <div className="tbento-card tbento-quote-card">
              <Stars />
              <p className="tbento-quote-text">
                &ldquo;Je me suis entraîné 6 semaines avant de passer en réel. Meilleure décision de mon année crypto.&rdquo;
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

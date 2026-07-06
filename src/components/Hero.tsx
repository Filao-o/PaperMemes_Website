'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const PLATFORMS = [
  { href: 'https://axiom.trade', src: '/logo/axiom.png', alt: 'Axiom', lg: false },
  { href: 'https://gmgn.ai', src: '/logo/gmgn.png', alt: 'GMGN', lg: true },
  { href: 'https://padre.gg', src: '/logo/padre.png', alt: 'Padre', lg: false },
];

export default function Hero() {
  const ctasRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const t = setTimeout(() => ctasRef.current?.classList.add('visible'), 450);
    return () => clearTimeout(t);
  }, []);

  // "prix" : couleur qui oscille rouge/vert comme un actif en direct
  useEffect(() => {
    const el = priceRef.current;
    if (!el) return;
    let raf = 0;
    let last = performance.now();
    let value = 1;      // 1 = vert, 0 = rouge
    let target = 1;
    let speed = 1.5;    // unités/seconde
    let holdUntil = 0;

    const pick = () => {
      target = Math.random() < 0.5 ? 0 : 1;
      speed = 0.8 + Math.random() * Math.random() * 7; // parfois lent, parfois vif
      holdUntil = 0;
    };
    const apply = (v: number) => {
      const hue = v * 152;               // 0 rouge -> 152 vert
      const light = 45 + (1 - v) * 18;
      el.style.color = `hsl(${hue}, 100%, ${light}%)`;
      el.style.textShadow = `0 0 14px hsla(${hue}, 100%, ${light}%, 0.5)`;
    };
    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (Math.abs(value - target) < 0.01) {
        value = target;
        if (!holdUntil) holdUntil = now + 250 + Math.random() * 1600;
        else if (now >= holdUntil) pick();
      } else {
        const dir = Math.sign(target - value);
        value += dir * speed * dt;
        if ((dir > 0 && value > target) || (dir < 0 && value < target)) value = target;
      }
      apply(value);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;
    let pos = 0;
    let rafId: number;
    function step() {
      pos -= 0.6;
      const setWidth = ticker!.scrollWidth / 4;
      if (pos <= -setWidth) pos = 0;
      ticker!.style.transform = `translateX(${pos}px)`;
      rafId = requestAnimationFrame(step);
    }
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
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
    <section className="hero" id="hero" aria-label="Introduction">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg-overlay" />
      </div>

      <div className="hero-grid">
        <div className="hero-left">
          <div className="hero-badge" role="status">
            <span className="badge-dot" aria-hidden="true" />
            PaperMemes • L&apos;extension n°1 Demo MemesCoins
          </div>

          <h1 className="hero-title">
            Deviens <strong>rentable</strong> avant de risquer ton capital.
            <span className="hero-title-accent">Zéro risque, vrais <span ref={priceRef} className="hero-price-flicker">prix</span>.</span>
          </h1>

          <p className="hero-desc">
            Simule le trading de memecoins sur de vrais prix de marché avec un wallet virtuel en SOL. Gagne de l&apos;expérience — sans risquer un seul centime.
          </p>

          <div ref={ctasRef} className="hero-ctas">
            <a href="#install" className="btn-pixel-primary" onClick={e => scrollTo(e, '#install')}>
              Commencer gratuitement
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
            <a href="#install" className="btn-pixel-ghost" onClick={e => scrollTo(e, '#install')}>
              <Image
                src="/logo/chrome.png"
                alt=""
                width={18}
                height={18}
                style={{ width: 18, height: 'auto' }}
              />
              Installer l&apos;extension Chrome
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-ticker-section">
            <span className="hero-bottom-label">Integrates to your favorite trading platforms</span>
            <div className="hero-bottom-ticker-wrap">
              <div ref={tickerRef} className="hero-bottom-ticker">
                {[...Array(4)].flatMap((_, set) =>
                  PLATFORMS.map((p, i) => (
                    <a
                      key={`${set}-${i}`}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="platform-logo-link"
                      aria-hidden={set > 0 ? 'true' : undefined}
                      tabIndex={set > 0 ? -1 : undefined}
                    >
                      <Image
                        src={p.src}
                        alt={set === 0 ? p.alt : ''}
                        width={p.lg ? 80 : 56}
                        height={p.lg ? 40 : 28}
                        style={{ width: 'auto', height: p.lg ? 40 : 28 }}
                        className={`platform-logo-img${p.lg ? ' platform-logo-img--lg' : ''}`}
                      />
                    </a>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* [TODO] Remplacer par le vrai mockup du dashboard une fois prêt */}
          <div className="hero-visual-placeholder">
            <span>Dashboard preview — à venir</span>
          </div>
        </div>
      </div>
    </section>
  );
}

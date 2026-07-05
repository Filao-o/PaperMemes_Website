'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const PLATFORMS = [
  { href: 'https://axiom.trade', src: '/logo/Axiom_-_Modifié-removebg-preview.png', alt: 'Axiom', lg: false },
  { href: 'https://gmgn.ai', src: '/logo/Gmgn-removebg-preview.png', alt: 'GMGN', lg: true },
  { href: 'https://padre.gg', src: '/logo/padre_-_Modifié-removebg-preview.png', alt: 'Padre', lg: false },
  { href: 'https://photon-sol.tinyastro.io', src: '/logo/Photon_-_Modifié-removebg-preview.png', alt: 'Photon', lg: false },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvasEl: HTMLCanvasElement = canvasRef.current;
    const ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    let pixels: ReturnType<typeof createPixel>[] = [];
    let animId = 0;
    let lastFrame = performance.now();
    const COLORS = [
      'rgba(255,255,255,0.08)', 'rgba(255,255,255,0.14)',
      'rgba(255,255,255,0.10)', 'rgba(255,255,255,0.06)', 'rgba(255,255,255,0.18)',
    ];
    const GAP = 6, SPEED = 30;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function rand(a: number, b: number) { return Math.random() * (b - a) + a; }

    function createPixel(x: number, y: number, w: number, h: number) {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const dx = x - w / 2, dy = y - h / 2;
      const speed = rand(0.08, 0.4) * Math.min(SPEED, 100) * 0.001;
      const p = {
        x, y, color, speed,
        size: 0, sizeStep: rand(0.12, 0.28),
        minSize: 0.5, maxSize: rand(0.5, 2),
        delay: reduced ? 0 : Math.sqrt(dx*dx + dy*dy) * 0.65,
        counter: 0, counterStep: rand(1.8, 3.2) + (w + h) * 0.008,
        isIdle: false, isReverse: false, isShimmer: false,
        draw() {
          const off = 1 - p.size * 0.5;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x + off, p.y + off, p.size, p.size);
        },
        shimmer() {
          if (p.size >= p.maxSize) p.isReverse = true;
          else if (p.size <= p.minSize) p.isReverse = false;
          if (p.isReverse) p.size -= p.speed; else p.size += p.speed;
        },
        appear() {
          p.isIdle = false;
          if (p.counter <= p.delay) { p.counter += p.counterStep; return; }
          if (p.size >= p.maxSize) p.isShimmer = true;
          if (p.isShimmer) p.shimmer(); else p.size += p.sizeStep;
          p.draw();
        },
      };
      return p;
    }

    function init() {
      const parent = canvasEl.parentElement;
      if (!parent) return;
      const w = Math.floor(parent.offsetWidth);
      const h = Math.floor(parent.offsetHeight);
      canvasEl.width = w; canvasEl.height = h;
      pixels = [];
      for (let x = 0; x < w; x += GAP)
        for (let y = 0; y < h; y += GAP)
          pixels.push(createPixel(x, y, w, h));
    }

    function loop() {
      animId = requestAnimationFrame(loop);
      const now = performance.now();
      if (now - lastFrame < 16.67) return;
      lastFrame = now;
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      for (let i = 0; i < pixels.length; i++) pixels[i].appear();
    }

    init();
    loop();

    const ro = new ResizeObserver(init);
    const parent = canvasEl.parentElement;
    if (parent) ro.observe(parent);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => ctasRef.current?.classList.add('visible'), 450);
    const t2 = setTimeout(() => bandRef.current?.classList.add('visible'), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
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
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      <div className="hero-radial-overlay" aria-hidden="true" />

      <div className="hero-body">
        <div className="hero-badge" role="status">
          <span className="badge-dot" aria-hidden="true" />
          Paper Trading · Zéro risque · Prix réels
        </div>

        <h1 className="hero-title pixel-glass-text">
          <em className="hero-word1">Paper</em>
          <span className="hero-word2">Memes.</span>
        </h1>

        <p className="hero-desc">
          Simule le trading de memecoins sur de vrais prix de marché avec un wallet virtuel en SOL. Gagne de l&apos;expérience — sans risquer un seul centime.
        </p>

        <div className="hero-stats" role="list" aria-label="Chiffres clés">
          <div className="stat" role="listitem">
            <span className="stat-value">8 500+</span>
            <span className="stat-label">Traders en formation</span>
          </div>
          <div className="stat-sep" aria-hidden="true" />
          <div className="stat" role="listitem">
            <span className="stat-value">$0</span>
            <span className="stat-label">Argent réel requis</span>
          </div>
          <div className="stat-sep" aria-hidden="true" />
          <div className="stat" role="listitem">
            <span className="stat-value">
              4.8
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </span>
            <span className="stat-label">Chrome Store</span>
          </div>
        </div>

        <div ref={ctasRef} className="hero-ctas" id="heroCtas">
          <a href="#install" className="btn-pixel-primary" onClick={e => scrollTo(e, '#install')}>
            Commencer gratuitement
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
          <a href="#how" className="btn-pixel-ghost" onClick={e => scrollTo(e, '#how')}>
            Comment ça marche
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
        </div>
      </div>

      <div ref={bandRef} className="hero-bottom-band" id="heroBottomBand">
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
                    className={`platform-logo-img${p.lg ? ' platform-logo-img--lg' : ''}`}
                  />
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

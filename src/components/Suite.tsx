'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const DURATION = 5000;

const ITEMS = [
  {
    title: 'Wallet virtuel en SOL',
    desc: 'Reçois un solde virtuel en SOL dès le lancement. Toggle SOL/USD en un clic, reset à tout moment avec le montant de ton choix — aucun wallet réel requis.',
    img: '/image/wallet.png',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/>
        <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"/>
        <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1z"/>
        <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/>
      </svg>
    ),
  },
  {
    title: 'Paramètres réalistes',
    desc: 'Paramètres personnalisables pour simuler différentes conditions de marché et tester tes stratégies dans des contextes variés.',
    img: '/image/trading-interface.png.png',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    title: 'Take Profit / Stop Loss',
    desc: "Presets TP à +10%, +20%, +50%, +100% et SL à -10%, -20%, -50%, -100%. Tes ordres s'exécutent automatiquement dès que le prix est atteint.",
    img: '/image/Takeprofit.png',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8l0 4l2 2"/><path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"/>
      </svg>
    ),
  },
  {
    title: 'Stats & Analytics',
    desc: "PnL total, win rate, meilleur trade, nombre de positions — toutes tes stats clés en un coup d'œil.",
    img: '/image/analytics.png',
    sm: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/>
        <path d="M15 9a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"/>
        <path d="M9 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"/>
      </svg>
    ),
  },
];

export default function Suite() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activate = (index: number) => {
    barRefs.current.forEach(bar => {
      if (!bar) return;
      bar.style.transition = 'none';
      bar.style.width = '0%';
    });
    setActive(index);
  };

  useEffect(() => {
    if (paused) return;
    const bar = barRefs.current[active];
    if (!bar) return;

    bar.getBoundingClientRect();
    bar.style.transition = `width ${DURATION}ms linear`;
    bar.style.width = '100%';

    timerRef.current = setTimeout(() => {
      setActive(prev => (prev + 1) % ITEMS.length);
    }, DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, paused]);

  return (
    <section className="section suite" id="suite" aria-labelledby="suite-title">
      <div className="suite-bg-blob suite-bg-blob--1" aria-hidden="true" />
      <div className="suite-bg-blob suite-bg-blob--2" aria-hidden="true" />
      <div className="container">
        <header className="section-header">
          <p className="section-tag">Fonctionnalités</p>
          <h2 id="suite-title" className="section-title">
            La suite complète<br /><span className="text-white-dim">de paper trading</span>
          </h2>
          <p className="section-desc">Tout ce dont vous avez besoin pour apprendre à trader les memecoins, dans une seule extension.</p>
        </header>

        <div
          className="suite-grid"
          onMouseEnter={() => {
            setPaused(true);
            const bar = barRefs.current[active];
            if (bar) {
              const computed = window.getComputedStyle(bar).width;
              bar.style.transition = 'none';
              bar.style.width = computed;
            }
          }}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="suite-features" role="list">
            {ITEMS.map((item, i) => (
              <div
                key={i}
                className={`suite-item${active === i ? ' suite-item--active' : ''}`}
                role="listitem"
                tabIndex={0}
                aria-selected={active === i}
                onClick={() => activate(i)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(i); } }}
              >
                <div className="suite-item-accent" aria-hidden="true" />
                <div className="suite-item-inner">
                  <div className="suite-item-icon" aria-hidden="true">{item.icon}</div>
                  <div className="suite-item-body">
                    <h3 className="suite-item-title">{item.title}</h3>
                    <div className="suite-item-desc"><p>{item.desc}</p></div>
                  </div>
                </div>
                <div className="suite-item-progress" aria-hidden="true">
                  <div
                    className="suite-item-progress-bar"
                    ref={el => { barRefs.current[i] = el; }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="suite-preview" aria-hidden="true">
            <div className="suite-preview-inner">
              {ITEMS.map((item, i) => (
                <Image
                  key={i}
                  src={item.img}
                  alt=""
                  width={600}
                  height={400}
                  className={`suite-img${item.sm ? ' suite-img--sm' : ''}${active !== i ? ' suite-img--hidden' : ''}`}
                  style={i === 0 ? {} : { position: 'absolute', top: 0, left: 0 }}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

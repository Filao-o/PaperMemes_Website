'use client';

import { useEffect, useRef } from 'react';

const CARDS = [
  {
    icon: <svg className="why-icon-wrap" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: 'Zéro risque financier',
    desc: "Chaque trade est simulé avec un wallet virtuel en SOL. Peu importe ce que tu perds — tu n'as perdu que du temps et gagné de l'expérience.",
  },
  {
    icon: <svg className="why-icon-wrap" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></svg>,
    title: 'Suivi des entrées',
    desc: "Visualisez chaque entrée effectuée sur une position avec la date et l'heure de l'opération, le montant de SOL investi et le total de SOL retiré.",
  },
  {
    icon: <svg className="why-icon-wrap" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    title: 'Calendrier de performances',
    desc: 'Visualise tes gains et pertes jour par jour en vue hebdomadaire ou mensuelle. Identifie tes meilleures séquences et tes jours de drawdown.',
  },
  {
    icon: <svg className="why-icon-wrap" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
    title: 'Rugcheck intégré',
    desc: "Avant chaque trade, l'extension analyse le token : score de risque, pourcentage des top holders, liquidité. Tu trades avec les yeux ouverts.",
  },
  {
    icon: <svg className="why-icon-wrap" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    title: 'Historique filtrable',
    desc: 'Filtre ton historique de trades par ALL, Active, Gain ou Loss. Retrouve instantanément tes meilleures et pires positions pour en tirer des leçons.',
  },
  {
    icon: <svg className="why-icon-wrap" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 3L2 3"/><path d="M22 21L18 21M2 21L14 21"/><path d="M9 8L8 8C6.11438 8 5.17157 8 4.58579 8.58579C4 9.17157 4 10.1144 4 12C4 13.8856 4 14.8284 4.58579 15.4142C5.17157 16 6.11438 16 8 16H16C17.8856 16 18.8284 16 19.4142 15.4142C20 14.8284 20 13.8856 20 12C20 10.1144 20 9.17157 19.4142 8.58579C18.8284 8 17.8856 8 16 8L13 8"/></svg>,
    title: 'Widget détachable',
    desc: 'Widget en trois blocs : wallet SOL, informations du token, et gestion des positions avec les boutons de Take Profit (TP) et Stop Loss (SL).',
  },
];

const TESTIMONIALS = [
  {
    quote: "« J'avais perdu 600 € sur mes premiers trades réels. Avec Papermemes, j'ai pu rejouer ces situations, comprendre mes erreurs et construire une vraie stratégie. »",
    name: 'Lucas M.',
    role: 'Passé au vrai trading après 3 mois',
  },
  {
    quote: "« Mon win rate simulé était à 64% après 6 semaines. Quand je suis passé en réel, j'avais confiance — et les résultats ont suivi. »",
    name: '0xDegen_K',
    role: 'Trader memecoins — Solana',
  },
  {
    quote: "« Le journal de trading m'a changé la vie. Je voyais exactement où je faisais des erreurs. Mon win rate est passé de 40% à 68%. »",
    name: 'Sophie R.',
    role: 'Débutante devenue profitable',
  },
];

const CELL = 20;

function buildPattern() {
  const id = 'gp' + Math.random().toString(36).slice(2, 7);
  const squares = Array.from({ length: 5 }, () => [
    Math.floor(Math.random() * 4) + 7,
    Math.floor(Math.random() * 6) + 1,
  ]);
  const rects = squares.map(s =>
    `<rect stroke-width="0" width="${CELL + 1}" height="${CELL + 1}" x="${s[0] * CELL}" y="${s[1] * CELL}" />`
  ).join('');
  return `<svg aria-hidden="true" class="why-card-grid" xmlns="http://www.w3.org/2000/svg">
    <defs><pattern id="${id}" width="${CELL}" height="${CELL}" patternUnits="userSpaceOnUse" x="-12" y="4">
      <path d="M.5 ${CELL}V.5H${CELL}" fill="none" />
    </pattern></defs>
    <rect width="100%" height="100%" stroke-width="0" fill="url(#${id})" />
    <svg x="-12" y="4" class="why-card-grid-squares">${rects}</svg>
  </svg>`;
}

export default function WhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.why-card');
    cards?.forEach(card => {
      const wrap = document.createElement('div');
      wrap.className = 'why-card-pattern';
      wrap.setAttribute('aria-hidden', 'true');
      const inner = document.createElement('div');
      inner.className = 'why-card-pattern-gradient';
      inner.innerHTML = buildPattern();
      wrap.appendChild(inner);
      card.insertBefore(wrap, card.firstChild);
    });
  }, []);

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
    <section className="section why" id="why" aria-labelledby="why-title" ref={sectionRef}>
      <div className="container">
        <header className="section-header">
          <p className="section-tag">Pourquoi Papermemes</p>
          <h2 id="why-title" className="section-title">
            Apprendre à trader<br /><span className="text-white-dim">sans payer le prix fort</span>
          </h2>
        </header>

        <div className="why-grid">
          {CARDS.map((card, i) => (
            <article key={i} className="why-card reveal">
              {card.icon}
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </article>
          ))}
        </div>

        <div className="testimonials">
          <h3 className="testimonials-title">Ce que disent nos traders</h3>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <blockquote key={i} className="testimonial reveal">
                <div className="t-stars" aria-label="5 étoiles sur 5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <p>{t.quote}</p>
                <footer className="t-author">
                  <div className="t-avatar" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div>
                    <cite className="t-name">{t.name}</cite>
                    <span className="t-role">{t.role}</span>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

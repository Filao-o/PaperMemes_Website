'use client';

import { useEffect, useRef, useState } from 'react';

type Review = { text: string; name: string; handle: string };

const REVIEWS: Review[] = [
  { text: "J'ai enfin compris ma gestion du risque sans cramer un seul euro. Le wallet virtuel change tout.", name: 'Lucas M.', handle: '@lucasm_sol' },
  { text: "Mon win rate simulé est passé de 41% à 67% en un mois. La confiance vient de la répétition.", name: '0xDegen_K', handle: '@0xdegen_k' },
  { text: "Le rugcheck intégré m'a évité au moins trois pièges évidents. Indispensable avant chaque entrée.", name: 'Sophie R.', handle: '@sophie_trades' },
  { text: "Parfait pour tester des stratégies TP/SL sans stress. Je rejoue mes erreurs jusqu'à les comprendre.", name: 'Karim B.', handle: '@karim_b' },
  { text: "Des vrais prix, zéro risque : c'est exactement ce qu'il me fallait pour débuter les memecoins.", name: 'Emma L.', handle: '@emma_l' },
  { text: "L'historique filtrable est génial pour analyser mes pires trades et arrêter de les répéter.", name: 'Théo G.', handle: '@theo_gg' },
  { text: "Je me suis entraîné 6 semaines avant de passer en réel. Meilleure décision de mon année crypto.", name: 'Naima F.', handle: '@naima_f' },
  { text: "Le calendrier de performances m'a montré que je tradais mal le week-end. Data > feeling.", name: 'Antoine P.', handle: '@antoinep' },
  { text: "Enfin un simulateur qui colle au marché réel des memecoins Solana. Le TP auto est top.", name: 'Yanis D.', handle: '@yanis_sol' },
  { text: "J'ai appris à couper mes pertes vite. En démo ça coûte rien, en réel ça sauve un portefeuille.", name: 'Clara V.', handle: '@clara_v' },
  { text: "Le widget détachable est super pratique, je garde mes positions à l'œil en permanence.", name: 'Hugo N.', handle: '@hugo_n' },
  { text: "Passé de zéro connaissance à profitable en démo. La courbe d'apprentissage est douce.", name: 'Inès B.', handle: '@ines_b' },
  { text: "Ce que j'aime : aucune pression. J'expérimente des setups agressifs sans conséquence.", name: 'Maxime T.', handle: '@maxime_t' },
  { text: "Les stats de PnL et win rate me donnent une vraie lecture de ma progression semaine après semaine.", name: 'Julie H.', handle: '@julie_h' },
  { text: "Franchement bluffé par le réalisme des prix. On oublie presque que c'est de la simulation.", name: 'Rayan S.', handle: '@rayan_s' },
  { text: "J'ai backtesté ma stratégie sur des dizaines de tokens. Résultat : je sais où j'ai un edge.", name: 'Camille A.', handle: '@camille_a' },
  { text: "Le meilleur outil pour apprendre la discipline. Mes entrées sont bien plus propres maintenant.", name: 'Nathan O.', handle: '@nathan_o' },
  { text: "Débuter les memecoins sans se faire liquider dès la première semaine : c'est possible ici.", name: 'Léa C.', handle: '@lea_c' },
  { text: "Les presets de Take Profit à +50% et +100% m'ont appris à sécuriser mes gains à temps.", name: 'Bilal M.', handle: '@bilal_m' },
  { text: "Je recommande à tous mes potes qui veulent trade sans y laisser leur salaire. Bluffant.", name: 'Océane R.', handle: '@oceane_r' },
  { text: "Le suivi des entrées position par position est ultra clair. Je sais exactement où j'en suis.", name: 'Adam K.', handle: '@adam_k' },
  { text: "Zéro dépôt, zéro connexion wallet, juste de l'entraînement pur. Setup en deux minutes.", name: 'Manon D.', handle: '@manon_d' },
  { text: "J'ai compris pourquoi je perdais : je tradais l'émotion. La démo m'a mis ça sous les yeux.", name: 'Elias V.', handle: '@elias_v' },
  { text: "Après 200 trades simulés, mon exécution est devenue mécanique. Exactement le but.", name: 'Sarah B.', handle: '@sarah_b' },
  { text: "Le drawdown fait moins peur quand tu l'as déjà vécu cent fois en démo. Mental blindé.", name: 'Romain L.', handle: '@romain_l' },
  { text: "Interface claire, prix réels, aucune arnaque. Enfin un outil honnête pour progresser.", name: 'Aya T.', handle: '@aya_t' },
  { text: "J'ai testé le stop loss à -10% systématique pendant un mois. Ma courbe s'est lissée direct.", name: 'Victor M.', handle: '@victor_m' },
  { text: "Idéal pour comprendre la volatilité des memecoins avant de risquer du vrai capital.", name: 'Nour H.', handle: '@nour_h' },
  { text: "Le classement me motive à m'améliorer chaque semaine. Un peu de compétition, ça pousse.", name: 'Gabriel P.', handle: '@gabriel_p' },
  { text: "Je ne passe plus un trade réel sans avoir validé le setup en démo avant. Game changer.", name: 'Lina S.', handle: '@lina_s' },
];

const AVATAR_COLORS = ['#00e676', '#ff4040', '#4285F4', '#FBBC05', '#a855f7', '#06b6d4', '#f97316', '#ec4899'];

function initials(name: string) {
  return name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
}
function colorFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

export default function Testimonials() {
  const [perView, setPerView] = useState(3);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  const pages = Math.ceil(REVIEWS.length / perView);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setPerView(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  // clamp page when perView changes
  useEffect(() => {
    setPage(p => Math.min(p, Math.ceil(REVIEWS.length / perView) - 1));
  }, [perView]);

  // autoplay (ticker)
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setPage(p => (p + 1) % pages);
    }, 4000);
    return () => clearInterval(id);
  }, [paused, pages]);

  const go = (p: number) => setPage((p + pages) % pages);

  return (
    <section className="section testimonials-section" id="avis" aria-labelledby="avis-title">
      <div className="container">
        <header className="section-header">
          <p className="section-tag">Témoignages</p>
          <h2 id="avis-title" className="section-title">
            Ils s&apos;entraînent déjà <span className="text-white-dim">sur Papermemes</span>
          </h2>
        </header>

        <div
          className="tcarousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button className="tcarousel-btn tcarousel-btn--prev" onClick={() => go(page - 1)} aria-label="Avis précédents">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
          </button>

          <div className="tcarousel-viewport">
            <div className="tcarousel-track" style={{ transform: `translateX(-${page * 100}%)` }}>
              {REVIEWS.map((r, i) => (
                <article
                  key={i}
                  className="tcard"
                  style={{ flex: `0 0 calc((100% - ${(perView - 1) * 20}px) / ${perView})` }}
                >
                  <svg className="tcard-quote" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M9.5 6C6.5 6 4 8.5 4 11.5V18h6v-6H7c0-1.7 1.3-3 3-3V6zm10 0c-3 0-5.5 2.5-5.5 5.5V18h6v-6h-3c0-1.7 1.3-3 3-3V6z" />
                  </svg>
                  <p className="tcard-text">{r.text}</p>
                  <footer className="tcard-author">
                    <span className="tcard-avatar" style={{ background: colorFor(r.name) }} aria-hidden="true">
                      {initials(r.name)}
                    </span>
                    <span className="tcard-meta">
                      <cite className="tcard-name">{r.name}</cite>
                      <span className="tcard-handle">{r.handle}</span>
                    </span>
                  </footer>
                </article>
              ))}
            </div>
          </div>

          <button className="tcarousel-btn tcarousel-btn--next" onClick={() => go(page + 1)} aria-label="Avis suivants">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>

        <div className="tcarousel-dots" role="tablist" aria-label="Pages d'avis">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              className={`tcarousel-dot${i === page ? ' active' : ''}`}
              onClick={() => setPage(i)}
              aria-label={`Page ${i + 1}`}
              aria-selected={i === page}
              role="tab"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

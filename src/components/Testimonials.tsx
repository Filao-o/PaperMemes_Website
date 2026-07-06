'use client';

import { useEffect, useRef } from 'react';

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

const AVATAR_COLORS = ['#16a34a', '#dc2626', '#2563eb', '#d97706', '#9333ea', '#0891b2', '#ea580c', '#db2777'];

function initials(name: string) {
  return name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
}
function colorFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let pos = 0;
    let raf = 0;
    let last = performance.now();
    const SPEED = 45; // px/seconde

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!pausedRef.current) {
        pos -= SPEED * dt;
        const half = track.scrollWidth / 2;
        if (half > 0 && pos <= -half) pos += half;
        track.style.transform = `translateX(${pos}px)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const cards = [...REVIEWS, ...REVIEWS];

  return (
    <section className="testimonials-section" id="avis" aria-label="Témoignages">
      <div
        className="tmarquee"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        <div ref={trackRef} className="tmarquee-track">
          {cards.map((r, i) => (
            <article key={i} className="tcard" aria-hidden={i >= REVIEWS.length ? 'true' : undefined}>
              <svg className="tcard-quote" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
    </section>
  );
}

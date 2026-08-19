'use client';

import { useState } from 'react';

const ITEMS = [
  {
    q: "C'est quoi le paper trading ?",
    a: "Le paper trading consiste à simuler des trades avec de l'argent fictif sur de vrais prix de marché. Cela permet d'apprendre le trading, de tester des stratégies et de prendre de l'expérience sans risquer un seul euro.",
  },
  {
    q: "Faut-il de l'argent réel pour utiliser Papermemes ?",
    a: "Non, absolument pas. Papermemes est 100 % gratuit et ne demande aucun dépôt. Tu reçois un capital fictif dès le lancement. Aucune connexion à un wallet ou exchange n'est nécessaire.",
  },
  {
    q: 'Les prix utilisés sont-ils réels ?',
    a: "Oui. Papermemes utilise des données de prix en temps réel. Tes trades simulés se font au vrai cours du marché, ce qui rend l'entraînement le plus réaliste possible.",
  },
  {
    q: 'Papermemes exécute-t-il de vrais trades ?',
    a: "Non. Jamais. Papermemes est un outil de simulation uniquement. Aucun trade réel n'est exécuté, aucune crypto n'est achetée ou vendue en ton nom.",
  },
  {
    q: "L'extension est-elle gratuite ?",
    a: "Oui, Papermemes est gratuit avec toutes les fonctionnalités essentielles. Un plan Premium est disponible pour débloquer le journal avancé, le replay de trades passés et l'accès au classement complet.",
  },
  {
    q: 'Sur quelles plateformes fonctionne Papermemes ?',
    a: "Papermemes fonctionne sur les principales plateformes Solana : Axiom, GMGN, Padre et d'autres à venir. Il s'intègre directement dans l'interface de ces plateformes via l'extension Chrome.",
  },
  {
    q: 'Mes données sont-elles stockées ?',
    a: "Tes données de simulation sont stockées localement et/ou sur ton compte Papermemes. Aucune donnée financière réelle n'est jamais collectée — nous ne touchons pas à tes vrais wallets.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <div className="faq-inner">

          {/* Left column */}
          <div className="faq-left">
            <h2 id="faq-title" className="faq-big-title">FAQ</h2>
            <p className="faq-left-desc">
              On a réuni les questions les plus fréquentes sur le paper trading et PaperMemes.
              <br /><br />
              Si tu ne trouves pas ta réponse ici, contacte-nous directement.
            </p>
            <a href="mailto:contact@papermemes.io" className="faq-contact-btn">
              Nous contacter
            </a>
          </div>

          {/* Right column — accordion */}
          <div className="faq-right" role="list">
            {ITEMS.map((item, i) => (
              <div
                key={i}
                className={`faq-item${openIndex === i ? ' open' : ''}`}
                role="listitem"
              >
                <button
                  className="faq-question"
                  aria-expanded={openIndex === i}
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq-plus" aria-hidden="true">
                    {openIndex === i ? '−' : '+'}
                  </span>
                </button>
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

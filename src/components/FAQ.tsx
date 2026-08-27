'use client';

import { useState } from 'react';

const ITEMS = [
  {
    q: "C'est quoi le paper trading ?",
    a: "Le paper trading consiste à simuler des trades avec de l'argent fictif, sur de vrais prix de marché. C'est la méthode la plus sûre pour apprendre à trader, tester des stratégies et prendre de l'expérience — sans jamais mettre un seul euro réel en jeu.",
  },
  {
    q: "Faut-il de l'argent réel pour utiliser Papermemes ?",
    a: "Non, et ce sera toujours le cas pour l'essentiel de PaperMemes. C'est 100 % gratuit, sans dépôt ni carte bancaire. Tu reçois un capital fictif dès le lancement et tu peux commencer à t'entraîner immédiatement, en toute tranquillité.",
  },
  {
    q: 'Les prix utilisés sont-ils réels ?',
    a: "Oui, et c'est important : Papermemes utilise des données de prix en temps réel. Tes trades simulés suivent le vrai cours du marché, donc ce que tu apprends ici se transfère directement à une situation réelle.",
  },
  {
    q: 'Papermemes exécute-t-il de vrais trades ?',
    a: "Non, jamais. Papermemes est un outil de simulation uniquement — c'est même toute sa raison d'être. Aucun trade réel n'est exécuté, aucune crypto n'est achetée ou vendue en ton nom. Tu peux explorer et te tromper sans aucune conséquence financière.",
  },
  {
    q: "L'extension est-elle gratuite ?",
    a: "Oui, et toutes les fonctionnalités essentielles resteront gratuites. Un plan Premium optionnel arrivera pour ceux qui veulent aller plus loin, avec le journal avancé, le replay de trades passés et l'accès au classement complet — mais rien n'est requis pour bien démarrer.",
  },
  {
    q: 'Sur quelles plateformes fonctionne Papermemes ?',
    a: "Papermemes s'intègre directement dans les principales plateformes de trading Solana : Axiom, GMGN, Padre, et d'autres à venir. Pas de configuration compliquée — l'extension Chrome s'installe en quelques secondes et s'affiche automatiquement là où tu trades déjà.",
  },
  {
    q: 'Mes données sont-elles stockées ?',
    a: "Tes données de simulation sont stockées localement et/ou sur ton compte Papermemes, en toute sécurité. Nous ne collectons jamais de données financières réelles et n'avons aucun accès à tes vrais wallets — ta vie privée et tes fonds restent intégralement sous ton contrôle.",
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

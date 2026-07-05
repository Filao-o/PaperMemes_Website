export default function CTA() {
  return (
    <section className="section cta-section" id="install" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta-content">
          <p className="cta-badge">8 500+ traders en formation</p>
          <h2 id="cta-title" className="cta-title">
            Arrête d&apos;apprendre<br /><span className="text-white-dim">en perdant de l&apos;argent réel</span>
          </h2>
          <p className="cta-desc">
            Installe Papermemes, entraîne-toi sur de vrais marchés et passe au vrai trading uniquement quand tu es prêt.
          </p>
          <a href="#" className="btn btn-primary btn-xl">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Commencer gratuitement
          </a>
          <ul className="cta-checks" aria-label="Avantages">
            {['Aucune carte bancaire', 'Aucun wallet requis', 'Installation en 30 secondes'].map((item, i) => (
              <li key={i}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

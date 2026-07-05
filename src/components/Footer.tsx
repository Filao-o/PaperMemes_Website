import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="logo" aria-label="Papermemes — accueil">
              <Image
                src="/logo/papermeme-removebg.png"
                alt="Papermemes"
                width={120}
                height={120}
                style={{ width: 'auto', height: 120 }}
                className="logo-img logo-img--footer"
              />
            </Link>
            <p>Le paper trading de memecoins pour apprendre sans risquer.</p>
            <div className="footer-socials">
              <a href="#" className="social-link" aria-label="Papermemes sur Twitter/X">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Twitter / X
              </a>
              <a href="#" className="social-link" aria-label="Papermemes sur Telegram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                Telegram
              </a>
              <a href="#" className="social-link" aria-label="Papermemes sur Discord">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Discord
              </a>
            </div>
          </div>

          <nav className="footer-links" aria-label="Liens du pied de page">
            <div className="footer-col">
              <h4>Produit</h4>
              <a href="#suite">Fonctionnalités</a>
              <a href="#how">Comment ça marche</a>
              <a href="#install">Installer</a>
            </div>
            <div className="footer-col">
              <h4>Ressources</h4>
              <a href="#">Documentation</a>
              <a href="#">Changelog</a>
              <a href="#">GitHub</a>
            </div>
            <div className="footer-col">
              <h4>Légal</h4>
              <Link href="/legal">Mentions légales</Link>
              <Link href="/legal#confidentialite">Confidentialité</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Papermemes. Tous droits réservés.</p>
          <p className="footer-disclaimer">
            Papermemes est un outil de paper trading uniquement. Aucun argent réel n&apos;est impliqué. Ne constitue pas un conseil en investissement.
          </p>
        </div>
      </div>
    </footer>
  );
}

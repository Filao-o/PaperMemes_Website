import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions légales — Papermemes',
  description: "Mentions légales, politique de confidentialité et conditions d'utilisation de Papermemes.",
};

export default function LegalPage() {
  return (
    <main className="legal-page">
      <div className="container">
        <h1>Mentions légales</h1>

        <h2>Éditeur</h2>
        <p>
          Papermemes est édité par [Nom de la société / Nom de l&apos;éditeur].<br />
          Adresse : [Adresse postale]<br />
          Email : [contact@papermemes.io]<br />
          SIRET : [Numéro SIRET]
        </p>

        <h2>Hébergement</h2>
        <p>Ce site est hébergé par [Nom de l&apos;hébergeur], [Adresse de l&apos;hébergeur].</p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble du contenu présent sur ce site (textes, images, logo, code) est protégé par le droit d&apos;auteur.
          Toute reproduction, même partielle, est interdite sans autorisation préalable écrite de l&apos;éditeur.
        </p>

        <h2>Limitation de responsabilité</h2>
        <p>
          Papermemes est un outil de simulation uniquement. Aucun argent réel n&apos;est impliqué dans les trades effectués via l&apos;extension.
          Le contenu du site ne constitue pas un conseil en investissement.
        </p>

        <h2 id="confidentialite">Politique de confidentialité</h2>
        <p>
          Papermemes collecte des données minimales nécessaires au fonctionnement de l&apos;extension
          (données de trading simulées, préférences utilisateur). Ces données sont stockées localement
          dans votre navigateur et ne sont pas transmises à des tiers.
        </p>
        <p>
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression
          de vos données. Pour exercer ces droits, contactez-nous à <a href="mailto:contact@papermemes.io">contact@papermemes.io</a>.
        </p>

        <h2>Cookies</h2>
        <p>
          Ce site peut utiliser des cookies techniques nécessaires à son bon fonctionnement.
          Aucun cookie publicitaire ou de tracking tiers n&apos;est utilisé sans votre consentement.
        </p>

        <h2>Droit applicable</h2>
        <p>
          Les présentes mentions légales sont soumises au droit français.
          Tout litige sera de la compétence exclusive des tribunaux français.
        </p>
      </div>
    </main>
  );
}

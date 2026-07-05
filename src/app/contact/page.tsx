import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Papermemes',
  description: "Contactez l'équipe Papermemes pour toute question, bug ou suggestion.",
};

export default function ContactPage() {
  return (
    <main className="legal-page">
      <div className="container">
        <header className="section-header" style={{ textAlign: 'left', marginBottom: '48px' }}>
          <p className="section-tag">Support</p>
          <h1>Nous contacter</h1>
          <p style={{ fontSize: '18px', color: 'var(--c-text-2)', lineHeight: '1.7', maxWidth: '520px' }}>
            Une question, un bug, une suggestion ? L&apos;équipe Papermemes vous répond sous 48h.
          </p>
        </header>

        <form className="contact-form" action="#" method="POST">
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input type="text" id="name" name="name" placeholder="Votre nom" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="vous@exemple.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Sujet</label>
            <select id="subject" name="subject">
              <option value="bug">Signaler un bug</option>
              <option value="question">Question générale</option>
              <option value="feature">Suggestion de fonctionnalité</option>
              <option value="other">Autre</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Décrivez votre demande..." required />
          </div>
          <button type="submit" className="btn btn-primary btn-lg" style={{ alignSelf: 'flex-start' }}>
            Envoyer le message
          </button>
        </form>
      </div>
    </main>
  );
}

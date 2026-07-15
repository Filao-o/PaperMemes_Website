import type { Metadata } from 'next';
import Link from 'next/link';
import { WIKI_CATEGORIES } from '@/lib/wiki';

export const metadata: Metadata = {
  title: 'Wiki PaperMemes — Guide & documentation',
  description: "Le guide complet de PaperMemes : installation, wallet virtuel, TP/SL, rugcheck, analytics et plus.",
};

export default function WikiPage() {
  return (
    <main className="wiki-main">
      <div className="wiki-hero">
        <p className="wiki-eyebrow">Documentation</p>
        <h1 className="wiki-h1">Wiki PaperMemes</h1>
        <p className="wiki-lead">
          Tout ce qu'il faut savoir pour maîtriser PaperMemes.
          Choisis une rubrique dans la barre latérale ou commence par le début.
        </p>
        <Link href="/wiki/installer" className="btn wiki-start-btn">
          Commencer →
        </Link>
      </div>

      <div className="wiki-index-grid">
        {WIKI_CATEGORIES.map(cat => (
          <div key={cat.id} className="wiki-index-card">
            <span className="wiki-index-label">{cat.label}</span>
            <ul className="wiki-index-list">
              {cat.articles.map(a => (
                <li key={a.slug}>
                  <Link href={`/wiki/${a.slug}`} className="wiki-index-link">
                    <span className="wiki-index-link-title">{a.title}</span>
                    <span className="wiki-index-link-desc">{a.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}

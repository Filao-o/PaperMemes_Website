import type { Metadata } from 'next';
import Link from 'next/link';
import { WIKI_CATEGORIES } from '@/lib/wiki';

export const metadata: Metadata = {
  title: 'Wiki PaperMemes — Guide & documentation',
  description: "Le guide complet de PaperMemes : installation, wallet virtuel, TP/SL, rugcheck, analytics et plus.",
};

export default function WikiPage() {
  return (
    <main className="wiki-index-page">
      <div className="wiki-index-hero">
        <p className="wiki-index-eyebrow">Documentation</p>
        <h1 className="wiki-index-h1">Wiki PaperMemes</h1>
        <p className="wiki-index-lead">
          Tout ce qu&apos;il faut savoir pour maîtriser PaperMemes.
          Choisis une rubrique ci-dessous ou commence par le début.
        </p>
        <Link href="/wiki/installer" className="wiki-index-start-btn">
          Commencer →
        </Link>
      </div>

      <div className="wiki-index-categories">
        {WIKI_CATEGORIES.map(cat => (
          <div key={cat.id} className="wiki-index-cat">
            <h2 className="wiki-index-cat-title">{cat.label}</h2>
            <ul className="wiki-index-cat-list">
              {cat.articles.map(a => (
                <li key={a.slug}>
                  <Link href={`/wiki/${a.slug}`} className="wiki-index-cat-link">
                    <span className="wiki-index-cat-link-title">{a.title}</span>
                    <span className="wiki-index-cat-link-desc">{a.description}</span>
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

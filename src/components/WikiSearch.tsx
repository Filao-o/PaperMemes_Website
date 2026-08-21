'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { WIKI_CATEGORIES } from '@/lib/wiki';

export default function WikiSearch() {
  const [query, setQuery] = useState('');

  const allArticles = useMemo(
    () => WIKI_CATEGORIES.flatMap(cat =>
      cat.articles.map(a => ({ ...a, catLabel: cat.label }))
    ),
    []
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return allArticles.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q)
    );
  }, [query, allArticles]);

  return (
    <div className="wiki-search-wrap">
      <div className="wiki-search-box">
        <svg className="wiki-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="search"
          placeholder="Rechercher dans le wiki…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="wiki-search-input"
          aria-label="Rechercher dans le wiki"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="wiki-search-clear"
            aria-label="Effacer la recherche"
          >
            ×
          </button>
        )}
      </div>

      {results !== null && (
        <div className="wiki-search-results-wrap">
          {results.length > 0 ? (
            <ul className="wiki-search-results">
              {results.map(a => (
                <li key={a.slug}>
                  <Link href={`/wiki/${a.slug}`} className="wiki-search-result">
                    <span className="wiki-search-result-cat">{a.catLabel}</span>
                    <span className="wiki-search-result-title">{a.title}</span>
                    <span className="wiki-search-result-desc">{a.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="wiki-search-empty">Aucun résultat pour « {query} ».</p>
          )}
        </div>
      )}
    </div>
  );
}

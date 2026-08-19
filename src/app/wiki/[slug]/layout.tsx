'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WIKI_CATEGORIES } from '@/lib/wiki';

export default function WikiArticleLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="wiki-shell">
      <aside className="wiki-sidebar">
        <div className="wiki-sidebar-inner">
          <div className="wiki-sidebar-header">
            <Link href="/wiki" className="wiki-sidebar-back">← Wiki</Link>
          </div>
          <nav className="wiki-nav">
            {WIKI_CATEGORIES.map(cat => (
              <div key={cat.id} className="wiki-nav-group">
                <span className="wiki-nav-label">{cat.label}</span>
                {cat.articles.map(article => {
                  const href = `/wiki/${article.slug}`;
                  const active = pathname === href;
                  return (
                    <Link
                      key={article.slug}
                      href={href}
                      className={`wiki-nav-link${active ? ' active' : ''}`}
                    >
                      {article.title}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      <div className="wiki-content">
        {children}
      </div>
    </div>
  );
}

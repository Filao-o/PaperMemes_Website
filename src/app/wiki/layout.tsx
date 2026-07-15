'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WIKI_CATEGORIES } from '@/lib/wiki';

export default function WikiLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="wiki-shell">
      <aside className="wiki-sidebar">
        <div className="wiki-sidebar-inner">
          <div className="wiki-sidebar-header">
            <span className="wiki-sidebar-title">Documentation</span>
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

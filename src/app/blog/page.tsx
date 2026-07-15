import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog PaperMemes — Paper trading & memecoins Solana',
  description: 'Guides, stratégies et conseils sur le paper trading de memecoins Solana. Apprends à trader sans risque réel.',
  robots: { index: true, follow: true },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="blog-index-page">
      <div className="blog-index-container">
        <header className="blog-index-header">
          <p className="blog-eyebrow">Blog</p>
          <h1 className="blog-index-title">Paper trading & memecoins Solana</h1>
          <p className="blog-index-lead">
            Guides pratiques, stratégies et analyses pour progresser en paper trading.
          </p>
        </header>

        <div className="blog-grid">
          {posts.map(post => {
            const dateFormatted = new Date(post.date).toLocaleDateString('fr-FR', {
              day: 'numeric', month: 'long', year: 'numeric',
            });
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-card-tags">
                  {post.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="blog-tag">{tag}</span>
                  ))}
                </div>
                <h2 className="blog-card-title">{post.title}</h2>
                <p className="blog-card-desc">{post.description}</p>
                <time className="blog-card-date" dateTime={post.date}>{dateFormatted}</time>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

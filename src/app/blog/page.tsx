import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import BlogIndex from '@/components/BlogIndex';

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

        <BlogIndex posts={posts} />
      </div>
    </main>
  );
}

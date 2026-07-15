import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPost } from '@/lib/blog';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — PaperMemes`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const dateFormatted = new Date(post.date).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <main className="blog-post-page">
      <div className="blog-post-container">

        {/* Header */}
        <header className="blog-post-header">
          <div className="blog-post-tags">
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="blog-tag">{tag}</span>
            ))}
          </div>
          <h1 className="blog-post-title">{post.title}</h1>
          <p className="blog-post-desc">{post.description}</p>
          <time className="blog-post-date" dateTime={post.date}>{dateFormatted}</time>
        </header>

        {/* Cover image */}
        {post.coverImage && (
          <div className="blog-post-cover">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={1200}
              height={630}
              className="blog-post-cover-img"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="blog-post-body">
          <MDXRemote source={post.content} />
        </div>

        {/* CTA */}
        <div className="blog-post-cta">
          <div className="blog-cta-inner">
            <p className="blog-cta-title">Prêt à trader sans risque ?</p>
            <p className="blog-cta-sub">
              PaperMemes simule tes trades sur de vrais prix Solana. Gratuit, sans wallet réel.
            </p>
            <a
              href="https://chromewebstore.google.com/detail/papermemes/apbagjaigpdhajmoacfdgabeeemladoi"
              target="_blank"
              rel="noopener noreferrer"
              className="btn blog-cta-btn"
            >
              Installer l&apos;extension Chrome — gratuit
            </a>
          </div>
        </div>

        {/* Back link */}
        <div className="blog-post-back">
          <Link href="/blog" className="blog-back-link">← Tous les articles</Link>
        </div>

      </div>
    </main>
  );
}

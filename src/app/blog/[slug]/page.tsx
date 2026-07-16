import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPost, extractFaqFromContent } from '@/lib/blog';

const SITE_URL = 'https://papermemes.app';

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

  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = post.ogImage ?? `${SITE_URL}/og-default.jpg`;

  return {
    title: `${post.title} — PaperMemes`,
    description: post.description,
    alternates: { canonical },
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: canonical,
      publishedTime: post.date,
      modifiedTime: post.updatedAt ?? post.date,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
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
  const updatedFormatted = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : null;

  const faqItems = extractFaqFromContent(post.content);
  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = post.ogImage ?? `${SITE_URL}/og-default.jpg`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    author: {
      '@type': 'Person',
      name: post.author ?? 'PaperMemes',
    },
    publisher: {
      '@type': 'Organization',
      name: 'PaperMemes',
      url: SITE_URL,
    },
    url: canonical,
    image: ogImage,
    keywords: post.tags.join(', '),
  };

  const faqSchema = faqItems.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      }
    : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
    ],
  };

  return (
    <main className="blog-post-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="blog-post-container">

        {/* Breadcrumb */}
        <nav className="blog-post-breadcrumb" aria-label="Fil d'Ariane">
          <Link href="/">Accueil</Link>
          <span aria-hidden="true"> › </span>
          <Link href="/blog">Blog</Link>
          <span aria-hidden="true"> › </span>
          <span>{post.title}</span>
        </nav>

        {/* Header */}
        <header className="blog-post-header">
          <div className="blog-post-tags">
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="blog-tag">{tag}</span>
            ))}
          </div>
          <h1 className="blog-post-title">{post.title}</h1>
          <p className="blog-post-desc">{post.description}</p>
          <div className="blog-post-meta">
            {post.author && <span className="blog-post-author">Par {post.author}</span>}
            <time className="blog-post-date" dateTime={post.date}>
              Publié le {dateFormatted}
            </time>
            {updatedFormatted && (
              <time className="blog-post-updated" dateTime={post.updatedAt}>
                · Mis à jour le {updatedFormatted}
              </time>
            )}
            {post.readingTime && (
              <span className="blog-post-reading-time">{post.readingTime} min de lecture</span>
            )}
          </div>
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

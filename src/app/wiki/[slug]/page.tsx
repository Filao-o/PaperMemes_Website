import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticle, getAdjacentArticles, getAllArticles } from '@/lib/wiki';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticles().map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} — Wiki PaperMemes`,
    description: article.description,
  };
}

export default async function WikiArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { prev, next } = getAdjacentArticles(slug);

  return (
    <article className="wiki-article">
      <div
        className="wiki-article-body"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <nav className="wiki-pagination">
        {prev ? (
          <Link href={`/wiki/${prev.slug}`} className="wiki-pagination-link wiki-pagination-prev">
            <span className="wiki-pagination-dir">← Précédent</span>
            <span className="wiki-pagination-title">{prev.title}</span>
          </Link>
        ) : <div />}
        {next ? (
          <Link href={`/wiki/${next.slug}`} className="wiki-pagination-link wiki-pagination-next">
            <span className="wiki-pagination-dir">Suivant →</span>
            <span className="wiki-pagination-title">{next.title}</span>
          </Link>
        ) : <div />}
      </nav>
    </article>
  );
}

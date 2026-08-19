'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/lib/blog';

type Sort = 'recent' | 'oldest';

export default function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>('recent');

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach(p => p.tags.forEach(t => set.add(t)));
    return [...set];
  }, [posts]);

  const toggleTag = (tag: string) =>
    setActiveTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );

  const filtered = useMemo(() => {
    const list = activeTags.length
      ? posts.filter(p => activeTags.some(t => p.tags.includes(t)))
      : [...posts];
    return sort === 'oldest' ? list.reverse() : list;
  }, [posts, activeTags, sort]);

  return (
    <>
      <div className="blog-filters">
        <div className="blog-filter-tags">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`blog-filter-tag${activeTags.includes(tag) ? ' active' : ''}`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="blog-filter-sort">
          <button
            onClick={() => setSort('recent')}
            className={`blog-sort-btn${sort === 'recent' ? ' active' : ''}`}
          >
            Plus récents
          </button>
          <button
            onClick={() => setSort('oldest')}
            className={`blog-sort-btn${sort === 'oldest' ? ' active' : ''}`}
          >
            Moins récents
          </button>
        </div>
      </div>

      <div className="blog-grid">
        {filtered.map(post => {
          const dateFormatted = new Date(post.date).toLocaleDateString('fr-FR', {
            day: 'numeric', month: 'long', year: 'numeric',
          });
          return (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
              <div className="blog-card-tags">
                {post.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="blog-tag">{tag}</span>
                ))}
              </div>
              <h2 className="blog-card-title">{post.title}</h2>
              <p className="blog-card-desc">{post.description}</p>
              <div className="blog-card-meta">
                <time className="blog-card-date" dateTime={post.date}>{dateFormatted}</time>
                {post.readingTime != null && (
                  <span className="blog-card-reading-time">{post.readingTime} min de lecture</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

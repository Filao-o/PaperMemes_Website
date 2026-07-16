import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

const SITE_URL = 'https://papermemes.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const blogUrls: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt ?? post.date,
    changeFrequency: 'monthly',
    priority: 0.7,
    alternates: {
      languages: {
        fr: `${SITE_URL}/blog/${post.slug}`,
        // en: `${SITE_URL}/en/blog/${post.slug}`,
        // es: `${SITE_URL}/es/blog/${post.slug}`,
      },
    },
  }));

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/wiki`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/pro`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  return [...staticUrls, ...blogUrls];
}

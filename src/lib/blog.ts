import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  author?: string;
  tags: string[];
  coverImage?: string;
  ogImage?: string;
  entities?: string[];
  readingTime?: number;
  template?: 'guide' | 'comparatif' | 'definition';
  content: string;
}

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));
  return files
    .map(file => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
      const { data, content } = matter(raw);
      return {
        slug: data.slug ?? file.replace('.mdx', ''),
        title: data.title ?? '',
        description: data.description ?? '',
        date: data.date ?? '',
        updatedAt: data.updatedAt,
        author: data.author,
        tags: data.tags ?? [],
        coverImage: data.coverImage,
        ogImage: data.ogImage ?? data.coverImage,
        entities: data.entities ?? [],
        readingTime: data.readingTime ?? estimateReadingTime(content),
        template: data.template,
        content,
      } as BlogPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find(p => p.slug === slug);
}

export function extractFaqFromContent(content: string): Array<{ question: string; answer: string }> {
  const faqSection = content.match(/## Questions fréquentes[\s\S]*/);
  if (!faqSection) return [];

  const faqBlock = faqSection[0];
  const pairs: Array<{ question: string; answer: string }> = [];
  const questionBlocks = faqBlock.split(/^### /m).slice(1);

  for (const block of questionBlocks) {
    const lines = block.trim().split('\n');
    const question = lines[0].trim();
    const answer = lines
      .slice(1)
      .join(' ')
      .replace(/\[.*?\]/g, '')
      .replace(/\*\*/g, '')
      .trim();
    if (question && answer) pairs.push({ question, answer });
  }

  return pairs;
}

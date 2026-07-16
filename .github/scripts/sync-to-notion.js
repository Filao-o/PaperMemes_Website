const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const notionPkg = require('@notionhq/client');
const Client = notionPkg.Client ?? notionPkg.default?.Client ?? notionPkg;

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DATABASE_ID = process.env.NOTION_DATABASE_ID;
const SITE_URL = process.env.SITE_URL || 'https://papermemes.app';

function getChangedMdxFiles() {
  try {
    const output = execSync('git diff --name-only HEAD~1 HEAD -- content/blog/*.mdx', {
      encoding: 'utf-8',
    }).trim();
    return output ? output.split('\n').filter(f => f.endsWith('.mdx')) : [];
  } catch {
    const output = execSync('git ls-files content/blog/*.mdx', { encoding: 'utf-8' }).trim();
    return output ? output.split('\n') : [];
  }
}

async function findPageBySlug(slug) {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: { property: 'Slug', rich_text: { equals: slug } },
  });
  return response.results[0] ?? null;
}

function buildProperties(data, slug) {
  const url = `${SITE_URL}/blog/${slug}`;
  const props = {
    Titre: { title: [{ text: { content: data.title ?? '' } }] },
    Slug: { rich_text: [{ text: { content: slug } }] },
    Description: { rich_text: [{ text: { content: data.description ?? '' } }] },
    URL: { url },
    Statut: { select: { name: 'Publié' } },
    Template: { select: { name: data.template ?? 'definition' } },
    Tags: { multi_select: (data.tags ?? []).map(t => ({ name: t })) },
    Auteur: { rich_text: [{ text: { content: data.author ?? '' } }] },
    'Temps de lecture': { number: data.readingTime ?? null },
  };

  if (data.date) {
    props['Date de publication'] = { date: { start: data.date } };
  }
  if (data.updatedAt) {
    props['Dernière mise à jour'] = { date: { start: data.updatedAt } };
  }
  if (data.coverImage) {
    props['Image'] = { url: data.coverImage };
  }

  return props;
}

async function main() {
  const files = getChangedMdxFiles();
  if (files.length === 0) {
    console.log('No MDX files changed, nothing to sync.');
    return;
  }

  console.log(`Syncing ${files.length} file(s) to Notion...`);

  for (const file of files) {
    if (!fs.existsSync(file)) {
      console.log(`Skipping deleted file: ${file}`);
      continue;
    }

    const raw = fs.readFileSync(file, 'utf-8');
    const { data } = matter(raw);
    const slug = data.slug ?? path.basename(file, '.mdx');
    const properties = buildProperties(data, slug);

    const existing = await findPageBySlug(slug);

    if (existing) {
      await notion.pages.update({ page_id: existing.id, properties });
      console.log(`Updated: ${slug}`);
    } else {
      await notion.pages.create({ parent: { database_id: DATABASE_ID }, properties });
      console.log(`Created: ${slug}`);
    }
  }

  console.log('Sync complete.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

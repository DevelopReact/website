import {locales} from '@/config';
import {db} from '@shared/lib/db';

import type {MetadataRoute} from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL!; // https://example.com

interface BlogPost {
  slugEn: string;
  slugEs: string;
  updatedAt: string;
}
interface Project {
  slugEn: string;
  slugEs: string;
  updatedAt: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await db.blogPost.findMany({
      where: {published: true},
      include: {
        translations: {
          where: {
            locale: {in: ['en', 'es']},
          },
        },
      },
    });

    return posts.map(
      (post: {
        slug: string;
        translations: Array<{locale: string; slug: string}>;
        updatedAt: Date;
      }) => {
        const enTranslation = post.translations.find(
          (t: {locale: string; slug: string}) => t.locale === 'en',
        );
        const esTranslation = post.translations.find(
          (t: {locale: string; slug: string}) => t.locale === 'es',
        );

        return {
          slugEn: enTranslation?.slug || post.slug,
          slugEs: esTranslation?.slug || post.slug,
          updatedAt: post.updatedAt.toISOString(),
        };
      },
    );
  } catch (error) {
    console.error('Failed to fetch blog posts for sitemap:', error);
    return [];
  }
}

async function getProjects(): Promise<Project[]> {
  // TODO: Implement when projects feature is added
  return [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Статические страницы
  const staticPaths = ['', 'about', 'blog', 'careers', 'projects', 'services', 'terms'];
  for (const path of staticPaths) {
    // Сформируем альтернативы сразу для всех локалей
    const langs: Record<string, string> = {};
    for (const l of locales) langs[l] = `${BASE_URL}/${l}${path ? `/${path}` : ''}`;

    for (const l of locales) {
      entries.push({
        url: langs[l],
        lastModified: new Date(), // при желании подставляй реальную дату правок
        alternates: {languages: langs}, // hreflang
      });
    }
  }

  // Динамика: блог
  const posts = await getBlogPosts();
  for (const p of posts) {
    const langs: Record<string, string> = {
      en: `${BASE_URL}/en/blog/${p.slugEn}`,
      es: `${BASE_URL}/es/blog/${p.slugEs ?? p.slugEn}`,
    };
    for (const l of locales) {
      entries.push({
        url: langs[l],
        lastModified: p.updatedAt,
        alternates: {languages: langs},
      });
    }
  }

  // Динамика: проекты
  const projects = await getProjects();
  for (const pr of projects) {
    const langs: Record<string, string> = {
      en: `${BASE_URL}/en/projects/${pr.slugEn}`,
      es: `${BASE_URL}/es/projects/${pr.slugEs ?? pr.slugEn}`,
    };
    for (const l of locales) {
      entries.push({
        url: langs[l],
        lastModified: pr.updatedAt,
        alternates: {languages: langs},
      });
    }
  }

  return entries;
}

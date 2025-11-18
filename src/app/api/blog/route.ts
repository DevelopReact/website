import {NextRequest, NextResponse} from 'next/server';

import {db} from '@shared/lib/db';

import type {
  LocalizedBlogPostListItem,
  PaginatedBlogPostsResponse,
} from '@entities/blog/model/types';

/**
 * GET /api/blog
 * Fetch paginated list of blog posts
 *
 * Query parameters:
 * - locale: 'en' | 'es' (default: 'en')
 * - limit: number (default: 10, max: 100)
 * - offset: number (default: 0)
 * - tag: string (filter by tag slug)
 */
export async function GET(request: NextRequest) {
  try {
    const {searchParams} = new URL(request.url);

    // Parse query parameters
    const locale = searchParams.get('locale') || 'en';
    const limit = Math.min(parseInt(searchParams.get('limit') || '10', 10), 100);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const tagSlug = searchParams.get('tag');

    // Build where clause
    const where = {
      published: true,
      ...(tagSlug && {
        tags: {
          some: {
            tag: {
              translations: {
                some: {
                  slug: tagSlug,
                  locale,
                },
              },
            },
          },
        },
      }),
    };

    // Fetch total count
    const total = await db.blogPost.count({where});

    // Fetch blog posts with relations, sorted by publishedAt DESC (newest first)
    const posts = await db.blogPost.findMany({
      where,
      orderBy: {publishedAt: 'desc'},
      take: limit,
      skip: offset,
      include: {
        translations: {
          where: {locale},
          take: 1,
        },
        tags: {
          include: {
            tag: {
              include: {
                translations: {
                  where: {locale},
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    // Transform to localized response
    const localizedPosts: LocalizedBlogPostListItem[] = posts
      .filter((post: {translations: unknown[]}) => post.translations.length > 0)
      .map((post: (typeof posts)[0]) => {
        const translation = post.translations[0];
        return {
          id: post.id,
          slug: translation.slug,
          title: translation.title,
          excerpt: translation.excerpt || undefined,
          coverImage: post.coverImage || undefined,
          publishedAt: post.publishedAt?.toISOString(),
          viewCount: post.viewCount,
          tags: post.tags.map((pt: (typeof post.tags)[0]) => {
            const tagTranslation = pt.tag.translations[0];
            return {
              id: pt.tag.id,
              slug: tagTranslation?.slug || pt.tag.slug,
              name: tagTranslation?.name || '',
            };
          }),
        };
      });

    const response: PaginatedBlogPostsResponse = {
      posts: localizedPosts,
      total,
      limit,
      offset,
      hasMore: offset + limit < total,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json({error: 'Failed to fetch blog posts'}, {status: 500});
  }
}

import {NextRequest, NextResponse} from 'next/server';

import {db} from '@shared/lib/db';

import type {BlogPostResponse, LocalizedBlogPost} from '@entities/blog/model/types';

/**
 * GET /api/blog/[slug]
 * Fetch a single blog post by slug
 *
 * Query parameters:
 * - locale: 'en' | 'es' (default: 'en')
 */
export async function GET(request: NextRequest, {params}: {params: Promise<{slug: string}>}) {
  try {
    const {searchParams} = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const {slug} = await params;

    // Find the blog post by slug in translations
    const post = await db.blogPost.findFirst({
      where: {
        translations: {
          some: {
            slug: slug,
            locale: locale,
          },
        },
        published: true,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            bio: true,
          },
        },
        translations: {
          where: {
            locale: locale,
          },
        },
        tags: {
          include: {
            tag: {
              include: {
                translations: {
                  where: {
                    locale: locale,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!post || post.translations.length === 0) {
      return NextResponse.json({error: 'Blog post not found'}, {status: 404});
    }

    // Increment view count atomically
    await db.blogPost.update({
      where: {id: post.id},
      data: {viewCount: {increment: 1}},
    });

    // Transform to localized response
    const translation = post.translations[0];
    const localizedPost: LocalizedBlogPost = {
      id: post.id,
      slug: translation.slug,
      title: translation.title,
      content: translation.content,
      excerpt: translation.excerpt || undefined,
      coverImage: post.coverImage || undefined,
      publishedAt: post.publishedAt?.toISOString(),
      viewCount: post.viewCount + 1, // Include the incremented count
      author: {
        id: post.author.id,
        name: post.author.name,
        avatar: post.author.avatar || undefined,
      },
      tags: post.tags.map((pt: (typeof post.tags)[0]) => {
        const tagTranslation = pt.tag.translations[0];
        return {
          id: pt.tag.id,
          slug: tagTranslation?.slug || pt.tag.slug,
          name: tagTranslation?.name || '',
        };
      }),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };

    const response: BlogPostResponse = {
      post: localizedPost,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json({error: 'Failed to fetch blog post'}, {status: 500});
  }
}

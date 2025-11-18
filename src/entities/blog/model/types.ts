import type {Prisma} from '@/generated/prisma/client';

// Extract types from Prisma payloads
type BlogPost = Prisma.BlogPostGetPayload<object>;
type BlogPostTranslation = Prisma.BlogPostTranslationGetPayload<object>;
type BlogPostTag = Prisma.BlogPostTagGetPayload<object>;
type Tag = Prisma.TagGetPayload<object>;
type TagTranslation = Prisma.TagTranslationGetPayload<object>;
type User = Prisma.UserGetPayload<object>;

// Full blog post with all relations
export type BlogPostWithRelations = BlogPost & {
  author: User;
  translations: BlogPostTranslation[];
  tags: Array<
    BlogPostTag & {
      tag: Tag & {
        translations: TagTranslation[];
      };
    }
  >;
};

// Localized blog post for API responses
export interface LocalizedBlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  publishedAt?: string;
  viewCount: number;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  tags: Array<{
    id: string;
    slug: string;
    name: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

// Localized blog post list item (without full content)
export interface LocalizedBlogPostListItem {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  coverImage?: string;
  publishedAt?: string;
  viewCount: number;
  tags: Array<{
    id: string;
    slug: string;
    name: string;
  }>;
}

// Paginated blog post response
export interface PaginatedBlogPostsResponse {
  posts: LocalizedBlogPostListItem[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

// Single blog post response
export interface BlogPostResponse {
  post: LocalizedBlogPost;
}

// Localized tag
export interface LocalizedTag {
  id: string;
  slug: string;
  name: string;
}

// Blog post query parameters
export interface BlogPostQueryParams {
  locale?: string;
  limit?: number;
  offset?: number;
  tag?: string;
  authorId?: string;
}

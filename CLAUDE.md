# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js 15 (App Router)** application with TypeScript, implementing a multilingual website using **next-intl** for internationalization and **Redux Toolkit** for state management. The project follows **Feature-Sliced Design (FSD)** architecture principles.

## Development Commands

```bash
# Install dependencies
yarn install

# Development server (runs on http://localhost:3000)
yarn dev

# Production build
yarn build

# Start production server (port 3000)
yarn start

# Linting (strict: max-warnings=0)
yarn lint

# Format code
yarn format

# Type checking only (no emit)
yarn typecheck
```

## Architecture

### Feature-Sliced Design (FSD)

The codebase follows FSD structure with these layers:

- **`src/app/`** - Next.js App Router pages and layouts
- **`src/processes/`** - Complex multi-feature business processes
- **`src/widgets/`** - Large composite UI blocks (Header, Footer, HeroSection)
- **`src/features/`** - User-facing features with business logic (counter, UserInfoForm)
- **`src/entities/`** - Business entities and domain models
- **`src/shared/`** - Reusable UI components, utilities, styles, and configuration

### Path Aliases (tsconfig.json)

All FSD layers have path aliases configured:

```typescript
@app/*       → ./src/app/*
@processes/* → ./src/processes/*
@widgets/*   → ./src/widgets/*
@features/*  → ./src/features/*
@entities/*  → ./src/entities/*
@shared/*    → ./src/shared/*
@i18n/*      → ./src/i18n/*
@store/*     → ./src/store/*
@providers/* → ./src/app-providers/*
@/*          → ./src/*
```

Use these aliases consistently when importing across layers.

## General Instruction for Claude Code

- **Always run formating and checking** after making any code changes

## Blog API & Database

### Database Overview

The project uses **Prisma ORM** with **PostgreSQL** for the blog feature, implementing a scalable i18n-friendly architecture.

### Database Schema

The blog database consists of 6 main tables:

#### Core Tables

- **`users`** - Blog post authors
  - Fields: `id`, `email` (unique), `name`, `avatar`, `bio`, timestamps
- **`blog_posts`** - Main blog posts table (language-agnostic)
  - Fields: `id`, `slug` (unique), `coverImage`, `published`, `publishedAt`, `authorId`, timestamps
  - Indexes: `(published, publishedAt DESC)`, `authorId`
  - Foreign key: `authorId` → `users.id` (CASCADE)
- **`tags`** - Tag system (language-agnostic)
  - Fields: `id`, `slug` (unique), timestamps

#### Translation Tables

- **`blog_post_translations`** - Localized blog post content
  - Fields: `id`, `postId`, `locale`, `slug`, `title`, `excerpt`, `content`, timestamps
  - Unique constraints: `(postId, locale)`, `(locale, slug)`
  - Foreign key: `postId` → `blog_posts.id` (CASCADE)
- **`tag_translations`** - Localized tag names
  - Fields: `id`, `tagId`, `locale`, `name`, `slug`, timestamps
  - Unique constraints: `(tagId, locale)`, `(locale, slug)`
  - Foreign key: `tagId` → `tags.id` (CASCADE)

#### Relations

- **`blog_post_tags`** - Many-to-many relationship
  - Composite primary key: `(postId, tagId)`
  - Foreign keys: CASCADE delete on both sides

### API Endpoints

#### GET `/api/blog`

Fetch paginated list of blog posts.

**Query Parameters:**

- `locale` (optional): `en` | `es` (default: `en`)
- `limit` (optional): Number, max 100 (default: `10`)
- `offset` (optional): Number (default: `0`)
- `tag` (optional): Filter by tag slug

**Response:**

```typescript
{
  posts: LocalizedBlogPostListItem[],
  total: number,
  limit: number,
  offset: number,
  hasMore: boolean
}
```

**Features:**

- Sorted by `publishedAt DESC` (newest first)
- Only returns published posts
- Filters by tag slug if provided
- Returns localized content based on locale parameter

#### GET `/api/blog/[slug]`

Fetch a single blog post by slug.

**Query Parameters:**

- `locale` (optional): `en` | `es` (default: `en`)

**Response:**

```typescript
{
  post: LocalizedBlogPost
}
```

**Features:**

- Accepts locale-specific slugs (e.g., `/api/blog/mi-post?locale=es`)
- Returns full content including author and tags
- Returns 404 if post not found or not published

### Entity Structure (FSD)

Blog entities are located in `src/entities/blog/`:

```
src/entities/blog/
└── model/
    └── types.ts    # TypeScript interfaces and types
```

**Key Types:**

- `BlogPostWithRelations` - Full blog post with all relations
- `LocalizedBlogPost` - Single post API response
- `LocalizedBlogPostListItem` - List item API response
- `PaginatedBlogPostsResponse` - Paginated list response
- `BlogPostQueryParams` - Query parameters interface

### Database Configuration

#### Environment Variables

Add to `.env.local`:

```env
# PostgreSQL connection string
DATABASE_URL="postgresql://username:password@localhost:5432/apibim"

# Site URL for sitemap
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

#### Prisma Configuration

- **Schema**: `prisma/schema.prisma`
- **Config**: `prisma.config.ts` (loads `.env.local` automatically)
- **Migrations**: `prisma/migrations/`
- **Generated client**: `src/generated/prisma/`

### Prisma Commands

```bash
# Generate Prisma client (after schema changes)
npx prisma generate

# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations in production
npx prisma migrate deploy

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Check migration status
npx prisma migrate status
```

### Working with Blog Data

#### Database Client

The Prisma client singleton is available at `src/shared/lib/db.ts`:

```typescript
import { db } from '@shared/lib/db';

// Example: Fetch all published posts
const posts = await db.blogPost.findMany({
  where: { published: true },
  include: { author: true, translations: true },
});
```

#### Adding Blog Data

Use Prisma Studio (`npx prisma studio`) or create a seed script:

1. Create a user (author)
2. Create tags with translations
3. Create a blog post with translations
4. Link tags to blog post via `blog_post_tags`

#### Sitemap Integration

The `src/app/sitemap.ts` file automatically fetches published blog posts and includes them in the sitemap with proper localized URLs and `hreflang` tags.

### Migration History

- `20251109184109_init_blog_schema` - Initial blog schema with users, posts, translations, tags, and relations

## Internationalization (i18n)

### Configuration

- **Supported locales**: `en` (default), `es`
- **Routing**: Middleware-based locale routing via next-intl
- **Locale detection**: URL path → Cookie (`NEXT_LOCALE`) → Default (`en`)
- **Translation files**: `src/i18n/messages/{locale}.json`

### Important Files

- `src/config.ts` - Locale configuration and constants
- `src/i18n/routing.ts` - next-intl routing configuration
- `src/i18n/request.ts` - Server-side locale resolution
- `src/app/[locale]/layout.tsx` - Locale-aware root layout with metadata

### Adding Translations

1. Add translation keys to `src/i18n/messages/en.json` and `src/i18n/messages/es.json`
2. Use `useTranslations()` in client components or `getTranslations()` in server components
3. Update SEO metadata in the `SEO` namespace for each locale

### Routing

All user-facing routes are under `/[locale]/` (e.g., `/en/about`, `/es/services`). The middleware automatically handles locale resolution and redirects.

## State Management (Redux Toolkit)

### Store Configuration

- **Store**: `src/store/index.ts`
- **Type exports**: `RootState`, `AppDispatch`

### Adding New Features with Redux

1. Create feature slice in `src/features/{feature-name}/model/slice.ts`
2. Import and register reducer in `src/store/index.ts`:

   ```typescript
   import newFeature from '@features/new-feature/model/slice';

   export const store = configureStore({
     reducer: {
       counter,
       newFeature, // Add here
     },
     // ...
   });
   ```

3. Use `useSelector` and `useDispatch` hooks from `react-redux`

## Styling

- **CSS Framework**: SASS/SCSS modules
- **Global styles**: `src/shared/styles/globals.scss`
- **Global imports**: Auto-imported via `next.config.ts`:
  ```scss
  @use 'shared/styles/global-import' as *;
  ```
- **Component styles**: Co-located `.module.scss` files

## SEO & Metadata

### Metadata Configuration

Each locale route generates:

- Localized `<title>` and `<meta description>`
- `hreflang` alternates for all supported locales
- OpenGraph tags (og:title, og:description, og:url, og:locale)
- Twitter Card metadata
- Canonical URLs

### Sitemap

- **File**: `src/app/sitemap.ts`
- **Environment variable**: `NEXT_PUBLIC_SITE_URL` (must be set for sitemap generation)
- **Static pages**: Listed in `staticPaths` array (about, blog, careers, projects, services, terms)
- **Dynamic content**:
  - ✅ `getBlogPosts()` - Fetches published blog posts from database with localized slugs
  - 🔜 `getProjects()` - To be implemented when projects feature is added

**When adding new top-level routes**, update the `staticPaths` array in `src/app/sitemap.ts`.

## Docker

### Build & Run

```bash
# Build image
docker build -t apibim .

# Run container
docker run -p 3000:3000 apibim
```

### Multi-stage Build

- **Stage 1 (builder)**: Installs dependencies and builds Next.js app
- **Stage 2 (runner)**: Production-only dependencies and optimized runtime
- **Health checks**: curl is pre-installed in the runner image

## Code Quality

### ESLint Rules

- **Import order**: Enforced with auto-alphabetization and newline separation
- **Unused imports**: Auto-detected and treated as errors
- **Console logs**: Warnings (except `console.warn` and `console.error`)
- **Unused variables**: Variables prefixed with `_` are ignored

### Import Order Groups (enforced)

1. Node.js built-ins
2. External packages
3. Internal/aliased imports
4. Parent/sibling/index imports
5. Object imports
6. Type imports

## Project-Specific Notes

### Locale-Aware Components

When creating new pages:

1. Use `setRequestLocale(locale)` in server components for static generation
2. Wrap with `NextIntlClientProvider` for client-side translations
3. Generate static params with `generateStaticParams()` for all locales

### Health Check

API route available at `/api/health` for container health checks and monitoring.

### Available Routes

Access the application at:

- English: `http://localhost:3000/en`
- Spanish: `http://localhost:3000/es`

Root URL (`/`) redirects to the default locale (`/en`).

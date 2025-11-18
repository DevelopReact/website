## Quick start

```bash
yarn install
yarn dev
```

Open http://localhost:3000/en or http://localhost:3000/es

## Build

```bash
yarn install
yarn build
yarn start
```

## Tech

- Next.js App Router (15.x), TypeScript
- next-intl (middleware-based locale routing)
- Redux Toolkit + react-redux
- FSD structure: app / processes / pages (via app router) / widgets / features / entities / shared
- ESLint + Prettier
- SEO: localized metadata, hreflang, sitemap, robots

## Notes

- Translations live in `src/i18n/messages/*.json`
- Add features in `src/features/*` and connect slices in `src/store/index.ts`
- Update `src/app/sitemap.ts` if you add new top-level routes

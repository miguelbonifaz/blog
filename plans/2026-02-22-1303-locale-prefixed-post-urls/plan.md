*IMPORTANT:* As you complete each task below, update this file to mark checkboxes as done - [x] for real-time progress tracking.

## Overview

Implement locale-prefixed routes so blog URLs look like `/es/my-post` and `/en/my-post`, migrate existing posts to a locale-aware content structure, and preserve backward compatibility from old routes.

Assumption (default): strict locale matching (if a post does not exist in the requested locale, return 404).

## Phase 1 - Routing Foundation

- [x] Create locale configuration utilities (supported locales, default locale, validator) in `src/lib/i18n.ts`.
- [x] Introduce locale routes for homepage and post pages:
  - `src/app/[locale]/page.tsx`
  - `src/app/[locale]/[slug]/page.tsx`
- [x] Keep compatibility entry points:
  - `src/app/page.tsx` redirects to `/es`
  - `src/app/blog/[slug]/page.tsx` redirects to `/es/[slug]`
- [x] Ensure invalid locales/slugs return `notFound()` consistently.

## Phase 2 - Content Migration (Existing Posts)

- [x] Create locale content folders:
  - `content/posts/es/`
  - `content/posts/en/`
- [x] Migrate current posts:
  - `content/posts/diseno-minimalista-blogs.mdx` -> `content/posts/es/diseno-minimalista-blogs.mdx`
  - `content/posts/migrando-vscode-ia.mdx` -> `content/posts/es/migrando-vscode-ia.mdx`
  - `content/posts/claude-code-workflow.mdx` -> `content/posts/en/claude-code-workflow.mdx`
- [x] Refactor `src/lib/posts.ts` to read posts by locale path and expose locale-aware APIs.
- [x] Update static params generation to build locale + slug combinations.

## Phase 3 - Locale-Aware Links, Metadata, and Feeds

- [x] Update internal links/components to include locale prefix:
  - `src/components/Navbar.tsx`
  - `src/app/[locale]/page.tsx`
  - `src/app/[locale]/[slug]/page.tsx`
  - `src/components/Footer.tsx`
- [x] Add minimal locale dictionary for UI labels (ES/EN) used in nav/post chrome.
- [x] Update metadata/canonical/openGraph locale handling for locale-prefixed routes.
- [x] Update SEO generators:
  - `src/app/sitemap.ts` to include locale URLs
  - `src/app/rss.xml/route.ts` to emit localized post links

## Phase 4 - Verification and Documentation

- [x] Verify main routes:
  - `/es`
  - `/en`
  - `/es/<slug>`
  - `/en/<slug>`
- [x] Verify legacy redirects:
  - `/` -> `/es`
  - `/blog/<slug>` -> `/es/<slug>`
- [x] Run quality checks:
  - `npm run lint`
  - `npm run build`
- [x] Update authoring docs to reflect new post location and conventions.

Notes:
- `npm run lint` still fails due pre-existing `react/no-unescaped-entities` errors in `demo.jsx` (unrelated to this locale routing work).
- `npm run build` was attempted but failed in this sandbox because `next/font/google` could not fetch Google Fonts (network-restricted environment).

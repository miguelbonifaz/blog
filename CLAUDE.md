# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build (also validates types)
npm run start    # Start production server
npm run lint     # Run ESLint
```

There are no tests in this project.

## Architecture

This is a Next.js 16 App Router blog with MDX content. The key architectural decisions to understand:

### Content pipeline

Posts live as locale-scoped `.mdx` files in `content/posts/<locale>/` (currently `es` and `en`) with YAML frontmatter (`title`, `date`, `excerpt`, `tags`). They are **not** routed directly as Next.js pages — instead, `src/lib/posts.ts` reads and parses them at build time using `gray-matter` and `reading-time`. The main post route is `src/app/[locale]/[slug]/page.tsx`, which fetches a post via `getPostBySlug(locale, slug)` and renders it using `next-mdx-remote/rsc` (a React Server Component). Legacy `/blog/[slug]` URLs redirect to the default locale (`/es/[slug]`).

### MDX rendering and syntax highlighting

`next-mdx-remote/rsc` compiles MDX on the server with this rehype plugin chain (order matters):

1. `rehype-slug` — adds `id` to headings
2. `rehype-autolink-headings` — wraps headings with anchor links
3. `rehype-pretty-code` — Shiki-based syntax highlighting (`one-dark-pro` theme, `keepBackground: false`)

The `mdx-components.tsx` at the project root (required by Next.js) exports `useMDXComponents`, which maps HTML elements to styled React components. The `code` component distinguishes block vs inline by checking for the `data-language` prop that `rehype-pretty-code` injects — block code passes through untouched so Shiki's inline `style` color tokens are preserved. The `pre` component controls the container background (`#111111`) since `keepBackground: false` strips it from the theme.

### @next/mdx vs next-mdx-remote

Both are installed, but they serve different roles:

- `@next/mdx` (via `next.config.ts`) extends `pageExtensions` to allow `.md`/`.mdx` files as pages — not currently used for blog posts.
- `next-mdx-remote/rsc` is what actually renders blog posts in `src/app/[locale]/[slug]/page.tsx`.

Avoid passing non-serializable values (functions, class instances) to `createMDX()` options in `next.config.ts` — Turbopack will reject them with a serialization error.

### Fonts

The layout uses `Ubuntu_Sans` and `Ubuntu_Sans_Mono` from `next/font/google`, exposed as CSS variables `--font-ubuntu-sans` / `--font-ubuntu-sans-mono` and wired into Tailwind via `globals.css` `@theme inline`.

### Adding a new post

Create `content/posts/<locale>/<slug>.mdx` with this frontmatter:

```yaml
---
title: "Post title"
date: "YYYY-MM-DD"
excerpt: "One-line summary shown on homepage."
tags:
  - tag1
  - tag2
---
```

Locales are strict (`es`, `en`). `generateStaticParams` in `src/app/[locale]/[slug]/page.tsx` automatically picks up every locale/slug pair at build time.

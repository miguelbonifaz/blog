# PWA Support

_IMPORTANT:_ As you complete each task below, update this file to mark checkboxes as done - [x] for real-time progress tracking.

## Overview

Add Progressive Web App (PWA) support to the Next.js blog so it can be installed on mobile devices. This includes a web manifest, app icons, theme color, and a service worker for offline caching via `next-pwa`.

The app uses **Next.js 16 App Router** with React 19. The manifest will be declared as a route handler (`src/app/manifest.ts`) per the App Router convention. The service worker will be managed by `next-pwa`.

---

## Phase 1: App Icons

- [x] Create a square base icon (512x512 PNG) at `public/icons/icon-512.png`
- [x] Create a 192x192 variant at `public/icons/icon-192.png`
- [x] Create a maskable 512x512 icon at `public/icons/icon-maskable-512.png` (safe-zone centered content)
- [x] Create a 180x180 Apple touch icon at `public/apple-touch-icon.png`
- [x] Create a 32x32 favicon at `public/favicon-32x32.png` and update `<head>` reference if needed

> Icons can be generated from a single SVG source using a tool like `sharp`, Squoosh, or RealFaviconGenerator. If you use a script, place it at `scripts/generate-icons.ts` and run it once, do not commit the script unless useful long-term.

---

## Phase 2: Web Manifest

- [x] Create `src/app/manifest.ts` exporting a `MetadataRoute.Manifest` object with:
  - `name`: full blog name
  - `short_name`: short version (≤12 chars)
  - `description`: one-line blog description
  - `start_url`: `/`
  - `display`: `standalone`
  - `background_color`: `#111111` (matches code block background)
  - `theme_color`: pick the primary accent color from the design system
  - `icons`: array referencing the icons created in Phase 1
- [x] Verify the manifest is reachable at `/manifest.webmanifest` after `npm run dev`

---

## Phase 3: Service Worker

> Note: `next-pwa` and `@ducanh2912/next-pwa` both rely on workbox-webpack-plugin which does not run under Next.js 16 Turbopack builds. A static service worker was implemented instead:

- [x] Create `public/sw.js` — vanilla JS SW with network-first navigation, cache-first static assets, and cache cleanup on activate
- [x] Create `src/components/ServiceWorkerRegistration.tsx` — client component that registers the SW via `navigator.serviceWorker.register`
- [x] Mount `<ServiceWorkerRegistration />` in `src/app/layout.tsx`
- [x] Add workbox build artifact patterns to `.gitignore` (sw.js is static and committed)
- [x] Run `npm run build` and confirm clean build with `public/sw.js` present

---

## Phase 4: Head / Meta Tags

- [x] In `src/app/layout.tsx`, add or confirm the following `<head>` meta tags are present:
  - `<meta name="theme-color" content="#d97706" />` — via `export const viewport: Viewport`
  - `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />` — via `metadata.icons.apple`
  - `<meta name="mobile-web-app-capable" content="yes" />` — via `metadata.other`
  - `<meta name="apple-mobile-web-app-capable" content="yes" />` — via `metadata.appleWebApp.capable`
  - `<meta name="apple-mobile-web-app-status-bar-style" content="default" />` — via `metadata.appleWebApp.statusBarStyle`
- [x] Use Next.js `Metadata` API (`export const metadata`) for the manifest link — Next.js 16 App Router auto-links `manifest.ts` so no explicit `<link rel="manifest">` is needed, but confirm it appears in the rendered HTML

---

## Phase 5: Validation

- [ ] Run `npm run build && npm run start` and open the app in a Chromium-based browser
- [ ] Open DevTools > Application > Manifest — verify all fields are correct and no errors appear
- [ ] Open DevTools > Application > Service Workers — confirm the SW is registered and active
- [ ] Run Lighthouse PWA audit and aim for all PWA checks passing

- [ ] Test "Add to Home Screen" prompt on Android (Chrome) and iOS (Safari share sheet)
- [ ] Confirm the app launches in standalone mode (no browser chrome) after install

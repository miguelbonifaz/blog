# Interface Design System

## Direction: Sophistication & Trust

Editorial blog aesthetic. Flat, typography-driven, warm-neutral palette with amber accent. No shadows — depth via borders and background contrast. Three-font system with clear semantic roles.

---

## Color Tokens

All colors are CSS variables consumed via Tailwind's arbitrary value syntax `[var(--token)]`.

### Light Theme (`:root`)
| Token | Value | Usage |
|---|---|---|
| `--background` | `#f8f7f3` | Page background (cream) |
| `--foreground` | `#1c1917` | Body text (near-black brown) |
| `--heading` | `#0f172a` | Heading text (dark slate) |
| `--muted` | `#57534e` | Secondary text, metadata |
| `--muted-2` | `#78716c` | Tertiary text |
| `--border` | `#d6d3d1` | Dividers, container borders |
| `--border-strong` | `#a8a29e` | Emphasis borders |
| `--surface` | `#ffffff` | Cards, containers |
| `--surface-2` | `#f5f5f4` | Form inputs, table headers |
| `--accent` | `#b45309` | Links, CTAs, highlights (burnt orange) |
| `--accent-muted` | `#92400e` | Muted accent, tags |
| `--accent-contrast` | `#78350f` | Darkest amber (rare) |
| `--nav-bg` | `rgba(248,247,243,0.95)` | Sticky nav background |

### Dark Theme (`.dark`)
| Token | Value |
|---|---|
| `--background` | `#0a0a0a` |
| `--foreground` | `#e5e5e5` |
| `--heading` | `#ffffff` |
| `--muted` | `#a3a3a3` |
| `--muted-2` | `#737373` |
| `--border` | `#262626` |
| `--border-strong` | `#404040` |
| `--surface` | `#111111` |
| `--surface-2` | `#171717` |
| `--accent` | `#d97706` |
| `--accent-muted` | `#92400e` |
| `--accent-contrast` | `#fde68a` |
| `--nav-bg` | `rgba(10,10,10,0.95)` |

### Color Rules
- Use opacity modifiers for layering: `/10` overlays, `/50`–`/80` borders, `/90` hover states
- Never hardcode hex — always use CSS variable tokens
- Accent is the single call-to-action color

---

## Typography

### Font Families
| Role | Variable | Font | Usage |
|---|---|---|---|
| Body / UI | `--font-ubuntu-sans` | Ubuntu Sans | All prose, labels, navigation |
| Headings | `--font-lora` | Lora (serif) | H1–H3, emphasis |
| Mono | `--font-ubuntu-sans-mono` | Ubuntu Sans Mono | Code, metadata, dates |

Tailwind aliases: `font-sans`, `font-mono`, `font-serif`

### Type Scale
| Context | Class | Size |
|---|---|---|
| Article h1 | `text-3xl md:text-4xl` | 1.875rem / 2.25rem |
| Article h2 | `text-2xl` | 1.5rem |
| Article h3 | `text-xl` | 1.25rem |
| Body prose | `text-[17px]` | 17px |
| Body default | `text-base` | 1rem (base = 1.2rem) |
| Secondary | `text-sm` | 0.875rem |
| Metadata | `text-xs` / `text-[11px]` | 0.75rem / 11px |
| Label tiny | `text-[10px]` | 10px |
| Code blocks | `text-[13.5px]` | 13.5px |
| Inline code | `text-[0.875em]` | relative |

### Line Heights
| Context | Value |
|---|---|
| Main headings | `leading-[1.2]` |
| H1 | `leading-[1.25]` |
| H2, H3 | `leading-snug` (1.375) |
| Body prose | `leading-[1.85]` |
| Default lists | `leading-relaxed` (1.625) |

### Letter Spacing
- Headings: `tracking-tight`
- Nav links: `tracking-wide`
- Metadata labels: `tracking-wider` / `tracking-[0.2em]`
- Mono metadata: `tracking-[0.15em]` `uppercase`

### Font Weight
- Default: `font-normal` (400)
- Labels, CTAs, headings: `font-medium` (500)
- Strong emphasis: `font-semibold` (600)

---

## Spacing Grid

Base unit: **4px** (Tailwind default). All spacing is multiples of this unit.

### Common Spacing Values
| Class | Value | Primary Use |
|---|---|---|
| `gap-2` / `space-y-2` | 8px | Tight groupings, form labels |
| `gap-3` | 12px | Icon groups, decorative rules |
| `gap-4` | 16px | Post meta, list items |
| `gap-6` | 24px | Section elements, form groups |
| `gap-8` | 32px | Nav links, post list |
| `mb-4` | 16px | h3, secondary elements |
| `mb-6` | 24px | h1, paragraphs, lists |
| `mb-8` | 32px | Tables, code blocks |
| `mb-12` | 48px | Blog post header, back link |
| `mb-16` | 64px | Hero section, newsletter |
| `py-8` | 32px | Post items |
| `py-12` | 48px | Main content area |
| `px-6` | 24px | Layout, navbar, footer padding |

---

## Border Radius

| Class | Value | Usage |
|---|---|---|
| `rounded` | 6px | Inline code, scroll thumb |
| `rounded-md` | 8px | Buttons, icon actions |
| `rounded-lg` | 12px | Cards, code blocks, newsletter, tables |
| `rounded-r-sm` | 4px right | Blockquote right edge |

---

## Depth Strategy: Borders Only (No Shadows)

The design uses **zero box shadows**. Depth is created through:

1. **Border lines** — `border border-[var(--border)]` for containers
2. **Background contrast** — surface (`#fff`) on background (`#f8f7f3`)
3. **Opacity stacking** — `/50`–`/80` for secondary borders, `/10`–`/30` for overlays
4. **Gradient accents** — `bg-gradient-to-r from-[var(--accent)]/80 via-[var(--accent)]/40 to-transparent` for decorative lines
5. **Color hierarchy** — text contrast replaces z-depth

Never add `box-shadow` or `drop-shadow` utilities.

---

## Component Patterns

### Button: Primary (CTA)
```tsx
<button className="px-5 py-2.5 rounded bg-[var(--accent)]/90 hover:bg-[var(--accent)] font-medium text-sm text-[var(--heading)] dark:text-white transition-colors">
  Label
</button>
```

### Button: Secondary (Icon Action)
```tsx
<button className="h-8 w-8 flex items-center justify-center rounded-md border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
  <Icon className="h-4 w-4" />
</button>
```

### Button: Tertiary (Text Link / Back)
```tsx
<a className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
  Label
</a>
```

### Card / Container
```tsx
<div className="border border-[var(--border)] rounded-lg bg-[var(--surface)] px-6 py-7">
  {/* content */}
</div>
```

### Container with Accent Top Line
```tsx
<div className="border border-[var(--border)]/80 rounded-lg bg-[var(--surface)] overflow-hidden">
  <div className="h-[1px] bg-gradient-to-r from-[var(--accent)]/80 via-[var(--accent)]/40 to-transparent" />
  <div className="px-6 md:px-8 py-7">
    {/* content */}
  </div>
</div>
```

### Divider (Decorative)
```tsx
<div className="h-px bg-[var(--border)]" />
```

### Accent Divider
```tsx
<div className="h-px bg-gradient-to-r from-[var(--accent)]/60 via-[var(--accent)]/20 to-transparent" />
```

### Blockquote
```tsx
<blockquote className="my-10 border-l-2 border-[var(--accent)]/50 pl-6 py-4 pr-4 bg-[var(--accent)]/10 rounded-r-sm italic text-[17px] text-[var(--muted)] leading-relaxed">
```

### Post List Item
```tsx
<article className="py-8 first:pt-0 border-b border-[var(--border)] last:border-0 group">
  <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-wider text-[var(--muted)] mb-4">
    {/* date, tags, read time */}
  </div>
  <h2 className="font-serif text-2xl leading-snug tracking-tight text-[var(--heading)] mb-4 group-hover:text-[var(--accent)] transition-colors">
    Title
  </h2>
  <p className="text-[17px] text-[var(--muted)] leading-[1.85]">Excerpt</p>
</article>
```

---

## Animations

| Name | Behavior | Duration |
|---|---|---|
| `animate-fade-in` | opacity 0→1 | 0.5s ease-out |
| `animate-slide-up` | translateY(-20px) + fade | 0.5s ease-out |
| `animate-slide-in-left` | translateX(-12px) + fade | 0.5s ease-out |
| `.masthead-rule` | scaleX 0→1 from left | 0.6s ease-out |

Staggered list delays: `nth-child` with `0.05s` increments up to `0.4s`.

---

## Layout

- **Max width**: `max-w-2xl` (42rem) for content, centered
- **Horizontal padding**: `px-6 md:px-10`
- **Main vertical padding**: `py-12 md:py-20`
- **Sticky navbar**: `fixed top-0 backdrop-blur-sm` with `--nav-bg`
- **Font base size**: `1.2rem` on `html` (larger-than-default for editorial feel)

---

## Do / Don't

| Do | Don't |
|---|---|
| Use CSS variable tokens for all colors | Hardcode hex values |
| Layer depth with borders and opacity | Use `box-shadow` or `drop-shadow` |
| Use `font-serif` (Lora) for headings | Mix heading font into body copy |
| Use `font-mono` for dates, metadata, tags | Use mono for prose |
| Respect spacing grid (multiples of 4px) | Use arbitrary spacing without reason |
| `rounded-lg` for containers | Use `rounded-full` or `rounded-2xl` |
| Use accent sparingly as highlight | Use accent as background fill |
| Animate with ease-out | Use ease-in or linear on UI transitions |

export const SUPPORTED_LOCALES = ["es", "en"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

export function isLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

export function getDateLocale(locale: Locale): string {
  return locale === "es" ? "es-ES" : "en-US";
}

export function getOgLocale(locale: Locale): string {
  return locale === "es" ? "es_ES" : "en_US";
}

export const UI_COPY = {
  es: {
    nav: {
      home: "Inicio",
      posts: "Artículos",
      blogLabel: "Blog",
      switchTo: "EN",
      switchHref: "/en",
    },
    home: {
      issueLabel: "Desarrollo · IA · Laravel",
      titlePrefix: "Hola, soy",
      intro:
        "Ingeniero de software. Escribo sobre desarrollo frontend, diseño minimalista y cómo integrar la inteligencia artificial en nuestros flujos de trabajo diarios.",
      latestPosts: "Últimos artículos",
      noPosts: "No hay artículos todavía.",
      read: "Leer",
      entrySingular: "entrada",
      entryPlural: "entradas",
    },
    newsletter: {
      label: "Newsletter",
      title: "Artículos directo a tu bandeja",
      description:
        "Cero spam. Solo desarrollo web, productividad y diseño cuando publique algo nuevo.",
      emailPlaceholder: "tu@email.com",
      submit: "Suscribirse",
    },
    post: {
      back: "Volver",
    },
    footer: {
      rss: "RSS",
    },
    metadata: {
      siteTitle: "Miguel Bonifaz - Blog",
      siteDescription:
        "Ingeniero de software. Escribo sobre desarrollo frontend, diseño minimalista e inteligencia artificial.",
    },
  },
  en: {
    nav: {
      home: "Home",
      posts: "Posts",
      blogLabel: "Blog",
      switchTo: "ES",
      switchHref: "/es",
    },
    home: {
      issueLabel: "Development · AI · Laravel",
      titlePrefix: "Hi, I'm",
      intro:
        "Software engineer writing about frontend development, minimalist design, and practical ways to integrate AI into everyday workflows.",
      latestPosts: "Latest posts",
      noPosts: "No posts yet.",
      read: "Read",
      entrySingular: "entry",
      entryPlural: "entries",
    },
    newsletter: {
      label: "Newsletter",
      title: "Posts sent to your inbox",
      description:
        "No spam. Just web development, productivity, and design when I publish something new.",
      emailPlaceholder: "you@email.com",
      submit: "Subscribe",
    },
    post: {
      back: "Back",
    },
    footer: {
      rss: "RSS",
    },
    metadata: {
      siteTitle: "Miguel Bonifaz - Blog",
      siteDescription:
        "Software engineer writing about frontend development, minimalist design, and artificial intelligence.",
    },
  },
} as const;

export function getUiCopy(locale: Locale) {
  return UI_COPY[locale];
}


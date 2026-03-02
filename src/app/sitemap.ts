import type { MetadataRoute } from "next";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/lib/i18n";
import { getAllSlugs } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
    },
    ...SUPPORTED_LOCALES.map((locale) => ({
      url: absoluteUrl(`/${locale}`),
    })),
  ];

  const localizedPosts = SUPPORTED_LOCALES.flatMap((locale) =>
    getAllSlugs(locale).map((slug) => ({
      url: absoluteUrl(`/${locale}/${slug}`),
    })),
  );

  const legacyRedirectEntries = getAllSlugs(DEFAULT_LOCALE).map((slug) => ({
    url: absoluteUrl(`/blog/${slug}`),
  }));

  return [...staticEntries, ...localizedPosts, ...legacyRedirectEntries];
}


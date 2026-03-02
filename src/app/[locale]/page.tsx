import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Newsletter } from "@/components/Newsletter";
import { absoluteUrl } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";
import { getDateLocale, getOgLocale, getUiCopy, isLocale, SUPPORTED_LOCALES } from "@/lib/i18n";

interface LocaleHomePageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleHomePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const copy = getUiCopy(locale);

  return {
    title: copy.metadata.siteTitle,
    description: copy.metadata.siteDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: "/es",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: getOgLocale(locale),
      url: absoluteUrl(`/${locale}`),
      title: copy.metadata.siteTitle,
      description: copy.metadata.siteDescription,
    },
  };
}

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const posts = getAllPosts(locale);
  const copy = getUiCopy(locale);
  const dateLocale = getDateLocale(locale);

  return (
    <div className="animate-fade-in">
      <section className="mb-16 pt-2">
        <p
          className="font-mono text-[12px] uppercase tracking-[0.25em] text-[var(--accent)]/80 mb-5"
          style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
        >
          {copy.home.issueLabel}
        </p>

        <h1
          className="font-serif text-4xl md:text-5xl text-[var(--heading)] leading-[1.2] tracking-tight mb-6"
          style={{ fontFamily: "var(--font-lora), serif" }}
        >
          {copy.home.titlePrefix}{" "}
          <em
            className="italic text-[var(--accent)] not-italic"
            style={{ fontStyle: "italic" }}
          >
            Miguel.
          </em>
        </h1>

        <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed max-w-lg">
          {copy.home.intro}
        </p>

        <div className="mt-10 flex items-center gap-3">
          <div className="h-px w-8 bg-[var(--accent)]/60" />
          <div className="h-px flex-1 bg-[var(--border)]/80" />
        </div>
      </section>

      <Newsletter locale={locale} />

      <section id="posts">
        <header className="flex items-baseline justify-between mb-10">
          <h2
            className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted-2)]"
            style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
          >
            {copy.home.latestPosts}
          </h2>
          <span
            className="font-mono text-[11px] text-[var(--muted)]"
            style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
          >
            {posts.length}{" "}
            {posts.length === 1
              ? copy.home.entrySingular
              : copy.home.entryPlural}
          </span>
        </header>

        {posts.length === 0 ? (
          <p className="text-[var(--muted)] text-base">{copy.home.noPosts}</p>
        ) : (
          <div className="flex flex-col divide-y divide-[var(--border)]/70">
            {posts.map((post) => (
              <article
                key={`${post.locale}:${post.slug}`}
                className="post-item group py-8 first:pt-0"
              >
                <Link href={`/${locale}/${post.slug}`} className="block">
                  <div className="flex items-center gap-4 mb-4">
                    <time
                      className="font-mono text-xs text-[var(--muted)] tabular-nums"
                      style={{
                        fontFamily: "var(--font-ubuntu-sans-mono), monospace",
                      }}
                      dateTime={post.date}
                    >
                      {new Date(post.date).toLocaleDateString(dateLocale, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs text-[var(--accent-muted)]/80 uppercase tracking-wider"
                        style={{
                          fontFamily: "var(--font-ubuntu-sans-mono), monospace",
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="md:text-[20px] font-medium text-[var(--foreground)] leading-snug transition-colors duration-200 group-hover:text-[var(--heading)] mb-2">
                    {post.title}
                  </h3>

                  <p className="text-base text-[var(--muted)] leading-relaxed line-clamp-2 transition-colors duration-200 group-hover:text-[var(--muted-2)]">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="h-px w-4 bg-[var(--accent)]" />
                    <span
                      className="font-mono text-[11px] text-[var(--accent)] uppercase tracking-widest"
                      style={{
                        fontFamily: "var(--font-ubuntu-sans-mono), monospace",
                      }}
                    >
                      {copy.home.read}
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}


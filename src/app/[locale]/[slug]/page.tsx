import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import type { Metadata } from "next";
import { getAllLocalizedPostParams, getPostBySlug } from "@/lib/posts";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import {
  getDateLocale,
  getOgLocale,
  getUiCopy,
  isLocale,
  SUPPORTED_LOCALES,
} from "@/lib/i18n";
import { useMDXComponents as getMDXComponents } from "../../../../mdx-components";

interface LocaleBlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return getAllLocalizedPostParams();
}

export async function generateMetadata({
  params,
}: LocaleBlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const post = getPostBySlug(locale, slug);
  if (!post) return {};

  const languageAlternates = Object.fromEntries(
    SUPPORTED_LOCALES.filter((candidate) => getPostBySlug(candidate, slug)).map(
      (candidate) => [candidate, `/${candidate}/${slug}`],
    ),
  );

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/${locale}/${post.slug}`,
      languages: languageAlternates,
    },
    openGraph: {
      type: "article",
      locale: getOgLocale(locale),
      url: absoluteUrl(`/${locale}/${post.slug}`),
      title: post.title,
      description: post.excerpt,
      siteName: SITE_NAME,
      publishedTime: post.date,
      authors: [SITE_NAME],
      tags: post.tags,
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.excerpt,
    },
  };
}

const prettyCodeOptions = {
  theme: "one-dark-pro",
  keepBackground: false,
  defaultLang: "plaintext",
};

export default async function LocaleBlogPostPage({
  params,
}: LocaleBlogPostPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const post = getPostBySlug(locale, slug);
  if (!post) {
    notFound();
  }

  const copy = getUiCopy(locale);
  const components = getMDXComponents({});
  const dateLocale = getDateLocale(locale);
  const postUrl = absoluteUrl(`/${locale}/${post.slug}`);
  const postJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: postUrl,
    mainEntityOfPage: postUrl,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale,
    author: {
      "@type": "Person",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
    },
    keywords: post.tags,
  };

  return (
    <article className="animate-slide-up">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd) }}
      />
      <Link
        href={`/${locale}`}
        className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-12 group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        <span
          className="font-mono text-[11px] uppercase tracking-[0.15em]"
          style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
        >
          {copy.post.back}
        </span>
      </Link>

      <header className="mb-12">
        {post.tags.length > 0 && (
          <div className="flex gap-3 flex-wrap mb-5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-muted)]/80"
                style={{
                  fontFamily: "var(--font-ubuntu-sans-mono), monospace",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <h1
          className="font-serif text-3xl md:text-4xl text-[var(--heading)] leading-[1.25] tracking-tight mb-7"
          style={{ fontFamily: "var(--font-lora), serif" }}
        >
          {post.title}
        </h1>

        <div className="h-[1px] w-full bg-gradient-to-r from-[var(--accent)]/60 via-[var(--border)]/70 to-transparent mb-7" />

        <div className="flex items-center gap-4 text-[13px] text-[var(--muted)]">
          <span
            className="font-mono"
            style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
          >
            {SITE_NAME}
          </span>
          <span className="text-[var(--border-strong)]">·</span>
          <time
            dateTime={post.date}
            className="font-mono tabular-nums"
            style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
          >
            {new Date(post.date).toLocaleDateString(dateLocale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span className="text-[var(--border-strong)]">·</span>
          <span
            className="font-mono"
            style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
          >
            {post.readingTime}
          </span>
        </div>
      </header>

      <div className="prose-content">
        <MDXRemote
          source={post.content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                rehypeAutolinkHeadings,
                [rehypePrettyCode, prettyCodeOptions],
              ],
            },
          }}
        />
      </div>
    </article>
  );
}

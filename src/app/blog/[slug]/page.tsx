import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { getPostBySlug, getAllSlugs } from "@/lib/posts";
import { useMDXComponents } from "../../../../mdx-components";
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}

const prettyCodeOptions = {
  theme: "one-dark-pro",
  keepBackground: false,
  defaultLang: "plaintext",
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const components = useMDXComponents({});

  return (
    <article className="animate-slide-up">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-12 group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        <span
          className="font-mono text-[11px] uppercase tracking-[0.15em]"
          style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
        >
          Volver
        </span>
      </Link>

      {/* Post header */}
      <header className="mb-12">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex gap-3 flex-wrap mb-5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-muted)]/80"
                style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1
          className="font-serif text-3xl md:text-4xl text-[var(--heading)] leading-[1.25] tracking-tight mb-7"
          style={{ fontFamily: "var(--font-lora), serif" }}
        >
          {post.title}
        </h1>

        {/* Amber accent rule */}
        <div className="h-[1px] w-full bg-gradient-to-r from-[var(--accent)]/60 via-[var(--border)]/70 to-transparent mb-7" />

        {/* Meta */}
        <div className="flex items-center gap-4 text-[13px] text-[var(--muted)]">
          <span
            className="font-mono"
            style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
          >
            Miguel Bonifaz
          </span>
          <span className="text-[var(--border-strong)]">·</span>
          <time
            dateTime={post.date}
            className="font-mono tabular-nums"
            style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
          >
            {new Date(post.date).toLocaleDateString("es-ES", {
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

      {/* MDX content */}
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

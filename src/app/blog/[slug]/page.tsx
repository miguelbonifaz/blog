import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { getAllSlugs } from "@/lib/posts";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs(DEFAULT_LOCALE);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    alternates: {
      canonical: `/${DEFAULT_LOCALE}/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  redirect(`/${DEFAULT_LOCALE}/${slug}`);
}

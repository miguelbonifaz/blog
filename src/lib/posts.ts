import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { SUPPORTED_LOCALES, type Locale } from "@/lib/i18n";

const postsRootDirectory = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  locale: Locale;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

function getPostsDirectory(locale: Locale) {
  return path.join(postsRootDirectory, locale);
}

function parsePostFile(locale: Locale, slug: string, fileContents: string): Post {
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    locale,
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    readingTime: stats.text,
    content,
  };
}

export function getAllPosts(locale: Locale): PostMeta[] {
  const postsDirectory = getPostsDirectory(locale);
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const post = parsePostFile(locale, slug, fileContents);
      return {
        locale: post.locale,
        slug: post.slug,
        title: post.title,
        date: post.date,
        excerpt: post.excerpt,
        tags: post.tags,
        readingTime: post.readingTime,
      };
    });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(locale: Locale, slug: string): Post | null {
  const postsDirectory = getPostsDirectory(locale);
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  return parsePostFile(locale, slug, fileContents);
}

export function getAllSlugs(locale: Locale): string[] {
  const postsDirectory = getPostsDirectory(locale);
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""));
}

export function getAllLocalizedPostParams(): Array<{ locale: Locale; slug: string }> {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    getAllSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { Newsletter } from "@/components/Newsletter";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="animate-fade-in">
      {/* ── Hero ── */}
      <section className="mb-16 pt-2">
        {/* Issue label */}
        <p
          className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent)]/80 mb-5"
          style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
        >
          Desarrollo · IA · Diseño
        </p>

        <h1
          className="font-serif text-4xl md:text-5xl text-[var(--heading)] leading-[1.2] tracking-tight mb-6"
          style={{ fontFamily: "var(--font-lora), serif" }}
        >
          Hola, soy{" "}
          <em className="italic text-[var(--accent)] not-italic" style={{ fontStyle: "italic" }}>
            Miguel.
          </em>
        </h1>

        <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed max-w-lg">
          Ingeniero de software. Escribo sobre desarrollo frontend, diseño
          minimalista y cómo integrar la inteligencia artificial en nuestros
          flujos de trabajo diarios.
        </p>

        {/* Decorative rule */}
        <div className="mt-10 flex items-center gap-3">
          <div className="h-px w-8 bg-[var(--accent)]/60" />
          <div className="h-px flex-1 bg-[var(--border)]/80" />
        </div>
      </section>

      {/* ── Newsletter ── */}
      <Newsletter />

      {/* ── Post List ── */}
      <section id="posts">
        <header className="flex items-baseline justify-between mb-10">
          <h2
            className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted-2)]"
            style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
          >
            Últimos artículos
          </h2>
          <span
            className="font-mono text-[11px] text-[var(--muted)]"
            style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
          >
            {posts.length} entrada{posts.length !== 1 ? "s" : ""}
          </span>
        </header>

        {posts.length === 0 ? (
          <p className="text-[var(--muted)] text-base">No hay artículos todavía.</p>
        ) : (
          <div className="flex flex-col divide-y divide-[var(--border)]/70">
            {posts.map((post) => (
              <article key={post.slug} className="post-item group py-8 first:pt-0">
                <Link href={`/blog/${post.slug}`} className="block">
                  {/* Meta row */}
                  <div className="flex items-center gap-4 mb-4">
                    <time
                      className="font-mono text-xs text-[var(--muted)] tabular-nums"
                      style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
                      dateTime={post.date}
                    >
                      {new Date(post.date).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs text-[var(--accent-muted)]/80 uppercase tracking-wider"
                        style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-[18px] md:text-[20px] font-medium text-[var(--foreground)] leading-snug transition-colors duration-200 group-hover:text-[var(--heading)] mb-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-base text-[var(--muted)] leading-relaxed line-clamp-2 transition-colors duration-200 group-hover:text-[var(--muted-2)]">
                    {post.excerpt}
                  </p>

                  {/* Read indicator */}
                  <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="h-px w-4 bg-[var(--accent)]" />
                    <span
                      className="font-mono text-[11px] text-[var(--accent)] uppercase tracking-widest"
                      style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
                    >
                      Leer
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

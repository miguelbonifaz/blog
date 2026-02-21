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
          className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-700/80 mb-5"
          style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
        >
          Desarrollo · IA · Diseño
        </p>

        <h1
          className="font-serif text-4xl md:text-5xl text-white leading-[1.2] tracking-tight mb-6"
          style={{ fontFamily: "var(--font-lora), serif" }}
        >
          Hola, soy{" "}
          <em className="italic text-[#fde68a] not-italic" style={{ fontStyle: "italic" }}>
            Miguel.
          </em>
        </h1>

        <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-lg">
          Ingeniero de software. Escribo sobre desarrollo frontend, diseño
          minimalista y cómo integrar la inteligencia artificial en nuestros
          flujos de trabajo diarios.
        </p>

        {/* Decorative rule */}
        <div className="mt-10 flex items-center gap-3">
          <div className="h-px w-8 bg-amber-700/60" />
          <div className="h-px flex-1 bg-gray-800/60" />
        </div>
      </section>

      {/* ── Newsletter ── */}
      <Newsletter />

      {/* ── Post List ── */}
      <section id="posts">
        <header className="flex items-baseline justify-between mb-8">
          <h2
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500"
            style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
          >
            Últimos artículos
          </h2>
          <span
            className="font-mono text-[10px] text-gray-700"
            style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
          >
            {posts.length} entrada{posts.length !== 1 ? "s" : ""}
          </span>
        </header>

        {posts.length === 0 ? (
          <p className="text-gray-600 text-sm">No hay artículos todavía.</p>
        ) : (
          <div className="flex flex-col divide-y divide-gray-800/50">
            {posts.map((post) => (
              <article key={post.slug} className="post-item group py-7 first:pt-0">
                <Link href={`/blog/${post.slug}`} className="block">
                  {/* Meta row */}
                  <div className="flex items-center gap-3 mb-3">
                    <time
                      className="font-mono text-[11px] text-gray-600 tabular-nums"
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
                        className="font-mono text-[10px] text-amber-800/70 uppercase tracking-wider"
                        style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-[17px] font-medium text-gray-300 leading-snug transition-colors duration-200 group-hover:text-white mb-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 transition-colors duration-200 group-hover:text-gray-500">
                    {post.excerpt}
                  </p>

                  {/* Read indicator */}
                  <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="h-px w-4 bg-amber-700" />
                    <span
                      className="font-mono text-[10px] text-amber-700 uppercase tracking-widest"
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

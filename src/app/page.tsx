import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { Newsletter } from "@/components/Newsletter";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="animate-fade-in">
      {/* Hero / Intro */}
      <section className="mb-14">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
          Hola, soy Miguel.
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
          Ingeniero de software. Escribo sobre desarrollo frontend, diseño
          minimalista y cómo integrar la inteligencia artificial en nuestros
          flujos de trabajo diarios.
        </p>
      </section>

      {/* Newsletter */}
      <Newsletter />

      {/* Post List */}
      <section id="posts">
        <h2 className="text-xl font-semibold text-white tracking-tight mb-8">
          Últimos artículos
        </h2>
        <div className="flex flex-col gap-10">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link
                href={`/blog/${post.slug}`}
                className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6"
              >
                <time className="text-sm text-gray-500 font-mono shrink-0 md:w-32">
                  {new Date(post.date).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                <div>
                  <h3 className="text-lg font-medium text-gray-300 transition-colors group-hover:text-white underline decoration-transparent group-hover:decoration-gray-700 underline-offset-4">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </article>
          ))}

          {posts.length === 0 && (
            <p className="text-gray-500 text-sm">
              No hay artículos todavía.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

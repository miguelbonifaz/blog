import React, { useState } from 'react';
import { ArrowLeft, Moon, Mail } from 'lucide-react';

export default function App() {
  // Estado simple para controlar la navegación ('home' o 'post')
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans flex flex-col">
      {/* Navbar compartida en toda la app */}
      <Navbar setCurrentPage={setCurrentPage} />

      {/* Contenido principal dinámico */}
      <main className="flex-1 flex justify-center px-6 py-12 md:py-20">
        <div className="max-w-2xl w-full">
          {currentPage === 'home' ? (
            <HomePage setCurrentPage={setCurrentPage} />
          ) : (
            <BlogPost setCurrentPage={setCurrentPage} />
          )}
        </div>
      </main>

      {/* Footer compartido */}
      <Footer />
    </div>
  );
}

// ==========================================
// COMPONENTE: NAVBAR
// ==========================================
function Navbar({ setCurrentPage }) {
  return (
    <nav className="w-full px-6 md:px-8 py-4 flex items-center justify-between border-b border-gray-800/40 sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-sm z-50">
      <div 
        onClick={() => setCurrentPage('home')}
        className="font-serif italic font-bold text-xl tracking-tight text-[#fdebd0] hover:text-white transition-colors cursor-pointer"
      >
        Miguel Bonifaz
      </div>

      <div className="flex items-center space-x-6 md:space-x-8">
        <div className="hidden sm:flex items-center space-x-6 text-sm">
          <button onClick={() => setCurrentPage('home')} className="text-gray-400 hover:text-gray-200 transition-colors">Inicio</button>
          <button onClick={() => setCurrentPage('home')} className="text-gray-400 hover:text-gray-200 transition-colors">Posts</button>
        </div>

        <div className="hidden md:flex items-center justify-between bg-[#111111] border border-gray-800 rounded-md px-3 py-1.5 w-64 hover:border-gray-700 transition-colors cursor-text group">
          <span className="text-gray-500 text-sm group-hover:text-gray-400 transition-colors">Search documentation...</span>
          <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-gray-400 bg-black px-1.5 py-0.5 rounded border border-gray-800">
            <span>CTRL</span>
            <span>K</span>
          </div>
        </div>

        <button className="text-gray-400 hover:text-gray-200 transition-colors" aria-label="Toggle dark mode">
          <Moon className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}

// ==========================================
// COMPONENTE: PÁGINA DE INICIO (NUEVO)
// ==========================================
function HomePage({ setCurrentPage }) {
  const posts = [
    {
      id: 1,
      date: 'Feb 19, 2026',
      title: 'Claude Code: a practical workflow for daily development',
      excerpt: 'I use Claude Code as a coding partner to reduce context switching. The workflow is simple: define intent, inspect files, apply patch, then verify.',
      isInteractive: true
    },
    {
      id: 2,
      date: 'Feb 12, 2026',
      title: 'Principios de diseño minimalista para blogs técnicos',
      excerpt: 'Por qué menos es más cuando se trata de leer código y documentación. Reduciendo el ruido visual para mejorar la retención.',
      isInteractive: false
    },
    {
      id: 3,
      date: 'Ene 28, 2026',
      title: 'Migrando de VS Code a un entorno basado en IA',
      excerpt: 'Mi experiencia adoptando nuevas herramientas generativas y cómo reestructuré mis atajos de teclado.',
      isInteractive: false
    }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero / Intro */}
      <section className="mb-14">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
          Hola, soy Miguel.
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
          Ingeniero de software. Escribo sobre desarrollo frontend, diseño minimalista y cómo integrar la inteligencia artificial en nuestros flujos de trabajo diarios.
        </p>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[#111111] border border-gray-800/60 rounded-xl p-6 md:p-8 mb-16 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start gap-5">
          <div className="bg-gray-800/40 p-3 rounded-full w-fit">
            <Mail className="w-5 h-5 text-gray-300" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-200 mb-2">Únete al Newsletter</h3>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed">
              Recibe mis últimos artículos directamente en tu bandeja de entrada. Cero spam, solo contenido útil sobre desarrollo web y productividad.
            </p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="tu@email.com" 
                className="flex-1 bg-[#0a0a0a] border border-gray-800 rounded-lg px-4 py-2 text-sm text-gray-200 focus:outline-none focus:border-gray-500 transition-colors"
                required
              />
              <button 
                type="submit" 
                className="bg-gray-200 hover:bg-white text-black font-medium text-sm px-6 py-2 rounded-lg transition-colors"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Post List */}
      <section>
        <h2 className="text-xl font-semibold text-white tracking-tight mb-8">Últimos artículos</h2>
        <div className="flex flex-col gap-10">
          {posts.map((post) => (
            <article 
              key={post.id} 
              onClick={() => post.isInteractive && setCurrentPage('post')}
              className={`group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 ${post.isInteractive ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <time className="text-sm text-gray-500 font-mono shrink-0 md:w-32">{post.date}</time>
              <div>
                <h3 className={`text-lg font-medium text-gray-300 transition-colors ${post.isInteractive ? 'group-hover:text-white underline decoration-transparent group-hover:decoration-gray-700 underline-offset-4' : ''}`}>
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

// ==========================================
// COMPONENTE: POST DE BLOG (ANTERIOR)
// ==========================================
function BlogPost({ setCurrentPage }) {
  return (
    <article className="animate-in fade-in duration-500 slide-in-from-bottom-4">
      <button 
        onClick={() => setCurrentPage('home')}
        className="flex items-center text-sm text-gray-500 hover:text-gray-300 transition-colors mb-12 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Volver al inicio
      </button>

      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.15] mb-6">
          Claude Code: a practical workflow for daily development
        </h1>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-sm text-gray-400">
            <span className="text-gray-200 font-medium">Miguel</span>
            <span>&middot;</span>
            <time dateTime="2026-02-19">Feb 19, 2026</time>
            <span>&middot;</span>
            <span>1 min read</span>
          </div>
          
          <div className="flex gap-3">
            {['claude-code', 'productivity', 'nextjs', 'ai'].map((tag) => (
              <span 
                key={tag} 
                className="font-mono text-[11px] uppercase tracking-wider text-gray-500 hover:text-gray-300 cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <p className="text-lg leading-relaxed text-gray-300 mb-16">
        I use Claude Code as a coding partner to reduce context switching. The workflow is simple: define intent, inspect files, apply patch, then verify.
      </p>

      <section>
        <h2 className="text-2xl font-semibold text-white tracking-tight mb-6">
          1. Start with clear intent
        </h2>
        <div className="bg-[#111111] border border-gray-800/60 rounded-xl p-6 md:p-8 overflow-x-auto shadow-sm">
          <pre className="font-mono text-sm leading-relaxed text-gray-400">
            <code>
<span className="text-gray-500">Goal:</span> add a bilingual blog post page.<br/>
<span className="text-gray-500">Constraints:</span> preserve existing design system and keep changes isolated.<br/>
<span className="text-gray-500">Definition of done:</span> app builds and posts are visible in /en and /es.
            </code>
          </pre>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-white tracking-tight mb-6">
          2. Keep examples runnable
        </h2>
        <p className="text-lg leading-relaxed text-gray-300 mb-8">
          If the post includes code, I prefer snippets that can be copied and tested quickly.
        </p>
        <div className="bg-[#111111] border border-gray-800/60 rounded-xl p-6 md:p-8 overflow-x-auto shadow-sm">
          <pre className="font-mono text-sm leading-relaxed">
            <code>
<span className="text-pink-400">export function</span> <span className="text-blue-400">summarizeTask</span>(<span className="text-orange-200">task</span>) {'{\n'}
  <span className="text-pink-400">const</span> scope = task.scope <span className="text-pink-400">??</span> <span className="text-green-300">'small'</span>{'\n'}
  <span className="text-pink-400">return</span> <span className="text-green-300">`[</span><span className="text-blue-300">{'${'}scope{'}'}</span><span className="text-green-300">] </span><span className="text-blue-300">{'${'}task.title{'}'}</span><span className="text-green-300">`</span>{'\n'}
{'}\n\n'}
<span className="text-blue-300">console</span>.<span className="text-blue-400">log</span>(<span className="text-blue-400">summarizeTask</span>({'{'} title: <span className="text-green-300">'Publish bilingual post'</span> {'}'}))
            </code>
          </pre>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-white tracking-tight mb-6">
          3. Verify before shipping
        </h2>
        <div className="bg-[#111111] border border-gray-800/60 rounded-xl p-6 overflow-x-auto shadow-sm mb-8">
          <pre className="font-mono text-sm leading-relaxed">
            <code>
<span className="text-pink-400">npm</span> <span className="text-blue-400">run</span> <span className="text-gray-300">build</span>
            </code>
          </pre>
        </div>
        <p className="text-lg leading-relaxed text-gray-300">
          That final build check catches missing imports, invalid front matter, and route mistakes.
        </p>
      </section>

      <div className="mt-20">
        <hr className="border-gray-800/60 mb-10" />
        <p className="text-gray-400 text-lg">
          ¿Quieres leer esta misma idea en español? Lee el post relacionado:{' '}
          <a href="#" className="text-orange-400/80 hover:text-orange-300 transition-colors underline decoration-orange-400/30 underline-offset-4">
            Flujo de trabajo con Claude Code
          </a>
        </p>
      </div>
    </article>
  );
}

// ==========================================
// COMPONENTE: FOOTER
// ==========================================
function Footer() {
  return (
    <footer className="w-full max-w-2xl mx-auto px-6 pb-12 pt-8 flex items-center justify-between text-sm text-gray-500">
      <p>2026 &copy; Miguel Blog.</p>
      <a href="#" className="text-orange-400/80 hover:text-orange-300 transition-colors font-medium">RSS</a>
    </footer>
  );
}
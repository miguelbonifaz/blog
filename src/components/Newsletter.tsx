"use client";

export function Newsletter() {
  return (
    <section className="relative mb-16 border border-gray-800/70 rounded-lg overflow-hidden">
      {/* Warm gradient accent bar */}
      <div className="h-[1px] w-full bg-gradient-to-r from-amber-700/80 via-amber-600/40 to-transparent" />

      <div className="px-6 md:px-8 py-7">
        {/* Label */}
        <p
          className="font-mono text-[9px] uppercase tracking-[0.25em] text-amber-700/70 mb-4"
          style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
        >
          Newsletter
        </p>

        <div className="flex flex-col md:flex-row md:items-end gap-6">
          <div className="flex-1">
            <h3 className="text-base font-medium text-gray-200 mb-1.5">
              Artículos directo a tu bandeja
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              Cero spam. Solo desarrollo web, productividad y diseño cuando
              publique algo nuevo.
            </p>
          </div>

          <form
            className="flex gap-2 md:min-w-[320px]"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 bg-[#0f0f0f] border border-gray-800 rounded px-4 py-2.5 text-sm text-gray-300 placeholder-gray-700 focus:outline-none focus:border-amber-800/60 transition-colors"
              required
            />
            <button
              type="submit"
              className="bg-amber-700/90 hover:bg-amber-600 text-white font-medium text-sm px-5 py-2.5 rounded transition-colors whitespace-nowrap"
            >
              Suscribirse
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Mail } from "lucide-react";

export function Newsletter() {
  return (
    <section className="bg-[#111111] border border-gray-800/60 rounded-xl p-6 md:p-8 mb-16 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-start gap-5">
        <div className="bg-gray-800/40 p-3 rounded-full w-fit">
          <Mail className="w-5 h-5 text-gray-300" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-200 mb-2">
            Únete al Newsletter
          </h3>
          <p className="text-gray-400 text-sm mb-5 leading-relaxed">
            Recibe mis últimos artículos directamente en tu bandeja de entrada.
            Cero spam, solo contenido útil sobre desarrollo web y productividad.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
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
  );
}

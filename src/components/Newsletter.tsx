"use client";

import type { Locale } from "@/lib/i18n";
import { getUiCopy } from "@/lib/i18n";

interface NewsletterProps {
  locale: Locale;
}

export function Newsletter({ locale }: NewsletterProps) {
  const copy = getUiCopy(locale);

  return (
    <section className="relative mb-16 border border-[var(--border)]/80 rounded-lg overflow-hidden bg-[var(--surface)]">
      {/* Warm gradient accent bar */}
      <div className="h-[1px] w-full bg-gradient-to-r from-[var(--accent)]/80 via-[var(--accent)]/40 to-transparent" />

      <div className="px-6 md:px-8 py-7">
        {/* Label */}
        <p
          className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent)]/80 mb-4"
          style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
        >
          {copy.newsletter.label}
        </p>

        <div className="flex flex-col md:flex-row md:items-end gap-6">
          <div className="flex-1">
            <h3 className="text-base font-medium text-[var(--heading)] mb-1.5">
              {copy.newsletter.title}
            </h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed max-w-sm">
              {copy.newsletter.description}
            </p>
          </div>

          <form
            className="flex gap-2 md:min-w-[320px]"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder={copy.newsletter.emailPlaceholder}
              className="flex-1 bg-[var(--surface-2)] border border-[var(--border)] rounded px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-2)] focus:outline-none focus:border-[var(--accent)]/60 transition-colors"
              required
            />
            <button
              type="submit"
              className="bg-[var(--accent)]/90 hover:bg-[var(--accent)] text-[var(--heading)] dark:text-white font-medium text-sm px-5 py-2.5 rounded transition-colors whitespace-nowrap"
            >
              {copy.newsletter.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getUiCopy } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const copy = getUiCopy(locale);

  return (
    <footer className="w-full max-w-2xl mx-auto px-6 md:px-0 pb-12 pt-10">
      {/* Separator */}
      <div className="h-px bg-gradient-to-r from-[var(--accent-muted)]/50 via-[var(--border)]/70 to-transparent mb-10" />

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span
            className="font-serif italic text-base text-[var(--muted)]"
            style={{ fontFamily: "var(--font-lora), serif" }}
          >
            Miguel Bonifaz
          </span>
          <span
            className="font-mono text-[11px] text-[var(--muted-2)] uppercase tracking-widest"
            style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
          >
            © 2026
          </span>
        </div>

        <Link
          href="/rss.xml"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent-muted)]/80 hover:text-[var(--accent)] transition-colors"
          style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
        >
          {copy.footer.rss}
        </Link>
      </div>
    </footer>
  );
}

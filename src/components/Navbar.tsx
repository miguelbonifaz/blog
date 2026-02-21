import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  return (
    <nav className="w-full sticky top-0 z-50 bg-[var(--nav-bg)] backdrop-blur-md">
      {/* Amber gradient rule at the very top */}
      <div className="masthead-border h-[2px] w-full masthead-rule" />

      <div className="px-6 md:px-10 py-4 flex items-center justify-between">
        {/* Brand / Masthead */}
        <Link href="/" className="group flex flex-col leading-none">
          <span
            className="font-serif italic text-xl tracking-tight text-[var(--accent-contrast)] transition-colors group-hover:text-[var(--heading)]"
            style={{ fontFamily: "var(--font-lora), serif" }}
          >
            Miguel Bonifaz
          </span>
          <span
            className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--accent-muted)] mt-0.5 transition-colors group-hover:text-[var(--accent)]"
            style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
          >
            Blog
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-8 text-[13px] tracking-wide">
          <Link
            href="/"
            className="text-[var(--muted-2)] hover:text-[var(--foreground)] transition-colors uppercase tracking-widest text-[11px] font-medium"
          >
            Inicio
          </Link>
          <Link
            href="/#posts"
            className="text-[var(--muted-2)] hover:text-[var(--foreground)] transition-colors uppercase tracking-widest text-[11px] font-medium"
          >
            Artículos
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {/* Bottom separator */}
      <div className="h-px bg-[var(--border)]/70 mx-6 md:mx-10" />
    </nav>
  );
}

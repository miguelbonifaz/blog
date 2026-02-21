import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full max-w-2xl mx-auto px-6 md:px-0 pb-10 pt-8">
      {/* Separator */}
      <div className="h-px bg-gradient-to-r from-amber-800/40 via-gray-800/40 to-transparent mb-8" />

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span
            className="font-serif italic text-sm text-gray-600"
            style={{ fontFamily: "var(--font-lora), serif" }}
          >
            Miguel Bonifaz
          </span>
          <span
            className="font-mono text-[10px] text-gray-800 uppercase tracking-widest"
            style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
          >
            © 2026
          </span>
        </div>

        <Link
          href="/rss.xml"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-800/60 hover:text-amber-600 transition-colors"
          style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
        >
          RSS
        </Link>
      </div>
    </footer>
  );
}

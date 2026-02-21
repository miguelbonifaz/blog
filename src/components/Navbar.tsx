import Link from "next/link";

export function Navbar() {
  return (
    <nav className="w-full sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md">
      {/* Amber gradient rule at the very top */}
      <div className="masthead-border h-[2px] w-full masthead-rule" />

      <div className="px-6 md:px-10 py-4 flex items-center justify-between">
        {/* Brand / Masthead */}
        <Link href="/" className="group flex flex-col leading-none">
          <span
            className="font-serif italic text-xl tracking-tight text-[#fde68a] transition-colors group-hover:text-white"
            style={{ fontFamily: "var(--font-lora), serif" }}
          >
            Miguel Bonifaz
          </span>
          <span
            className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#92400e] mt-0.5 transition-colors group-hover:text-amber-600"
            style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
          >
            Blog
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-8 text-[13px] tracking-wide">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-200 transition-colors uppercase tracking-widest text-[11px] font-medium"
          >
            Inicio
          </Link>
          <Link
            href="/#posts"
            className="text-gray-500 hover:text-gray-200 transition-colors uppercase tracking-widest text-[11px] font-medium"
          >
            Artículos
          </Link>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="h-px bg-gray-800/50 mx-6 md:mx-10" />
    </nav>
  );
}

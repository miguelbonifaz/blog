import Link from "next/link";
import { Moon } from "lucide-react";

export function Navbar() {
  return (
    <nav className="w-full px-6 md:px-8 py-4 flex items-center justify-between border-b border-gray-800/40 sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-sm z-50">
      <Link
        href="/"
        className="font-serif italic font-bold text-xl tracking-tight text-[#fdebd0] hover:text-white transition-colors"
      >
        Miguel Bonifaz
      </Link>

      <div className="flex items-center space-x-6 md:space-x-8">
        <div className="hidden sm:flex items-center space-x-6 text-sm">
          <Link
            href="/"
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="/#posts"
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            Posts
          </Link>
        </div>

        <button
          className="text-gray-400 hover:text-gray-200 transition-colors"
          aria-label="Toggle dark mode"
        >
          <Moon className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}

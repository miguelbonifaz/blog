import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full max-w-2xl mx-auto px-6 pb-12 pt-8 flex items-center justify-between text-sm text-gray-500">
      <p>2026 &copy; Miguel Blog.</p>
      <Link
        href="/rss.xml"
        className="text-orange-400/80 hover:text-orange-300 transition-colors font-medium"
      >
        RSS
      </Link>
    </footer>
  );
}

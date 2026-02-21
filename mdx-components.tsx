import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1
        className="font-serif text-3xl md:text-4xl text-white leading-[1.25] tracking-tight mb-6 mt-14"
        style={{ fontFamily: "var(--font-lora), serif" }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className="font-serif text-2xl text-white tracking-tight leading-snug mb-5 mt-14"
        style={{ fontFamily: "var(--font-lora), serif" }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="font-serif italic text-xl text-gray-200 tracking-tight leading-snug mb-4 mt-10"
        style={{ fontFamily: "var(--font-lora), serif", fontStyle: "italic" }}
      >
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-[17px] leading-[1.85] text-gray-300 mb-6">{children}</p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-amber-500/90 hover:text-amber-400 transition-colors underline decoration-amber-700/40 underline-offset-4 hover:decoration-amber-500/60"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-none text-gray-300 text-[17px] mb-6 space-y-2.5 pl-4 border-l border-gray-800/70">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-gray-300 text-[17px] mb-6 space-y-2.5 ml-2">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed pl-2">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-amber-700/50 pl-6 my-10 text-gray-400 italic text-[17px] leading-relaxed bg-amber-950/10 py-4 pr-4 rounded-r-sm">
        {children}
      </blockquote>
    ),
    // rehype-pretty-code adds data-language to block <code> elements.
    // We pass those through untouched so Shiki's inline color styles are preserved.
    code: ({ children, ...props }) => {
      const isBlock = "data-language" in props;
      if (isBlock) {
        return <code {...props}>{children}</code>;
      }
      return (
        <code
          className="bg-[#181818] text-amber-400/90 px-1.5 py-0.5 rounded text-[0.875em] font-mono border border-gray-800/60"
          style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
        >
          {children}
        </code>
      );
    },
    pre: ({ children, ...props }) => (
      <pre
        className="bg-[#0f0f0f] border border-gray-800/50 rounded-lg p-5 md:p-7 overflow-x-auto my-8 font-mono text-[13.5px] leading-relaxed"
        style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
        {...props}
      >
        {children}
      </pre>
    ),
    hr: () => (
      <div className="flex items-center gap-3 my-12">
        <div className="h-px w-6 bg-amber-700/50" />
        <div className="h-px flex-1 bg-gray-800/50" />
      </div>
    ),
    strong: ({ children }) => (
      <strong className="text-white font-semibold">{children}</strong>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-8 rounded-lg border border-gray-800/60">
        <table className="w-full text-sm text-gray-300 border-collapse">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-b border-gray-800 px-5 py-3 text-left text-[12px] uppercase tracking-wider text-gray-500 bg-[#0f0f0f] font-medium">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-gray-800/40 px-5 py-3 last:border-0 text-[14px]">{children}</td>
    ),
    ...components,
  };
}

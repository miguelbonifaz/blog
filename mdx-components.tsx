import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1
        className="font-serif text-3xl md:text-4xl text-[var(--heading)] leading-[1.25] tracking-tight mb-6 mt-14"
        style={{ fontFamily: "var(--font-lora), serif" }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className="font-serif text-2xl text-[var(--heading)] tracking-tight leading-snug mb-5 mt-14"
        style={{ fontFamily: "var(--font-lora), serif" }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="font-serif italic text-xl text-[var(--foreground)] tracking-tight leading-snug mb-4 mt-10"
        style={{ fontFamily: "var(--font-lora), serif", fontStyle: "italic" }}
      >
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-[17px] leading-[1.85] text-[var(--foreground)] mb-6">{children}</p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-[var(--accent)] hover:text-[var(--accent-muted)] transition-colors underline decoration-[var(--accent)]/30 underline-offset-4 hover:decoration-[var(--accent-muted)]/50"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-none text-[var(--foreground)] text-[17px] mb-6 space-y-2.5 pl-4 border-l border-[var(--border)]">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-[var(--foreground)] text-[17px] mb-6 space-y-2.5 ml-2">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed pl-2">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-[var(--accent)]/50 pl-6 my-10 text-[var(--muted)] italic text-[17px] leading-relaxed bg-[var(--accent)]/10 py-4 pr-4 rounded-r-sm">
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
          className="bg-[var(--surface-2)] text-[var(--accent)] px-1.5 py-0.5 rounded text-[0.875em] font-mono border border-[var(--border)]"
          style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
        >
          {children}
        </code>
      );
    },
    pre: ({ children, ...props }) => (
      <pre
        className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-5 md:p-7 overflow-x-auto my-8 font-mono text-[13.5px] leading-relaxed"
        style={{ fontFamily: "var(--font-ubuntu-sans-mono), monospace" }}
        {...props}
      >
        {children}
      </pre>
    ),
    hr: () => (
      <div className="flex items-center gap-3 my-12">
        <div className="h-px w-6 bg-[var(--accent)]/50" />
        <div className="h-px flex-1 bg-[var(--border)]/80" />
      </div>
    ),
    strong: ({ children }) => (
      <strong className="text-[var(--heading)] font-semibold">{children}</strong>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-8 rounded-lg border border-[var(--border)]">
        <table className="w-full text-sm text-[var(--foreground)] border-collapse">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-b border-[var(--border)] px-5 py-3 text-left text-[12px] uppercase tracking-wider text-[var(--muted)] bg-[var(--surface-2)] font-medium">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-[var(--border)]/60 px-5 py-3 last:border-0 text-[14px]">{children}</td>
    ),
    ...components,
  };
}

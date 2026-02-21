import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.15] mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-white tracking-tight mb-6 mt-16">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-white tracking-tight mb-4 mt-10">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-lg leading-relaxed text-gray-300 mb-6">{children}</p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-orange-400/80 hover:text-orange-300 transition-colors underline decoration-orange-400/30 underline-offset-4"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-gray-300 text-lg mb-6 space-y-2 ml-4">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-gray-300 text-lg mb-6 space-y-2 ml-4">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-gray-700 pl-6 my-8 text-gray-400 italic">
        {children}
      </blockquote>
    ),
    // rehype-pretty-code adds data-language to block <code> elements.
    // We pass those through untouched so Shiki's inline color styles are preserved.
    // Inline <code> (no data-language) gets its own visual treatment.
    code: ({ children, ...props }) => {
      const isBlock = "data-language" in props;
      if (isBlock) {
        return <code {...props}>{children}</code>;
      }
      return (
        <code className="bg-[#1a1a1a] text-orange-300 px-1.5 py-0.5 rounded text-[0.9em] font-mono">
          {children}
        </code>
      );
    },
    // rehype-pretty-code sets keepBackground: false in page.tsx, so we control
    // the background here via className. The token colors come from inline styles on spans.
    pre: ({ children, ...props }) => (
      <pre
        className="bg-[#111111] border border-gray-800/60 rounded-xl p-6 md:p-8 overflow-x-auto shadow-sm my-8 font-mono text-sm leading-relaxed"
        {...props}
      >
        {children}
      </pre>
    ),
    hr: () => <hr className="border-gray-800/60 my-12" />,
    strong: ({ children }) => (
      <strong className="text-white font-semibold">{children}</strong>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm text-gray-300 border-collapse">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-gray-800 px-4 py-2 text-left text-white font-medium bg-[#111111]">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-gray-800 px-4 py-2">{children}</td>
    ),
    ...components,
  };
}

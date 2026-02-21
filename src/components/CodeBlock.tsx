"use client";

import { Check, Copy } from "lucide-react";
import { useMemo, useState } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type PreProps = ComponentPropsWithoutRef<"pre">;

function nodeToText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(nodeToText).join("");
  }

  if (node && typeof node === "object" && "props" in node) {
    const maybeChildren = (node as { props?: { children?: ReactNode } }).props?.children;
    return nodeToText(maybeChildren);
  }

  return "";
}

export function CodeBlock({ children, className, ...props }: PreProps) {
  const [copied, setCopied] = useState(false);

  const textContent = useMemo(() => nodeToText(children), [children]);

  const onCopy = async () => {
    if (!textContent) return;

    try {
      await navigator.clipboard.writeText(textContent);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative my-8">
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? "Código copiado" : "Copiar código"}
        title={copied ? "Copiado" : "Copiar"}
        className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)]/90 text-[var(--muted)] backdrop-blur-sm transition-colors hover:text-[var(--foreground)]"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>

      <pre className={className} {...props}>
        {children}
      </pre>
    </div>
  );
}

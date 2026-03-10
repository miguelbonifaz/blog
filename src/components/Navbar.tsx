"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { Locale } from "@/lib/i18n";
import { getUiCopy } from "@/lib/i18n";

interface NavbarProps {
  locale: Locale;
}

export function Navbar({ locale }: NavbarProps) {
  const copy = getUiCopy(locale);
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on route change / escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { href: `/${locale}`, label: copy.nav.home },
    { href: `/${locale}#posts`, label: copy.nav.posts },
    { href: copy.nav.switchHref, label: copy.nav.switchTo },
  ];

  return (
    <>
      <nav className="w-full sticky top-0 z-50 bg-[var(--nav-bg)] backdrop-blur-md">
        {/* Amber gradient rule at the very top */}
        <div className="masthead-border h-[2px] w-full masthead-rule" />

        <div className="px-6 md:px-10 py-4 flex items-center justify-between">
          {/* Brand / Masthead */}
          <Link
            href={`/${locale}`}
            className="group flex flex-col leading-none"
            onClick={() => setIsOpen(false)}
          >
            <span className="font-sans text-xl tracking-tight text-[var(--accent-contrast)] transition-colors group-hover:text-[var(--heading)]">
              Miguel Bonifaz
            </span>
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--accent-muted)] mt-0.5 transition-colors group-hover:text-[var(--accent)]">
              {copy.nav.blogLabel}
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8 text-[13px] tracking-wide">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--muted-2)] hover:text-[var(--foreground)] transition-colors uppercase tracking-widest text-[11px] font-medium"
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile: ThemeToggle + Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] transition-colors"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Bottom separator */}
        <div className="h-px bg-[var(--border)]/70 mx-6 md:mx-10" />
      </nav>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[var(--background)]/60 backdrop-blur-sm md:hidden"
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile menu panel */}
      <div
        className={`
          fixed top-0 right-0 z-50 h-full w-72 bg-[var(--surface)] border-l border-[var(--border)]
          flex flex-col pt-6 pb-10 px-8
          transform transition-transform duration-300 ease-out
          md:hidden
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        aria-label="Mobile navigation"
      >
        {/* Panel header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex flex-col leading-none">
            <span className="font-serif text-2xl tracking-tight text-[var(--heading)]">
              Miguel Bonifaz
            </span>
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--accent-muted)] mt-1">
              {copy.nav.blogLabel}
            </span>
          </div>
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setIsOpen(false)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Accent rule */}
        <div className="h-px bg-gradient-to-r from-[var(--accent)]/60 via-[var(--accent)]/20 to-transparent mb-8" />

        {/* Nav links */}
        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="py-2.5 font-sans uppercase tracking-widest text-[11px] font-medium text-[var(--muted-2)] hover:text-[var(--accent)] transition-colors border-b border-[var(--border)]/50 last:border-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

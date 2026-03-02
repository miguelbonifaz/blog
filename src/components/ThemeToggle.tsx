"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getStoredTheme(): Theme {
  const stored = window.localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return stored === "light" || stored === "dark"
    ? stored
    : systemPrefersDark
      ? "dark"
      : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const isDark = theme === "dark";
  root.classList.toggle("dark", isDark);
  root.setAttribute("data-theme", theme);
}

export function ThemeToggle() {
  // Start as null so SSR and the initial client render produce identical HTML,
  // preventing the hydration mismatch. The real theme is resolved in useEffect.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const resolved = getStoredTheme();
    setTheme(resolved);
    applyTheme(resolved);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem("theme", nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={theme === "dark" ? "Modo claro" : "Modo oscuro"}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] transition-colors"
    >
      {/* Render nothing until mounted to avoid hydration mismatch */}
      {theme === "dark" ? <Sun className="h-4 w-4" /> : theme === "light" ? <Moon className="h-4 w-4" /> : null}
    </button>
  );
}

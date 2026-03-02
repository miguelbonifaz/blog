import type { Metadata } from "next";
import { Ubuntu_Sans, Ubuntu_Sans_Mono, Lora } from "next/font/google";
import { UI_COPY } from "@/lib/i18n";
import "./globals.css";

const ubuntuSans = Ubuntu_Sans({
  variable: "--font-ubuntu-sans",
  subsets: ["latin"],
});

const ubuntuSansMono = Ubuntu_Sans_Mono({
  variable: "--font-ubuntu-sans-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: UI_COPY.es.metadata.siteTitle,
    template: "%s | Miguel Bonifaz",
  },
  description: UI_COPY.es.metadata.siteDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var storedTheme = localStorage.getItem("theme");
                  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  var theme = storedTheme === "light" || storedTheme === "dark"
                    ? storedTheme
                    : (prefersDark ? "dark" : "light");
                  var root = document.documentElement;
                  root.classList.toggle("dark", theme === "dark");
                  root.setAttribute("data-theme", theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${ubuntuSans.variable} ${ubuntuSansMono.variable} ${lora.variable} font-sans antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}

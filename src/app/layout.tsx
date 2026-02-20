import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Miguel Bonifaz - Blog",
    template: "%s | Miguel Bonifaz",
  },
  description:
    "Ingeniero de software. Escribo sobre desarrollo frontend, diseño minimalista e inteligencia artificial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen bg-[#0a0a0a] text-gray-200 flex flex-col`}
      >
        <Navbar />
        <main className="flex-1 flex justify-center px-6 py-12 md:py-20">
          <div className="max-w-2xl w-full">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Ubuntu_Sans, Ubuntu_Sans_Mono, Lora } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
        className={`${ubuntuSans.variable} ${ubuntuSansMono.variable} ${lora.variable} font-sans antialiased min-h-screen bg-[#0a0a0a] text-gray-200 flex flex-col`}
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

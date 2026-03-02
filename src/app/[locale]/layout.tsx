import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { isLocale } from "@/lib/i18n";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <>
      <Navbar locale={locale} />
      <main className="flex-1 flex justify-center px-6 py-12 md:py-20">
        <div className="max-w-2xl w-full">{children}</div>
      </main>
      <Footer locale={locale} />
    </>
  );
}


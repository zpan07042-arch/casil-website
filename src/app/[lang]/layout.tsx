import type { Lang } from "@/lib/types";
import { I18nProvider } from "@/components/data/I18nProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StarryBackground from "@/components/shared/StarryBackground";

export async function generateStaticParams() {
  return [{ lang: "zh" }, { lang: "en" }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const validLang = (["zh", "en"].includes(lang) ? lang : "zh") as Lang;

  return (
    <I18nProvider lang={validLang}>
      <StarryBackground />
      <div className="flex flex-col min-h-screen relative" style={{ zIndex: 1 }}>
        <Header />
        <main className="flex-1 px-5 md:px-8" style={{ paddingTop: '56px' }}>{children}</main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
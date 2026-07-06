import { getCompanyNews } from "@/lib/db";
import HomePageClient from "@/components/home/HomePageClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let latestNews: Awaited<ReturnType<typeof getCompanyNews>> = [];
  try {
    latestNews = await getCompanyNews(5);
  } catch {
    // DB unavailable — HomePageClient will fall back to i18n keys
  }

  return <HomePageClient latestNews={latestNews} />;
}

import { getAllAnnouncements, getAllYears } from "@/lib/db";
import BackButton from "@/components/shared/BackButton";
import AnnouncementSection from "@/components/shared/AnnouncementSection";

export default async function AllAnnouncementsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const announcements = getAllAnnouncements();
  const years = getAllYears();

  return (
    <>
      <BackButton href={`/${lang}/news`} />
      <AnnouncementSection
        title={lang === "zh" ? "公告中心" : "Announcements"}
        announcements={announcements}
        years={years}
        lang={lang}
      />
    </>
  );
}

import { getPage, getBoardMembers } from "@/lib/db";
import { getPageMeta } from "@/lib/pageMeta";
import AboutContentSection from "@/components/shared/AboutContentSection";
import BoardMembers from "@/components/board/BoardMembers";

export default async function BoardPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = await getPage("board");
  if (!page) return <p className="p-20 text-center text-text-secondary">Content not found.</p>;

  const content = lang === "zh" ? page.content_zh : page.content_en;
  const title = lang === "zh" ? page.title_zh : page.title_en;
  const meta = getPageMeta("board", lang);
  const members = await getBoardMembers();

  return (
    <div style={{ backgroundColor: "#F8FAFE" }}>
      <AboutContentSection
        title={title}
        content=""
        breadcrumb={meta.breadcrumb}
        enLabel={meta.enLabel}
        description={meta.description}
      />
      <BoardMembers members={members} lang={lang} />
    </div>
  );
}

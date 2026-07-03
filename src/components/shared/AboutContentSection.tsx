/**
 * AboutContentSection — 關於我們欄目統一橫幅 + 正文內容
 *
 * 組合 AboutHeader 與正文渲染區塊，
 * 適用於需要同時展示橫幅與長文本的頁面（如關於我們首頁、董事局與管理層）。
 */
import AboutHeader from "@/components/shared/AboutHeader";

function formatContent(text: string): string {
  return text
    .split(/\n\n+/)
    .map((p) => `<p class="mb-4" style="text-indent:2em">${p.trim()}</p>`)
    .join("");
}

export default function AboutContentSection({
  title,
  content,
  breadcrumb,
  enLabel,
  description,
  note,
  bodyFontSize = 18,
}: {
  title: string;
  content: string;
  breadcrumb?: string;
  enLabel?: string;
  description?: string;
  note?: string;
  bodyFontSize?: number;
}) {
  return (
    <>
      <AboutHeader
        title={title}
        breadcrumb={breadcrumb}
        enLabel={enLabel}
        description={description}
        note={note}
      />

      {content && (
        <section className="py-10 md:py-16">
          <div className="max-w-3xl mx-auto px-5 md:px-8">
            <div
              className="max-w-2xl"
              style={{ fontSize: bodyFontSize, color: "#86868B", lineHeight: 1.6 }}
              dangerouslySetInnerHTML={{ __html: formatContent(content) }}
            />
          </div>
        </section>
      )}
    </>
  );
}

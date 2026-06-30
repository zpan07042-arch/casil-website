/**
 * CultureSection — 企業文化正文區塊
 *
 * 僅渲染简介段落，所有卡片（核心價值觀、企業使命、企業願景、合規守則、文化落地）已移除。
 */
export default function CultureSection({
  content,
}: {
  title: string;
  content: string;
  lang: string;
}) {
  return (
    <section className="pt-12 md:pt-20 pb-20 md:pb-28">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <div className="mb-14 md:mb-20">
          <p
            className="text-base md:text-lg text-text-secondary leading-[1.7] max-w-3xl whitespace-pre-line"
            style={{ textIndent: "2em" }}
          >
            {content}
          </p>
        </div>
      </div>
    </section>
  );
}

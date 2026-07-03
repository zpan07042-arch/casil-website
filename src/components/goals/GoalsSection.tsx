export default function GoalsSection({
  title,
  content,
  lang,
}: {
  title: string;
  content: string;
  lang: string;
}) {
  const isZh = lang === "zh";

  return (
    <section className="pt-12 md:pt-20 pb-20 md:pb-28">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <p
          style={{ fontSize: 18, lineHeight: 1.6, textIndent: "2em", marginBottom: 16 }} className="text-text-secondary"
        >
          {content?.split("\n\n")[0] || ""}
        </p>
        <p
          style={{ fontSize: 18, lineHeight: 1.6, textIndent: "2em" }} className="text-text-secondary"
        >
          {content?.split("\n\n")[1] || ""}
        </p>
      </div>
    </section>
  );
}

import type { BoardMember } from "@/lib/types";

export default function BoardMembers({
  members,
  lang,
}: {
  members: BoardMember[];
  lang: string;
}) {
  const isZh = lang === "zh";

  const memberTypesZh: Record<string, string> = {
    executive: "執行董事",
    independent: "獨立非執行董事",
    "non-executive": "非執行董事",
    management: "管理層",
  };

  const memberTypesEn: Record<string, string> = {
    executive: "Executive Directors",
    independent: "Independent Non-executive Directors",
    "non-executive": "Non-executive Directors",
    management: "Management",
  };

  const grouped = members.reduce(
    (acc, m) => {
      const t = m.member_type;
      if (!acc[t]) acc[t] = [];
      acc[t].push(m);
      return acc;
    },
    {} as Record<string, BoardMember[]>
  );

  return (
    <section className="pt-4 md:pt-6 pb-16 md:pb-20">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        {Object.entries(grouped).map(([type, group]) => (
          <div key={type} className="mb-16 last:mb-0">
            {/* ── 副标题 + 分割线 ── */}
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 30, fontWeight: 700, marginBottom: 4 }} className="text-text-primary">
                {isZh ? (memberTypesZh[type] || type) : (memberTypesEn[type] || type)}
              </h2>
              <div
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: "#E9EEF7",
                }}
              />
            </div>
            <div className="space-y-0">
              {group.map((m) => {
                const name = lang === "zh" ? m.name_zh : (m.name_en || m.name_zh);
                const title = lang === "zh" ? m.title_zh : (m.title_en || m.title_zh);
                const bio = lang === "zh" ? m.bio_zh : (m.bio_en || m.bio_zh);

                return (
                  <div key={m.id} className="border-b border-divider last:border-b-0">
                    <div className="w-full text-left py-6">
                      <div className="flex-1 min-w-0">
                        <div style={{ fontSize: 25, fontWeight: 500, color: "#000" }}>
                          {name}
                        </div>
                        <div
                          style={{ fontSize: 18, color: "#000", fontWeight: 400, marginTop: 6 }}
                        >
                          {title}
                        </div>
                      </div>
                      {bio && (
                        <div
                          style={{ fontSize: 18, lineHeight: 1.6, paddingTop: 12, color: "#000" }}
                          dangerouslySetInnerHTML={{ __html: bio }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


"use client";

import { useState } from "react";
import type { BoardMember } from "@/lib/types";

export default function BoardMembers({
  members,
  lang,
}: {
  members: BoardMember[];
  lang: string;
}) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

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
            {/* ── 副标题 + 英文小字 + 分割线 ── */}
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 30, fontWeight: 700, marginBottom: 4 }} className="text-text-primary">
                {isZh ? (memberTypesZh[type] || type) : (memberTypesEn[type] || type)}
              </h2>
              <p
                style={{
                  fontSize: 11,
                  color: "#888E9C",
                  margin: "0 0 16px",
                  letterSpacing: "0.06em",
                }}
              >
                {memberTypesEn[type] || type}
              </p>
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
                const isExpanded = expandedId === m.id;
                const isCore = title.includes("主席") || title.includes("總裁") || title.includes("總會計師") || title.includes("Chairman") || title.includes("CEO") || title.includes("Chief Accountant") || title.includes("Vice President");

                return (
                  <div key={m.id} className="border-b border-divider last:border-b-0">
                    <button
                      onClick={() =>
                        setExpandedId(isExpanded ? null : m.id)
                      }
                      className="w-full text-left py-6 flex items-center justify-between gap-6 group hover:bg-black/[0.02] transition-colors duration-200"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-base font-medium" style={{ color: "#000" }}>
                          {name}
                        </div>
                        <div
                          className="text-[13px] mt-1.5"
                          style={{ color: "#000", fontWeight: isCore ? 600 : 400 }}
                        >
                          {title}
                        </div>
                      </div>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className={`shrink-0 text-text-secondary/40 group-hover:text-text-secondary/70 transition-all duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          d="M4 6l4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded ? "max-h-[1000px] pb-6" : "max-h-0"
                      }`}
                    >
                      {bio && (
                        <p style={{ fontSize: 15, lineHeight: 1.6, paddingBottom: 8, textIndent: "2em" }} className="text-text-secondary/80">
                          {bio}
                        </p>
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


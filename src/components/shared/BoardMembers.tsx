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

  const memberTypes: Record<string, string> = {
    executive: lang === "zh" ? "執行董事" : "Executive Directors",
    independent: lang === "zh" ? "獨立非執行董事" : "Independent Non-executive Directors",
    "non-executive": lang === "zh" ? "非執行董事" : "Non-executive Directors",
  };

  const grouped = members.reduce(
    (acc, m) => {
      const t = memberTypes[m.member_type] || m.member_type;
      if (!acc[t]) acc[t] = [];
      acc[t].push(m);
      return acc;
    },
    {} as Record<string, BoardMember[]>
  );

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        {Object.entries(grouped).map(([type, group]) => (
          <div key={type} className="mb-16 last:mb-0">
            <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-8 pb-3 border-b-2 border-brand/20">
              {type}
            </h2>
            <div className="space-y-0">
              {group.map((m) => {
                const name = lang === "zh" ? m.name_zh : (m.name_en || m.name_zh);
                const title = lang === "zh" ? m.title_zh : (m.title_en || m.title_zh);
                const bio = lang === "zh" ? m.bio_zh : (m.bio_en || m.bio_zh);
                const isExpanded = expandedId === m.id;
                const isCore = title.includes("主席") || title.includes("總裁") || title.includes("Chairman") || title.includes("CEO");

                return (
                  <div key={m.id} className="border-b border-divider last:border-b-0">
                    <button
                      onClick={() =>
                        setExpandedId(isExpanded ? null : m.id)
                      }
                      className="w-full text-left py-6 flex items-center justify-between gap-6 group hover:bg-black/[0.02] transition-colors duration-200"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-base font-medium text-text-primary">
                          {name}
                        </div>
                        <div
                          className={`text-[13px] mt-1.5 ${
                            isCore
                              ? "text-text-primary font-semibold"
                              : "text-text-secondary"
                          }`}
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
                        <p className="text-[13px] leading-relaxed text-text-secondary/80 pb-2">
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


"use client";

import { motion } from "framer-motion";
import PageBanner from "@/components/shared/PageBanner";

function formatContent(text: string): string {
  // 如果內容已包含 HTML 標籤（來自富文本編輯器），直接返回
  if (/<[^>]+>/.test(text)) {
    return text;
  }
  // 純文本：按段落分割
  return text
    .split(/\n\n+/)
    .map((p) => `<p class="mb-4">${p.trim()}</p>`)
    .join("");
}

export default function ContentSection({
  title,
  content,
  breadcrumb,
  enLabel,
  description,
  note,
  bodyFontSize = 15,
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
      <PageBanner
        title={title}
        breadcrumb={breadcrumb}
        enLabel={enLabel}
        description={description}
        note={note}
      />

      {content && (
        <section className="py-10 md:py-16">
          <div className="max-w-3xl mx-auto px-5 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              style={{ fontSize: bodyFontSize, lineHeight: 1.6 }} className="text-text-secondary max-w-2xl"
              dangerouslySetInnerHTML={{ __html: formatContent(content) }}
            />
          </div>
        </section>
      )}
    </>
  );
}

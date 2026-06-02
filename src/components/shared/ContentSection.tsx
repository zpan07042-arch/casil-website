"use client";

import { motion } from "framer-motion";

function formatContent(text: string): string {
  return text
    .split(/\n\n+/)
    .map((p) => `<p class="mb-4">${p.trim()}</p>`)
    .join("");
}

export default function ContentSection({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <section className="py-4 md:py-6">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary mb-4"
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="w-16 h-[3px] mb-10 rounded-full"
          style={{
            background: "linear-gradient(90deg, #0A2463, #3E92CC)",
            transformOrigin: "left"
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
          className="text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl"
          dangerouslySetInnerHTML={{ __html: formatContent(content) }}
        />
      </div>
    </section>
  );
}
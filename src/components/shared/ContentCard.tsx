"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ContentCard({
  children,
  className = "",
  href,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  delay?: number;
}) {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 ${
        href ? "cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{card}</Link>;
  }
  return card;
}

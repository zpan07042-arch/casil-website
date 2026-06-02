"use client";

import { motion } from "framer-motion";

export default function SectionWrapper({
  children,
  className = "",
  bg = "white",
}: {
  children: React.ReactNode;
  className?: string;
  bg?: "white" | "secondary";
}) {
  return (
    <section
      className={`py-20 md:py-28 ${
        bg === "secondary" ? "bg-bg-secondary" : "bg-white"
      } ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-5xl mx-auto px-5 md:px-8"
      >
        {children}
      </motion.div>
    </section>
  );
}

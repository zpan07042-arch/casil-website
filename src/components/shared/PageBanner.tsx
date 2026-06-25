"use client";

import { motion } from "framer-motion";

/* ──────────── 配色 ──────────── */
const Navy    = "#0A2463";
const GoldAcc = "rgba(255,255,255,0.65)";
const White   = "#FFFFFF";
const MutedW  = "rgba(255,255,255,0.50)";
const FaintW  = "rgba(255,255,255,0.18)";

export default function PageBanner({
  title,
  breadcrumb,
  enLabel,
  description,
  note,
}: {
  title: string;
  breadcrumb?: string;
  enLabel?: string;
  description?: string;
  note?: string;
}) {
  return (
    <section
      className="pt-20 pb-10 md:pt-24 md:pb-12 px-5"
      style={{
        background: `linear-gradient(135deg, ${Navy} 0%, #0F2D6E 100%)`,
      }}
    >
      <div className="max-w-[1200px] mx-auto text-center">

        {/* 面包屑 */}
        {breadcrumb && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-xs tracking-wide mb-3"
            style={{ color: MutedW }}
          >
            {breadcrumb.split(" > ").map((part, i, arr) => (
              <span key={i}>
                {i > 0 && <span style={{ color: MutedW }}> &gt; </span>}
                <span style={{ color: i === arr.length - 1 ? White : MutedW }}>
                  {part}
                </span>
              </span>
            ))}
          </motion.p>
        )}

        {/* 英文小标 */}
        {enLabel && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5, ease: "easeOut" }}
            className="text-[11px] tracking-[0.22em] uppercase mb-3"
            style={{ color: GoldAcc, fontWeight: 300 }}
          >
            {enLabel}
          </motion.p>
        )}

        {/* 大标题 */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider mb-5"
          style={{ color: White }}
        >
          {title}
        </motion.h1>

        {/* 水平分割线 */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          style={{
            width: 60,
            height: 1,
            backgroundColor: FaintW,
            margin: "0 auto 14px",
          }}
        />

        {/* 说明文字 */}
        {(description || note) && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
            className="text-xs md:text-sm leading-relaxed"
            style={{ color: MutedW }}
          >
            {description}
            {note && <span style={{ color: GoldAcc }}>{note}</span>}
          </motion.p>
        )}
      </div>
    </section>
  );
}

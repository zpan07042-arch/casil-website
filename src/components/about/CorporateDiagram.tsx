"use client";

import { orgData, type OrgNode } from "@/data/org-structure";

/* ──────────── 配色 ──────────── */
const Navy     = "#0A2463";
const NavyMid  = "#0d568a";   // 职能部门：比根节点浅
const Line     = "#B0BED8";
const Border   = "#D9D6CF";
const Blue     = "#3E92CC";
const White    = "#FFFFFF";
const TextDark = "#1A1A2E";
const TextMuted = "#86868B";
const TagBg    = "#e8eff5";
const TagText  = "#8B7355";
const Shadow   = "0 1px 3px rgba(0,0,0,0.04)";

/* ──────────── 子节点卡片 ──────────── */
function ChildCard({ node }: { node: OrgNode }) {
  return (
    <div
      style={{
        backgroundColor: White, border: `1px solid ${Border}`, borderRadius: 6,
        padding: "5px 14px", textAlign: "center", minWidth: 80, boxShadow: Shadow,
      }}
    >
      <span style={{ color: TextDark, fontSize: 12, lineHeight: 1.4 }}>{node.name}</span>
    </div>
  );
}

/* ──────────── 子公司节点卡片 ──────────── */
function CompanyCard({ node }: { node: OrgNode }) {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      <div style={{ width: 2, height: 8, backgroundColor: Line }} />
      <div
        style={{
          backgroundColor: White, border: `1px solid ${Border}`, borderRadius: 8,
          padding: hasChildren ? "6px 12px" : "8px 16px",
          textAlign: "center",
          minWidth: hasChildren ? 100 : 110,
          boxShadow: Shadow,
        }}
      >
        <span style={{
          color: TextDark,
          fontSize: hasChildren ? 12 : 14,
          fontWeight: 600, lineHeight: 1.4, display: "block",
        }}>
          {node.name}
        </span>
        {node.subtitle && (
          <span style={{
            color: TextMuted,
            fontSize: hasChildren ? 10 : 11,
            lineHeight: 1.3, display: "block", marginTop: 2,
          }}>
            ({node.subtitle})
          </span>
        )}
        {node.tag && (
          <span style={{
            backgroundColor: TagBg, color: TagText,
            fontSize: hasChildren ? 10 : 11,
            padding: "1px 6px", borderRadius: 3, display: "inline-block", marginTop: 4,
          }}>
            {node.tag}
          </span>
        )}
      </div>

      {hasChildren && (
        <>
          <div style={{ width: 2, height: 2, backgroundColor: Line }} />
          <div className="flex flex-col items-center gap-1">
            {node.children!.map((child, i) => (
              <div key={i} className="flex flex-col items-center">
                <div style={{ width: 2, height: 2, backgroundColor: Line }} />
                <ChildCard node={child} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ──────────── 职能部门卡片（浅深蓝、加大、竖向支持） ──────────── */
function DeptCard({ name, subtitle, vertical }: { name: string; subtitle?: string; vertical?: boolean }) {
  const hasSub = !!subtitle;
  const useVertical = vertical || hasSub; // 有副标题或有 vertical 标记 → 竖向

  return (
    <div className="flex flex-col items-center" style={{ flexShrink: 0, marginLeft: -6, marginRight: -6 }}>
      <div style={{ width: 2, height: 8, backgroundColor: Line }} />
      <div
        style={{
          backgroundColor: NavyMid,
          borderRadius: 8,
          padding: useVertical ? "9px 16px" : "9px 18px",
          textAlign: "center",
          minWidth: useVertical ? 64 : 96,
        }}
      >
        {useVertical ? (
          <div className="flex flex-col items-center" style={{ gap: 2 }}>
            <span style={{ color: White, fontSize: 13, fontWeight: 600, lineHeight: 1.3, whiteSpace: "nowrap" }}>
              {name}
            </span>
            {hasSub && (
              <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, lineHeight: 1.2, whiteSpace: "nowrap" }}>
                ({subtitle})
              </span>
            )}
          </div>
        ) : (
          <span style={{ color: White, fontSize: 13, fontWeight: 600, lineHeight: 1.35, whiteSpace: "nowrap" }}>
            {name}
          </span>
        )}
      </div>
    </div>
  );
}

/* ──────────── 业务板块列（深蓝标题卡片 → 连线 → 白色容器） ──────────── */
function BusinessColumn({
  title,
  indicator,
  nodes,
}: {
  title: string;
  indicator?: string;
  nodes: OrgNode[];
}) {
  return (
    <div className="flex flex-col items-center" style={{ flex: "1 1 0", minWidth: 0 }}>
      <div style={{ width: 2, height: 14, backgroundColor: Line }} />
      <div
        style={{
          backgroundColor: Navy, borderRadius: 10, padding: "10px 20px",
          textAlign: "center", boxShadow: "0 2px 8px rgba(10,36,99,0.10)",
        }}
      >
        <span style={{ color: White, fontSize: 16, fontWeight: 700, lineHeight: 1.3, display: "block" }}>
          {title}
        </span>
        {indicator && (
          <span style={{
            color: "rgba(255,255,255,0.70)", fontSize: 11, lineHeight: 1.3,
            display: "block", marginTop: 2,
          }}>
            {indicator}
          </span>
        )}
      </div>
      <div style={{ width: 2, height: 12, backgroundColor: Line }} />
      <div
        className="w-1/2xl"
        style={{
          backgroundColor: White, border: `1px solid ${Blue}`,
          borderRadius: 12, overflow: "hidden",
        }}
      >
        <div className="flex flex-col gap-3 items-center" style={{ padding: "16px 10px" }}>
          {nodes.map((node, i) => (
            <CompanyCard key={i} node={node} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   主组件
   ═══════════════════════════════════════════════════ */
export default function CorporateDiagram() {
  const { rootName, departments, columns } = orgData;

  return (
    <div style={{ backgroundColor: "#F7F7FA", padding: "44px 0 64px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 16px" }}>

        {/* ═══ 1. 根节点 — 加大突出 ═══ */}
        <div className="flex flex-col items-center">
          <div
            style={{
              backgroundColor: Navy, borderRadius: 14,
              padding: "16px 56px",
              boxShadow: "0 3px 12px rgba(10,36,99,0.12)",
            }}
          >
            <span style={{ color: White, fontSize: 22, fontWeight: 700, letterSpacing: "0.10em" }}>
              {rootName}
            </span>
          </div>
          <div style={{ width: 2, height: 36, backgroundColor: Line }} />
        </div>

        {/* ═══ 2. T 型分叉 ═══ */}
        <div className="relative" style={{ height: 18 }}>
          <div
            className="absolute left-0 right-0"
            style={{ top: 8, height: 2, backgroundColor: Line }}
          />
          <div
            className="absolute left-1/2"
            style={{
              top: 8, width: 2, height: 9,
              backgroundColor: Line, transform: "translateX(-1px)",
            }}
          />
        </div>

        {/* ═══ 3. 职能部门行 — 浅深蓝、加大、紧凑间距 ═══ */}
        <div
          className="flex justify-center"
          style={{ overflowX: "auto", paddingBottom: 2 }}
        >
          <div className="flex flex-nowrap" style={{ gap: 20 }}>
            {departments.map((dept, i) => (
              <DeptCard key={i} name={dept.name} subtitle={dept.subtitle} vertical={dept.vertical} />
            ))}
          </div>
        </div>

        {/* ═══ 4. 主干下行 → 水平分叉 ═══ */}
        <div className="relative" style={{ height: 40 }}>
          <div
            className="absolute left-1/2"
            style={{
              top: 0, width: 2, height: 40,
              backgroundColor: Line, transform: "translateX(-1px)",
            }}
          />
          <div
            className="absolute left-0 right-0"
            style={{ bottom: -0.5, height: 2, backgroundColor: Line }}
          />
        </div>

        {/* ═══ 5. 五大板块列 ═══ */}
        <div className="flex flex-nowrap gap-3 justify-center">
          {columns.map((col, i) => (
            <BusinessColumn
              key={i}
              title={col.title}
              indicator={col.indicator}
              nodes={col.nodes}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

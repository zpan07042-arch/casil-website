"use client";

import type { Lang } from "@/lib/types";

/* ========== 双语文本映射 ========== */
const zh = {
  root: "航天控股",
  depts: [
    { line1: "董事局", line2: "辦公室" },
    { line1: "綜合管理部", line2: "" },
    { line1: "財務部", line2: "" },
    { line1: "經營發展部", line2: "" },
    { line1: "人力資源部", line2: "" },
    { line1: "企業文化部", line2: "" },
    { line1: "監督與審計", line2: "法務部", small: true },
    { line1: "數智化", line2: "辦公室" },
  ],
  deptNotes: [
    { text: "（證券事務部）", x: 195 },
    { text: "（安全生產辦公室）", x: 335 },
    { text: "（掛靠智慧研究所）", x: 1185 },
  ],
  sectors: ["先進製造業", "現代服務業", "參股公司", "投資平台", "技術研發中心"],
  tagIntegrated: "三、四級一體管理",
  // 先進製造業
  mfg: [
    { title: "東莞康源", sub: "（電路印製板業務）" },
    { title: "航科半導體", sub: "（液晶顯示器件業務）" },
    { title: "香港志源", sub: "（注塑及表面處理業務）" },
    { title: "香港志順", sub: "（電源產品業務）" },
    { title: "志豪微電子", sub: "（智能功率模組業務）" },
  ],
  mfgSubs: [
    "香港康源電路", "南通康源",
    "康惠半導體",
    "深圳志源", "惠州志源", "志源表面", "志源電科", "越南志源",
    "惠州志順",
  ],
  // 現代服務業
  svc: [
    { title: "航天高科", sub: "" },
    { title: "工業園公司", sub: "" },
    { title: "航科進出口", sub: "（集團公司委託管理）", smallSub: true },
    { title: "航天結算", sub: "" },
  ],
  svcSub: "高科物業",
  // 參股公司
  equity: [
    { title: "深圳瑞華泰", sub: "(688323.SH)", blueSub: true },
    { title: "航天新商務", sub: "" },
    { title: "航天數聯", sub: "" },
  ],
  equityCleanLabel1: "正在清理退出",
  equityCleaned: [
    { title: "航天新世界", sub: "" },
    { title: "海南航天", sub: "" },
  ],
  equityCleanLabel2: "已完成清理",
  // 投資平台
  invest: [
    { title: "康源投資", sub: "（境外—香港）" },
    { title: "航科新世紀", sub: "（境內—深圳）" },
  ],
  // 技術研發中心
  rnd: { title: "智慧研究所", sub: "（非法人實體）" },
};

const en = {
  root: "CASIL",
  depts: [
    { line1: "Board", line2: "Office" },
    { line1: "General Management", line2: "Dept." },
    { line1: "Finance", line2: "Department" },
    { line1: "Business Development", line2: "Dept." },
    { line1: "Human Resources", line2: "Dept." },
    { line1: "Corporate Culture", line2: "Dept." },
    { line1: "Supervision, Audit", line2: "& Legal Dept.", small: true },
    { line1: "Digital Intelligence", line2: "Office" },
  ],
  deptNotes: [
    { text: "(Securities Affairs Office)", x: 195 },
    { text: "(Safety Production Office)", x: 335 },
    { text: "(Affiliated Smart Research Inst.)", x: 1185 },
  ],
  sectors: ["Advanced Manufacturing", "Modern Services", "Equity Investments", "Investment Platforms", "Technology R&D Center"],
  tagIntegrated: "L3 & L4 Integrated Mgmt.",
  // Advanced Manufacturing
  mfg: [
    { title: "Dongguan KangYuan", sub: "(PCB Business)" },
    { title: "CASIL Semiconductor", sub: "(LCD Business)" },
    { title: "HK ZhiYuan", sub: "(Injection Molding & Surface Treatment)" },
    { title: "HK ZhiShun", sub: "(Power Supply Products)" },
    { title: "ZhiHao Microelectronics", sub: "(IPM Business)" },
  ],
  mfgSubs: [
    "HK KangYuan Circuit", "Nantong KangYuan",
    "KangHui Semiconductor",
    "Shenzhen ZhiYuan", "Huizhou ZhiYuan", "ZhiYuan Surface", "ZhiYuan Electronics", "Vietnam ZhiYuan",
    "Huizhou ZhiShun",
  ],
  // Modern Services
  svc: [
    { title: "Aerospace Hi-Tech", sub: "" },
    { title: "Industrial Park Co.", sub: "" },
    { title: "CASIL Import & Export", sub: "(Group Entrusted Mgmt.)", smallSub: true },
    { title: "Aerospace Settlement", sub: "" },
  ],
  svcSub: "Hi-Tech Property",
  // Equity Investments
  equity: [
    { title: "Shenzhen RayiTech", sub: "(688323.SH)", blueSub: true },
    { title: "Aerospace New Commerce", sub: "" },
    { title: "Aerospace Digital Link", sub: "" },
  ],
  equityCleanLabel1: "Exiting (Cleanup)",
  equityCleaned: [
    { title: "Aerospace New World", sub: "" },
    { title: "Hainan Aerospace", sub: "" },
  ],
  equityCleanLabel2: "Cleanup Completed",
  // Investment Platforms
  invest: [
    { title: "KangYuan Investment", sub: "(Offshore — HK)" },
    { title: "CASIL New Century", sub: "(Onshore — Shenzhen)" },
  ],
  // Technology R&D Center
  rnd: { title: "Smart Research Institute", sub: "(Unincorporated Entity)" },
};

export default function StructureSvg({ lang }: { lang: Lang }) {
  const t = lang === "en" ? en : zh;

  return (
    <div style={{ backgroundColor: "#ffffff", padding: "40px", display: "flex", justifyContent: "center", overflowX: "auto" }}>
      <svg
        width="1518"
        height="935"
        viewBox="0 0 1380 850"
        xmlns="http://www.w3.org/2000/svg"
        style={{ backgroundColor: "#ffffff", userSelect: "none", flexShrink: 0 }}
      >
        <style>{`
          .text-main { font-size: 18px; font-weight: 700; fill: #ffffff; text-anchor: middle; letter-spacing: 4px; }
          .text-dept { font-size: 12px; font-weight: 700; fill: #ffffff; text-anchor: middle; letter-spacing: 0.5px; }
          .text-side-horiz { font-size: 11px; fill: #475569; text-anchor: middle; font-weight: 500; }
          .text-sector { font-size: 13.5px; font-weight: 700; fill: #ffffff; text-anchor: middle; letter-spacing: 2px; }
          .text-comp-title { font-size: 12px; font-weight: 700; fill: #0B2545; text-anchor: middle; }
          .text-comp-sub { font-size: 10px; fill: #64748B; text-anchor: middle; font-weight: 400; }
          .text-subcompany { font-size: 11px; fill: #134074; text-anchor: middle; font-weight: 500; }
          .text-tag { font-size: 11.5px; font-weight: 700; fill: #0B2545; text-anchor: middle; letter-spacing: 0.5px; }
          .text-clean { font-size: 12px; font-weight: 700; fill: #B91C1C; text-anchor: middle; }
          .text-gray { font-size: 12px; font-weight: 500; fill: #64748B; text-anchor: middle; }
          .text-entity { font-size: 11px; font-weight: 500; fill: #475569; text-anchor: middle; }
        `}</style>

        {/* ==================== 1. 核心骨架 ==================== */}
        <g stroke="#0B2545" strokeWidth="1.5" fill="none">
          <path d="M 690,65 L 690,95" />
          <path d="M 195,95 L 1185,95" />
          <path d="M 195,95 L 195,110" />
          <path d="M 335,95 L 335,110" />
          <path d="M 465,95 L 465,110" />
          <path d="M 595,95 L 595,110" />
          <path d="M 785,95 L 785,110" />
          <path d="M 915,95 L 915,110" />
          <path d="M 1045,95 L 1045,110" />
          <path d="M 1185,95 L 1185,110" />
          <path d="M 690,95 L 690,225" />
          <path d="M 145,225 L 1235,225" />
          <path d="M 145,225 L 145,245" />
          <path d="M 415,225 L 415,245" />
          <path d="M 690,225 L 690,245" />
          <path d="M 965,225 L 965,245" />
          <path d="M 1235,225 L 1235,245" />
        </g>

        {/* ==================== 2. 板块穿透向下连接干线 ==================== */}
        <g stroke="#0B2545" strokeWidth="1.5" fill="none">
          {/* 先进制造业 */}
          <path d="M 145,285 L 145,685" />
          <path d="M 145,355 L 160,355" />
          <path d="M 145,430 L 160,430" />
          <path d="M 145,535 L 160,535" />
          <path d="M 145,615 L 160,615" />
          <path d="M 145,685 L 160,685" />
          {/* 现代服务业 */}
          <path d="M 415,285 L 415,512" />
          <path d="M 415,355 L 425,355" />
          <path d="M 415,417 L 425,417" />
          <path d="M 415,465 L 425,465" />
          <path d="M 415,512 L 425,512" />
          {/* 参股公司 */}
          <path d="M 690,285 L 690,502" />
          <path d="M 690,360 L 705,360" />
          <path d="M 690,427 L 705,427" />
          <path d="M 690,502 L 705,502" />
          {/* 投资平台 */}
          <path d="M 965,285 L 965,415" />
          <path d="M 965,360 L 980,360" />
          <path d="M 965,415 L 980,415" />
          {/* 技术研发中心 */}
          <path d="M 1235,285 L 1235,340" />
        </g>

        {/* ==================== 3. 大括号系统 ==================== */}
        <g stroke="#134074" strokeWidth="1.5" fill="none">
          <path d="M 260,355 L 270,355" />
          <path d="M 270,355 C 273,355 273,335 276,335" />
          <path d="M 270,355 C 273,355 273,375 276,375" />
          <path d="M 260,430 L 295,430" />
          <path d="M 260,535 L 270,535" />
          <path d="M 270,535 C 274,535 272,475 276,475" />
          <path d="M 270,535 C 274,535 272,595 276,595" />
          <path d="M 260,615 L 295,615" />
          <path d="M 515,355 L 555,355" />
        </g>

        {/* ==================== 4. 虚线方框系统 ==================== */}
        <rect x="153" y="318" width="235" height="326" stroke="#134074" strokeDasharray="4,3" strokeWidth="1.2" fill="none" />
        <rect x="422" y="318" width="225" height="69" stroke="#134074" strokeDasharray="4,3" strokeWidth="1.2" fill="none" />
        <rect x="680" y="475" width="150" height="100" stroke="#64748B" strokeDasharray="4,3" strokeWidth="1.2" fill="none" />
        <rect x="680" y="590" width="150" height="135" stroke="#64748B" strokeDasharray="4,3" strokeWidth="1.2" fill="none" />

        {/* ==================== 5. 实体卡片与文字放置 ==================== */}
        {/* 顶层核心 */}
        <rect x="595" y="25" width="190" height="40" rx="4" fill="#0B2545" />
        <text x="690" y="50" className="text-main">{t.root}</text>

        {/* 第二层职能部门卡片 */}
        <g fill="#134074">
          {t.depts.map((dept, i) => {
            const positions = [142.5, 282.5, 412.5, 542.5, 732.5, 862.5, 992.5, 1132.5];
            const x = positions[i];
            const cx = x + 52.5;
            if (dept.line2) {
              return (
                <g key={i}>
                  <rect x={x} y="110" width="105" height="46" rx="4" />
                  <text x={cx} y="130" className="text-dept" style={dept.small ? { fontSize: 11 } : undefined}>{dept.line1}</text>
                  <text x={cx} y="144" className="text-dept" style={dept.small ? { fontSize: 11 } : undefined}>{dept.line2}</text>
                </g>
              );
            }
            return (
              <g key={i}>
                <rect x={x} y="110" width="105" height="46" rx="4" />
                <text x={cx} y="137" className="text-dept">{dept.line1}</text>
              </g>
            );
          })}
        </g>
        {t.deptNotes.map((note, i) => (
          <text key={i} x={note.x} y="178" className="text-side-horiz">{note.text}</text>
        ))}

        {/* 第三层主业务板块 */}
        <g fill="#1D4E89">
          {t.sectors.map((sector, i) => {
            const positions = [80, 350, 625, 900, 1170];
            const cx = positions[i] + 65;
            const shortLabels = ["先進製造業", "Advanced Manufacturing"];
            const isShort = shortLabels.includes(sector);
            return (
              <g key={i}>
                <rect x={positions[i]} y="245" width={isShort ? 130 : 130} height="40" rx="4" />
                <text x={cx} y="270" className="text-sector" style={!isShort ? { fontSize: 11.5 } : undefined}>{sector}</text>
              </g>
            );
          })}
        </g>

        {/* 一体管理标签与红箭头 */}
        <g>
          <text x="270" y="295" className="text-tag">{t.tagIntegrated}</text>
          <path d="M 270,300 L 270,314" stroke="#B91C1C" strokeWidth="2" markerEnd="url(#arrow-red)" fill="none" />
          <text x="535" y="295" className="text-tag">{t.tagIntegrated}</text>
          <path d="M 535,300 L 535,314" stroke="#B91C1C" strokeWidth="2" markerEnd="url(#arrow-red)" fill="none" />
        </g>

        {/* A. 先进制造业下属实体 */}
        <g fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2">
          {t.mfg.map((item, i) => {
            const yPositions = [335, 410, 515, 595, 665];
            const y = yPositions[i];
            const cy = y + 20;
            return (
              <g key={i}>
                <rect x="160" y={y} width="100" height="40" rx="4" />
                <text x="210" y={cy - 3} className="text-comp-title" stroke="none">{item.title}</text>
                <text x="210" y={cy + 13} className="text-comp-sub" stroke="none">{item.sub}</text>
              </g>
            );
          })}
        </g>

        {/* 三、四级子公司 */}
        <g fill="#ffffff" stroke="#94A3B8" strokeWidth="1.2">
          {t.mfgSubs.map((name, i) => {
            const yPositions = [325, 352, 419, 465, 492, 519, 546, 573, 605];
            const y = yPositions[i] || 325;
            return (
              <g key={i}>
                <rect x="295" y={y} width="85" height="22" rx="4" />
                <text x="337.5" y={y + 14} className="text-subcompany" stroke="none">{name}</text>
              </g>
            );
          })}
        </g>

        {/* B. 现代服务业下属实体 */}
        <g fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2">
          {t.svc.map((item, i) => {
            const items = [
              { y: 335, h: 40, titleY: item.sub ? 352 : 359, subY: 368 },
              { y: 405, h: 25, titleY: 421, subY: 0 },
              { y: 445, h: 40, titleY: 461, subY: 475 },
              { y: 500, h: 25, titleY: 516, subY: 0 },
            ];
            const cfg = items[i];
            return (
              <g key={i}>
                <rect x="425" y={cfg.y} width="90" height={cfg.h} rx="4" />
                <text x="470" y={cfg.titleY} className="text-comp-title" stroke="none">{item.title}</text>
                {item.sub && (
                  <text x="470" y={cfg.subY} className="text-comp-sub" style={item.smallSub ? { fontSize: 8 } : undefined} stroke="none">{item.sub}</text>
                )}
              </g>
            );
          })}
        </g>
        <rect x="555" y="344" width="80" height="22" fill="#ffffff" stroke="#94A3B8" rx="4" strokeWidth="1.2" />
        <text x="595" y="358" className="text-subcompany">{t.svcSub}</text>

        {/* C. 参股公司下属实体 */}
        <g fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2">
          {t.equity.map((item, i) => {
            const yPositions = [340, 410, 485];
            const heights = [40, 35, 35];
            const y = yPositions[i];
            const cy = y + heights[i] / 2;
            return (
              <g key={i}>
                <rect x="705" y={y} width="100" height={heights[i]} rx="4" />
                <text x="755" y={cy + 2} className="text-comp-title" stroke="none">{item.title}</text>
                {item.sub && (
                  <text x="755" y={cy + 14} className="text-comp-sub" style={item.blueSub ? { fill: "#1D4E89" } : undefined} stroke="none">{item.sub}</text>
                )}
              </g>
            );
          })}
        </g>
        <text x="755" y="545" className="text-clean">{t.equityCleanLabel1}</text>
        <path d="M 755,553 L 755,573" stroke="#B91C1C" strokeWidth="1.5" markerEnd="url(#arrow-red)" fill="none" />
        <g fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1.2">
          {t.equityCleaned.map((item, i) => {
            const yPositions = [600, 645];
            return (
              <g key={i}>
                <rect x="705" y={yPositions[i]} width="100" height="35" rx="4" />
                <text x="755" y={yPositions[i] + 21} className="text-gray" stroke="none">{item.title}</text>
              </g>
            );
          })}
        </g>
        <text x="755" y="705" className="text-clean" style={{ fontSize: 11 }}>{t.equityCleanLabel2}</text>

        {/* D. 投资平台下属实体 */}
        <g fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2">
          {t.invest.map((item, i) => {
            const yPositions = [340, 395];
            return (
              <g key={i}>
                <rect x="980" y={yPositions[i]} width="95" height="40" rx="4" />
                <text x="1027" y={yPositions[i] + 17} className="text-comp-title" stroke="none">{item.title}</text>
                <text x="1027" y={yPositions[i] + 33} className="text-comp-sub" stroke="none">{item.sub}</text>
              </g>
            );
          })}
        </g>

        {/* E. 技术研发中心下属实体 */}
        <rect x="1185" y="340" width="100" height="35" fill="#F8FAFC" stroke="#CBD5E1" rx="4" strokeWidth="1.2" />
        <text x="1235" y="361" className="text-comp-title">{t.rnd.title}</text>
        <text x="1235" y="395" className="text-entity">{t.rnd.sub}</text>

        {/* 定义基础元器件 */}
        <defs>
          <marker id="arrow-red" markerWidth="6" markerHeight="6" refX="2" refY="3" orient="auto">
            <path d="M0,0 L5,3 L0,6 Z" fill="#B91C1C" stroke="none" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

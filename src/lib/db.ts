import { getDb } from "../../data/database";
import type {
  PageContent,
  Announcement,
  BoardMember,
  GovernanceDoc,
  CompanyNews,
  Subsidiary,
  LinkItem,
} from "./types";

// Pages
export function getPage(id: string): PageContent | undefined {
  return getDb().prepare("SELECT * FROM pages WHERE id = ?").get(id) as
    | PageContent
    | undefined;
}

export function getPagesBySection(section: string): PageContent[] {
  return getDb()
    .prepare("SELECT * FROM pages WHERE section = ? ORDER BY sort_order")
    .all(section) as PageContent[];
}

// Announcements
export function getAnnouncementsByYear(year: number): Announcement[] {
  return getDb()
    .prepare(
      "SELECT * FROM announcements WHERE year = ? ORDER BY sort_order, date DESC"
    )
    .all(year) as Announcement[];
}

export function getAnnouncementsByCategory(category: string): Announcement[] {
  return getDb()
    .prepare(
      "SELECT * FROM announcements WHERE category = ? ORDER BY year DESC, sort_order"
    )
    .all(category) as Announcement[];
}

export function getLatestAnnouncements(limit = 10): Announcement[] {
  return getDb()
    .prepare("SELECT * FROM announcements ORDER BY year DESC, sort_order LIMIT ?")
    .all(limit) as Announcement[];
}

export function getAllAnnouncements(): Announcement[] {
  return getDb()
    .prepare("SELECT * FROM announcements ORDER BY year DESC, sort_order")
    .all() as Announcement[];
}

export function getAllYears(): number[] {
  const rows = getDb()
    .prepare("SELECT DISTINCT year FROM announcements ORDER BY year DESC")
    .all() as { year: number }[];
  return rows.map((r) => r.year);
}

// Board Members
export function getBoardMembers(): BoardMember[] {
  return getDb()
    .prepare("SELECT * FROM board_members ORDER BY sort_order")
    .all() as BoardMember[];
}

// Governance Docs
export function getGovernanceDocs(): GovernanceDoc[] {
  return getDb()
    .prepare("SELECT * FROM governance_docs ORDER BY sort_order")
    .all() as GovernanceDoc[];
}

// Company News
export function getCompanyNews(): CompanyNews[] {
  return getDb()
    .prepare("SELECT * FROM company_news ORDER BY date DESC")
    .all() as CompanyNews[];
}

// Subsidiaries
export function getSubsidiaries(): Subsidiary[] {
  return getDb()
    .prepare("SELECT * FROM subsidiaries ORDER BY CASE sub_type WHEN 'wholly_owned' THEN 1 WHEN 'controlled' THEN 2 WHEN 'invested' THEN 3 END, sort_order")
    .all() as Subsidiary[];
}

// Links
export function getLinks(): LinkItem[] {
  return getDb()
    .prepare("SELECT * FROM links ORDER BY sort_order")
    .all() as LinkItem[];
}

// Search
export function searchAll(query: string): {
  type: string;
  title_zh: string;
  title_en: string;
  snippet_zh: string;
  snippet_en: string;
  route: string;
}[] {
  const q = `%${query}%`;
  const results: {
    type: string;
    title_zh: string;
    title_en: string;
    snippet_zh: string;
    snippet_en: string;
    route: string;
  }[] = [];

  const pages = getDb()
    .prepare(
      `SELECT * FROM pages WHERE title_zh LIKE ? OR title_en LIKE ? OR content_zh LIKE ? OR content_en LIKE ? LIMIT 10`
    )
    .all(q, q, q, q) as PageContent[];

  for (const p of pages) {
    results.push({
      type: "page",
      title_zh: p.title_zh,
      title_en: p.title_en,
      snippet_zh: (p.content_zh || "").substring(0, 80),
      snippet_en: (p.content_en || "").substring(0, 80),
      route: `/${p.section}/${p.id}`,
    });
  }

  const anns = getDb()
    .prepare(
      `SELECT * FROM announcements WHERE title_zh LIKE ? OR title_en LIKE ? OR CAST(year AS TEXT) LIKE ? ORDER BY CASE WHEN CAST(year AS TEXT) = ? THEN 0 ELSE 1 END, year DESC LIMIT 10`
    )
    .all(q, q, q, query) as Announcement[];

  for (const a of anns) {
    results.push({
      type: "announcement",
      title_zh: a.title_zh,
      title_en: a.title_en || a.title_zh,
      snippet_zh: `${a.year}`,
      snippet_en: `${a.year}`,
      route: `/news/${a.year}`,
    });
  }

  return results;
}

export interface PageContent {
  id: string;
  section: string;
  title_zh: string;
  title_en: string;
  content_zh: string | null;
  content_en: string | null;
  sort_order: number;
}

export interface Announcement {
  id: number;
  year: number;
  date: string | null;
  title_zh: string;
  title_en: string | null;
  category: string | null;
  pdf_url: string | null;
  sort_order: number;
}

export interface BoardMember {
  id: number;
  name_zh: string;
  name_en: string | null;
  title_zh: string;
  title_en: string | null;
  bio_zh: string | null;
  bio_en: string | null;
  member_type: string;
  sort_order: number;
}

export interface GovernanceDoc {
  id: number;
  title_zh: string;
  title_en: string | null;
  pdf_url: string;
  sort_order: number;
}

export interface CompanyNews {
  id: number;
  date: string | null;
  title_zh: string;
  title_en: string | null;
  pdf_url: string | null;
}

export interface Subsidiary {
  id: number;
  name_zh: string;
  name_en: string | null;
  description_zh: string | null;
  description_en: string | null;
  sub_type: string;
  sort_order: number;
}

export interface LinkItem {
  id: number;
  name_zh: string;
  name_en: string | null;
  url: string | null;
  sort_order: number;
}

export type Lang = "zh" | "en";

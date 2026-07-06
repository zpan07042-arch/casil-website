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
  cover_image: string | null;
  content_zh: string | null;
  content_en: string | null;
  category: string | null;
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

export interface BusinessCardRow {
  id: string;
  category: string;
  main_title: string;
  sub_title: string;
  en_name: string;
  body_zh: string;
  body_en: string;
  clients: string;        // JSON text: string[]
  learn_more_href: string;
  image_layout: string;   // "grid" | "single"
  product_images: string; // JSON text: {lblZh, lblEn, img}[]
  sort_order: number;
}

export interface ProductImageParsed {
  lblZh: string;
  lblEn: string;
  img: string;
}

export type Lang = "zh" | "en";

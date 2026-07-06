-- ============================================================
-- CASIL Website — 為 company_news 增加封面圖、內容、分類字段
-- ============================================================

ALTER TABLE company_news ADD COLUMN cover_image TEXT;
ALTER TABLE company_news ADD COLUMN content_zh TEXT;
ALTER TABLE company_news ADD COLUMN content_en TEXT;
ALTER TABLE company_news ADD COLUMN category TEXT;

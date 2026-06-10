-- ============================================================
-- Migration 002: 補充子公司與業務數據
-- ============================================================

-- ── 子公司數據 ──────────────────────────────────────────

INSERT INTO subsidiaries (name_zh, name_en, description_zh, description_en, sub_type, sort_order) VALUES
('康源電子廠有限公司', 'Kangyuan Electronics Factory Co., Ltd.', 'PCB、IC封裝載板業務，南通康源項目總投資50億元，一期設計年產能24萬平方米，瞄準國內載板前三。', 'PCB and IC packaging substrate business. Nantong Kangyuan project with total investment of RMB 5 billion, Phase I designed annual capacity of 240,000 m², targeting top-three domestic position.', 'wholly_owned', 1),
('康惠(惠州)半導體有限公司', 'Kanghui (Huizhou) Semiconductor Co., Ltd.', '顯示模組、傳感器封裝業務，具備車規級與工業級封測能力。', 'Display modules and sensor packaging, with automotive-grade and industrial-grade packaging and testing capabilities.', 'wholly_owned', 2),
('志源實業有限公司', 'Zhiyuan Industrial Co., Ltd.', '儲能電池相關業務，涵蓋電池模組、儲能系統集成及新能源配套產品。', 'Energy storage battery related business, covering battery modules, energy storage system integration and new energy supporting products.', 'wholly_owned', 3),
('志源塑膠製品有限公司', 'Zhiyuan Plastic Products Co., Ltd.', '精密結構件製造，包括注塑模具、精密塑膠零部件，廣泛服務於電子及汽車行業。', 'Precision structural components manufacturing, including injection molds and precision plastic parts, widely serving the electronics and automotive industries.', 'wholly_owned', 4),
('航天科技半導體(香港)有限公司', 'Aerospace Technology Semiconductor (HK) Co., Ltd.', '功率半導體研發與銷售，聚焦車規級功率器件及工業級半導體產品。', 'Power semiconductor R&D and sales, focusing on automotive-grade power devices and industrial-grade semiconductor products.', 'wholly_owned', 5),
('航科新世紀科技發展有限公司', 'Hangke New Century Technology Development Co., Ltd.', '物業運營與產業投資，持有並運營深圳航天科技廣場等優質物業。', 'Property operations and industrial investment, holding and operating premium properties including Shenzhen Aerospace Technology Plaza.', 'wholly_owned', 6),
('航天數聯信息技術(深圳)有限公司', 'Aerospace Digital Information Technology (Shenzhen) Co., Ltd.', '工業互聯網與智能製造，提供數字化工廠解決方案及工業互聯網平台服務。', 'Industrial internet and smart manufacturing, providing digital factory solutions and industrial internet platform services.', 'controlled', 1),
('深圳瑞華泰薄膜科技股份有限公司', 'Shenzhen Rayitek Film Technology Co., Ltd.', '新材料領域佈局，主要從事高性能PI薄膜的研發、生產與銷售，產品應用於柔性顯示、5G通信及航空航天等領域。', 'New materials field layout, primarily engaged in R&D, production and sales of high-performance PI films, applied in flexible displays, 5G communication and aerospace.', 'invested', 1),
('志順電業有限公司', 'Zhishun Electrical Co., Ltd.', '電子製造服務，提供專業的電子組裝及生產製造服務。', 'Electronics manufacturing services, providing professional electronic assembly and manufacturing services.', 'wholly_owned', 7),
('志豪微電子(惠州)有限公司', 'Zhihao Microelectronics (Huizhou) Co., Ltd.', '微電子器件製造，專注半導體封裝與微電子組裝。', 'Microelectronic device manufacturing, focusing on semiconductor packaging and microelectronic assembly.', 'wholly_owned', 8);

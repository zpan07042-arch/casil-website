-- ============================================================
-- Migration 002: 补充子公司与业务数据
-- ============================================================

-- ── 子公司数据 ──────────────────────────────────────────

INSERT INTO subsidiaries (name_zh, name_en, description_zh, description_en, sub_type, sort_order) VALUES
('康源电子厂有限公司', 'Kangyuan Electronics Factory Co., Ltd.', 'PCB、IC封装载板业务，南通康源项目总投资50亿元，一期设计年产能24万平方米，瞄准国内载板前三。', 'PCB and IC packaging substrate business. Nantong Kangyuan project with total investment of RMB 5 billion, Phase I designed annual capacity of 240,000 m², targeting top-three domestic position.', 'wholly_owned', 1),
('康惠(惠州)半导体有限公司', 'Kanghui (Huizhou) Semiconductor Co., Ltd.', '显示模组、传感器封装业务，具备车规级与工业级封测能力。', 'Display modules and sensor packaging, with automotive-grade and industrial-grade packaging and testing capabilities.', 'wholly_owned', 2),
('志源实业有限公司', 'Zhiyuan Industrial Co., Ltd.', '储能电池相关业务，涵盖电池模组、储能系统集成及新能源配套产品。', 'Energy storage battery related business, covering battery modules, energy storage system integration and new energy supporting products.', 'wholly_owned', 3),
('志源塑胶制品有限公司', 'Zhiyuan Plastic Products Co., Ltd.', '精密结构件制造，包括注塑模具、精密塑胶零部件，广泛服务于电子及汽车行业。', 'Precision structural components manufacturing, including injection molds and precision plastic parts, widely serving the electronics and automotive industries.', 'wholly_owned', 4),
('航天科技半导体(香港)有限公司', 'Aerospace Technology Semiconductor (HK) Co., Ltd.', '功率半导体研发与销售，聚焦车规级功率器件及工业级半导体产品。', 'Power semiconductor R&D and sales, focusing on automotive-grade power devices and industrial-grade semiconductor products.', 'wholly_owned', 5),
('航科新世纪科技发展有限公司', 'Hangke New Century Technology Development Co., Ltd.', '物业运营与产业投资，持有并运营深圳航天科技广场等优质物业。', 'Property operations and industrial investment, holding and operating premium properties including Shenzhen Aerospace Technology Plaza.', 'wholly_owned', 6),
('航天数联信息技术(深圳)有限公司', 'Aerospace Digital Information Technology (Shenzhen) Co., Ltd.', '工业互联网与智能制造，提供数字化工厂解决方案及工业互联网平台服务。', 'Industrial internet and smart manufacturing, providing digital factory solutions and industrial internet platform services.', 'controlled', 1),
('深圳瑞华泰薄膜科技股份有限公司', 'Shenzhen Rayitek Film Technology Co., Ltd.', '新材料领域布局，主要从事高性能PI薄膜的研发、生产与销售，产品应用于柔性显示、5G通信及航空航天等领域。', 'New materials field layout, primarily engaged in R&D, production and sales of high-performance PI films, applied in flexible displays, 5G communication and aerospace.', 'invested', 1),
('志順電業有限公司', 'Zhishun Electrical Co., Ltd.', '电子制造服务，提供专业的电子组装及生产制造服务。', 'Electronics manufacturing services, providing professional electronic assembly and manufacturing services.', 'wholly_owned', 7),
('志豪微电子(惠州)有限公司', 'Zhihao Microelectronics (Huizhou) Co., Ltd.', '微电子器件制造，专注半导体封装与微电子组装。', 'Microelectronic device manufacturing, focusing on semiconductor packaging and microelectronic assembly.', 'wholly_owned', 8);

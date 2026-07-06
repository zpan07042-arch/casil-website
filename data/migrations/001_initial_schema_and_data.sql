-- ============================================================
-- CASIL Website — 初始建表與全部種子數據
-- 整合自原 001~007 遷移文件，用於全新數據庫初始化
-- ============================================================

-- ════════════════════════════════════════════════════════════
-- 第一部分：建表
-- ════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS pages (
  id TEXT PRIMARY KEY,
  section TEXT NOT NULL,
  title_zh TEXT NOT NULL,
  title_en TEXT NOT NULL,
  content_zh TEXT,
  content_en TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS announcements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  year INTEGER NOT NULL,
  date TEXT,
  title_zh TEXT NOT NULL,
  title_en TEXT,
  category TEXT,
  pdf_url TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS board_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_zh TEXT NOT NULL,
  name_en TEXT,
  title_zh TEXT NOT NULL,
  title_en TEXT,
  bio_zh TEXT,
  bio_en TEXT,
  member_type TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS governance_docs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title_zh TEXT NOT NULL,
  title_en TEXT,
  pdf_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS company_news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT,
  title_zh TEXT NOT NULL,
  title_en TEXT,
  pdf_url TEXT
);

CREATE TABLE IF NOT EXISTS subsidiaries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_zh TEXT NOT NULL,
  name_en TEXT,
  description_zh TEXT,
  description_en TEXT,
  sub_type TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_zh TEXT NOT NULL,
  name_en TEXT,
  url TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS admin_sessions (
  token TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS business_cards (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL DEFAULT 'advanced_manufacturing',
  main_title TEXT NOT NULL,
  sub_title TEXT NOT NULL,
  en_name TEXT NOT NULL,
  body_zh TEXT NOT NULL,
  body_en TEXT NOT NULL,
  clients TEXT NOT NULL DEFAULT '[]',
  learn_more_href TEXT NOT NULL DEFAULT '',
  image_layout TEXT NOT NULL DEFAULT 'grid',
  product_images TEXT NOT NULL DEFAULT '[]',
  sort_order INTEGER DEFAULT 0
);

-- ════════════════════════════════════════════════════════════
-- 第二部分：頁面內容
-- ════════════════════════════════════════════════════════════

INSERT INTO pages (id, section, title_zh, title_en, content_zh, content_en, sort_order) VALUES ('about', 'about', '關於我們', 'About Us', '　　中國航天國際控股有限公司（航天控股）是中國航天科技集團公司（中國航天）在香港的上市公司（股份代號：31）。作為中國航天的海外窗口和國際化平台，航天控股承載着連接中國航天與全球市場的橋樑使命。

　　本欄目彙集了公司背景、企業文化、發展目標、董事局成員及企業管治等核心信息，幫助您全面瞭解航天控股的發展歷程與治理架構。', 'China Aerospace International Holdings Limited (CASIL) is a Hong Kong-listed company (Stock Code: 31) of China Aerospace Science and Technology Corporation (CASC). As the overseas window and international platform of CASC, CASIL serves as a bridge connecting China''s aerospace industry with the global market.

This section brings together core information including Company Background, Corporate Culture, Development Goals, Board of Directors, and Corporate Governance, helping you gain a comprehensive understanding of CASIL''s development journey and governance structure.', 0);
INSERT INTO pages (id, section, title_zh, title_en, content_zh, content_en, sort_order) VALUES ('background', 'about', '背景', 'Background', '中國航天國際控股有限公司 ( 航天控股 ) 是中國航天科技集團公司 ( 中國航天 ) 在香港的上市公司 ( 股份代號：31 )。中國航天作為航天控股的大股東，是中國進行空間技術和產品 ( 航天器、運載火箭、衞星等 ) 的開發、研究、生產和商用的企業，擁有雄厚的專業人才資源和技術力量優勢。

為配合集團新的發展戰略和發展方向，本公司已將其中文名稱改為「中國航天國際控股有限公司」（股份簡稱 ：「航天控股」)。新名稱亦藴涵了本公司與主要股東中國航天緊密相連的關係和未來在業務上互動發展的深層意義。', 'China Aerospace International Holdings Limited (CASIL) is a Hong Kong-listed company (Stock Code: 31) of China Aerospace Science and Technology Corporation (CASC). As the majority shareholder of CASIL, CASC is an enterprise engaged in the development, research, production and commercial application of space technology and products (spacecraft, launch vehicles, satellites, etc.), possessing strong professional talent resources and technological advantages.

To align with the Group''s new development strategy and direction, the Company has changed its Chinese name to "China Aerospace International Holdings Limited" (stock short name: "CASIL"). The new name also reflects the close relationship between the Company and its major shareholder CASC, and the deeper significance of future business interaction and development.', 0);
INSERT INTO pages (id, section, title_zh, title_en, content_zh, content_en, sort_order) VALUES ('culture', 'about', '企業文化', 'Corporate Culture', '「愛國、創新、誠信、和諧、盡責」為本公司企業文化的核心，亦為本公司企業使命和業務發展原則，也是員工作為日常業務運作和作業方向的核心價值：

愛國
愛國、愛港、愛航天、愛企業

創新
堅持新發展理念，以創新驅動發展

誠信
恪守誠信，以廉潔及公平為原則，依法守法
堅持合作共贏，善待各持份者

和諧
以德治企，堅持團結共事，和諧共享

盡責
敢擔當、負責任

使命
為客户、股東、員工及社會締造持久的價值和效益。

願景
本公司致力推動技術創新和專業化製造，專注以高品質和高效率為供應鏈及產業鏈服務，聚焦先進製造業及現代服務業作為核心能力，冀成為面向未來、具有顯著創新能力和持續為客户創造價值的國際化企業，為客户提供專業、高效、安全和環保的產品和服務。

締造企業文化的政策及守則
本公司以審慎的態度經營及管理業務，以確保本公司之業務能在將來持續發展，為社會經濟作出貢獻。本公司的政策及守則目的是把企業價值觀融入日常業務運作和作業方式中，其中，制定了《員工合規經營行為守則》，清晰向員工傳達所需的合規經營意識，確保公司以高道德水平及專業操守營運; 並通過《反貪污政策》和《舉報政策》，締造廉潔守正和負責任的經營團隊。

本公司設有企業文化部，負責定期舉辦內部對企業使命與理念貫徹的活動和講座，凝聚員工對公司的歸屬感，搭建分享想法的平台，以締造愛國、創新，以及具誠信、和諧、負責任的團隊。本公司採取多種溝通渠道，並以骨幹員工流失率、舉報數據等評估和監測企業文化的貫徹性，同時，要求領導層及管理人員在日常工作中積極實踐企業價值及貫徹良好操守，為屬下員工樹立榜樣。

企業文化與發展策略
本公司制定了長遠的規劃綱要，並持續評估本公司面對的潛在機遇與挑戰。通過本公司企業文化的核心: 「愛國、創新、誠信、和諧、盡責」，持續提升本公司員工的道德操守、完善公司管治制度、防範公司合規經營風險，為員工本身及公司建立競爭優勢，讓公司各項業務穩定發展。', '"Patriotism, Innovation, Integrity, Harmony, Responsibility" are the core values of our corporate culture, the mission and business development principles of the Company, and the core values that guide employees in their daily operations:

Patriotism
Love the country, love Hong Kong, love aerospace, love the enterprise

Innovation
Adhere to new development concepts and drive development through innovation

Integrity
Uphold integrity, adhere to the principles of honesty and fairness, and comply with the law
Insist on win-win cooperation and treat all stakeholders well

Harmony
Govern the enterprise with virtue, adhere to unity and collaboration, and share harmony

Responsibility
Dare to take on responsibility and be accountable

Mission
Create lasting value and benefits for customers, shareholders, employees and society.

Vision
The Company is committed to promoting technological innovation and specialized manufacturing, focusing on serving the supply chain and industrial chain with high quality and efficiency. We focus on advanced manufacturing and modern service industries as our core competencies, aspiring to become a future-oriented international enterprise with significant innovation capabilities that continuously creates value for customers, providing professional, efficient, safe and environmentally friendly products and services.

Policies and Codes for Building Corporate Culture
The Company operates and manages its business with a prudent approach to ensure sustainable development and contribute to social and economic progress. Our policies and codes aim to integrate corporate values into daily business operations and practices. Through the "Employee Compliance Conduct Code", "Anti-Corruption Policy" and "Whistleblowing Policy", we foster a clean, honest and responsible management team.

The Company has established a Corporate Culture Department responsible for regularly organizing internal activities and seminars. The Company adopts various communication channels and monitors the implementation of corporate culture through key employee turnover rates and whistleblowing data.

Corporate Culture and Development Strategy
The Company has formulated a long-term planning outline and continuously evaluates potential opportunities and challenges. Through our core values, we continuously enhance employee ethical standards, improve corporate governance, prevent compliance risks, and establish competitive advantages for sustainable development.', 0);
INSERT INTO pages (id, section, title_zh, title_en, content_zh, content_en, sort_order) VALUES ('goals', 'about', '目標', 'Goals', '航天控股將在大股東中國航天的鼎力支持下，充分利用香港各方面的優勢，逐步實現建設成為一個具有科學化的管理體系、強勢的整體市場競爭能力、優質的戰略合作伙伴，為股東創造良好的投資價值。

 本公司及各附屬公司的主要業務為科技工業及航天服務業務。', 'CASIL will, with the full support of its major shareholder CASC, fully leverage the various advantages of Hong Kong, and gradually build itself into an enterprise with a scientific management system, strong overall market competitiveness, and high-quality strategic partners, creating excellent investment value for shareholders.

The principal businesses of the Company and its subsidiaries are technology industry and aerospace services.', 0);
INSERT INTO pages (id, section, title_zh, title_en, content_zh, content_en, sort_order) VALUES ('board', 'about', '董事局與管理層', 'Board & Management', '航天控股董事局由執行董事、非執行董事及獨立非執行董事組成，負責制定集團整體戰略方向。管理層團隊具備豐富的行業經驗與專業背景，在董事局領導下有效執行業務計劃，確保公司遵守高水平的企業管治標準。', 'The CASIL Board comprises Executive Directors, Non-Executive Directors and Independent Non-Executive Directors, responsible for setting the Group overall strategic direction. The management team brings extensive industry experience and professional expertise, effectively executing business plans under the Board leadership to ensure the Company adheres to high standards of corporate governance.', 0);
INSERT INTO pages (id, section, title_zh, title_en, content_zh, content_en, sort_order) VALUES ('governance', 'about', '企業管治', 'Corporate Governance', '本公司深信良好的企業管治是保障股東權益及提升企業價值的基礎。公司已建立完善的企業管治架構，包括審核委員會、薪酬委員會、提名委員會及環境、社會及管治委員會，各委員會均訂明職權範圍。本公司定期檢討企業管治守則，確保符合香港聯合交易所有限公司證券上市規則附錄C1《企業管治守則》的要求。', 'The Company firmly believes that good corporate governance is the foundation for protecting shareholders'' rights and enhancing corporate value. The Company has established a comprehensive corporate governance structure, including the Audit Committee, Remuneration Committee, Nomination Committee and ESG Committee, each with clearly defined terms of reference. The Company regularly reviews its corporate governance practices to ensure compliance with the Corporate Governance Code set out in Appendix C1 of the Rules Governing the Listing of Securities on The Stock Exchange of Hong Kong Limited.', 0);
INSERT INTO pages (id, section, title_zh, title_en, content_zh, content_en, sort_order) VALUES ('business', 'business', '產業與業務', 'Business', '本公司及各附屬公司的主要業務涵蓋科技工業及航天服務業務，聚焦先進製造業與航天產業服務業兩大核心板塊。', 'The principal businesses of the Company and its subsidiaries cover technology industry and aerospace services, focusing on two core segments: advanced manufacturing and aerospace industry services.', 0);
INSERT INTO pages (id, section, title_zh, title_en, content_zh, content_en, sort_order) VALUES ('location', 'other', '地理位置', 'Location', '中國航天國際控股有限公司總部設於香港，在中國內地多個城市（深圳、東莞、惠州、南通、杭州等）設有生產基地及辦事處。', 'China Aerospace International Holdings Limited is headquartered in Hong Kong, with production bases and offices in multiple cities across mainland China (Shenzhen, Dongguan, Huizhou, Nantong, Hangzhou, etc.).', 0);
INSERT INTO pages (id, section, title_zh, title_en, content_zh, content_en, sort_order) VALUES ('contact', 'other', '聯繫我們', 'Contact Us', '如有任何查詢，歡迎通過以下渠道與我們聯繫。航天控股致力於為全球客户、合作伙伴及投資者提供高效、專業的服務。', 'For any inquiries, please contact us through the following channels. CASIL is committed to providing efficient and professional services to global customers, partners and investors.', 0);

-- ════════════════════════════════════════════════════════════
-- 第三部分：董事局成員
-- ════════════════════════════════════════════════════════════

INSERT INTO board_members (id, name_zh, name_en, title_zh, title_en, bio_zh, bio_en, member_type, sort_order) VALUES (17, '王暉先生', 'Mr. Wang Hui', '董事局主席 / 執行董事', 'Chairman / Executive Director', '王暉先生，研究員，為本公司主席兼執行董事，1995年畢業於中國科學技術大學，專修工程熱物理並獲取工學學士，並於2008年至2009年期間在職研究生學習，修畢國際空間大學空間管理專業，獲取理學碩士。王暉先生自1995年8月起至2022年6月期間，歷任中國運載火箭技術研究院綜合經營部計劃處處長助理、院辦公室秘書處副處長、科研計劃部科研計劃處處長、科研計劃部副部長、綜合計劃部部長，以及研究院副院長；2022年6月至2024年7月擔任中國航天科技集團有限公司戰略管理部部長。王暉先生具有豐富的企業策略管理經驗，彼於2024年7月起出任本公司執行董事及獲委任為主席。', 'Mr. Wang Hui, Researcher, is the Chairman and Executive Director of the Company. He graduated from the University of Science and Technology of China in 1995 with a Bachelor''s degree in Engineering Thermophysics. From August 1995 to June 2022, Mr. Wang held various positions at the China Academy of Launch Vehicle Technology. From June 2022 to July 2024, he served as Director of the Strategic Management Department of CASC. He was appointed as Executive Director and Chairman of the Company in July 2024.', 'executive', 1);
INSERT INTO board_members (id, name_zh, name_en, title_zh, title_en, bio_zh, bio_en, member_type, sort_order) VALUES (18, '宋樹清先生', 'Mr. Song Shuqing', '執行董事 / 總裁', 'Executive Director / CEO', '宋樹清先生, 碩士，研究員，為本公司執行董事兼總裁。於國防科技大學畢業並獲取碩士學位。於1994年至2011年先後任中國空間技術研究院三產總公司總工程師、總經理、基建部副部長、部長等職位；神舟天辰科技實業有限公司總經理助理、副總經理、保障服務總公司副總經理兼基建部部長；中關村航天科技創新園有限公司籌備組負責人；2011年至2019年先後任航天時代置業發展有限公司總經理、董事兼總經理，其間兼任西安國家民用航天產業基地開發有限公司董事、航天時代置業發展（武漢）有限公司執行董事，以及北京航天恆潤置業有限公司副董事長；2019年6月至2023年1月任中國航天電子技術研究院副院長；2019年11月至2023年3月任於上海證券交易所上市（股份編號：600879）的航天時代電子技術股份有限公司董事；2020 年8月至2023年2月任於重慶航天火箭電子技術有限公司董事長。宋樹清先生在企業管理方面擁有豐富經驗，彼於2023年2月起出任本公司執行董事兼總裁。', 'Mr. Song Shuqing, Master''s degree, Researcher, is an Executive Director and CEO of the Company. He graduated from the National University of Defense Technology. He held various positions including Vice President of the China Academy of Aerospace Electronics Technology. Mr. Song has extensive experience in corporate management and was appointed as Executive Director and CEO of the Company in February 2023.', 'executive', 2);
INSERT INTO board_members (id, name_zh, name_en, title_zh, title_en, bio_zh, bio_en, member_type, sort_order) VALUES (19, '羅振邦先生', 'Mr. Luo Zhenbang', '獨立非執行董事', 'Independent Non-Executive Director', '羅振邦先生，為本公司獨立非執行董事及立信會計師事務所（特殊普通合夥）董事、管理合夥人。羅先生於1991年畢業於蘭州商學院的企業管理專業，自1994年起至今先後主持過多間上市公司的審計工作，曾擔任中國信達資產管理公司及中國長城資產管理公司專家監事、長徵火箭股份有限公司、東方鉭業股份有限公司、吳忠儀錶股份有限公司、聖雪絨股份有限公司、中航重機股份有限公司、神州數碼信息服務股份有限公司、新疆金風科技股份有限公司、高偉電子控股有限公司的獨立董事、於深圳證券交易所上市之東北證券股份有限公司（股份代號：000686）內核專家和於香港聯合交易所上市之國瑞健康產業有限公司（股份代號：2329）的獨立非執行董事。現任於香港聯合交易所上市的京投軌道交通科技控股有限公司（股份代號：1522）的獨立非執行董事。羅先生持有中國註冊會計師、證券期貨業特許會計師、中國註冊資產評估師、中國註冊税務師等專業資格，具有深厚的會計、審計和財務管理經驗，以及對各行業上市公司均有豐富的審計經驗，並廣泛參與企業改組上市、上市公司重組等商務諮詢工作。彼於2004年12月起出任本公司獨立非執行董事。', 'Mr. Luo Zhenbang is an Independent Non-Executive Director of the Company and a director and managing partner of BDO China. He graduated from Lanzhou Commercial College in 1991. He holds professional qualifications as a Chinese CPA and securities and futures chartered accountant. He has served as an Independent Non-Executive Director since December 2004.', 'independent', 3);
INSERT INTO board_members (id, name_zh, name_en, title_zh, title_en, bio_zh, bio_en, member_type, sort_order) VALUES (20, '陳靜茹女士', 'Ms. Chen Jingru', '獨立非執行董事', 'Independent Non-Executive Director', '陳靜茹女士，法學碩士，為本公司獨立非執行董事和北京德恆律師事務所的全球合夥人。陳女士於1985年及1990年獲南開大學頒發法律學士學位及碩士學位。彼於1993年獲中華人民共和國司法部律師資格委員會授予專業律師資格。曾任中央財政金融學院（現稱中央財經大學）保險系綜合教研室副主任、北京保險學會理事、中國海商法學會理事、中央財經大學法律系副主任，以及中國證監會第三屆創業板發審委委員。陳女士於2011年5月至2014年1月擔任於深圳證券交易所上市的中科雲網科技集團股份有限公司（股份代號：002306）的獨立董事、於2014年7月至2022年11月擔任於香港聯合交易所上市的國瑞健康產業有限公司（股份代號：2329）的獨立非執行董事，以及於2019年10月至2022年10月擔任於上海證券交易所上市的中銀國際證券股份有限公司（股份代號：601696）外聘內核委員。陳女士自1993年起任職北京德恆律師事務所，彼在企業及證券方面擁有豐富經驗，於2022年8月起出任本公司獨立非執行董事。', 'Ms. Chen Jingru, LLM, is an Independent Non-Executive Director and a global partner of Beijing DeHeng Law Offices. She obtained her Bachelor''s and Master''s degrees in Law from Nankai University. She has extensive experience in corporate and securities matters and has served as an Independent Non-Executive Director since August 2022.', 'independent', 4);
INSERT INTO board_members (id, name_zh, name_en, title_zh, title_en, bio_zh, bio_en, member_type, sort_order) VALUES (21, '薛蘭女士', 'Ms. Xue Lan', '獨立非執行董事', 'Independent Non-Executive Director', '薛蘭女士，畢業於中國人民大學，先後於1986年及1996年獲取歷史學士及經濟學碩士學位，並於2001年於北京大學光華管理學院修畢EMBA學位。1986年8月至1988年12月，薛女士擔任中華人民共和國外交部檔案館助理館員；1988年12月至1992年12月擔任中華人民共和國駐澳洲悉尼總領館副領。薛女士於1992年12月至1997年8月加入中國證券業協會，擔任國際部主任。1997年8月至2005年12月，彼於華夏證券股份有限公司擔任國際業務部總經理；2005年12月至2006年8月，擔任中信建投證券股份有限公司（其股份於香港聯合交易所（股份代號:6066）及上海證券交易所上市）國際業務部總經理；2006年8月至2014年3月，擔任中銀國際控股有限公司董事總經理及金融產品部聯席主管；2014年3月至2018年3月，擔任華泰金融控股有限公司首席運營官。薛女士為香港證券及期貨事務監察委員會註冊1、2、4、5及9號牌照的負責人員。薛女士於金融業擁有豐富經驗和知識，彼於2024年3月起出任本公司獨立非執行董事。', 'Ms. Xue Lan graduated from Renmin University of China and obtained an EMBA from Peking University''s Guanghua School of Management. She has extensive experience in the financial industry and has served as an Independent Non-Executive Director since March 2024.', 'independent', 5);
INSERT INTO board_members (id, name_zh, name_en, title_zh, title_en, bio_zh, bio_en, member_type, sort_order) VALUES (22, '滕方遷先生', 'Mr. Teng Fangqian', '非執行董事', 'Non-Executive Director', '滕方遷先生，研究生，為本公司非執行董事，於山東化工學院畢業並獲取化學工程系工學學士學位，並於中南財經政法大學修畢企業管理研究生課程進修班。於1983年加入化工部第二膠片廠，歷任PS版車間工段長、副主任等職務；1996年8月至2012年11月先後任中國樂凱膠片集團公司第二膠片廠副廠長、廠長、樂凱華光印刷科技有限公司總經理、中國樂凱膠片集團公司副總經理兼樂凱華光印刷科技有限公司總經理；2012年11月至2019年12月歷任中國樂凱集團有限公司副總經理兼樂凱華光印刷科技有限公司總經理、中國樂凱集團有限公司董事總經理，其間於2013年5月至2015年9月兼任於深圳證券交易所上市的保定樂凱新材料股份有限公司（股份編號：300446）董事長；2019年12月至2022年9月任中國樂凱集團有限公司董事長，其間於2014年11月至2020年2月兼任於上海證券交易所上市的樂凱膠片股份有限公司（股份編號：600135）董事長、2015年9月至2020年5月兼任北京樂凱科技有限公司執行董事、2015年9月至2020年12月兼任樂凱華光印刷科技有限公司董事長。滕先生具有豐富的企業管理經驗。彼於2023年3月起任本公司非執行董事。', 'Mr. Teng Fangqian, postgraduate, is a Non-Executive Director. He joined the Second Film Factory of the Ministry of Chemical Industry in 1983. He served as Chairman of China Lucky Group Corporation from December 2019 to September 2022. He has been a Non-Executive Director since March 2023.', 'non-executive', 6);
INSERT INTO board_members (id, name_zh, name_en, title_zh, title_en, bio_zh, bio_en, member_type, sort_order) VALUES (23, '彭建國先生', 'Mr. Peng Jianguo', '非執行董事', 'Non-Executive Director', '彭建國先生，博士，研究員，為本公司非執行董事。彭先生先後畢業於國防科技大學、西安交通大學和西北工業大學，分別獲工學學士、公共管理碩士及管理學博士學位。於1990年7月至2004年4月先後任航天11所財經處副處長、處長和副總會計師兼財經處處長；2004年4月至2017年3月先後任中國航天推進技術研究院財務部副部長、部長和總會計師；2017年3月至2021年12月任中國運載火箭技術研究院總會計師，其間於2011年4月至2020年3月兼任航天科技財務有限責任公司董事、2011年7月至2017年4月兼任於深圳證券交易所上市的西部金屬材料股份有限公司（股份編號：002149）董事、2016年11月至2017年8月兼任中國長江動力集團有限公司副董事長，以及2017年8月至2019年5月兼任航天時代置業發展有限公司董事；自2021年12月至2023年3月擔任中國運載火箭技術研究院副院級調研員，2023年3月起至今擔任該院二級專務；自2022年8月起至今擔任北京航天醫療有限公司監事會主席；自2023年1月及2月起分別擔任航天投資控股有限公司監事會主席及中國樂凱集團有限公司董事；自2024年7月起出任長沙空天技術創新研究院院長、法定代表人。彭先生具有豐富的財務管理經驗。彼於2023年3月起任本公司非執行董事。', 'Mr. Peng Jianguo, PhD, Researcher, is a Non-Executive Director. He graduated from the National University of Defense Technology, Xi''an Jiaotong University and Northwestern Polytechnical University. He has extensive financial management experience and has been a Non-Executive Director since March 2023.', 'non-executive', 7);
INSERT INTO board_members (id, name_zh, name_en, title_zh, title_en, bio_zh, bio_en, member_type, sort_order) VALUES (24, '劉永先生', 'Mr. Liu Yong', '非執行董事', 'Non-Executive Director', '劉永先生，碩士，為本公司非執行董事，先後畢業於上海財經大學及中國人民大學，分別獲取管理學學士和經濟學碩士學位。於1989年7月至1993年7月先後任航空航天部財務司大檢查辦副主任科員和企業處主任科員;1993年7月至1999年7月先後任航天工業總公司財務部企業處主任科員和財務局企業處主任科員;1999年7月至2003年5月先後任中國航天科技集團公司財務部資金會計處副處長、處長，和財務部財務處處長;2003年5月至2009年2月先後任於上海證券交易所上市的航天時代電子技術股份有限公司（股份編號:6066）之財務部負責人、副總會計師、總會計師，其間於2005年1月至2008年11月兼任財務部部長;2009年2月至2016年6月歷任中國航天電子技術研究院總會計師及航天動力技術研究院總會計師，其間於2009年4月至2014年5月任長徵火箭（航天電子）技術股份有限公司監事;2016年6月至2021年9月先後任航天科技財務有限責任公司總經理、董事兼總經理等職位;2021年9月至2024年9月先後任中國航天科技集團有限公司財務金融部部長，並自2024年9月起至今擔任財務金融部一級專務。劉永先生具有豐富財務金融管理經驗。彼於2025年2月起任本公司非執行董事。', 'Mr. Liu Yong, Master''s degree, is a Non-Executive Director. He graduated from Shanghai University of Finance and Economics and Renmin University of China. He has extensive financial management experience and has been a Non-Executive Director since February 2025.', 'non-executive', 8);

-- 管理層成員
INSERT INTO board_members (name_zh, name_en, title_zh, title_en, bio_zh, bio_en, member_type, sort_order) VALUES
('王暉先生', 'Mr. Wang Hui', '董事局主席 / 執行董事', 'Chairman / Executive Director', '王暉先生，研究員，為本公司主席兼執行董事，1995年畢業於中國科學技術大學，專修工程熱物理並獲取工學學士，並於2008年至2009年期間在職研究生學習，修畢國際空間大學空間管理專業，獲取理學碩士。王暉先生自1995年8月起至2022年6月期間，歷任中國運載火箭技術研究院綜合經營部計劃處處長助理、院辦公室祕書處副處長、科研計劃部科研計劃處處長、科研計劃部副部長、綜合計劃部部長，以及研究院副院長；2022年6月至2024年7月擔任中國航天科技集團有限公司戰略管理部部長。王暉先生具有豐富的企業策略管理經驗，彼於2024年7月起出任本公司執行董事及獲委任為主席。', 'Mr. Wang Hui, Researcher, is the Chairman and Executive Director of the Company. He graduated from the University of Science and Technology of China in 1995 with a Bachelor degree in Engineering Thermophysics. From August 1995 to June 2022, Mr. Wang held various positions at the China Academy of Launch Vehicle Technology. From June 2022 to July 2024, he served as Director of the Strategic Management Department of CASC. He was appointed as Executive Director and Chairman of the Company in July 2024.', 'management', 9);

INSERT INTO board_members (name_zh, name_en, title_zh, title_en, bio_zh, bio_en, member_type, sort_order) VALUES
('宋樹清先生', 'Mr. Song Shuqing', '執行董事 / 總裁', 'Executive Director / CEO', '宋樹清先生, 碩士，研究員，為本公司執行董事兼總裁。於國防科技大學畢業並獲取碩士學位。於1994年至2011年先後任中國空間技術研究院三產總公司總工程師、總經理、基建部副部長、部長等職位；神舟天辰科技實業有限公司總經理助理、副總經理、保障服務總公司副總經理兼基建部部長；中關村航天科技創新園有限公司籌備組負責人；2011年至2019年先後任航天時代置業發展有限公司總經理、董事兼總經理，其間兼任西安國家民用航天產業基地開發有限公司董事、航天時代置業發展（武漢）有限公司執行董事，以及北京航天恆潤置業有限公司副董事長；2019年6月至2023年1月任中國航天電子技術研究院副院長；2019年11月至2023年3月任於上海證券交易所上市（股份編號：600879）的航天時代電子技術股份有限公司董事；2020 年8月至2023年2月任於重慶航天火箭電子技術有限公司董事長。宋樹清先生在企業管理方面擁有豐富經驗，彼於2023年2月起出任本公司執行董事兼總裁。', 'Mr. Song Shuqing, Master degree, Researcher, is an Executive Director and CEO of the Company. He graduated from the National University of Defense Technology. He held various positions including Vice President of the China Academy of Aerospace Electronics Technology. Mr. Song has extensive experience in corporate management and was appointed as Executive Director and CEO of the Company in February 2023.', 'management', 10);

INSERT INTO board_members (name_zh, name_en, title_zh, title_en, bio_zh, bio_en, member_type, sort_order) VALUES
('蘭桂紅女士', 'Ms. Lan Guihong', '總會計師', 'Chief Accountant', '蘭桂紅女士，高級經濟師，為本公司總會計師，蘭桂紅女士先後畢業於中南財經大學、哈爾濱工業大學，分別獲經濟學學士和管理學碩士學位。自2001年起，曆任中國航天科技集團有限公司財務部國有資產管理處處長、中國航天科技集團有限公司財務部總部財務處處長、中國航天科技集團有限公司財務部會計處處長、中國航天科技集團有限公司財務金融部資金與會計管理處處長、中國航天科技集團有限公司財務金融部副部長並兼任中國長城工業集團有限公司董事、中國航天科技集團有限公司審計與風險管理部副部長。蘭桂紅女士具有豐富的財務管理及審計與風險管理經驗，彼於2019年12月獲委任本公司總會計師。', 'Ms. Lan Guihong, Senior Economist, is the Chief Accountant of the Company. She graduated from Zhongnan University of Economics and Law and Harbin Institute of Technology with a Bachelor degree in Economics and a Master degree in Management respectively. She has extensive experience in financial management and auditing, and was appointed Chief Accountant of the Company in December 2019.', 'management', 11);

INSERT INTO board_members (name_zh, name_en, title_zh, title_en, bio_zh, bio_en, member_type, sort_order) VALUES
('林建明先生', 'Mr. Lin Jianming', '副總裁', 'Vice President', '林建明先生，為本公司副總裁。1994年獲山東科技大學工科學士學位，化工工藝專業。1994年起任志源塑膠製品（惠州）有限公司品管部經理，1999年起任志源塑膠製品（惠州）有限公司電池廠廠長，2003年起任航天科技半導體有限公司董事常務副總經理，2007年起任志源實業、志順電業有限公司董事總經理，期間，於2010年起任航天控股工業有限公司董事、總經理，2012年起任本公司總裁助理，2020年10月起任本公司副總裁。', 'Mr. Lin Jianming is a Vice President of the Company. He obtained his Bachelor degree in Chemical Engineering from Shandong University of Science and Technology in 1994. He has served as Vice President of the Company since October 2020.', 'management', 12);

INSERT INTO board_members (name_zh, name_en, title_zh, title_en, bio_zh, bio_en, member_type, sort_order) VALUES
('李剛先生', 'Mr. Li Gang', '副總裁', 'Vice President', '李剛先生，為本公司副總裁。1992年畢業於鄭州航空工業管理學院經營管理系工業企業計劃統計(含市場營銷)專業。2003年獲得國立南澳大學MBA工商管理碩士學位。1992年9月至1996年12月任航天總公司一院十三所助理工程師，1996年12月至1998年1月任航天總公司人事局主任科員，1998年1月至1998年5月任航天科技國際集團駐京辦助工，1998年5月起，歷任中國航天國際控股有限公司綜合部高級人事主任、綜合部助理總經理、綜合部副總經理、人力資源部總監、總裁助理、企業文化部總經理、人力資源部總經理，2023年1月起任本公司副總裁。', 'Mr. Li Gang is a Vice President of the Company. He graduated from Zhengzhou Institute of Aeronautical Industry Management in 1992 and obtained his MBA from the University of South Australia in 2003. He has served as Vice President of the Company since January 2023.', 'management', 13);

-- ════════════════════════════════════════════════════════════
-- 第四部分：企業管治文件
-- ════════════════════════════════════════════════════════════

INSERT INTO governance_docs (id, title_zh, title_en, pdf_url, sort_order) VALUES (21, '股東召開股東特別大會的程序', 'Procedures for Shareholders to Convene an EGM', 'http://www.casil-group.com/download/big5/governance/c_C02032012.pdf', 1);
INSERT INTO governance_docs (id, title_zh, title_en, pdf_url, sort_order) VALUES (22, '股東提名人選參選董事的程序', 'Procedures for Shareholders to Nominate Directors', 'http://www.casil-group.com/download/big5/governance/c_031ProposeDirProcedure.pdf', 2);
INSERT INTO governance_docs (id, title_zh, title_en, pdf_url, sort_order) VALUES (23, '股東及投資者的通訊政策', 'Shareholders and Investors Communication Policy', 'http://www.casil-group.com/download/big5/governance/c_031_ShareholdersCommPolicy_20250327.pdf', 3);
INSERT INTO governance_docs (id, title_zh, title_en, pdf_url, sort_order) VALUES (24, '提名委員會職權範圍書', 'Terms of Reference of the Nomination Committee', 'http://www.casil-group.com/download/big5/RemunerationCommittee.pdf', 4);
INSERT INTO governance_docs (id, title_zh, title_en, pdf_url, sort_order) VALUES (25, '薪酬委員會職權範圍書', 'Terms of Reference of the Remuneration Committee', 'http://www.casil-group.com/download/big5/governance/c_031RemunerationCommittee.pdf', 5);
INSERT INTO governance_docs (id, title_zh, title_en, pdf_url, sort_order) VALUES (26, '審核委員會職權範圍書', 'Terms of Reference of the Audit Committee', 'http://www.casil-group.com/download/big5/governance/c_031AuditCommittee_20220830_1615.pdf', 6);
INSERT INTO governance_docs (id, title_zh, title_en, pdf_url, sort_order) VALUES (27, '環境、社會及管治委員會職權範圍書', 'Terms of Reference of the ESG Committee', 'http://www.casil-group.com/download/big5/governance/c_031ESGCommittee_20250327.pdf', 7);
INSERT INTO governance_docs (id, title_zh, title_en, pdf_url, sort_order) VALUES (28, '組織章程細則', 'Articles of Association', 'http://www.casil-group.com/download/big5/governance/c_031M&A.pdf', 8);
INSERT INTO governance_docs (id, title_zh, title_en, pdf_url, sort_order) VALUES (29, '反貪污政策', 'Anti-Corruption Policy', 'http://www.casil-group.com/download/big5/governance/C_anti_20220830.pdf', 9);
INSERT INTO governance_docs (id, title_zh, title_en, pdf_url, sort_order) VALUES (30, '舉報政策', 'Whistleblowing Policy', 'http://www.casil-group.com/download/big5/governance/C_blowing_20220830.pdf', 10);

-- ════════════════════════════════════════════════════════════
-- 第五部分：公司資訊
-- ════════════════════════════════════════════════════════════

INSERT INTO company_news (date, title_zh, title_en) VALUES
('2026-05-29', '航天控股應約參加智信財經路演活動', 'CASIL Invited to Participate in Zhixin Financial Roadshow'),
('2026-05-13', '航天控股與澳門大學進行合作交流', 'CASIL Conducts Cooperation Exchange with University of Macau'),
('2026-04-15', '航天控股舉行2025年度業績說明會', 'CASIL Holds 2025 Annual Results Presentation'),
('2026-04-01', '航天控股赴香港城市大學交流訪問', 'CASIL Visits City University of Hong Kong for Exchange'),
('2026-01-19', '航天控股參加北京銀行第四屆生態夥伴大會暨行業分論壇路演活動', 'CASIL Attends Bank of Beijing 4th Ecological Partner Conference & Industry Sub-Forum Roadshow'),
('2026-01-19', '航天控股參加資本市場高質量創新發展交流會暨2025年度上市公司評選頒獎典禮', 'CASIL Participates in Capital Market High-Quality Innovation Development Conference & 2025 Listed Company Awards'),
('2025-11-17', '航天控股顯示模組產品亮相日本FINETECH 2025展會', 'CASIL Display Module Products Debut at FINETECH Japan 2025'),
('2025-09-29', '航天控股功率半導體封測產品亮相PCIM Asia 2025', 'CASIL Power Semiconductor Packaging & Testing Products Debut at PCIM Asia 2025'),
('2025-02-02', '南通康源集成電路封裝載板能力建設項目已開始小批次試生產', 'Nantong Kangyuan IC Packaging Substrate Capability Project Begins Small-Batch Trial Production'),
('2024-01-17', '航天控股所屬子公司獲評「國家級綠色工廠」', 'CASIL Subsidiary Recognized as National Green Factory');

-- ════════════════════════════════════════════════════════════
-- 第六部分：友情鏈接
-- ════════════════════════════════════════════════════════════

INSERT INTO links (id, name_zh, name_en, url, sort_order) VALUES (13, '志源實業有限公司', 'Zhiyuan Industrial Co., Ltd.', 'https://www.casil-cheeyuen.com/', 1);
INSERT INTO links (id, name_zh, name_en, url, sort_order) VALUES (14, '志順電業有限公司', 'Zhishun Electrical Co., Ltd.', 'https://www.casil-jeckson.com', 2);
INSERT INTO links (id, name_zh, name_en, url, sort_order) VALUES (15, '航天科技半導體有限公司', 'Aerospace Technology Semiconductor Co., Ltd.', 'https://www.casilsemi.com', 3);
INSERT INTO links (id, name_zh, name_en, url, sort_order) VALUES (16, '康源電子廠有限公司', 'Kangyuan Electronics Factory Co., Ltd.', 'https://www.pcb.com.cn', 4);
INSERT INTO links (id, name_zh, name_en, url, sort_order) VALUES (17, '航天控股智慧研究所', 'CASIL Smart Research Institute', 'http://www.casil-group.com/big5/egpp_1_Agency/index.html', 5);
INSERT INTO links (id, name_zh, name_en, url, sort_order) VALUES (18, '志豪微電子（惠州）有限公司', 'Zhihao Microelectronics (Huizhou) Co., Ltd.', 'https://www.chmicro.com', 6);

-- ════════════════════════════════════════════════════════════
-- 第七部分：子公司數據
-- ════════════════════════════════════════════════════════════

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

-- ════════════════════════════════════════════════════════════
-- 第八部分：業務總覽卡片
-- ════════════════════════════════════════════════════════════

INSERT INTO business_cards (id, category, main_title, sub_title, en_name, body_zh, body_en, clients, learn_more_href, image_layout, product_images, sort_order) VALUES ('dongguan-kangyuan', 'advanced_manufacturing', '東莞康源', '電路印製板業務', 'Dongguan Kangyuan', '始建於 1977 年，1993 年在虎門塘廈投產，2008 年轉型為外商獨資，現已成為一家擁有 10 萬平方廠房、1800 名智慧員工的專業印刷電路板製造商，並於 2010 年榮獲「國家高新技術企業」認證。2017 年被確定為廣東省首批「倍增計劃」企業之一。公司專注於高階對裝板、HDI、多層刚性 / 撓性 / 剛撓性結合板製造，廣泛應用於通信包裝 IC 封裝板、MEMS 醫療等領域，客戶遍布北美、歐洲、中國及太平洋地區。研發（工程）中心於 2018 年獲授「廣東省省級技術研發中心」，年研發經費投入 6% 以上，先後通過 ISO9001、ISO14001、IATF16949、ISO50001 等體系認證，並榮獲「國家級綠色工廠」、「中國電子電路行業百強企業」等獎項。', 'Founded in 1977, commenced production in Humen Tangxia in 1993, and transformed into a wholly foreign-owned enterprise in 2008, the company has grown into a professional PCB manufacturer with 100,000 sqm of factory space and 1,800 skilled employees, earning the ''National High-Tech Enterprise'' certification in 2010. In 2017, it was designated as one of Guangdong Province''s first ''Doubling Plan'' enterprises. The company specializes in high-end packaging substrates, HDI, multi-layer rigid/flexible/rigid-flex boards, widely applied in communication packaging, IC substrates, MEMS, and medical fields, with customers across North America, Europe, China, and the Pacific region. Its R&D (Engineering) Center was recognized as a ''Guangdong Provincial Technology R&D Center'' in 2018, with annual R&D investment exceeding 6%, and has successively obtained ISO9001, ISO14001, IATF16949, and ISO50001 certifications, along with honors including ''National Green Factory'' and ''China Electronics Circuit Industry Top 100 Enterprise''.', '["Sensata","Accelink","OFILM","Hisense"]', '/zh/business/subsidiaries', 'grid', '[{"lblZh":"產品圖 1","lblEn":"Product Image 1","img":"/images/kangyuan1.png"},{"lblZh":"產品圖 2","lblEn":"Product Image 2","img":"/images/kangyuan2.png"},{"lblZh":"產品圖 3","lblEn":"Product Image 3","img":"/images/kangyuan3.png"},{"lblZh":"產品圖 4","lblEn":"Product Image 4","img":"/images/kangyuan4.png"}]', 1);

INSERT INTO business_cards (id, category, main_title, sub_title, en_name, body_zh, body_en, clients, learn_more_href, image_layout, product_images, sort_order) VALUES ('hangke-semiconductor', 'advanced_manufacturing', '航科半導體', '液晶顯示器件業務', 'Hangke Semiconductor', '國內早期從事液晶顯示器件研發和製造的高科技企業，旗下廣東（惠州）半導體有限公司為 CASIL 全資子公司，生產研發基地坐落於廣東省惠州市仲愷國家高新技術開發區航天科技（惠州）工業園，現有員工 1500 餘人，高技術人員佔 20% 以上，擁有四棟共 41800 平方米現代化廠房。產品黑白 LCD/TFT 模組、觸控模組、智能顯示模組，堅持不斷產品技術創新，是一家集研發 / 設計 / 生產 / 銷售於一體的高新技術企業，為 LCD 和 LCM 業界的老牌生產廠家，擁有多項自主知識產權的顯示技術發明專利，並持有 LCD、LCM、TCM、IPM 和智能自動化等工藝。', 'A pioneering high-tech enterprise in LCD device R&D and manufacturing in China, its subsidiary Guangdong (Huizhou) Semiconductor Co., Ltd. is a wholly-owned subsidiary of CASIL. The production and R&D base is located in the Aerospace Technology (Huizhou) Industrial Park within the Zhongkai National High-Tech Development Zone in Huizhou City, Guangdong Province. With over 1,500 employees and technical staff accounting for more than 20%, the company operates four modern factory buildings totaling 41,800 square meters. Products include monochrome LCD/TFT modules, touch modules, and smart display modules. Committed to continuous product and technology innovation, it is a high-tech enterprise integrating R&D/design/production/sales, a veteran manufacturer in the LCD and LCM industry, holding multiple independent intellectual property patents for display technologies and processes including LCD, LCM, TCM, IPM, and intelligent automation.', '["Honeywell","Gigaset","resideo","LG"]', '/zh/business/subsidiaries', 'grid', '[{"lblZh":"產品圖 1","lblEn":"Product Image 1","img":"/images/hangke1.png"},{"lblZh":"產品圖 2","lblEn":"Product Image 2","img":"/images/hangke2.png"},{"lblZh":"產品圖 3","lblEn":"Product Image 3","img":"/images/hangke3.png"},{"lblZh":"產品圖 4","lblEn":"Product Image 4","img":"/images/hangke4.png"}]', 2);

INSERT INTO business_cards (id, category, main_title, sub_title, en_name, body_zh, body_en, clients, learn_more_href, image_layout, product_images, sort_order) VALUES ('zhihao-microelectronics', 'advanced_manufacturing', '志豪微電子', '智能功率模組業務', 'Zhihao Microelectronics', '致力為國內外客戶提供優質的IPM、IGBT等功率模塊封裝代工業務。公司專注於IPM、PM封測代工，註冊資本人民幣9000萬元，首期投資1.98億元，現具備月產標準IPM模塊DIP29 200K、DIP25 600K、SDIP26 600K、SDIP26FP 300K、SDIP25FP 300K及Easy PIM 100K的封測代工能力。擁有國際一流的生產設備、可靠性試驗及檢測設備，具備從芯片匹配、模塊設計、工藝仿真、封裝生產到最終測試應用全流程閉環研發生產能力，可為客戶提供定制化的模塊解決方案，致力成為世界領先的半導體智能功率模塊封測代工企業。', 'We are committed to providing high-quality packaging and foundry services for power modules including IPM and IGBT to domestic and overseas clients.Specialising in the packaging and testing foundry of IPM and PM products, the company boasts a registered capital of RMB 90 million and an initial investment of RMB 198 million. At present, our monthly packaging and testing capacity stands at 200,000 standard DIP29 IPM modules, 600,000 DIP25 modules, 600,000 SDIP26 modules, 300,000 SDIP26FP modules, 300,000 SDIP25FP modules and 100,000 Easy PIM modules.Equipped with world-class production equipment, reliability testing and inspection facilities, we feature a full closed-loop R&D and manufacturing capacity covering chip matching, module design, process simulation, packaging production, final testing and application validation. We deliver customised module solutions for customers and strive to grow into a globally leading intelligent semiconductor power module packaging and test foundry.', '["CR Micro","芯藿半導體"]', '/zh/business/subsidiaries', 'grid', '[{"lblZh":"產品圖 1","lblEn":"Product Image 1","img":"/images/zhihao1.png"},{"lblZh":"產品圖 2","lblEn":"Product Image 2","img":"/images/zhihao2.png"},{"lblZh":"產品圖 3","lblEn":"Product Image 3","img":"/images/zhihao3.png"},{"lblZh":"產品圖 4","lblEn":"Product Image 4","img":"/images/zhihao4.png"}]', 3);

INSERT INTO business_cards (id, category, main_title, sub_title, en_name, body_zh, body_en, clients, learn_more_href, image_layout, product_images, sort_order) VALUES ('hongkong-zhishun', 'advanced_manufacturing', '香港志順', '電源產品業務', 'Hong Kong Zhishun', '憑藉優質電子產品，一直在業界穩踞領導地位。專注於開關電源、配電器、逆變器、微型投影、家居安防、便攜式電源、動力電池組及無線控制等產品的設計及生產，深受全球客戶青睞。於惠州仲愷高新區航天科技工業園建有兩座廠房，各佔面積2.5萬平方米，設置24條生產線、12條貼片生產線、6條變壓器生產線及6台自動插件機，並配備10條人工插件生產線，共聘請逾1500名員工及80多位不同領域的R&D工程師。為客戶提供「一站式」OEM及ODM電子產品製造服務，增值服務及全通式解決方案獲各方客戶一致好評。', 'With high-quality electronic products, the company has consistently maintained a leadership position in the industry. Specializing in the design and production of switching power supplies, adapters, inverters, micro projectors, home security, portable power supplies, power battery packs and wireless control products, it is highly favored by global customers. The company has two factory buildings in the Aerospace Technology Industrial Park of Zhongkai High-Tech Zone, Huizhou, each covering an area of 25,000 square meters, equipped with 24 production lines, 12 SMT lines, 6 transformer production lines, 6 automatic plug-in machines, and 10 manual plug-in lines, employing over 1,500 staff and more than 80 R&D engineers across various fields. Providing customers with ''one-stop'' OEM and ODM electronic product manufacturing services, its value-added services and turnkey solutions have received unanimous praise from clients.', '["Panasonic","Honeywell"]', '/zh/business/subsidiaries', 'grid', '[{"lblZh":"產品圖 1","lblEn":"Product Image 1","img":"/images/zhishun1.png"},{"lblZh":"產品圖 2","lblEn":"Product Image 2","img":"/images/zhishun2.png"},{"lblZh":"產品圖 3","lblEn":"Product Image 3","img":"/images/zhishun3.png"},{"lblZh":"產品圖 4","lblEn":"Product Image 4","img":"/images/zhishun4.png"}]', 4);

INSERT INTO business_cards (id, category, main_title, sub_title, en_name, body_zh, body_en, clients, learn_more_href, image_layout, product_images, sort_order) VALUES ('hongkong-zhiyuan', 'advanced_manufacturing', '香港志源', '注塑及表面處理業務', 'Hong Kong Zhiyuan', '汽車塑膠電鍍及噴塗的專業製造商，擁有配套精密模具製造中心、注塑成形中心和電鍍噴塗製造中心，為客戶提供模具製造、注塑成型、塑膠電鍍、表面噴塗及印刷、產品組裝的一站式解決方案。公司總部位於香港，生產集中在廣東惠州，廠房面積50000平方米，集團員工人數1800人，年營業額達8000萬美元。為奔馳、寶馬、大眾、法拉利、雷諾、雪鐵龍、通用、福特、克萊斯勒、日產、本田、豐田等國際知名品牌提供汽車塑膠電鍍及噴塗件。公司擁有兩條全自動塑膠電鍍生產線和三條無塵自動噴塗線，並通過ISO9001、ISO14001及ISO/IATF16949認證。', 'A professional manufacturer of automotive plastic electroplating and spraying, with supporting precision mold manufacturing center, injection molding center and electroplating & spraying manufacturing center, providing customers with one-stop solutions for mold manufacturing, injection molding, plastic electroplating, surface spraying & printing, and product assembly. Headquartered in Hong Kong, with production concentrated in Huizhou, Guangdong, the company has a factory area of 50,000 square meters, 1,800 employees, and annual revenue of USD 80 million. It supplies automotive plastic electroplating and spraying parts to internationally renowned brands including Mercedes-Benz, BMW, Volkswagen, Ferrari, Renault, Citroën, General Motors, Ford, Chrysler, Nissan, Honda, and Toyota. The company operates two fully automatic plastic electroplating production lines and three dust-free automatic spraying lines, and is certified to ISO9001, ISO14001 and ISO/IATF16949.', '["Benz","BMW","大眾","法拉利","通用","Ford","Toyota"]', '/zh/business/subsidiaries', 'grid', '[{"lblZh":"產品圖 1","lblEn":"Product Image 1","img":"/images/zhiyuan1.png"},{"lblZh":"產品圖 2","lblEn":"Product Image 2","img":"/images/zhiyuan2.png"},{"lblZh":"產品圖 3","lblEn":"Product Image 3","img":"/images/zhiyuan3.png"},{"lblZh":"產品圖 4","lblEn":"Product Image 4","img":"/images/zhiyuan4.png"}]', 5);

INSERT INTO business_cards (id, category, main_title, sub_title, en_name, body_zh, body_en, clients, learn_more_href, image_layout, product_images, sort_order) VALUES ('aerospace-hightech', 'aerospace_services', '航天高科', '物業租賃服務', 'Aerospace Hightech', '立足香港及大灣區，專業從事優質物業租賃與商業地產運營管理。旗下資產組合涵蓋深圳航天科技廣場（占地約20畝，由A座48層和B座28層兩棟高層建築組成，建築面積約20萬平方米）及廣州市天河區5A甲級寫字樓（兩棟，面積逾920萬平方米）及相關商業配套設施，為企業客戶提供靈活、高品質的辦公空間解決方案，助力租戶在大灣區高效開展業務。', 'Headquartered in Hong Kong and the Greater Bay Area, we specialise in premium property leasing and commercial real estate operation and management.Our asset portfolio includes Shenzhen Aerospace Science and Technology Plaza (covering a land area of approximately 20 mu, consisting of two high-rise towers: Tower A with 48 floors and Tower B with 28 floors, with a total construction floor area of around 200,000 square metres), two Grade 5A Grade A office buildings in Tianhe District, Guangzhou with a total floor area exceeding 9.2 million square metres, as well as supporting commercial amenities. We deliver flexible, high-quality office space solutions for corporate clients, empowering tenants to conduct business efficiently across the Greater Bay Area.', '[]', '/zh/business/subsidiaries', 'single', '[{"lblZh":"物業圖 1","lblEn":"Property Image 1","img":"/images/gaoke.jpg"}]', 6);

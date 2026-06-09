import { getDb } from "./database";

async function main() {
  const db = await getDb();

// Clear existing data
db.exec(`
  DELETE FROM pages;
  DELETE FROM announcements;
  DELETE FROM board_members;
  DELETE FROM governance_docs;
  DELETE FROM company_news;
  DELETE FROM subsidiaries;
  DELETE FROM links;
`);

// --- Pages ---
const insertPage = db.prepare(
  "INSERT OR REPLACE INTO pages (id, section, title_zh, title_en, content_zh, content_en, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)"
);

const pages: [string, string, string, string, string, string, number][] = [
  [
    "about",
    "about",
    "关于我们",
    "About Us",
    "中国航天国际控股有限公司（航天控股）是中国航天科技集团公司（中国航天）在香港的上市公司（股份代号：31）。作为中国航天的海外窗口和国际化平台，航天控股承载着连接中国航天与全球市场的桥梁使命。\n\n本栏目汇集了公司背景、企业文化、发展目标、董事局成员及企业管治等核心信息，帮助您全面了解航天控股的发展历程与治理架构。",
    "China Aerospace International Holdings Limited (CASIL) is a Hong Kong-listed company (Stock Code: 31) of China Aerospace Science and Technology Corporation (CASC). As the overseas window and international platform of CASC, CASIL serves as a bridge connecting China's aerospace industry with the global market.\n\nThis section brings together core information including Company Background, Corporate Culture, Development Goals, Board of Directors, and Corporate Governance, helping you gain a comprehensive understanding of CASIL's development journey and governance structure.",
    0,
  ],
  [
    "background",
    "about",
    "背景",
    "Background",
    "中国航天国际控股有限公司 ( 航天控股 ) 是中国航天科技集团公司 ( 中国航天 ) 在香港的上市公司 ( 股份代号：31 )。中国航天作为航天控股的大股东，是中国进行空间技术和产品 ( 航天器、运载火箭、卫星等 ) 的开发、研究、生产和商用的企业，拥有雄厚的专业人才资源和技术力量优势。\n\n为配合集团新的发展战略和发展方向，本公司已将其中文名称改为「中国航天国际控股有限公司」（股份简称 ：「航天控股」)。新名称亦蕴涵了本公司与主要股东中国航天紧密相连的关系和未来在业务上互动发展的深层意义。",
    "China Aerospace International Holdings Limited (CASIL) is a Hong Kong-listed company (Stock Code: 31) of China Aerospace Science and Technology Corporation (CASC). As the majority shareholder of CASIL, CASC is an enterprise engaged in the development, research, production and commercial application of space technology and products (spacecraft, launch vehicles, satellites, etc.), possessing strong professional talent resources and technological advantages.\n\nTo align with the Group's new development strategy and direction, the Company has changed its Chinese name to \"China Aerospace International Holdings Limited\" (stock short name: \"CASIL\"). The new name also reflects the close relationship between the Company and its major shareholder CASC, and the deeper significance of future business interaction and development.",
    0,
  ],
  [
    "culture",
    "about",
    "企业文化",
    "Corporate Culture",
    "「爱国、创新、诚信、和谐、尽责」为本公司企业文化的核心，亦为本公司企业使命和业务发展原则，也是员工作为日常业务运作和作业方向的核心价值：\n\n爱国\n爱国、爱港、爱航天、爱企业\n\n创新\n坚持新发展理念，以创新驱动发展\n\n诚信\n恪守诚信，以廉洁及公平为原则，依法守法\n坚持合作共赢，善待各持份者\n\n和谐\n以德治企，坚持团结共事，和谐共享\n\n尽责\n敢担当、负责任\n\n使命\n为客户、股东、员工及社会缔造持久的价值和效益。\n\n愿景\n本公司致力推动技术创新和专业化制造，专注以高品质和高效率为供应链及产业链服务，聚焦先进制造业及现代服务业作为核心能力，冀成为面向未来、具有显著创新能力和持续为客户创造价值的国际化企业，为客户提供专业、高效、安全和环保的产品和服务。\n\n缔造企业文化的政策及守则\n本公司以审慎的态度经营及管理业务，以确保本公司之业务能在将来持续发展，为社会经济作出贡献。本公司的政策及守则目的是把企业价值观融入日常业务运作和作业方式中，其中，制定了《员工合规经营行为守则》，清晰向员工传达所需的合规经营意识，确保公司以高道德水平及专业操守营运; 并通过《反贪污政策》和《举报政策》，缔造廉洁守正和负责任的经营团队。\n\n本公司设有企业文化部，负责定期举办内部对企业使命与理念贯彻的活动和讲座，凝聚员工对公司的归属感，搭建分享想法的平台，以缔造爱国、创新，以及具诚信、和谐、负责任的团队。本公司采取多种沟通渠道，并以骨干员工流失率、举报数据等评估和监测企业文化的贯彻性，同时，要求领导层及管理人员在日常工作中积极实践企业价值及贯彻良好操守，为属下员工树立榜样。\n\n企业文化与发展策略\n本公司制定了长远的规划纲要，并持续评估本公司面对的潜在机遇与挑战。通过本公司企业文化的核心: 「爱国、创新、诚信、和谐、尽责」，持续提升本公司员工的道德操守、完善公司管治制度、防范公司合规经营风险，为员工本身及公司建立竞争优势，让公司各项业务稳定发展。",
    "\"Patriotism, Innovation, Integrity, Harmony, Responsibility\" are the core values of our corporate culture, the mission and business development principles of the Company, and the core values that guide employees in their daily operations:\n\nPatriotism\nLove the country, love Hong Kong, love aerospace, love the enterprise\n\nInnovation\nAdhere to new development concepts and drive development through innovation\n\nIntegrity\nUphold integrity, adhere to the principles of honesty and fairness, and comply with the law\nInsist on win-win cooperation and treat all stakeholders well\n\nHarmony\nGovern the enterprise with virtue, adhere to unity and collaboration, and share harmony\n\nResponsibility\nDare to take on responsibility and be accountable\n\nMission\nCreate lasting value and benefits for customers, shareholders, employees and society.\n\nVision\nThe Company is committed to promoting technological innovation and specialized manufacturing, focusing on serving the supply chain and industrial chain with high quality and efficiency. We focus on advanced manufacturing and modern service industries as our core competencies, aspiring to become a future-oriented international enterprise with significant innovation capabilities that continuously creates value for customers, providing professional, efficient, safe and environmentally friendly products and services.\n\nPolicies and Codes for Building Corporate Culture\nThe Company operates and manages its business with a prudent approach to ensure sustainable development and contribute to social and economic progress. Our policies and codes aim to integrate corporate values into daily business operations and practices. Through the \"Employee Compliance Conduct Code\", \"Anti-Corruption Policy\" and \"Whistleblowing Policy\", we foster a clean, honest and responsible management team.\n\nThe Company has established a Corporate Culture Department responsible for regularly organizing internal activities and seminars. The Company adopts various communication channels and monitors the implementation of corporate culture through key employee turnover rates and whistleblowing data.\n\nCorporate Culture and Development Strategy\nThe Company has formulated a long-term planning outline and continuously evaluates potential opportunities and challenges. Through our core values, we continuously enhance employee ethical standards, improve corporate governance, prevent compliance risks, and establish competitive advantages for sustainable development.",
    0,
  ],
  [
    "goals",
    "about",
    "目标",
    "Goals",
    "航天控股将在大股东中国航天的鼎力支持下，充分利用香港各方面的优势，逐步实现建设成为一个具有科学化的管理体系、强势的整体市场竞争能力、优质的战略合作伙伴，为股东创造良好的投资价值。\n\n本公司及各附属公司的主要业务为科技工业及航天服务业务。",
    "CASIL will, with the full support of its major shareholder CASC, fully leverage the various advantages of Hong Kong, and gradually build itself into an enterprise with a scientific management system, strong overall market competitiveness, and high-quality strategic partners, creating excellent investment value for shareholders.\n\nThe principal businesses of the Company and its subsidiaries are technology industry and aerospace services.",
    0,
  ],
  [
    "subsidiaries",
    "business",
    "子公司关系",
    "Subsidiary Relationships",
    "全资子公司\n康源电子厂：PCB、IC封装载板业务\n康惠惠州半导体：显示模组、传感器封装\n志源实业：储能电池相关业务\n志源塑胶制品：精密结构件制造\n航天科技半导体(香港)：功率半导体研发销售\n航科新世纪科技：物业运营、产业投资\n\n控股子公司\n航天数联信息技术：工业互联网、智能制造\n\n参股企业\n瑞华泰薄膜：新材料领域布局",
    "Wholly-owned Subsidiaries\nKangyuan Electronics Factory: PCB, IC packaging substrate business\nKanghui Huizhou Semiconductor: Display modules, sensor packaging\nZhiyuan Industrial: Energy storage battery related business\nZhiyuan Plastic Products: Precision structural components manufacturing\nAerospace Technology Semiconductor (HK): Power semiconductor R&D and sales\nHangke New Century Technology: Property operations, industrial investment\n\nControlled Subsidiaries\nAerospace Digital Information Technology: Industrial internet, smart manufacturing\n\nInvested Enterprises\nRayitek Film: New materials field layout",
    0,
  ],
  [
    "products",
    "business",
    "核心产品体系",
    "Core Product System",
    "中国航天国际控股背靠航天科技集团，拥有扎实的核心科技竞争实力。公司掌握高端 IC 封装载板、车规级功率模块、精密 PCB 电路板等关键制造技术，工艺水准跻身国内前列，有效填补本土产业缺口。依托成熟精密加工体系，产品广泛适配 AI 算力设备、新能源汽车、低空无人机及智能机器人等高景气领域。同时企业具备完善研发创新能力，手握多项技术专利，积淀深厚技术壁垒，叠加优质头部客户资源加持，形成技术研发、生产制造、市场供货一体化优势，在国产替代进程中持续强化自身行业竞争力。",
    "CASIL, backed by CASC, possesses solid core technological competitiveness. The company masters key manufacturing technologies including high-end IC packaging substrates, automotive-grade power modules, and precision PCB circuit boards, with process standards ranking among the top in China. Leveraging a mature precision manufacturing system, products are widely applied in AI computing equipment, new energy vehicles, low-altitude drones, and intelligent robots. The company has comprehensive R&D innovation capabilities, holding multiple technology patents with deep technical barriers, forming an integrated advantage of technology R&D, manufacturing, and market supply.",
    0,
  ],
  [
    "electronics",
    "business",
    "高精密电子组件业务",
    "Precision Electronic Components",
    "高精密电子组件业务内容涵盖IC封装载板、高密度互连板(HDI)、柔性电路板(FPC)及刚挠结合板等高端PCB产品的研发、制造与销售。产品广泛应用于5G通信设备、AI服务器、自动驾驶系统、医疗电子设备及航空航天等领域。",
    "The precision electronic components business covers the R&D, manufacturing and sales of high-end PCB products including IC packaging substrates, high-density interconnect (HDI) boards, flexible printed circuits (FPC) and rigid-flex boards. Products are widely used in 5G communication equipment, AI servers, autonomous driving systems, medical electronic equipment and aerospace fields.",
    0,
  ],
  [
    "lab",
    "business",
    "重点实验室科研成果",
    "Key Lab Research Achievements",
    "重点实验室科研成果涵盖先进封装基板材料、高频高速PCB工艺、功率半导体封装及系统集成等方向，多项成果已完成产业化转化并应用于客户产品中。",
    "Key lab research achievements cover advanced packaging substrate materials, high-frequency high-speed PCB processes, power semiconductor packaging and system integration. Multiple achievements have been industrialized and applied in customer products.",
    0,
  ],
  [
    "global",
    "business",
    "全球产业布局",
    "Global Industry Layout",
    "全球产业布局覆盖中国内地（深圳、东莞、惠州、南通、杭州）、香港及海外市场，形成以华南为核心、辐射华东、布局全球的产业网络。",
    "The global industry layout covers mainland China (Shenzhen, Dongguan, Huizhou, Nantong, Hangzhou), Hong Kong and overseas markets, forming an industrial network centered in South China, radiating to East China and globally.",
    0,
  ],
  [
    "board",
    "about",
    "董事局",
    "Board of Directors",
    "航天控股董事局由执行董事、非执行董事及独立非执行董事组成，负责制定集团整体战略方向，监督管理层执行业务计划，确保公司遵守高水平的企业管治标准。",
    "The CASIL Board of Directors comprises Executive Directors, Non-Executive Directors and Independent Non-Executive Directors. It is responsible for setting the Group's overall strategic direction, overseeing management in executing business plans, and ensuring the Company adheres to high standards of corporate governance.",
    0,
  ],
  [
    "governance",
    "about",
    "企业管治",
    "Corporate Governance",
    "本公司深信良好的企业管治是保障股东权益及提升企业价值的基础。公司已建立完善的企业管治架构，包括审核委员会、薪酬委员会、提名委员会及环境、社会及管治委员会，各委员会均订明职权范围。本公司定期检讨企业管治守则，确保符合香港联合交易所有限公司证券上市规则附录C1《企业管治守则》的要求。",
    "The Company firmly believes that good corporate governance is the foundation for protecting shareholders' rights and enhancing corporate value. The Company has established a comprehensive corporate governance structure, including the Audit Committee, Remuneration Committee, Nomination Committee and ESG Committee, each with clearly defined terms of reference. The Company regularly reviews its corporate governance practices to ensure compliance with the Corporate Governance Code set out in Appendix C1 of the Rules Governing the Listing of Securities on The Stock Exchange of Hong Kong Limited.",
    0,
  ],
  [
    "business",
    "business",
    "产业与业务",
    "Business",
    "本公司及各附属公司的主要业务涵盖科技工业及航天服务业务，包括高精密电子组件、核心产品体系、重点实验室科研成果及全球产业布局。",
    "The principal businesses of the Company and its subsidiaries cover technology industry and aerospace services, including precision electronic components, core product systems, key laboratory research achievements, and global industrial layout.",
    0,
  ],
  [
    "links",
    "other",
    "航天联结",
    "Aerospace Links",
    "航天联结栏目汇集中国航天科技集团及相关企业的链接资源，包括子公司、合作单位及研究机构等。",
    "The Aerospace Links section brings together links to CASC and related enterprises, including subsidiaries, partner organizations and research institutions.",
    0,
  ],
  [
    "location",
    "other",
    "地理位置",
    "Location",
    "中国航天国际控股有限公司总部设于香港，在中国内地多个城市（深圳、东莞、惠州、南通、杭州等）设有生产基地及办事处。",
    "China Aerospace International Holdings Limited is headquartered in Hong Kong, with production bases and offices in multiple cities across mainland China (Shenzhen, Dongguan, Huizhou, Nantong, Hangzhou, etc.).",
    0,
  ],
];

for (const p of pages) {
  insertPage.run(p[0], p[1], p[2], p[3], p[4], p[5], p[6]);
}

// --- Board Members ---
const insertMember = db.prepare(
  "INSERT INTO board_members (name_zh, name_en, title_zh, title_en, bio_zh, bio_en, member_type, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
);

const boardMembers: [string, string, string, string, string, string, string, number][] = [
  [
    "王暉先生",
    "Mr. Wang Hui",
    "董事局主席 / 執行董事",
    "Chairman / Executive Director",
    "王暉先生，研究員，為本公司主席兼執行董事，1995年畢業於中國科學技術大學，專修工程熱物理並獲取工學學士，並於2008年至2009年期間在職研究生學習，修畢國際空間大學空間管理專業，獲取理學碩士。王暉先生自1995年8月起至2022年6月期間，歷任中國運載火箭技術研究院綜合經營部計劃處處長助理、院辦公室秘書處副處長、科研計劃部科研計劃處處長、科研計劃部副部長、綜合計劃部部長，以及研究院副院長；2022年6月至2024年7月擔任中國航天科技集團有限公司戰略管理部部長。王暉先生具有豐富的企業策略管理經驗，彼於2024年7月起出任本公司執行董事及獲委任為主席。",
    "Mr. Wang Hui, Researcher, is the Chairman and Executive Director of the Company. He graduated from the University of Science and Technology of China in 1995 with a Bachelor's degree in Engineering Thermophysics. From August 1995 to June 2022, Mr. Wang held various positions at the China Academy of Launch Vehicle Technology. From June 2022 to July 2024, he served as Director of the Strategic Management Department of CASC. He was appointed as Executive Director and Chairman of the Company in July 2024.",
    "executive",
    1,
  ],
  [
    "宋樹清先生",
    "Mr. Song Shuqing",
    "執行董事 / 總裁",
    "Executive Director / CEO",
    "宋樹清先生, 碩士，研究員，為本公司執行董事兼總裁。於國防科技大學畢業並獲取碩士學位。於1994年至2011年先後任中國空間技術研究院三產總公司總工程師、總經理、基建部副部長、部長等職位；神舟天辰科技實業有限公司總經理助理、副總經理、保障服務總公司副總經理兼基建部部長；中關村航天科技創新園有限公司籌備組負責人；2011年至2019年先後任航天時代置業發展有限公司總經理、董事兼總經理，其間兼任西安國家民用航天產業基地開發有限公司董事、航天時代置業發展（武漢）有限公司執行董事，以及北京航天恒潤置業有限公司副董事長；2019年6月至2023年1月任中國航天電子技術研究院副院長；2019年11月至2023年3月任於上海證券交易所上市（股份編號：600879）的航天時代電子技術股份有限公司董事；2020 年8月至2023年2月任於重慶航天火箭電子技術有限公司董事長。宋樹清先生在企業管理方面擁有豐富經驗，彼於2023年2月起出任本公司執行董事兼總裁。",
    "Mr. Song Shuqing, Master's degree, Researcher, is an Executive Director and CEO of the Company. He graduated from the National University of Defense Technology. He held various positions including Vice President of the China Academy of Aerospace Electronics Technology. Mr. Song has extensive experience in corporate management and was appointed as Executive Director and CEO of the Company in February 2023.",
    "executive",
    2,
  ],
  [
    "羅振邦先生",
    "Mr. Luo Zhenbang",
    "獨立非執行董事",
    "Independent Non-Executive Director",
    "羅振邦先生，為本公司獨立非執行董事及立信會計師事務所（特殊普通合夥）董事、管理合夥人。羅先生於1991年畢業於蘭州商學院的企業管理專業，自1994年起至今先後主持過多間上市公司的審計工作，曾擔任中國信達資產管理公司及中國長城資產管理公司專家監事、長征火箭股份有限公司、東方鉭業股份有限公司、吳忠儀錶股份有限公司、聖雪絨股份有限公司、中航重機股份有限公司、神州數碼信息服務股份有限公司、新疆金風科技股份有限公司、高偉電子控股有限公司的獨立董事、於深圳證券交易所上市之東北證券股份有限公司（股份代號：000686）內核專家和於香港聯合交易所上市之國瑞健康產業有限公司（股份代號：2329）的獨立非執行董事。現任於香港聯合交易所上市的京投軌道交通科技控股有限公司（股份代號：1522）的獨立非執行董事。羅先生持有中國註冊會計師、證券期貨業特許會計師、中國註冊資產評估師、中國註冊稅務師等專業資格，具有深厚的會計、審計和財務管理經驗，以及對各行業上市公司均有豐富的審計經驗，並廣泛參與企業改組上市、上市公司重組等商務諮詢工作。彼於2004年12月起出任本公司獨立非執行董事。",
    "Mr. Luo Zhenbang is an Independent Non-Executive Director of the Company and a director and managing partner of BDO China. He graduated from Lanzhou Commercial College in 1991. He holds professional qualifications as a Chinese CPA and securities and futures chartered accountant. He has served as an Independent Non-Executive Director since December 2004.",
    "independent",
    3,
  ],
  [
    "陳靜茹女士",
    "Ms. Chen Jingru",
    "獨立非執行董事",
    "Independent Non-Executive Director",
    "陳靜茹女士，法學碩士，為本公司獨立非執行董事和北京德恒律師事務所的全球合夥人。陳女士於1985年及1990年獲南開大學頒發法律學士學位及碩士學位。彼於1993年獲中華人民共和國司法部律師資格委員會授予專業律師資格。曾任中央財政金融學院（現稱中央財經大學）保險系綜合教研室副主任、北京保險學會理事、中國海商法學會理事、中央財經大學法律系副主任，以及中國證監會第三屆創業板發審委委員。陳女士於2011年5月至2014年1月擔任於深圳證券交易所上市的中科雲網科技集團股份有限公司（股份代號：002306）的獨立董事、於2014年7月至2022年11月擔任於香港聯合交易所上市的國瑞健康產業有限公司（股份代號：2329）的獨立非執行董事，以及於2019年10月至2022年10月擔任於上海證券交易所上市的中銀國際證券股份有限公司（股份代號：601696）外聘內核委員。陳女士自1993年起任職北京德恒律師事務所，彼在企業及證券方面擁有豐富經驗，於2022年8月起出任本公司獨立非執行董事。",
    "Ms. Chen Jingru, LLM, is an Independent Non-Executive Director and a global partner of Beijing DeHeng Law Offices. She obtained her Bachelor's and Master's degrees in Law from Nankai University. She has extensive experience in corporate and securities matters and has served as an Independent Non-Executive Director since August 2022.",
    "independent",
    4,
  ],
  [
    "薛蘭女士",
    "Ms. Xue Lan",
    "獨立非執行董事",
    "Independent Non-Executive Director",
    "薛蘭女士，畢業于中國人民大學，先後於1986年及1996年獲取歷史學士及經濟學碩士學位，並于2001年于北京大學光華管理學院修畢EMBA學位。1986年8月至1988年12月，薛女士擔任中華人民共和國外交部檔案館助理館員；1988年12月至1992年12月擔任中華人民共和國駐澳洲悉尼總領館副領。薛女士于1992年12月至1997年8月加入中國證券業協會，擔任國際部主任。1997年8月至2005年12月，彼于華夏證券股份有限公司擔任國際業務部總經理；2005年12月至2006年8月，擔任中信建投證券股份有限公司（其股份于香港聯合交易所（股份代號:6066）及上海證券交易所上市）國際業務部總經理；2006年8月至2014年3月，擔任中銀國際控股有限公司董事總經理及金融產品部聯席主管；2014年3月至2018年3月，擔任華泰金融控股有限公司首席運營官。薛女士為香港證券及期貨事務監察委員會註冊1、2、4、5及9號牌照的負責人員。薛女士于金融業擁有豐富經驗和知識，彼於2024年3月起出任本公司獨立非執行董事。",
    "Ms. Xue Lan graduated from Renmin University of China and obtained an EMBA from Peking University's Guanghua School of Management. She has extensive experience in the financial industry and has served as an Independent Non-Executive Director since March 2024.",
    "independent",
    5,
  ],
  [
    "滕方遷先生",
    "Mr. Teng Fangqian",
    "非執行董事",
    "Non-Executive Director",
    "滕方遷先生，研究生，為本公司非執行董事，於山東化工學院畢業並獲取化學工程系工學學士學位，並於中南財經政法大學修畢企業管理研究生課程進修班。於1983年加入化工部第二膠片廠，歷任PS版車間工段長、副主任等職務；1996年8月至2012年11月先後任中國樂凱膠片集團公司第二膠片廠副廠長、廠長、樂凱華光印刷科技有限公司總經理、中國樂凱膠片集團公司副總經理兼樂凱華光印刷科技有限公司總經理；2012年11月至2019年12月歷任中國樂凱集團有限公司副總經理兼樂凱華光印刷科技有限公司總經理、中國樂凱集團有限公司董事總經理，其間於2013年5月至2015年9月兼任於深圳證券交易所上市的保定樂凱新材料股份有限公司（股份編號：300446）董事長；2019年12月至2022年9月任中國樂凱集團有限公司董事長，其間於2014年11月至2020年2月兼任於上海證券交易所上市的樂凱膠片股份有限公司（股份編號：600135）董事長、2015年9月至2020年5月兼任北京樂凱科技有限公司執行董事、2015年9月至2020年12月兼任樂凱華光印刷科技有限公司董事長。滕先生具有豐富的企業管理經驗。彼於2023年3月起任本公司非執行董事。",
    "Mr. Teng Fangqian, postgraduate, is a Non-Executive Director. He joined the Second Film Factory of the Ministry of Chemical Industry in 1983. He served as Chairman of China Lucky Group Corporation from December 2019 to September 2022. He has been a Non-Executive Director since March 2023.",
    "non-executive",
    6,
  ],
  [
    "彭建國先生",
    "Mr. Peng Jianguo",
    "非執行董事",
    "Non-Executive Director",
    "彭建國先生，博士，研究員，為本公司非執行董事。彭先生先後畢業於國防科技大學、西安交通大學和西北工業大學，分別獲工學學士、公共管理碩士及管理學博士學位。於1990年7月至2004年4月先後任航天11所財經處副處長、處長和副總會計師兼財經處處長；2004年4月至2017年3月先後任中國航天推進技術研究院財務部副部長、部長和總會計師；2017年3月至2021年12月任中國運載火箭技術研究院總會計師，其間於2011年4月至2020年3月兼任航天科技財務有限責任公司董事、2011年7月至2017年4月兼任於深圳證券交易所上市的西部金屬材料股份有限公司（股份編號：002149）董事、2016年11月至2017年8月兼任中國長江動力集團有限公司副董事長，以及2017年8月至2019年5月兼任航天時代置業發展有限公司董事；自2021年12月至2023年3月擔任中國運載火箭技術研究院副院級調研員，2023年3月起至今擔任該院二級專務；自2022年8月起至今擔任北京航天醫療有限公司監事會主席；自2023年1月及2月起分別擔任航天投資控股有限公司監事會主席及中國樂凱集團有限公司董事；自2024年7月起出任長沙空天技術創新研究院院長、法定代表人。彭先生具有豐富的財務管理經驗。彼於2023年3月起任本公司非執行董事。",
    "Mr. Peng Jianguo, PhD, Researcher, is a Non-Executive Director. He graduated from the National University of Defense Technology, Xi'an Jiaotong University and Northwestern Polytechnical University. He has extensive financial management experience and has been a Non-Executive Director since March 2023.",
    "non-executive",
    7,
  ],
  [
    "劉永先生",
    "Mr. Liu Yong",
    "非執行董事",
    "Non-Executive Director",
    "劉永先生，碩士，為本公司非執行董事，先後畢業於上海財經大學及中國人民大學，分別獲取管理學學士和經濟學碩士學位。於1989年7月至1993年7月先後任航空航天部財務司大檢查辦副主任科員和企業處主任科員;1993年7月至1999年7月先後任航天工業總公司財務部企業處主任科員和財務局企業處主任科員;1999年7月至2003年5月先後任中國航天科技集團公司財務部資金會計處副處長、處長，和財務部財務處處長;2003年5月至2009年2月先後任於上海證券交易所上市的航天時代電子技術股份有限公司（股份編號:6066）之財務部負責人、副總會計師、總會計師，其間於2005年1月至2008年11月兼任財務部部長;2009年2月至2016年6月歷任中國航天電子技術研究院總會計師及航天動力技術研究院總會計師，其間於2009年4月至2014年5月任長征火箭（航天電子）技術股份有限公司監事;2016年6月至2021年9月先後任航天科技財務有限責任公司總經理、董事兼總經理等職位;2021年9月至2024年9月先後任中國航天科技集團有限公司財務金融部部長，並自2024年9月起至今擔任財務金融部一級專務。劉永先生具有豐富財務金融管理經驗。彼於2025年2月起任本公司非執行董事。",
    "Mr. Liu Yong, Master's degree, is a Non-Executive Director. He graduated from Shanghai University of Finance and Economics and Renmin University of China. He has extensive financial management experience and has been a Non-Executive Director since February 2025.",
    "non-executive",
    8,
  ],
];

for (const m of boardMembers) {
  insertMember.run(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7]);
}

// --- Governance Docs ---
const insertDoc = db.prepare(
  "INSERT INTO governance_docs (title_zh, title_en, pdf_url, sort_order) VALUES (?, ?, ?, ?)"
);

const governanceDocs: [string, string, string, number][] = [
  ["股東召開股東特別大會的程序", "Procedures for Shareholders to Convene an EGM", "http://www.casil-group.com/download/big5/governance/c_C02032012.pdf", 1],
  ["股東提名人選參選董事的程序", "Procedures for Shareholders to Nominate Directors", "http://www.casil-group.com/download/big5/governance/c_031ProposeDirProcedure.pdf", 2],
  ["股東及投資者的通訊政策", "Shareholders and Investors Communication Policy", "http://www.casil-group.com/download/big5/governance/c_031_ShareholdersCommPolicy_20250327.pdf", 3],
  ["提名委員會職權範圍書", "Terms of Reference of the Nomination Committee", "http://www.casil-group.com/download/big5/RemunerationCommittee.pdf", 4],
  ["薪酬委員會職權範圍書", "Terms of Reference of the Remuneration Committee", "http://www.casil-group.com/download/big5/governance/c_031RemunerationCommittee.pdf", 5],
  ["審核委員會職權範圍書", "Terms of Reference of the Audit Committee", "http://www.casil-group.com/download/big5/governance/c_031AuditCommittee_20220830_1615.pdf", 6],
  ["環境、社會及管治委員會職權範圍書", "Terms of Reference of the ESG Committee", "http://www.casil-group.com/download/big5/governance/c_031ESGCommittee_20250327.pdf", 7],
  ["組織章程細則", "Articles of Association", "http://www.casil-group.com/download/big5/governance/c_031M&A.pdf", 8],
  ["反貪污政策", "Anti-Corruption Policy", "http://www.casil-group.com/download/big5/governance/C_anti_20220830.pdf", 9],
  ["舉報政策", "Whistleblowing Policy", "http://www.casil-group.com/download/big5/governance/C_blowing_20220830.pdf", 10],
];

for (const d of governanceDocs) {
  insertDoc.run(d[0], d[1], d[2], d[3]);
}

// --- Links ---
const insertLink = db.prepare(
  "INSERT INTO links (name_zh, name_en, url, sort_order) VALUES (?, ?, ?, ?)"
);

const links: [string, string, string, number][] = [
  ["志源實業有限公司", "Zhiyuan Industrial Co., Ltd.", "", 1],
  ["志順電業有限公司", "Zhishun Electrical Co., Ltd.", "", 2],
  ["航天科技半導體有限公司", "Aerospace Technology Semiconductor Co., Ltd.", "", 3],
  ["康源電子廠有限公司", "Kangyuan Electronics Factory Co., Ltd.", "", 4],
  ["航天控股智慧研究所", "CASIL Smart Research Institute", "http://www.casil-group.com/big5/egpp_1_Agency/index.html", 5],
  ["志豪微电子（惠州）有限公司", "Zhihao Microelectronics (Huizhou) Co., Ltd.", "", 6],
];

for (const l of links) {
  insertLink.run(l[0], l[1], l[2], l[3]);
}

console.log("Seed data inserted successfully!");
  db.close();
}

main().catch(console.error);

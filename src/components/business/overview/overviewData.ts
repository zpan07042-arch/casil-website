/**
 * 產品與業務 - 業務總覽 頁面數據
 *
 * 全部雙語內容（繁體中文 + 英文），用於八個模塊的靜態渲染。
 * 遵循截圖原文，繁體中文用字完全匹配。
 */

/* ──────────── 類型定義 ──────────── */

export interface Bilingual {
  zh: string;
  en: string;
}

export interface StatItem {
  value: Bilingual;
  label: Bilingual;
}

export interface ProductPlaceholder {
  labelZh: string;
  labelEn: string;
  imagePath?: string; // 真實圖片路徑，如 "/images/kangyuan1.png"
}

export interface OverviewCardData {
  id: string;
  mainTitle: string; // 中文主標題，如「東莞康源」
  subTitle: string; // 中文副標題，如「印製電路板 (PCB)」
  enName: string; // 英文名稱，如「Dongguan Kangyuan」
  body: Bilingual;
  clients: string[]; // 客戶標籤名稱（中英相同）
  learnMoreHref: string;
  productPlaceholders: ProductPlaceholder[];
  imageLayout: "grid" | "single"; // grid: 2×2, single: 單格豎長
}

export interface CategoryLabelData {
  letter: "A" | "B";
  title: Bilingual;
  subtitle: string; // 英文副標，全大寫，中英相同
}

export interface OverviewPageData {
  stats: StatItem[];
  categoryA: CategoryLabelData;
  categoryB: CategoryLabelData;
  cards: OverviewCardData[];
  banner: {
    text: Bilingual;
    buttonText: Bilingual;
  };
}

/* ──────────── 正文數據 ──────────── */

/**
 * 東莞康源 PCB 正文 — 嚴格匹配截圖原文
 */
const DONGGUAN_KANGYUAN_BODY: Bilingual = {
  zh: "始建於 1977 年，1993 年在虎門塘廈投產，2008 年轉型為外商獨資，現已成為一家擁有 10 萬平方廠房、1800 名智慧員工的專業印刷電路板製造商，並於 2010 年榮獲「國家高新技術企業」認證。2017 年被確定為廣東省首批「倍增計劃」企業之一。公司專注於高階對裝板、HDI、多層刚性 / 撓性 / 剛撓性結合板製造，廣泛應用於通信包裝 IC 封裝板、MEMS 醫療等領域，客戶遍布北美、歐洲、中國及太平洋地區。研發（工程）中心於 2018 年獲授「廣東省省級技術研發中心」，年研發經費投入 6% 以上，先後通過 ISO9001、ISO14001、IATF16949、ISO50001 等體系認證，並榮獲「國家級綠色工廠」、「中國電子電路行業百強企業」等獎項。",
  en: "Founded in 1977, commenced production in Humen Tangxia in 1993, and transformed into a wholly foreign-owned enterprise in 2008, the company has grown into a professional PCB manufacturer with 100,000 sqm of factory space and 1,800 skilled employees, earning the 'National High-Tech Enterprise' certification in 2010. In 2017, it was designated as one of Guangdong Province's first 'Doubling Plan' enterprises. The company specializes in high-end packaging substrates, HDI, multi-layer rigid/flexible/rigid-flex boards, widely applied in communication packaging, IC substrates, MEMS, and medical fields, with customers across North America, Europe, China, and the Pacific region. Its R&D (Engineering) Center was recognized as a 'Guangdong Provincial Technology R&D Center' in 2018, with annual R&D investment exceeding 6%, and has successively obtained ISO9001, ISO14001, IATF16949, and ISO50001 certifications, along with honors including 'National Green Factory' and 'China Electronics Circuit Industry Top 100 Enterprise'.",
};

/**
 * 航科半導體 顯示器件 正文 — 嚴格匹配截圖原文
 */
const HANGKE_SEMICONDUCTOR_BODY: Bilingual = {
  zh: "國內早期從事液晶顯示器件研發和製造的高科技企業，旗下廣東（惠州）半導體有限公司為 CASIL 全資子公司，生產研發基地坐落於廣東省惠州市仲愷國家高新技術開發區航天科技（惠州）工業園，現有員工 1500 餘人，高技術人員佔 20% 以上，擁有四棟共 41800 平方米現代化廠房。產品黑白 LCD/TFT 模組、觸控模組、智能顯示模組，堅持不斷產品技術創新，是一家集研發 / 設計 / 生產 / 銷售於一體的高新技術企業，為 LCD 和 LCM 業界的老牌生產廠家，擁有多項自主知識產權的顯示技術發明專利，並持有 LCD、LCM、TCM、IPM 和智能自動化等工藝。",
  en: "A pioneering high-tech enterprise in LCD device R&D and manufacturing in China, its subsidiary Guangdong (Huizhou) Semiconductor Co., Ltd. is a wholly-owned subsidiary of CASIL. The production and R&D base is located in the Aerospace Technology (Huizhou) Industrial Park within the Zhongkai National High-Tech Development Zone in Huizhou City, Guangdong Province. With over 1,500 employees and technical staff accounting for more than 20%, the company operates four modern factory buildings totaling 41,800 square meters. Products include monochrome LCD/TFT modules, touch modules, and smart display modules. Committed to continuous product and technology innovation, it is a high-tech enterprise integrating R&D/design/production/sales, a veteran manufacturer in the LCD and LCM industry, holding multiple independent intellectual property patents for display technologies and processes including LCD, LCM, TCM, IPM, and intelligent automation.",
};

/**
 * 志豪微電子 IPM 模組 正文 — 嚴格匹配截圖原文（上半段）
 */
const ZHIHAO_MICROELECTRONICS_BODY: Bilingual = {
  zh: "致力為國內外客戶提供優質的IPM、IGBT等功率模塊封裝代工業務。公司專注於IPM、PM封測代工，註冊資本人民幣9000萬元，首期投資1.98億元，現具備月產標準IPM模塊DIP29 200K、DIP25 600K、SDIP26 600K、SDIP26FP 300K、SDIP25FP 300K及Easy PIM 100K的封測代工能力。擁有國際一流的生產設備、可靠性試驗及檢測設備，具備從芯片匹配、模塊設計、工藝仿真、封裝生產到最終測試應用全流程閉環研發生產能力，可為客戶提供定制化的模塊解決方案，致力成為世界領先的半導體智能功率模塊封測代工企業。",
  en: "We are committed to providing high-quality packaging and foundry services for power modules including IPM and IGBT to domestic and overseas clients.Specialising in the packaging and testing foundry of IPM and PM products, the company boasts a registered capital of RMB 90 million and an initial investment of RMB 198 million. At present, our monthly packaging and testing capacity stands at 200,000 standard DIP29 IPM modules, 600,000 DIP25 modules, 600,000 SDIP26 modules, 300,000 SDIP26FP modules, 300,000 SDIP25FP modules and 100,000 Easy PIM modules.Equipped with world-class production equipment, reliability testing and inspection facilities, we feature a full closed-loop R&D and manufacturing capacity covering chip matching, module design, process simulation, packaging production, final testing and application validation. We deliver customised module solutions for customers and strive to grow into a globally leading intelligent semiconductor power module packaging and test foundry."
};

/**
 * 香港志順 電源領域 正文
 */
const HONGKONG_ZHISHUN_BODY: Bilingual = {
  zh: "憑藉優質電子產品，一直在業界穩踞領導地位。專注於開關電源、配電器、逆變器、微型投影、家居安防、便攜式電源、動力電池組及無線控制等產品的設計及生產，深受全球客戶青睞。於惠州仲愷高新區航天科技工業園建有兩座廠房，各佔面積2.5萬平方米，設置24條生產線、12條貼片生產線、6條變壓器生產線及6台自動插件機，並配備10條人工插件生產線，共聘請逾1500名員工及80多位不同領域的R&D工程師。為客戶提供「一站式」OEM及ODM電子產品製造服務，增值服務及全通式解決方案獲各方客戶一致好評。",
  en: "With high-quality electronic products, the company has consistently maintained a leadership position in the industry. Specializing in the design and production of switching power supplies, adapters, inverters, micro projectors, home security, portable power supplies, power battery packs and wireless control products, it is highly favored by global customers. The company has two factory buildings in the Aerospace Technology Industrial Park of Zhongkai High-Tech Zone, Huizhou, each covering an area of 25,000 square meters, equipped with 24 production lines, 12 SMT lines, 6 transformer production lines, 6 automatic plug-in machines, and 10 manual plug-in lines, employing over 1,500 staff and more than 80 R&D engineers across various fields. Providing customers with 'one-stop' OEM and ODM electronic product manufacturing services, its value-added services and turnkey solutions have received unanimous praise from clients.",
};

/**
 * 香港志源 注塑及表面處理業務 正文
 */
const HONGKONG_ZHIYUAN_BODY: Bilingual = {
  zh: "汽車塑膠電鍍及噴塗的專業製造商，擁有配套精密模具製造中心、注塑成形中心和電鍍噴塗製造中心，為客戶提供模具製造、注塑成型、塑膠電鍍、表面噴塗及印刷、產品組裝的一站式解決方案。公司總部位於香港，生產集中在廣東惠州，廠房面積50000平方米，集團員工人數1800人，年營業額達8000萬美元。為奔馳、寶馬、大眾、法拉利、雷諾、雪鐵龍、通用、福特、克萊斯勒、日產、本田、豐田等國際知名品牌提供汽車塑膠電鍍及噴塗件。公司擁有兩條全自動塑膠電鍍生產線和三條無塵自動噴塗線，並通過ISO9001、ISO14001及ISO/IATF16949認證。",
  en: "A professional manufacturer of automotive plastic electroplating and spraying, with supporting precision mold manufacturing center, injection molding center and electroplating & spraying manufacturing center, providing customers with one-stop solutions for mold manufacturing, injection molding, plastic electroplating, surface spraying & printing, and product assembly. Headquartered in Hong Kong, with production concentrated in Huizhou, Guangdong, the company has a factory area of 50,000 square meters, 1,800 employees, and annual revenue of USD 80 million. It supplies automotive plastic electroplating and spraying parts to internationally renowned brands including Mercedes-Benz, BMW, Volkswagen, Ferrari, Renault, Citroën, General Motors, Ford, Chrysler, Nissan, Honda, and Toyota. The company operates two fully automatic plastic electroplating production lines and three dust-free automatic spraying lines, and is certified to ISO9001, ISO14001 and ISO/IATF16949.",
};

/**
 * 航天高科 物業租賃 正文 — 匹配截圖原文
 */
const AEROSPACE_HIGHTECH_BODY: Bilingual = {
  zh: "立足香港及大灣區，專業從事優質物業租賃與商業地產運營管理。旗下資產組合涵蓋深圳航天科技廣場（占地約20畝，由A座48層和B座28層兩棟高層建築組成，建築面積約20萬平方米）及廣州市天河區5A甲級寫字樓（兩棟，面積逾920萬平方米）及相關商業配套設施，為企業客戶提供靈活、高品質的辦公空間解決方案，助力租戶在大灣區高效開展業務。",
  en: "Headquartered in Hong Kong and the Greater Bay Area, we specialise in premium property leasing and commercial real estate operation and management.Our asset portfolio includes Shenzhen Aerospace Science and Technology Plaza (covering a land area of approximately 20 mu, consisting of two high-rise towers: Tower A with 48 floors and Tower B with 28 floors, with a total construction floor area of around 200,000 square metres), two Grade 5A Grade A office buildings in Tianhe District, Guangzhou with a total floor area exceeding 9.2 million square metres, as well as supporting commercial amenities. We deliver flexible, high-quality office space solutions for corporate clients, empowering tenants to conduct business efficiently across the Greater Bay Area."
  };

/* ──────────── 主數據對象 ──────────── */

export const OVERVIEW_DATA: OverviewPageData = {
  /* ──── 模塊1：三欄統計數據 ──── */
  stats: [
    {
      value: { zh: "5", en: "5" },
      label: { zh: "製造子公司", en: "Manufacturing Subsidiaries" },
    },
    {
      value: { zh: "50 萬 +", en: "500,000+" },
      label: { zh: "㎡ 物業面積", en: "sqm Property Area" },
    },
    {
      value: { zh: "2", en: "2" },
      label: { zh: "核心業務板塊", en: "Core Business Segments" },
    },
  ],

  /* ──── 模塊2：A 先進製造業 ──── */
  categoryA: {
    letter: "A",
    title: { zh: "先進製造業", en: "Advanced Manufacturing" },
    subtitle: "ADVANCED MANUFACTURING",
  },

  /* ──── 模塊6：B 航天產業服務業 ──── */
  categoryB: {
    letter: "B",
    title: { zh: "航天產業服務業", en: "Aerospace Industry Services" },
    subtitle: "AEROSPACE INDUSTRY SERVICES",
  },

  /* ──── 模塊3-5, 7：業務卡片 ──── */
  cards: [
    {
      id: "dongguan-kangyuan",
      mainTitle: "東莞康源",
      subTitle: "印製電路板 (PCB)",
      enName: "Dongguan Kangyuan",
      body: DONGGUAN_KANGYUAN_BODY,
      clients: ["Sensata", "Accelink", "OFILM", "Hisense"],
      learnMoreHref: "/zh/business/subsidiaries",
      imageLayout: "grid",
      productPlaceholders: [
        { labelZh: "產品圖 1", labelEn: "Product Image 1", imagePath: "/images/kangyuan1.png" },
        { labelZh: "產品圖 2", labelEn: "Product Image 2", imagePath: "/images/kangyuan2.png" },
        { labelZh: "產品圖 3", labelEn: "Product Image 3", imagePath: "/images/kangyuan3.png" },
        { labelZh: "產品圖 4", labelEn: "Product Image 4", imagePath: "/images/kangyuan4.png" },
      ],
    },
    {
      id: "hangke-semiconductor",
      mainTitle: "航科半導體",
      subTitle: "顯示器件研發與生產",
      enName: "Hangke Semiconductor",
      body: HANGKE_SEMICONDUCTOR_BODY,
      clients: ["Honeywell", "Gigaset", "resideo", "LG"],
      learnMoreHref: "/zh/business/subsidiaries",
      imageLayout: "grid",
      productPlaceholders: [
        { labelZh: "產品圖 1", labelEn: "Product Image 1", imagePath: "/images/hangke1.png" },
        { labelZh: "產品圖 2", labelEn: "Product Image 2", imagePath: "/images/hangke2.png" },
        { labelZh: "產品圖 3", labelEn: "Product Image 3", imagePath: "/images/hangke3.png" },
        { labelZh: "產品圖 4", labelEn: "Product Image 4", imagePath: "/images/hangke4.png" },
      ],
    },
    {
      id: "zhihao-microelectronics",
      mainTitle: "志豪微電子",
      subTitle: "IPM 智能功率模組封裝",
      enName: "Zhihao Microelectronics",
      body: ZHIHAO_MICROELECTRONICS_BODY,
      clients: ["CR Micro", "芯藿半導體"],
      learnMoreHref: "/zh/business/subsidiaries",
      imageLayout: "grid",
      productPlaceholders: [
        { labelZh: "產品圖 1", labelEn: "Product Image 1", imagePath: "/images/zhihao1.png" },
        { labelZh: "產品圖 2", labelEn: "Product Image 2", imagePath: "/images/zhihao2.png" },
        { labelZh: "產品圖 3", labelEn: "Product Image 3", imagePath: "/images/zhihao3.png" },
        { labelZh: "產品圖 4", labelEn: "Product Image 4", imagePath: "/images/zhihao4.png" },
      ],
    },
    {
      id: "hongkong-zhishun",
      mainTitle: "香港志順",
      subTitle: "電源領域",
      enName: "Hong Kong Zhishun",
      body: HONGKONG_ZHISHUN_BODY,
      clients: ["Panasonic", "Honeywell"],
      learnMoreHref: "/zh/business/subsidiaries",
      imageLayout: "grid",
      productPlaceholders: [
        { labelZh: "產品圖 1", labelEn: "Product Image 1", imagePath: "/images/zhishun1.png" },
        { labelZh: "產品圖 2", labelEn: "Product Image 2", imagePath: "/images/zhishun2.png" },
        { labelZh: "產品圖 3", labelEn: "Product Image 3", imagePath: "/images/zhishun3.png" },
        { labelZh: "產品圖 4", labelEn: "Product Image 4", imagePath: "/images/zhishun4.png" },
      ],
    },
    {
      id: "hongkong-zhiyuan",
      mainTitle: "香港志源",
      subTitle: "注塑及表面處理業務",
      enName: "Hong Kong Zhiyuan",
      body: HONGKONG_ZHIYUAN_BODY,
      clients: ["Benz", "BMW", "大眾", "法拉利", "通用", "Ford", "Toyota"],
      learnMoreHref: "/zh/business/subsidiaries",
      imageLayout: "grid",
      productPlaceholders: [
        { labelZh: "產品圖 1", labelEn: "Product Image 1", imagePath: "/images/zhiyuan1.png" },
        { labelZh: "產品圖 2", labelEn: "Product Image 2", imagePath: "/images/zhiyuan2.png" },
        { labelZh: "產品圖 3", labelEn: "Product Image 3", imagePath: "/images/zhiyuan3.png" },
        { labelZh: "產品圖 4", labelEn: "Product Image 4", imagePath: "/images/zhiyuan4.png" },
      ],
    },
    {
      id: "aerospace-hightech",
      mainTitle: "航天高科",
      subTitle: "物業租賃服務",
      enName: "Aerospace Hightech",
      body: AEROSPACE_HIGHTECH_BODY,
      clients: [],
      learnMoreHref: "/zh/business/subsidiaries",
      imageLayout: "single",
      productPlaceholders: [
        { labelZh: "物業圖 1", labelEn: "Property Image 1", imagePath: "/images/gaoke.jpg" },
      ],
    },
  ],

  /* ──── 模塊8：底部深藍 Banner ──── */
  banner: {
    text: {
      zh: "立足電子製造與精密工業核心優勢，集團前瞻布局新一代信息技術、高端裝備及戰略性新興產業，以深度融入航天產業生態為使命，借力國際化平台持續擴大全球產業影響力，矢志構建面向未來的持續競爭優勢。",
      en: "Building on core strengths in electronics manufacturing and precision industries, the Group proactively deploys in next-generation information technology, high-end equipment and strategic emerging industries. With a mission to deeply integrate into the aerospace industry ecosystem, we leverage our international platform to continuously expand global industrial influence and are committed to building sustainable competitive advantages for the future.",
    },
    buttonText: {
      zh: "返回首頁",
      en: "Back to Home",
    },
  },
};

import { getPage, getPagesBySection } from "@/lib/db";
import ContentSection from "@/components/shared/ContentSection";
import Link from "next/link";

// ============================================================
// [新增] 党的建设主页面 — 布局、版式、模块结构完全复用关于我们页面
// ============================================================
export default async function PartyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const base = `/${lang}`;
  const page = await getPage("party");
  const subpages = await getPagesBySection("party");

  if (!page) return <p className="p-20 text-center text-text-secondary">Content not found.</p>;

  const title = lang === "zh" ? page.title_zh : page.title_en;
  const content = lang === "zh" ? page.content_zh : page.content_en;

  // [新增] 党建子页面路由映射 — 预留跳转链接
  const subRoutes: Record<string, string> = {
    party_dynamic: `${base}/party/dynamic`,
    party_pioneer: `${base}/party/pioneer`,
    party_staff: `${base}/party/staff`,
    party_youth: `${base}/party/youth`,
  };

  return (
    <>
      {/* [复用] ContentSection — 与关于我们页面相同的标题+渐变下划线+简介结构 */}
      <ContentSection title={title} content={content || ""} />

      {/* [复用] 卡片网格 — 与关于我们页面相同的 grid 布局、卡片样式、hover 动效 */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {subpages
              .filter((s) => s.id !== "party")
              .map((s) => (
                <Link
                  key={s.id}
                  href={subRoutes[s.id] || `${base}/party/${s.id}`}
                  className="block bg-bg-secondary rounded-2xl p-8 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-brand transition-colors">
                    {lang === "zh" ? s.title_zh : s.title_en}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {lang === "zh" ? s.content_zh?.substring(0, 80) : s.content_en?.substring(0, 80)}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

import { saveCategoryAction, updateCategoryOrderAction, updateCategoryVisibilityAction } from "@/app/actions/admin/commerce";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import { adminCategories } from "@/lib/admin-commerce";

export default function AdminCategoriesPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-wadeal-ink p-5 text-white">
          <p className="text-xs font-black text-red-200">Admin Categories</p>
          <h1 className="mt-2 text-2xl font-black">카테고리 관리</h1>
          <p className="mt-2 text-sm font-bold text-gray-200">홈, 검색, category 페이지와 같은 slug 구조로 연결됩니다.</p>
        </section>

        <form action={saveCategoryAction} className="space-y-3 rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">카테고리 추가/수정</h2>
          <input className="h-11 w-full rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="name" placeholder="상위 카테고리명" />
          <input className="h-11 w-full rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="slug" placeholder="slug 예: fresh-food" />
          <input className="h-11 w-full rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="subcategories" placeholder="하위 카테고리 쉼표 구분" />
          <button className="h-11 w-full rounded-xl bg-wadeal-red text-sm font-black text-white" type="submit">저장</button>
        </form>

        <section className="space-y-3">
          {adminCategories.map((category) => (
            <article className="rounded-2xl border border-wadeal-line bg-white p-4" key={category.slug}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-black text-wadeal-muted">/{category.slug} · 노출 {category.displayOrder}</p>
                  <h2 className="mt-1 text-base font-black text-wadeal-ink">{category.name}</h2>
                  <p className="mt-1 text-xs font-bold text-wadeal-muted">연결: {category.connectedRoutes.join(" · ")}</p>
                </div>
                <span className={`rounded-full px-2 py-1 text-[11px] font-black ${category.visible ? "bg-red-50 text-wadeal-red" : "bg-gray-100 text-gray-500"}`}>{category.visible ? "노출" : "숨김"}</span>
              </div>
              <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
                {category.subcategories.map((subcategory) => (
                  <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1.5 text-[11px] font-black text-gray-600" key={subcategory.name}>{subcategory.displayOrder}. {subcategory.name}</span>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <form action={updateCategoryVisibilityAction}>
                  <input name="slug" type="hidden" value={category.slug} />
                  <input name="visible" type="hidden" value={category.visible ? "false" : "true"} />
                  <button className="h-10 w-full rounded-xl border border-wadeal-line text-xs font-black text-wadeal-ink" type="submit">노출/숨김</button>
                </form>
                <form action={updateCategoryOrderAction} className="grid grid-cols-[1fr_56px] gap-2">
                  <input name="slug" type="hidden" value={category.slug} />
                  <input className="h-10 rounded-xl bg-gray-50 px-3 text-xs font-bold outline-none" name="displayOrder" defaultValue={category.displayOrder} />
                  <button className="rounded-xl bg-wadeal-red text-xs font-black text-white" type="submit">순서</button>
                </form>
              </div>
            </article>
          ))}
        </section>
      </div>
      <BottomNavigation />
    </main>
  );
}

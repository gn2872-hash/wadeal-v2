import Link from "next/link";

import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import { categories } from "@/lib/categories";

export default function CategoriesPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4">
        <section className="rounded-2xl bg-wadeal-ink p-5 text-white">
          <p className="text-xs font-black text-red-200">Wadeal Category</p>
          <h1 className="mt-2 text-2xl font-black leading-tight">쿠팡형 전체 카테고리</h1>
          <p className="mt-2 text-sm font-medium leading-5 text-gray-200">
            공동구매에 맞춰 가격이 내려가는 상품을 카테고리와 하위 카테고리별로
            빠르게 찾을 수 있어요.
          </p>
        </section>

        <section className="space-y-3" aria-label="전체 카테고리">
          {categories.map((category) => (
            <Link
              className="block rounded-2xl border border-wadeal-line bg-white p-4 active:bg-gray-50"
              href={`/category/${category.slug}`}
              key={category.slug}
            >
              <div className="flex gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gray-100 text-2xl">
                  {category.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-base font-black text-wadeal-ink">
                      {category.name}
                    </h2>
                    <span className="text-xs font-black text-wadeal-red">보기</span>
                  </div>
                  <p className="mt-1 text-xs font-medium leading-5 text-wadeal-muted">
                    {category.description}
                  </p>
                  <div className="mt-3 flex gap-1.5 overflow-x-auto no-scrollbar">
                    {category.featuredSubcategories.map((subcategory) => (
                      <span
                        className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-bold text-gray-600"
                        key={subcategory}
                      >
                        {subcategory}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
      <BottomNavigation />
    </main>
  );
}

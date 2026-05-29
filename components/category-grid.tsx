import Link from "next/link";

import { categories } from "@/lib/categories";

export function CategoryGrid() {
  const homeCategories = categories.slice(0, 7);

  return (
    <section aria-label="카테고리" className="rounded-xl border border-wadeal-line bg-white p-3">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-black text-wadeal-ink">카테고리</h2>
        <Link className="text-xs font-bold text-wadeal-red" href="/categories">
          전체보기
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-y-4">
        {homeCategories.map((category) => (
          <Link
            className="flex min-h-[76px] flex-col items-center justify-center gap-2 rounded-lg bg-white text-sm font-semibold text-wadeal-ink active:bg-gray-50"
            href={`/category/${category.slug}`}
            key={category.slug}
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gray-100 text-[23px]">
              {category.icon}
            </span>
            <span className="max-w-full truncate px-1">{category.name}</span>
          </Link>
        ))}
        <Link
          className="flex min-h-[76px] flex-col items-center justify-center gap-2 rounded-lg bg-white text-sm font-semibold text-wadeal-ink active:bg-gray-50"
          href="/categories"
        >
          <span className="grid h-11 w-11 place-items-center rounded-full bg-gray-100 text-[23px]">
            ⋯
          </span>
          <span>전체</span>
        </Link>
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.slice(0, 5).map((category) => (
          <Link
            className="shrink-0 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-bold text-wadeal-red"
            href={`/category/${category.slug}`}
            key={`chip-${category.slug}`}
          >
            {category.featuredSubcategories[0]} 특가
          </Link>
        ))}
      </div>
    </section>
  );
}

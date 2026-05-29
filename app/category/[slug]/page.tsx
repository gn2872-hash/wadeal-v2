import Link from "next/link";
import { notFound } from "next/navigation";

import { BottomNavigation } from "@/components/bottom-navigation";
import { DealCard } from "@/components/deal-card";
import { Header } from "@/components/header";
import { categories, getCategoryBySlug } from "@/lib/categories";
import { deals } from "@/lib/deals";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(
  params: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = params[key];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function makeHref(
  slug: string,
  params: Record<string, string | string[] | undefined>,
  nextValues: Record<string, string>,
) {
  const next = new URLSearchParams();

  for (const key of ["sub", "sort", "min", "max"]) {
    const value = nextValues[key] ?? getParam(params, key);
    if (value) {
      next.set(key, value);
    }
  }

  const query = next.toString();
  return query ? `/category/${slug}?${query}` : `/category/${slug}`;
}

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const query = (await searchParams) ?? {};
  const selectedSubcategory = getParam(query, "sub");
  const sort = getParam(query, "sort") || "popular";
  const min = Number(getParam(query, "min") || 0);
  const max = Number(getParam(query, "max") || 0);

  const categoryDeals = deals
    .filter((deal) => deal.categorySlug === category.slug)
    .filter((deal) => {
      if (selectedSubcategory && deal.subcategory !== selectedSubcategory) {
        return false;
      }

      if (min && deal.currentPrice < min) {
        return false;
      }

      if (max && deal.currentPrice > max) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sort === "price-low") {
        return a.currentPrice - b.currentPrice;
      }

      if (sort === "discount") {
        return b.originalPrice - b.currentPrice - (a.originalPrice - a.currentPrice);
      }

      if (sort === "deadline") {
        return a.endsIn.localeCompare(b.endsIn);
      }

      return b.participants - a.participants;
    });

  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4">
        <section className="overflow-hidden rounded-2xl bg-wadeal-ink text-white">
          <div className="p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-white/10 text-3xl">
                {category.icon}
              </span>
              <div>
                <p className="text-xs font-black text-red-200">Category Deal</p>
                <h1 className="mt-1 text-2xl font-black">{category.name}</h1>
              </div>
            </div>
            <p className="mt-3 text-sm font-medium leading-5 text-gray-200">
              {category.description}
            </p>
          </div>
          <div className="grid grid-cols-3 border-t border-white/10 text-center text-xs font-black">
            <div className="py-3">
              {categoryDeals.length}
              <span className="block pt-1 text-[11px] font-bold text-gray-300">진행딜</span>
            </div>
            <div className="border-x border-white/10 py-3">
              공동구매
              <span className="block pt-1 text-[11px] font-bold text-gray-300">가격하락</span>
            </div>
            <div className="py-3">
              무료배송
              <span className="block pt-1 text-[11px] font-bold text-gray-300">중심</span>
            </div>
          </div>
        </section>

        <section aria-label="하위 카테고리" className="flex gap-2 overflow-x-auto no-scrollbar">
          <Link
            className={`shrink-0 rounded-full px-3 py-2 text-xs font-black ${
              !selectedSubcategory ? "bg-wadeal-red text-white" : "bg-gray-100 text-gray-600"
            }`}
            href={makeHref(category.slug, query, { sub: "" })}
          >
            전체
          </Link>
          {category.subcategories.map((subcategory) => (
            <Link
              className={`shrink-0 rounded-full px-3 py-2 text-xs font-black ${
                selectedSubcategory === subcategory
                  ? "bg-wadeal-red text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
              href={makeHref(category.slug, query, { sub: subcategory })}
              key={subcategory}
            >
              {subcategory}
            </Link>
          ))}
        </section>

        <form
          action={`/category/${category.slug}`}
          className="grid grid-cols-[1fr_1fr_68px] gap-2 rounded-2xl border border-wadeal-line p-3"
        >
          <input name="sub" type="hidden" value={selectedSubcategory} />
          <input name="sort" type="hidden" value={sort} />
          <label>
            <span className="text-[11px] font-black text-wadeal-ink">최소</span>
            <input
              className="mt-1 h-10 w-full rounded-xl bg-gray-100 px-3 text-sm outline-none"
              defaultValue={min || ""}
              inputMode="numeric"
              name="min"
              placeholder="0"
            />
          </label>
          <label>
            <span className="text-[11px] font-black text-wadeal-ink">최대</span>
            <input
              className="mt-1 h-10 w-full rounded-xl bg-gray-100 px-3 text-sm outline-none"
              defaultValue={max || ""}
              inputMode="numeric"
              name="max"
              placeholder="99999"
            />
          </label>
          <button
            className="mt-5 h-10 rounded-xl bg-wadeal-red text-xs font-black text-white"
            type="submit"
          >
            적용
          </button>
        </form>

        <section aria-label="정렬" className="flex gap-2 overflow-x-auto no-scrollbar">
          {[
            ["popular", "인기순"],
            ["deadline", "마감임박"],
            ["price-low", "낮은가격"],
            ["discount", "할인큰순"],
          ].map(([value, label]) => (
            <Link
              className={`shrink-0 rounded-full border px-3 py-2 text-xs font-black ${
                sort === value
                  ? "border-wadeal-red text-wadeal-red"
                  : "border-wadeal-line text-gray-500"
              }`}
              href={makeHref(category.slug, query, { sort: value })}
              key={value}
            >
              {label}
            </Link>
          ))}
        </section>

        <section className="space-y-3" aria-labelledby="category-result-title">
          <div className="flex items-end justify-between">
            <div>
              <h2 id="category-result-title" className="text-lg font-black text-wadeal-ink">
                {selectedSubcategory || category.name} 공동구매
              </h2>
              <p className="mt-1 text-xs font-bold text-wadeal-muted">
                참여 인원이 모이면 최저가가 열려요
              </p>
            </div>
            <Link
              className="text-xs font-black text-wadeal-red"
              href={`/search?category=${category.slug}`}
            >
              검색
            </Link>
          </div>

          {categoryDeals.length > 0 ? (
            categoryDeals.map((deal) => <DealCard deal={deal} key={deal.id} />)
          ) : (
            <div className="rounded-2xl border border-dashed border-wadeal-line p-8 text-center">
              <p className="text-base font-black text-wadeal-ink">진행 중인 딜이 없어요</p>
              <p className="mt-2 text-sm text-wadeal-muted">
                다른 하위 카테고리나 가격 범위로 확인해보세요.
              </p>
            </div>
          )}
        </section>
      </div>
      <BottomNavigation />
    </main>
  );
}

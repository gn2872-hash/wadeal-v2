import Link from "next/link";

import { BottomNavigation } from "@/components/bottom-navigation";
import { DealCard } from "@/components/deal-card";
import { Header } from "@/components/header";
import { categories } from "@/lib/categories";
import { deals } from "@/lib/deals";
import { formatWon } from "@/lib/format";

type SearchPageProps = {
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
  params: Record<string, string | string[] | undefined>,
  nextValues: Record<string, string>,
) {
  const next = new URLSearchParams();

  for (const key of ["q", "category", "sort", "min", "max"]) {
    const value = nextValues[key] ?? getParam(params, key);
    if (value) {
      next.set(key, value);
    }
  }

  const query = next.toString();
  return query ? `/search?${query}` : "/search";
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = (await searchParams) ?? {};
  const query = getParam(params, "q").trim();
  const category = getParam(params, "category");
  const sort = getParam(params, "sort") || "popular";
  const min = Number(getParam(params, "min") || 0);
  const max = Number(getParam(params, "max") || 0);
  const normalizedQuery = query.toLowerCase();

  const filteredDeals = deals
    .filter((deal) => {
      if (category && deal.categorySlug !== category) {
        return false;
      }

      if (min && deal.currentPrice < min) {
        return false;
      }

      if (max && deal.currentPrice > max) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchable = [
        deal.title,
        deal.subtitle,
        deal.categoryName,
        deal.subcategory,
        deal.seller,
        ...deal.tags,
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(normalizedQuery);
    })
    .sort((a, b) => {
      if (sort === "price-low") {
        return a.currentPrice - b.currentPrice;
      }

      if (sort === "discount") {
        const discountA = a.originalPrice - a.currentPrice;
        const discountB = b.originalPrice - b.currentPrice;
        return discountB - discountA;
      }

      if (sort === "rating") {
        return b.rating - a.rating;
      }

      if (sort === "deadline") {
        return a.endsIn.localeCompare(b.endsIn);
      }

      return b.participants - a.participants;
    });

  const activeCategory = categories.find((item) => item.slug === category);

  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4">
        <section className="rounded-2xl bg-[#fff4ef] p-4">
          <p className="text-xs font-black text-wadeal-red">Search Wadeal</p>
          <h1 className="mt-1 text-2xl font-black text-wadeal-ink">검색·필터</h1>
          <p className="mt-2 text-sm leading-5 text-wadeal-muted">
            상품명, 판매자, 태그를 검색하고 쿠팡형 카테고리와 가격대로 좁혀보세요.
          </p>
        </section>

        <form action="/search" className="space-y-3 rounded-2xl border border-wadeal-line p-3">
          <label className="block">
            <span className="text-xs font-black text-wadeal-ink">검색어</span>
            <input
              className="mt-2 h-11 w-full rounded-xl bg-gray-100 px-3 text-sm font-medium text-wadeal-ink outline-none"
              defaultValue={query}
              name="q"
              placeholder="감귤, 물티슈, 이어폰..."
              type="search"
            />
          </label>
          <div className="grid grid-cols-2 gap-2">
            <label>
              <span className="text-xs font-black text-wadeal-ink">최소 가격</span>
              <input
                className="mt-2 h-10 w-full rounded-xl bg-gray-100 px-3 text-sm outline-none"
                defaultValue={min || ""}
                inputMode="numeric"
                name="min"
                placeholder="0"
              />
            </label>
            <label>
              <span className="text-xs font-black text-wadeal-ink">최대 가격</span>
              <input
                className="mt-2 h-10 w-full rounded-xl bg-gray-100 px-3 text-sm outline-none"
                defaultValue={max || ""}
                inputMode="numeric"
                name="max"
                placeholder="100000"
              />
            </label>
          </div>
          <input name="category" type="hidden" value={category} />
          <input name="sort" type="hidden" value={sort} />
          <button
            className="h-11 w-full rounded-xl bg-wadeal-red text-sm font-black text-white"
            type="submit"
          >
            결과 보기
          </button>
        </form>

        <section aria-label="카테고리 필터" className="flex gap-2 overflow-x-auto no-scrollbar">
          <Link
            className={`shrink-0 rounded-full px-3 py-2 text-xs font-black ${
              !category ? "bg-wadeal-red text-white" : "bg-gray-100 text-gray-600"
            }`}
            href={makeHref(params, { category: "" })}
          >
            전체
          </Link>
          {categories.map((item) => (
            <Link
              className={`shrink-0 rounded-full px-3 py-2 text-xs font-black ${
                item.slug === category ? "bg-wadeal-red text-white" : "bg-gray-100 text-gray-600"
              }`}
              href={makeHref(params, { category: item.slug })}
              key={item.slug}
            >
              {item.name}
            </Link>
          ))}
        </section>

        <section aria-label="정렬" className="flex gap-2 overflow-x-auto no-scrollbar">
          {[
            ["popular", "인기순"],
            ["deadline", "마감임박"],
            ["price-low", "낮은가격"],
            ["discount", "할인큰순"],
            ["rating", "리뷰높은순"],
          ].map(([value, label]) => (
            <Link
              className={`shrink-0 rounded-full border px-3 py-2 text-xs font-black ${
                sort === value
                  ? "border-wadeal-red text-wadeal-red"
                  : "border-wadeal-line text-gray-500"
              }`}
              href={makeHref(params, { sort: value })}
              key={value}
            >
              {label}
            </Link>
          ))}
        </section>

        <section className="space-y-3" aria-labelledby="search-result-title">
          <div className="flex items-end justify-between">
            <div>
              <h2 id="search-result-title" className="text-lg font-black text-wadeal-ink">
                {activeCategory?.name ?? "전체"} 결과
              </h2>
              <p className="mt-1 text-xs font-bold text-wadeal-muted">
                {filteredDeals.length}개 상품 ·{" "}
                {filteredDeals[0] ? `최저 ${formatWon(filteredDeals[0].currentPrice)}` : "조건 변경 필요"}
              </p>
            </div>
            <Link className="text-xs font-black text-wadeal-red" href="/categories">
              카테고리
            </Link>
          </div>

          {filteredDeals.length > 0 ? (
            filteredDeals.map((deal) => <DealCard deal={deal} key={deal.id} />)
          ) : (
            <div className="rounded-2xl border border-dashed border-wadeal-line p-8 text-center">
              <p className="text-base font-black text-wadeal-ink">검색 결과가 없어요</p>
              <p className="mt-2 text-sm text-wadeal-muted">
                가격 범위를 넓히거나 다른 키워드로 다시 검색해보세요.
              </p>
            </div>
          )}
        </section>
      </div>
      <BottomNavigation />
    </main>
  );
}

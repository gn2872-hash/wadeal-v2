import { BottomNavigation } from "@/components/bottom-navigation";
import { CategoryGrid } from "@/components/category-grid";
import { DealSection } from "@/components/deal-section";
import { Header } from "@/components/header";
import { HeroBanner } from "@/components/hero-banner";
import { deals } from "@/lib/deals";

export default function Home() {
  const closingDeals = [...deals]
    .sort((a, b) => a.endsIn.localeCompare(b.endsIn))
    .slice(0, 3);
  const popularDeals = [...deals]
    .sort((a, b) => b.participants - a.participants)
    .slice(0, 4);

  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-5 px-4 pt-4">
        <HeroBanner />
        <CategoryGrid />
        <section className="grid grid-cols-3 gap-2" aria-label="쇼핑 바로가기">
          {[
            ["오늘도착", "빠른배송"],
            ["쿠폰팩", "공동구매"],
            ["랭킹", "인기상품"],
          ].map(([title, subtitle]) => (
            <div className="rounded-xl bg-gray-50 p-3" key={title}>
              <p className="text-sm font-black text-wadeal-ink">{title}</p>
              <p className="mt-1 text-[11px] font-bold text-wadeal-muted">{subtitle}</p>
            </div>
          ))}
        </section>
        <DealSection
          ctaHref="/search?sort=deadline"
          deals={closingDeals}
          subtitle="마감이 가까운 딜부터 빠르게 참여하세요"
          title="오늘 마감 공동구매"
        />
        <DealSection
          ctaHref="/search?sort=popular"
          deals={popularDeals}
          subtitle="구매자가 많이 모인 Wadeal 랭킹"
          title="실시간 인기 딜"
        />
      </div>
      <BottomNavigation />
    </main>
  );
}

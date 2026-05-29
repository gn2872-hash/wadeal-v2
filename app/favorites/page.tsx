import Link from "next/link";

import { BottomNavigation } from "@/components/bottom-navigation";
import { DealCard } from "@/components/deal-card";
import { Header } from "@/components/header";
import { favoriteDealIds, getDealsByIds } from "@/lib/buyer";

export default function FavoritesPage() {
  const favorites = getDealsByIds(favoriteDealIds);

  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4">
        <section className="rounded-2xl bg-[#fff4ef] p-5">
          <p className="text-xs font-black text-wadeal-red">Favorite Deals</p>
          <h1 className="mt-2 text-2xl font-black text-wadeal-ink">찜 목록</h1>
          <p className="mt-2 text-sm font-bold leading-5 text-wadeal-muted">
            로그인/DB 연결 전에는 목업 찜 상품으로 화면 흐름을 검증합니다.
          </p>
        </section>
        <section className="space-y-3">
          {favorites.map((deal) => (
            <DealCard deal={deal} key={deal.id} />
          ))}
        </section>
        <Link className="block text-center text-sm font-black text-wadeal-red" href="/search">
          더 많은 공동구매 찾기
        </Link>
      </div>
      <BottomNavigation />
    </main>
  );
}

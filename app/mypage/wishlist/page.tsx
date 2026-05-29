import Link from "next/link";

import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import { wishlistDeals } from "@/lib/account";
import { formatWon } from "@/lib/format";
import { getProductSlugByDealId } from "@/lib/products";

export default function MypageWishlistPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-[#fff4ef] p-5"><p className="text-xs font-black text-wadeal-red">Wishlist</p><h1 className="mt-2 text-2xl font-black text-wadeal-ink">찜 목록</h1></section>
        <section className="space-y-3">{wishlistDeals.length > 0 ? wishlistDeals.map((deal) => <Link className="flex gap-3 rounded-2xl border border-wadeal-line bg-white p-3" href={`/products/${getProductSlugByDealId(deal.id)}`} key={deal.id}><div className="grid h-24 w-24 shrink-0 place-items-center rounded-xl bg-gray-100 text-5xl">{deal.image}</div><div className="min-w-0 flex-1"><p className="line-clamp-2 text-sm font-black text-wadeal-ink">{deal.title}</p><p className="mt-1 text-xs font-bold text-wadeal-muted">{deal.seller}</p><p className="mt-2 text-base font-black text-wadeal-red">{formatWon(deal.currentPrice)}</p></div></Link>) : <div className="rounded-2xl border border-dashed border-wadeal-line p-8 text-center text-sm font-black text-wadeal-ink">찜한 상품이 없습니다</div>}</section>
      </div>
      <BottomNavigation />
    </main>
  );
}

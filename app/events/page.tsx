import Link from "next/link";

import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import { adminEvents, getEventDeals } from "@/lib/admin-commerce";
import { formatWon } from "@/lib/format";
import { getProductSlugByDealId } from "@/lib/products";

const statusLabel = { scheduled: "예정", live: "진행중", ended: "종료" } as const;

export default function EventsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-wadeal-ink p-5 text-white">
          <p className="text-xs font-black text-red-200">Wadeal Events</p>
          <h1 className="mt-2 text-2xl font-black">기획전</h1>
          <p className="mt-2 text-sm font-bold text-gray-200">관리자 이벤트 데이터와 연결된 구매자 기획전 목록입니다.</p>
        </section>
        {adminEvents.map((event) => {
          const deals = getEventDeals(event);
          return (
            <article className="rounded-2xl border border-wadeal-line bg-white p-4" key={event.id}>
              <div className="grid min-h-32 place-items-center rounded-xl bg-gray-100 text-sm font-black text-wadeal-muted">
                {event.heroImageUrl}
              </div>
              <div className="mt-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-black text-wadeal-muted">{event.startsAt} - {event.endsAt}</p>
                  <h2 className="mt-1 text-lg font-black text-wadeal-ink">{event.title}</h2>
                </div>
                <span className="rounded-full bg-red-50 px-2 py-1 text-[11px] font-black text-wadeal-red">{statusLabel[event.status]}</span>
              </div>
              <p className="mt-2 text-sm font-bold leading-5 text-wadeal-muted">{event.description}</p>
              <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar">
                {deals.map((deal) => (
                  <Link className="w-32 shrink-0" href={`/products/${getProductSlugByDealId(deal.id)}`} key={deal.id}>
                    <div className="grid h-24 place-items-center rounded-xl bg-gray-100 text-5xl">{deal.image}</div>
                    <p className="mt-2 line-clamp-2 text-xs font-black leading-4 text-wadeal-ink">{deal.title}</p>
                    <p className="mt-1 text-xs font-black text-wadeal-red">{formatWon(deal.currentPrice)}</p>
                  </Link>
                ))}
              </div>
            </article>
          );
        })}
      </div>
      <BottomNavigation />
    </main>
  );
}

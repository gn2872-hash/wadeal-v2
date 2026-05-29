import { deleteEventAction, saveEventAction } from "@/app/actions/admin/commerce";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import { adminEvents, getEventDeals } from "@/lib/admin-commerce";
import { deals } from "@/lib/deals";
import { formatWon } from "@/lib/format";

const statusLabel = { scheduled: "예정", live: "진행중", ended: "종료" } as const;

export default function AdminEventsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-wadeal-ink p-5 text-white"><p className="text-xs font-black text-red-200">Admin Events</p><h1 className="mt-2 text-2xl font-black">이벤트/기획전 관리</h1><p className="mt-2 text-sm font-bold text-gray-200">구매자 이벤트 페이지와 연결 가능한 상품 묶음 구조입니다.</p></section>
        <form action={saveEventAction} className="space-y-3 rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">이벤트 생성/수정</h2>
          <input className="h-11 w-full rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="title" placeholder="이벤트명" />
          <textarea className="min-h-20 w-full rounded-xl bg-gray-50 p-3 text-sm font-bold outline-none" name="description" placeholder="이벤트 설명" />
          <div className="grid grid-cols-2 gap-2"><input className="h-11 rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="startsAt" placeholder="시작일" /><input className="h-11 rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="endsAt" placeholder="종료일" /></div>
          <select className="h-11 w-full rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="status"><option value="scheduled">예정</option><option value="live">진행중</option><option value="ended">종료</option></select>
          <div className="rounded-xl bg-gray-50 p-3"><p className="text-xs font-black text-wadeal-ink">연결 상품 선택 UI</p><div className="mt-2 grid gap-1">{deals.slice(0, 5).map((deal) => <label className="flex items-center gap-2 text-xs font-bold text-wadeal-muted" key={deal.id}><input className="accent-wadeal-red" name="dealIds" type="checkbox" value={deal.id} />{deal.title}</label>)}</div></div>
          <button className="h-11 w-full rounded-xl bg-wadeal-red text-sm font-black text-white" type="submit">이벤트 저장</button>
        </form>
        {adminEvents.map((event) => { const eventDeals = getEventDeals(event); return <article className="rounded-2xl border border-wadeal-line bg-white p-4" key={event.id}><div className="grid min-h-28 place-items-center rounded-xl bg-gray-100 text-sm font-black text-wadeal-muted">{event.heroImageUrl}</div><div className="mt-3 flex items-start justify-between gap-3"><div><p className="text-[11px] font-black text-wadeal-muted">{event.id}</p><h2 className="mt-1 text-base font-black text-wadeal-ink">{event.title}</h2><p className="mt-1 text-xs font-bold text-wadeal-muted">{event.startsAt} - {event.endsAt}</p></div><span className="rounded-full bg-red-50 px-2 py-1 text-[11px] font-black text-wadeal-red">{statusLabel[event.status]}</span></div><p className="mt-3 text-sm font-bold leading-5 text-wadeal-muted">{event.description}</p><div className="mt-3 space-y-2">{eventDeals.map((deal) => <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3" key={deal.id}><span className="text-xs font-black text-wadeal-ink">{deal.title}</span><span className="text-xs font-black text-wadeal-red">{formatWon(deal.currentPrice)}</span></div>)}</div><form action={deleteEventAction} className="mt-3"><input name="eventId" type="hidden" value={event.id} /><button className="h-10 w-full rounded-xl border border-wadeal-line text-xs font-black text-gray-500" type="submit">삭제</button></form></article>; })}
      </div>
      <BottomNavigation />
    </main>
  );
}

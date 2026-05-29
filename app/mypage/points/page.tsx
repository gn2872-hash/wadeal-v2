import { reservePointUseAction } from "@/app/actions/points/actions";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import { expectedPoints, mockBuyerProfile, pointBalance, pointLedger } from "@/lib/account";
import { formatWon } from "@/lib/format";

export default function MypagePointsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-wadeal-ink p-5 text-white"><p className="text-xs font-black text-red-200">Points</p><h1 className="mt-2 text-2xl font-black">포인트</h1><p className="mt-3 text-3xl font-black">{formatWon(pointBalance)}</p><p className="mt-1 text-sm font-bold text-gray-200">적립 예정 {formatWon(expectedPoints)}</p></section>
        <form action={reservePointUseAction} className="rounded-2xl border border-wadeal-line bg-white p-4"><input name="userId" type="hidden" value={mockBuyerProfile.userId} /><h2 className="text-base font-black text-wadeal-ink">체크아웃 사용 예약</h2><input className="mt-3 h-11 w-full rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="amount" placeholder="사용할 포인트" /><button className="mt-3 h-10 w-full rounded-xl bg-wadeal-red text-xs font-black text-white" type="submit">사용 예약</button></form>
        <section className="rounded-2xl border border-wadeal-line bg-white p-4"><h2 className="text-base font-black text-wadeal-ink">포인트 내역</h2><div className="mt-3 space-y-2">{pointLedger.map((item) => <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3" key={item.id}><div><p className="text-sm font-black text-wadeal-ink">{item.title}</p><p className="mt-1 text-xs font-bold text-wadeal-muted">{item.date} {item.orderId ? `· ${item.orderId}` : ""}</p></div><span className={item.amount >= 0 ? "text-sm font-black text-wadeal-red" : "text-sm font-black text-wadeal-ink"}>{item.amount >= 0 ? "+" : ""}{formatWon(item.amount)}</span></div>)}</div></section>
      </div>
      <BottomNavigation />
    </main>
  );
}

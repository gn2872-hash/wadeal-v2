import { updateOrderStatusAction } from "@/app/actions/payments";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import {
  getNextOrderStatuses,
  mockCommercialOrders,
  orderStatusLabels,
  paymentStatusLabels,
} from "@/lib/order-status";
import { formatWon } from "@/lib/format";

export default function AdminOrdersPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-wadeal-ink p-5 text-white">
          <p className="text-xs font-black text-red-200">Admin Orders</p>
          <h1 className="mt-2 text-2xl font-black">주문 상태 관리</h1>
          <p className="mt-2 text-sm font-bold text-gray-200">상태 전환 가능 범위와 결제 상태 매핑을 확인합니다.</p>
        </section>
        <section className="space-y-3">
          {mockCommercialOrders.map((order) => {
            const nextStatuses = getNextOrderStatuses(order.status);
            return (
              <article className="rounded-2xl border border-wadeal-line bg-white p-4" key={order.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-black text-wadeal-muted">{order.id} · {order.buyer}</p>
                    <h2 className="mt-1 text-sm font-black text-wadeal-ink">{order.items.join(" 외 ")}</h2>
                    <p className="mt-1 text-xs font-bold text-wadeal-muted">{formatWon(order.amount)} · {paymentStatusLabels[order.paymentStatus]}</p>
                  </div>
                  <span className="rounded-full bg-red-50 px-2 py-1 text-[11px] font-black text-wadeal-red">{orderStatusLabels[order.status]}</span>
                </div>
                <form action={updateOrderStatusAction} className="mt-3 grid grid-cols-[1fr_72px] gap-2">
                  <input name="orderId" type="hidden" value={order.id} />
                  <input name="currentStatus" type="hidden" value={order.status} />
                  <select className="h-10 rounded-xl bg-gray-50 px-3 text-xs font-bold outline-none" name="nextStatus" defaultValue={nextStatuses[0] ?? order.status}>
                    {nextStatuses.length > 0 ? nextStatuses.map((status) => (
                      <option key={status} value={status}>{orderStatusLabels[status]}</option>
                    )) : <option value={order.status}>변경 불가</option>}
                  </select>
                  <button className="rounded-xl bg-wadeal-red text-xs font-black text-white" disabled={nextStatuses.length === 0} type="submit">변경</button>
                </form>
              </article>
            );
          })}
        </section>
      </div>
      <BottomNavigation />
    </main>
  );
}

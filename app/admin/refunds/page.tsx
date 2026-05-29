import { approveRefundAction, rejectRefundAction } from "@/app/actions/payments";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import { mockCommercialOrders, orderStatusLabels, paymentStatusLabels } from "@/lib/order-status";
import { prepareTossCancel } from "@/lib/payments/toss/refunds";
import { formatWon } from "@/lib/format";

export default async function AdminRefundsPage() {
  const refundOrders = mockCommercialOrders.filter((order) => ["refund_requested", "refunded"].includes(order.status));
  const fallbackCheck = await prepareTossCancel({
    paymentKey: refundOrders[0]?.paymentKey ?? "missing_payment_key",
    cancelReason: "관리자 환불 승인 사전 점검",
    cancelAmount: refundOrders[0]?.amount,
  });

  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-wadeal-ink p-5 text-white">
          <p className="text-xs font-black text-red-200">Admin Refunds</p>
          <h1 className="mt-2 text-2xl font-black">환불 관리</h1>
          <p className="mt-2 text-sm font-bold text-gray-200">승인 시 order/payment status와 Toss cancel API 준비 상태를 함께 확인합니다.</p>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">Toss cancel API 준비 상태</h2>
          <p className="mt-2 rounded-xl bg-gray-50 p-3 text-xs font-bold leading-5 text-wadeal-muted">
            {fallbackCheck.message ?? `호출 예정 endpoint: ${fallbackCheck.endpoint}`}
          </p>
        </section>

        <section className="space-y-3">
          {refundOrders.map((order) => (
            <article className="rounded-2xl border border-wadeal-line bg-white p-4" key={order.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-black text-wadeal-muted">{order.id} · {order.buyer}</p>
                  <h2 className="mt-1 text-sm font-black text-wadeal-ink">{order.items.join(" 외 ")}</h2>
                  <p className="mt-1 text-xs font-bold text-wadeal-muted">{formatWon(order.amount)} · {paymentStatusLabels[order.paymentStatus]}</p>
                </div>
                <span className="rounded-full bg-red-50 px-2 py-1 text-[11px] font-black text-wadeal-red">{orderStatusLabels[order.status]}</span>
              </div>
              <p className="mt-3 rounded-xl bg-gray-50 p-3 text-xs font-bold text-wadeal-muted">고객 메시지: {order.customerMessage}</p>
              {order.adminMemo ? <p className="mt-2 rounded-xl bg-red-50 p-3 text-xs font-bold text-wadeal-red">관리자 메모: {order.adminMemo}</p> : null}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <form action={approveRefundAction}>
                  <input name="orderId" type="hidden" value={order.id} />
                  <input name="paymentKey" type="hidden" value={order.paymentKey ?? ""} />
                  <input name="amount" type="hidden" value={order.amount} />
                  <input name="reason" type="hidden" value="관리자 환불 승인" />
                  <button className="h-10 w-full rounded-xl bg-wadeal-red text-xs font-black text-white" type="submit">승인</button>
                </form>
                <form action={rejectRefundAction}>
                  <input name="orderId" type="hidden" value={order.id} />
                  <button className="h-10 w-full rounded-xl border border-wadeal-line bg-white text-xs font-black text-wadeal-ink" type="submit">반려</button>
                </form>
              </div>
            </article>
          ))}
        </section>
      </div>
      <BottomNavigation />
    </main>
  );
}

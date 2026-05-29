import Link from "next/link";

import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import { createOrderNotification } from "@/lib/notifications";
import { getCommercialOrder, mockCommercialOrders } from "@/lib/order-status";
import { getMockTimeline } from "@/lib/order-timeline";
import { getTossPaymentConfig } from "@/lib/payments/toss/config";
import { validateTossSuccessParams } from "@/lib/payments/toss/validation";
import { formatWon } from "@/lib/format";

type PaymentSuccessPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function param(params: Record<string, string | string[] | undefined>, key: string) {
  const value = params[key];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function PaymentSuccessPage({ searchParams }: PaymentSuccessPageProps) {
  const params = (await searchParams) ?? {};
  const orderId = param(params, "orderId") || mockCommercialOrders[0].id;
  const order = getCommercialOrder(orderId) ?? mockCommercialOrders[0];
  const amount = param(params, "amount") || String(order.amount);
  const paymentKey = param(params, "paymentKey") || order.paymentKey;
  const validation = validateTossSuccessParams({ paymentKey, orderId, amount }, order.amount);
  const config = getTossPaymentConfig();
  const notifications = createOrderNotification(order, "paid");
  const timeline = getMockTimeline(order);

  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className={`rounded-2xl p-6 text-center ${validation.ok ? "bg-emerald-50" : "bg-red-50"}`}>
          <div className={`mx-auto grid h-14 w-14 place-items-center rounded-full text-3xl text-white ${validation.ok ? "bg-emerald-500" : "bg-wadeal-red"}`}>
            {validation.ok ? "✓" : "!"}
          </div>
          <h1 className="mt-4 text-2xl font-black text-wadeal-ink">
            {validation.ok ? "결제 callback 검증 완료" : "결제 검증 실패"}
          </h1>
          <p className="mt-2 text-sm font-bold leading-5 text-wadeal-muted">
            {validation.ok ? "paymentKey, orderId, amount가 주문 정보와 일치합니다." : validation.reason}
          </p>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">결제 승인 처리</h2>
          <dl className="mt-3 space-y-2 text-sm font-bold">
            <div className="flex justify-between"><dt className="text-wadeal-muted">주문번호</dt><dd>{order.id}</dd></div>
            <div className="flex justify-between"><dt className="text-wadeal-muted">paymentKey</dt><dd className="max-w-[220px] truncate">{paymentKey}</dd></div>
            <div className="flex justify-between"><dt className="text-wadeal-muted">amount</dt><dd>{formatWon(Number(amount))}</dd></div>
            <div className="flex justify-between"><dt className="text-wadeal-muted">서버 승인</dt><dd>{config.readyForServer ? "가능" : "fallback"}</dd></div>
          </dl>
          <p className="mt-3 rounded-xl bg-gray-50 p-3 text-xs font-bold leading-5 text-wadeal-muted">
            TOSS_SECRET_KEY가 없으면 실제 Confirm API 호출은 보류하고, 검증 UI와 주문 상태 업데이트 준비 흐름만 유지합니다.
          </p>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">주문 상태 업데이트 흐름</h2>
          <div className="mt-3 space-y-2">
            {timeline.map((entry) => (
              <div className="rounded-xl bg-gray-50 p-3" key={entry.id}>
                <p className="text-sm font-black text-wadeal-ink">{entry.title}</p>
                <p className="mt-1 text-xs font-bold text-wadeal-muted">{entry.customerMessage}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">생성될 알림</h2>
          <div className="mt-3 space-y-2">
            {notifications.map((event) => (
              <div className="rounded-xl bg-red-50 p-3" key={event.id}>
                <p className="text-sm font-black text-wadeal-red">{event.title}</p>
                <p className="mt-1 text-xs font-bold text-red-500">{event.audience} · {event.message}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-2">
          <Link className="h-12 rounded-xl border border-wadeal-line text-center text-sm font-black leading-[48px] text-wadeal-ink" href={`/orders/${order.id}`}>주문 상세</Link>
          <Link className="h-12 rounded-xl bg-wadeal-red text-center text-sm font-black leading-[48px] text-white" href="/order/complete">주문완료</Link>
        </div>
      </div>
      <BottomNavigation />
    </main>
  );
}

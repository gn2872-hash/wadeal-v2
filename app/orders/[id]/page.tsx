import Link from "next/link";
import { notFound } from "next/navigation";

import { requestRefundAction } from "@/app/actions/payments";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import {
  getCommercialOrder,
  mockCommercialOrders,
  orderStatusLabels,
  paymentStatusLabels,
} from "@/lib/order-status";
import { getMockTimeline } from "@/lib/order-timeline";
import { formatWon } from "@/lib/format";

type OrderDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return mockCommercialOrders.map((order) => ({ id: order.id }));
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const order = getCommercialOrder(id);

  if (!order) {
    notFound();
  }

  const timeline = getMockTimeline(order);

  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-wadeal-ink p-5 text-white">
          <p className="text-xs font-black text-red-200">Order Detail</p>
          <h1 className="mt-2 text-2xl font-black">주문 상세</h1>
          <p className="mt-2 text-sm font-bold text-gray-200">{order.id}</p>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-wadeal-ink">주문/결제 상태</h2>
              <p className="mt-1 text-xs font-bold text-wadeal-muted">고객 노출 메시지와 관리자 메모를 분리합니다.</p>
            </div>
            <span className="rounded-full bg-red-50 px-2 py-1 text-[11px] font-black text-wadeal-red">
              {orderStatusLabels[order.status]}
            </span>
          </div>
          <dl className="mt-3 space-y-2 text-sm font-bold">
            <div className="flex justify-between"><dt className="text-wadeal-muted">결제 상태</dt><dd>{paymentStatusLabels[order.paymentStatus]}</dd></div>
            <div className="flex justify-between"><dt className="text-wadeal-muted">금액</dt><dd>{formatWon(order.amount)}</dd></div>
            <div className="flex justify-between"><dt className="text-wadeal-muted">판매자</dt><dd>{order.seller}</dd></div>
          </dl>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">주문 상품</h2>
          <div className="mt-3 space-y-2">
            {order.items.map((item) => (
              <div className="rounded-xl bg-gray-50 p-3 text-sm font-black text-wadeal-ink" key={item}>{item}</div>
            ))}
          </div>
          <p className="mt-3 text-xs font-bold leading-5 text-wadeal-muted">배송지: {order.address}</p>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">주문 타임라인</h2>
          <div className="mt-3 space-y-2">
            {timeline.map((entry) => (
              <div className="rounded-xl bg-gray-50 p-3" key={entry.id}>
                <p className="text-sm font-black text-wadeal-ink">{entry.title}</p>
                <p className="mt-1 text-xs font-bold text-wadeal-muted">고객 메시지: {entry.customerMessage}</p>
                {entry.adminMemo ? <p className="mt-1 text-xs font-bold text-red-500">관리자 메모: {entry.adminMemo}</p> : null}
              </div>
            ))}
          </div>
        </section>

        <form action={requestRefundAction} className="rounded-2xl border border-wadeal-line bg-white p-4">
          <input name="orderId" type="hidden" value={order.id} />
          <h2 className="text-base font-black text-wadeal-ink">구매자 환불 요청</h2>
          <textarea className="mt-3 min-h-24 w-full rounded-xl bg-gray-50 p-3 text-sm font-bold outline-none" name="reason" placeholder="환불 사유를 입력하세요" />
          <button className="mt-3 h-11 w-full rounded-xl bg-wadeal-red text-sm font-black text-white" type="submit">환불 요청하기</button>
          <p className="mt-2 text-xs font-bold text-wadeal-muted">요청 시 order status는 refund_requested, payment status는 cancel_requested로 전환 준비됩니다.</p>
        </form>

        <Link className="block text-center text-sm font-black text-wadeal-red" href="/my">마이페이지로 돌아가기</Link>
      </div>
      <BottomNavigation />
    </main>
  );
}

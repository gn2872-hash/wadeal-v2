import Link from "next/link";

import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import {
  getCartLines,
  getCartSummary,
  mockAddresses,
  mockCartItems,
  mockOrderNumber,
} from "@/lib/buyer";
import { formatWon } from "@/lib/format";

export default function OrderCompletePage() {
  const lines = getCartLines(mockCartItems).filter((line) => line.selected);
  const summary = getCartSummary(lines);
  const address = mockAddresses.find((item) => item.isDefault) ?? mockAddresses[0];

  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-emerald-50 p-6 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-3xl text-white">
            ✓
          </div>
          <h1 className="mt-4 text-2xl font-black text-wadeal-ink">주문이 완료됐어요</h1>
          <p className="mt-2 text-sm font-bold leading-5 text-emerald-700">
            공동구매가 마감되면 최저가 기준으로 주문 상태가 업데이트됩니다.
          </p>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">주문 정보</h2>
          <dl className="mt-3 space-y-2 text-sm font-bold">
            <div className="flex justify-between text-wadeal-muted">
              <dt>주문번호</dt>
              <dd className="text-wadeal-ink">{mockOrderNumber}</dd>
            </div>
            <div className="flex justify-between text-wadeal-muted">
              <dt>결제금액</dt>
              <dd className="text-lg font-black text-wadeal-red">{formatWon(summary.total)}</dd>
            </div>
            <div className="flex justify-between text-wadeal-muted">
              <dt>결제수단</dt>
              <dd className="text-wadeal-ink">Toss Payments</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-wadeal-ink">배송지</h2>
            <span className="rounded-full bg-gray-100 px-2 py-1 text-[11px] font-black text-gray-600">
              {address.label}
            </span>
          </div>
          <p className="mt-3 text-sm font-black text-wadeal-ink">{address.recipient}</p>
          <p className="mt-1 text-sm font-bold leading-5 text-wadeal-muted">{address.address}</p>
          <p className="mt-1 text-xs font-bold text-wadeal-muted">{address.phone}</p>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">주문 상품</h2>
          <div className="mt-3 space-y-3">
            {lines.map((line) => (
              <div className="flex gap-3" key={line.id}>
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-gray-100 text-3xl">
                  {line.deal.image}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-black leading-5 text-wadeal-ink">
                    {line.deal.title}
                  </p>
                  <p className="mt-1 text-xs font-bold text-wadeal-muted">
                    수량 {line.quantity}개 · {line.deal.deliveryBadge}
                  </p>
                </div>
                <p className="text-sm font-black text-wadeal-ink">
                  {formatWon(line.deal.currentPrice * line.quantity)}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-2">
          <Link
            className="h-12 rounded-xl border border-wadeal-line text-center text-sm font-black leading-[48px] text-wadeal-ink"
            href="/my"
          >
            주문 상세로 이동
          </Link>
          <Link
            className="h-12 rounded-xl bg-wadeal-red text-center text-sm font-black leading-[48px] text-white"
            href="/"
          >
            계속 쇼핑하기
          </Link>
        </div>
      </div>
      <BottomNavigation />
    </main>
  );
}

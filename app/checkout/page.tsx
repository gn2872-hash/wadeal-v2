import Link from "next/link";

import { TossPaymentPanel } from "@/app/checkout/toss-payment-panel";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import {
  getCartLines,
  getCartSummary,
  mockAddresses,
  mockCartItems,
  mockCoupons,
  mockPaymentMethods,
  mockPointBalance,
} from "@/lib/buyer";
import { formatWon } from "@/lib/format";

type CheckoutPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(params: Record<string, string | string[] | undefined>, key: string) {
  const value = params[key];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const params = (await searchParams) ?? {};
  const paymentStatus = getParam(params, "payment");
  const lines = getCartLines(mockCartItems).filter((line) => line.selected);
  const summary = getCartSummary(lines);
  const defaultAddress = mockAddresses.find((address) => address.isDefault) ?? mockAddresses[0];
  const tossReady = mockPaymentMethods.find((method) => method.id === "toss")?.enabled ?? false;

  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-wadeal-ink p-5 text-white">
          <p className="text-xs font-black text-red-200">Checkout</p>
          <h1 className="mt-2 text-2xl font-black">주문/결제</h1>
          <p className="mt-2 text-sm font-medium leading-5 text-gray-200">
            공동구매 가격을 유지한 상태로 배송지, 쿠폰, 포인트, 결제수단을 확인합니다.
          </p>
        </section>

        {paymentStatus === "failed" ? (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
            <p className="text-sm font-black text-wadeal-red">결제 실패</p>
            <p className="mt-1 text-xs font-bold text-red-500">
              Toss 결제 승인 단계에서 실패한 상태 UI입니다. 결제수단을 다시 선택해 주세요.
            </p>
          </div>
        ) : null}

        {paymentStatus === "success" ? (
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <p className="text-sm font-black text-emerald-700">결제 승인 준비 완료</p>
            <p className="mt-1 text-xs font-bold text-emerald-600">
              실제 PG 승인 후에는 주문완료 페이지로 이동합니다.
            </p>
          </div>
        ) : null}

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-wadeal-ink">배송지</h2>
            <button className="text-xs font-black text-wadeal-red" type="button">
              변경
            </button>
          </div>
          <div className="mt-3 rounded-xl bg-gray-50 p-3">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-wadeal-red px-2 py-1 text-[11px] font-black text-white">
                기본배송지
              </span>
              <p className="text-sm font-black text-wadeal-ink">{defaultAddress.recipient}</p>
            </div>
            <p className="mt-2 text-sm font-bold leading-5 text-wadeal-ink">
              {defaultAddress.address}
            </p>
            <p className="mt-1 text-xs font-bold text-wadeal-muted">
              {defaultAddress.phone} · {defaultAddress.request}
            </p>
          </div>
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
                <p className="shrink-0 text-sm font-black text-wadeal-ink">
                  {formatWon(line.deal.currentPrice * line.quantity)}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">쿠폰/포인트</h2>
          <div className="mt-3 space-y-2">
            {mockCoupons.map((coupon) => (
              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3" key={coupon.id}>
                <div>
                  <p className="text-sm font-black text-wadeal-ink">{coupon.name}</p>
                  <p className="mt-1 text-xs font-bold text-wadeal-muted">
                    {coupon.enabled ? "사용 가능" : "조건 미충족"}
                  </p>
                </div>
                <span className="text-sm font-black text-wadeal-red">
                  -{formatWon(coupon.amount)}
                </span>
              </div>
            ))}
            <div className="rounded-xl bg-red-50 p-3 text-sm font-bold text-wadeal-red">
              보유 포인트 {formatWon(mockPointBalance)} · 이번 주문 예상 사용 {formatWon(summary.pointDiscount)}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">결제수단</h2>
          <div className="mt-3 space-y-2">
            {mockPaymentMethods.map((method) => (
              <label
                className={`flex items-start gap-3 rounded-xl border p-3 ${
                  method.enabled ? "border-wadeal-red bg-red-50" : "border-wadeal-line bg-gray-50"
                }`}
                key={method.id}
              >
                <input
                  checked={method.id === "toss"}
                  className="mt-1 accent-wadeal-red"
                  disabled={!method.enabled}
                  readOnly
                  type="radio"
                />
                <span>
                  <span className="block text-sm font-black text-wadeal-ink">{method.name}</span>
                  <span className="mt-1 block text-xs font-bold text-wadeal-muted">
                    {method.description}
                  </span>
                </span>
              </label>
            ))}
          </div>
          <p className={`mt-3 rounded-xl p-3 text-xs font-black ${tossReady ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
            Toss 결제 가능 여부: {tossReady ? "UI 준비됨 · 실제 키 연결 필요" : "비활성"}
          </p>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">최종 결제금액</h2>
          <dl className="mt-3 space-y-2 text-sm font-bold">
            <div className="flex justify-between text-wadeal-muted">
              <dt>상품 금액</dt>
              <dd>{formatWon(summary.productTotal)}</dd>
            </div>
            <div className="flex justify-between text-wadeal-red">
              <dt>공동구매 할인</dt>
              <dd>-{formatWon(summary.groupDiscount)}</dd>
            </div>
            <div className="flex justify-between text-wadeal-red">
              <dt>쿠폰/포인트</dt>
              <dd>-{formatWon(summary.couponDiscount + summary.pointDiscount)}</dd>
            </div>
            <div className="flex justify-between text-wadeal-muted">
              <dt>배송비</dt>
              <dd>{summary.deliveryFee === 0 ? "무료" : formatWon(summary.deliveryFee)}</dd>
            </div>
            <div className="flex justify-between border-t border-wadeal-line pt-3 text-xl font-black text-wadeal-ink">
              <dt>결제금액</dt>
              <dd>{formatWon(summary.total)}</dd>
            </div>
          </dl>
        </section>

        <TossPaymentPanel orderId="WD202605290128" amount={summary.total} />
      </div>
      <BottomNavigation />
    </main>
  );
}

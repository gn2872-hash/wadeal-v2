import Link from "next/link";

import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";

type PaymentFailPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function param(params: Record<string, string | string[] | undefined>, key: string) {
  const value = params[key];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function PaymentFailPage({ searchParams }: PaymentFailPageProps) {
  const params = (await searchParams) ?? {};
  const code = param(params, "code") || "UNKNOWN_ERROR";
  const message = param(params, "message") || "결제가 완료되지 않았습니다.";
  const orderId = param(params, "orderId") || "WD202605290128";

  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-red-50 p-6 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-wadeal-red text-3xl text-white">!</div>
          <h1 className="mt-4 text-2xl font-black text-wadeal-ink">결제 실패 callback</h1>
          <p className="mt-2 text-sm font-bold leading-5 text-red-500">{message}</p>
        </section>
        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">실패 정보</h2>
          <dl className="mt-3 space-y-2 text-sm font-bold">
            <div className="flex justify-between"><dt className="text-wadeal-muted">주문번호</dt><dd>{orderId}</dd></div>
            <div className="flex justify-between"><dt className="text-wadeal-muted">오류 코드</dt><dd>{code}</dd></div>
          </dl>
          <p className="mt-3 rounded-xl bg-gray-50 p-3 text-xs font-bold text-wadeal-muted">
            결제 실패 시 주문은 pending 상태로 유지하고 재결제 또는 주문 취소를 선택하게 합니다.
          </p>
        </section>
        <div className="grid grid-cols-2 gap-2">
          <Link className="h-12 rounded-xl border border-wadeal-line text-center text-sm font-black leading-[48px] text-wadeal-ink" href="/cart">장바구니</Link>
          <Link className="h-12 rounded-xl bg-wadeal-red text-center text-sm font-black leading-[48px] text-white" href="/checkout?payment=failed">다시 결제</Link>
        </div>
      </div>
      <BottomNavigation />
    </main>
  );
}

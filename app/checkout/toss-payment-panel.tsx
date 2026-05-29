import Link from "next/link";

import { getTossPaymentConfig, getTossReadinessMessage } from "@/lib/payments/toss/config";
import { formatWon } from "@/lib/format";

export function TossPaymentPanel({ orderId, amount }: { orderId: string; amount: number }) {
  const config = getTossPaymentConfig();
  const readiness = getTossReadinessMessage(config);
  const successHref = `/payments/success?paymentKey=mock_payment_key_${orderId}&orderId=${orderId}&amount=${amount}`;
  const failHref = `/payments/fail?code=PAY_PROCESS_CANCELED&message=${encodeURIComponent("사용자가 결제를 취소했습니다.")}&orderId=${orderId}`;

  return (
    <section className="rounded-2xl border border-wadeal-line bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-wadeal-ink">Toss Payments</h2>
          <p className="mt-1 text-xs font-bold text-wadeal-muted">결제 위젯/콜백 안정화 상태</p>
        </div>
        <span className={`rounded-full px-2 py-1 text-[11px] font-black ${config.readyForClient ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-wadeal-red"}`}>
          {config.mode}
        </span>
      </div>
      <div className="mt-3 rounded-xl bg-gray-50 p-3">
        <p className="text-xs font-bold leading-5 text-wadeal-muted">{readiness}</p>
        <p className="mt-2 text-xs font-bold text-wadeal-muted">
          successUrl: {config.successUrl}<br />failUrl: {config.failUrl}
        </p>
      </div>
      <div className="mt-3 rounded-xl border border-dashed border-wadeal-line p-4 text-center">
        <p className="text-sm font-black text-wadeal-ink">결제 위젯 영역</p>
        <p className="mt-1 text-xs font-bold text-wadeal-muted">
          실제 client key가 있으면 이 위치에 Toss 위젯을 마운트합니다.
        </p>
        <p className="mt-2 text-lg font-black text-wadeal-red">{formatWon(amount)}</p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Link className="h-11 rounded-xl border border-wadeal-line text-center text-xs font-black leading-[44px] text-wadeal-ink" href={failHref}>
          실패 callback 확인
        </Link>
        <Link className="h-11 rounded-xl bg-wadeal-red text-center text-xs font-black leading-[44px] text-white" href={successHref}>
          성공 callback 확인
        </Link>
      </div>
    </section>
  );
}

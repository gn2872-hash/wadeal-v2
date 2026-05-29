"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { CartLine } from "@/lib/buyer";
import { getCartSummary } from "@/lib/buyer";
import { formatWon } from "@/lib/format";

type CartClientProps = {
  initialLines: CartLine[];
};

export function CartClient({ initialLines }: CartClientProps) {
  const [lines, setLines] = useState(initialLines);
  const summary = useMemo(() => getCartSummary(lines), [lines]);
  const allSelected = lines.length > 0 && lines.every((line) => line.selected);

  function toggleAll() {
    setLines((current) => current.map((line) => ({ ...line, selected: !allSelected })));
  }

  function toggleItem(id: number) {
    setLines((current) =>
      current.map((line) => (line.id === id ? { ...line, selected: !line.selected } : line)),
    );
  }

  function changeQuantity(id: number, delta: number) {
    setLines((current) =>
      current.map((line) =>
        line.id === id ? { ...line, quantity: Math.max(1, line.quantity + delta) } : line,
      ),
    );
  }

  function removeItem(id: number) {
    setLines((current) => current.filter((line) => line.id !== id));
  }

  return (
    <>
      <div className="space-y-4 px-4 pt-4 pb-40">
        <section className="rounded-2xl bg-wadeal-ink p-5 text-white">
          <p className="text-xs font-black text-red-200">Buyer Cart</p>
          <h1 className="mt-2 text-2xl font-black">장바구니</h1>
          <p className="mt-2 text-sm font-medium leading-5 text-gray-200">
            DB 연결 전에는 목업 장바구니로 수량, 선택, 삭제, 금액 계산 UX를 검증합니다.
          </p>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-black text-wadeal-ink">
              <input
                checked={allSelected}
                className="h-4 w-4 accent-wadeal-red"
                onChange={toggleAll}
                type="checkbox"
              />
              전체 선택
            </label>
            <span className="text-xs font-bold text-wadeal-muted">
              선택 {summary.count}개 · 총 {lines.length}종
            </span>
          </div>
        </section>

        <section className="space-y-3" aria-label="장바구니 상품">
          {lines.length > 0 ? (
            lines.map((line) => {
              const progress = Math.min(
                100,
                Math.round((line.deal.participants / line.deal.targetParticipants) * 100),
              );

              return (
                <article
                  className="rounded-2xl border border-wadeal-line bg-white p-4"
                  key={line.id}
                >
                  <div className="flex items-start gap-3">
                    <input
                      checked={line.selected}
                      className="mt-10 h-4 w-4 accent-wadeal-red"
                      onChange={() => toggleItem(line.id)}
                      type="checkbox"
                    />
                    <div className="grid h-24 w-24 shrink-0 place-items-center rounded-xl bg-gray-100 text-5xl">
                      {line.deal.image}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[11px] font-black text-wadeal-red">
                            {line.deal.deliveryBadge} · {line.deal.badge}
                          </p>
                          <h2 className="mt-1 line-clamp-2 text-sm font-black leading-5 text-wadeal-ink">
                            {line.deal.title}
                          </h2>
                          <p className="mt-1 truncate text-xs font-bold text-wadeal-muted">
                            {line.deal.seller}
                          </p>
                        </div>
                        <button
                          className="shrink-0 text-xs font-bold text-gray-400"
                          onClick={() => removeItem(line.id)}
                          type="button"
                        >
                          삭제
                        </button>
                      </div>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-lg font-black text-wadeal-ink">
                          {formatWon(line.deal.currentPrice)}
                        </span>
                        <span className="text-xs font-bold text-gray-400 line-through">
                          {formatWon(line.deal.originalPrice)}
                        </span>
                      </div>
                      <div className="mt-2 rounded-lg bg-gray-50 p-2">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className="text-wadeal-muted">
                            {line.deal.participants}명 / {line.deal.targetParticipants}명
                          </span>
                          <span className="text-wadeal-red">{progress}% 달성</span>
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-200">
                          <div className="h-full rounded-full bg-wadeal-red" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex h-9 items-center overflow-hidden rounded-lg border border-wadeal-line">
                          <button
                            className="h-full w-9 text-lg font-black text-gray-500"
                            onClick={() => changeQuantity(line.id, -1)}
                            type="button"
                          >
                            -
                          </button>
                          <span className="grid h-full w-10 place-items-center text-sm font-black">
                            {line.quantity}
                          </span>
                          <button
                            className="h-full w-9 text-lg font-black text-gray-500"
                            onClick={() => changeQuantity(line.id, 1)}
                            type="button"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-black text-wadeal-ink">
                          {formatWon(line.deal.currentPrice * line.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="rounded-2xl border border-dashed border-wadeal-line p-8 text-center">
              <p className="text-base font-black text-wadeal-ink">장바구니가 비어 있어요</p>
              <Link className="mt-3 inline-block text-sm font-black text-wadeal-red" href="/search">
                공동구매 상품 보러가기
              </Link>
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">결제 예정 금액</h2>
          <dl className="mt-3 space-y-2 text-sm font-bold">
            <div className="flex justify-between text-wadeal-muted">
              <dt>선택 상품 금액</dt>
              <dd>{formatWon(summary.productTotal)}</dd>
            </div>
            <div className="flex justify-between text-wadeal-red">
              <dt>공동구매 할인</dt>
              <dd>-{formatWon(summary.groupDiscount)}</dd>
            </div>
            <div className="flex justify-between text-wadeal-red">
              <dt>쿠폰/포인트 예상 할인</dt>
              <dd>-{formatWon(summary.couponDiscount + summary.pointDiscount)}</dd>
            </div>
            <div className="flex justify-between text-wadeal-muted">
              <dt>배송비</dt>
              <dd>{summary.deliveryFee === 0 ? "무료" : formatWon(summary.deliveryFee)}</dd>
            </div>
            <div className="flex justify-between border-t border-wadeal-line pt-3 text-lg font-black text-wadeal-ink">
              <dt>총 결제금액</dt>
              <dd>{formatWon(summary.total)}</dd>
            </div>
          </dl>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-[72px] z-20 mx-auto max-w-[480px] border-t border-wadeal-line bg-white p-4 shadow-[0_-8px_20px_rgba(17,24,39,0.08)]">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-bold text-wadeal-muted">선택 {summary.count}개</span>
          <span className="text-xl font-black text-wadeal-ink">{formatWon(summary.total)}</span>
        </div>
        <Link
          className={`block h-12 rounded-xl text-center text-base font-black leading-[48px] text-white ${
            summary.count > 0 ? "bg-wadeal-red" : "pointer-events-none bg-gray-300"
          }`}
          href="/checkout"
        >
          선택 상품 결제하기
        </Link>
      </div>
    </>
  );
}

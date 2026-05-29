import Link from "next/link";

import type { Deal } from "@/lib/deals";
import { formatWon } from "@/lib/format";
import { getProductSlugByDealId } from "@/lib/products";

type DealCardProps = {
  deal: Deal;
};

export function DealCard({ deal }: DealCardProps) {
  const progress = Math.min(
    100,
    Math.round((deal.participants / deal.targetParticipants) * 100),
  );
  const remainingUsers = Math.max(0, deal.targetParticipants - deal.participants);
  const discount = Math.round(
    ((deal.originalPrice - deal.currentPrice) / deal.originalPrice) * 100,
  );
  const productHref = `/products/${getProductSlugByDealId(deal.id)}`;

  return (
    <article className="rounded-xl border border-wadeal-line bg-white p-3 shadow-[0_1px_0_rgba(17,24,39,0.03)]">
      <div className="flex gap-3">
        <div className="relative grid h-[118px] w-[118px] shrink-0 place-items-center overflow-hidden rounded-lg bg-gray-100 text-6xl">
          <span>{deal.image}</span>
          <span className="absolute left-2 top-2 rounded bg-white/95 px-1.5 py-1 text-[10px] font-black text-wadeal-red shadow-sm">
            {deal.deliveryBadge}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-red-50 px-2 py-1 text-[11px] font-black text-wadeal-red">
              {deal.badge}
            </span>
            <span className="text-[11px] font-bold text-wadeal-muted">
              {deal.endsIn} 남음
            </span>
          </div>
          <p className="mt-2 truncate text-[11px] font-bold text-gray-500">
            {deal.categoryName} &gt; {deal.subcategory}
          </p>
          <Link className="mt-2 block line-clamp-2 text-[15px] font-extrabold leading-5 text-wadeal-ink" href={productHref}>
            {deal.title}
          </Link>
          <p className="mt-1 truncate text-xs font-medium text-wadeal-muted">
            {deal.subtitle}
          </p>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-base font-black text-wadeal-red">{discount}%</span>
            <span className="text-[20px] font-black tracking-normal text-wadeal-ink">
              {formatWon(deal.currentPrice)}
            </span>
          </div>
          <p className="text-xs font-medium text-gray-400 line-through">
            {formatWon(deal.originalPrice)}
          </p>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-gray-500">
            <span className="text-amber-500">★ {deal.rating.toFixed(1)}</span>
            <span>({deal.reviewCount.toLocaleString("ko-KR")})</span>
            <span>·</span>
            <span className="truncate">{deal.seller}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-md bg-gray-50 p-3">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-wadeal-ink">
            {deal.participants}명 참여
            <span className="text-wadeal-muted"> / {deal.targetParticipants}명 목표</span>
          </span>
          <span className="text-wadeal-red">{progress}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-wadeal-red"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between gap-2 text-xs font-bold">
          <span className="text-wadeal-muted">
            최저가까지 <span className="text-wadeal-red">{remainingUsers}명</span>
          </span>
          <span className="text-wadeal-ink">최저 {formatWon(deal.lowestPrice)}</span>
        </div>
      </div>

      <div className="mt-3 flex gap-1.5 overflow-x-auto no-scrollbar">
        {deal.tags.map((tag) => (
          <span
            className="shrink-0 rounded-full bg-gray-100 px-2 py-1 text-[11px] font-bold text-gray-600"
            key={tag}
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-[48px_1fr] gap-2">
        <button
          className="grid h-11 place-items-center rounded-md bg-wadeal-kakao text-sm font-black text-[#241f1f] active:brightness-95"
          type="button"
          aria-label="카카오톡 공유"
          title="카카오톡 공유"
        >
          톡
        </button>
        <Link
          className="h-11 rounded-md bg-wadeal-red text-center text-sm font-black leading-[44px] text-white active:bg-red-700"
          href={productHref}
        >
          공동구매 참여하기
        </Link>
      </div>
    </article>
  );
}

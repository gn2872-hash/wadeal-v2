import type { Deal } from "@/lib/deals";

type DealCardProps = {
  deal: Deal;
};

const currency = new Intl.NumberFormat("ko-KR");

export function DealCard({ deal }: DealCardProps) {
  const progress = Math.min(
    100,
    Math.round((deal.participants / deal.targetParticipants) * 100),
  );
  const remainingUsers = Math.max(0, deal.targetParticipants - deal.participants);
  const discount = Math.round(
    ((deal.originalPrice - deal.currentPrice) / deal.originalPrice) * 100,
  );

  return (
    <article className="rounded-lg border border-wadeal-line bg-white p-3">
      <div className="flex gap-3">
        <div className="grid h-[112px] w-[112px] shrink-0 place-items-center rounded-md bg-gray-100 text-6xl">
          {deal.image}
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
          <h3 className="mt-2 line-clamp-2 text-[15px] font-extrabold leading-5 text-wadeal-ink">
            {deal.title}
          </h3>
          <p className="mt-1 truncate text-xs font-medium text-wadeal-muted">
            {deal.subtitle}
          </p>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-base font-black text-wadeal-red">{discount}%</span>
            <span className="text-[20px] font-black tracking-normal text-wadeal-ink">
              {currency.format(deal.currentPrice)}원
            </span>
          </div>
          <p className="text-xs font-medium text-gray-400 line-through">
            {currency.format(deal.originalPrice)}원
          </p>
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
          <span className="text-wadeal-ink">
            최저 {currency.format(deal.lowestPrice)}원
          </span>
        </div>
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
        <button
          className="h-11 rounded-md bg-wadeal-red text-sm font-black text-white active:bg-red-700"
          type="button"
        >
          공동구매 참여하기
        </button>
      </div>
    </article>
  );
}

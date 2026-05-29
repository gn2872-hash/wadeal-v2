import Link from "next/link";

import { DealCard } from "@/components/deal-card";
import type { Deal } from "@/lib/deals";

type DealSectionProps = {
  deals: Deal[];
  title?: string;
  subtitle?: string;
  ctaHref?: string;
};

export function DealSection({
  deals,
  title = "실시간 공동구매",
  subtitle = "인원이 모일수록 가격이 내려가요",
  ctaHref = "/search?sort=popular",
}: DealSectionProps) {
  return (
    <section className="space-y-3" aria-labelledby="live-deals">
      <div className="flex items-end justify-between">
        <div>
          <h2 id="live-deals" className="text-lg font-black tracking-normal text-wadeal-ink">
            {title}
          </h2>
          <p className="mt-1 text-xs font-medium text-wadeal-muted">{subtitle}</p>
        </div>
        <Link className="text-sm font-bold text-wadeal-red" href={ctaHref}>
          전체보기
        </Link>
      </div>
      <div className="space-y-3">
        {deals.map((deal) => (
          <DealCard deal={deal} key={deal.id} />
        ))}
      </div>
    </section>
  );
}

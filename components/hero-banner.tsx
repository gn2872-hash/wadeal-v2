import Link from "next/link";

import { getVisibleHomeBanners } from "@/lib/admin-commerce";

export function HeroBanner() {
  const banner = getVisibleHomeBanners()[0];

  return (
    <section className="overflow-hidden rounded-lg bg-[#fff4ef]">
      <Link className="relative block min-h-[150px] px-5 py-5" href={banner?.linkUrl ?? "/search?sort=deadline"}>
        <div className="max-w-[64%]">
          <p className="text-xs font-bold text-wadeal-coral">{banner?.title ?? "오늘 24시 마감"}</p>
          <h1 className="mt-2 text-[24px] font-black leading-tight tracking-normal text-wadeal-ink">
            같이 사면 더 내려가는 프리미엄 딜
          </h1>
          <p className="mt-2 text-sm leading-5 text-wadeal-muted">
            관리자 배너 데이터와 연결 가능한 홈 배너 영역입니다.
          </p>
        </div>
        <div className="absolute bottom-2 right-2 grid h-28 w-28 place-items-center rounded-full bg-white text-6xl shadow-soft">
          🛒
        </div>
      </Link>
    </section>
  );
}

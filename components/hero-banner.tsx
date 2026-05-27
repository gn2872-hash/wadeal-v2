export function HeroBanner() {
  return (
    <section className="overflow-hidden rounded-lg bg-[#fff4ef]">
      <div className="relative min-h-[150px] px-5 py-5">
        <div className="max-w-[64%]">
          <p className="text-xs font-bold text-wadeal-coral">오늘 24시 마감</p>
          <h1 className="mt-2 text-[24px] font-black leading-tight tracking-normal text-wadeal-ink">
            같이 사면 더 내려가는 프리미엄 딜
          </h1>
          <p className="mt-2 text-sm leading-5 text-wadeal-muted">
            Wadeal에서 검증한 국내 인기 상품만 모았어요.
          </p>
        </div>
        <div className="absolute bottom-2 right-2 grid h-28 w-28 place-items-center rounded-full bg-white text-6xl shadow-soft">
          🛒
        </div>
      </div>
    </section>
  );
}

import { selectCouponForCheckoutAction } from "@/app/actions/coupons/actions";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import { accountCoupons, mockBuyerProfile } from "@/lib/account";
import { formatWon } from "@/lib/format";

export default function MypageCouponsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-wadeal-ink p-5 text-white"><p className="text-xs font-black text-red-200">Coupons</p><h1 className="mt-2 text-2xl font-black">쿠폰함</h1><p className="mt-2 text-sm font-bold text-gray-200">체크아웃에서 선택 가능한 구조로 userId 검증을 적용합니다.</p></section>
        {accountCoupons.map((coupon) => <article className="rounded-2xl border border-wadeal-line bg-white p-4" key={coupon.id}><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-black text-wadeal-muted">{coupon.id}</p><h2 className="mt-1 text-base font-black text-wadeal-ink">{coupon.name}</h2><p className="mt-1 text-xs font-bold text-wadeal-muted">{coupon.restriction} · 최소 {formatWon(coupon.minimumOrderAmount)} · {coupon.expiresAt}까지</p></div><span className="rounded-full bg-gray-100 px-2 py-1 text-[11px] font-black text-gray-600">{coupon.status}</span></div><p className="mt-3 text-2xl font-black text-wadeal-red">-{formatWon(coupon.amount)}</p>{coupon.status === "available" ? <form action={selectCouponForCheckoutAction} className="mt-3"><input name="userId" type="hidden" value={mockBuyerProfile.userId} /><input name="couponId" type="hidden" value={coupon.id} /><button className="h-10 w-full rounded-xl bg-wadeal-red text-xs font-black text-white" type="submit">체크아웃에서 선택</button></form> : null}</article>)}
      </div>
      <BottomNavigation />
    </main>
  );
}

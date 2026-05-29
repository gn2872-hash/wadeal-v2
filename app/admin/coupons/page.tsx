import { pauseAdminCouponAction, saveAdminCouponAction } from "@/app/actions/admin/commerce";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import { adminCoupons, formatCouponDiscount } from "@/lib/coupons";
import { formatWon } from "@/lib/format";

const audienceLabel = { new: "신규회원", all: "전체회원", specific: "특정회원" } as const;

export default function AdminCouponsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-wadeal-ink p-5 text-white"><p className="text-xs font-black text-red-200">Admin Coupons</p><h1 className="mt-2 text-2xl font-black">쿠폰 관리</h1><p className="mt-2 text-sm font-bold text-gray-200">마이페이지 쿠폰함과 체크아웃 쿠폰 선택에 연결 가능한 구조입니다.</p></section>
        <form action={saveAdminCouponAction} className="space-y-3 rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">쿠폰 생성/수정</h2>
          <input className="h-11 w-full rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="name" placeholder="쿠폰명" />
          <div className="grid grid-cols-2 gap-2"><select className="h-11 rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="discountType"><option value="fixed">정액 할인</option><option value="rate">정률 할인</option></select><input className="h-11 rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="discountValue" placeholder="할인값" /></div>
          <div className="grid grid-cols-2 gap-2"><input className="h-11 rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="minimumOrderAmount" placeholder="최소 주문금액" /><input className="h-11 rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="maxDiscountAmount" placeholder="최대 할인금액" /></div>
          <div className="grid grid-cols-2 gap-2"><input className="h-11 rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="startsAt" placeholder="시작일" /><input className="h-11 rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="endsAt" placeholder="종료일" /></div>
          <div className="grid grid-cols-2 gap-2"><input className="h-11 rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="issueLimit" placeholder="발급 수량" /><select className="h-11 rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="audience"><option value="new">신규회원</option><option value="all">전체회원</option><option value="specific">특정회원</option></select></div>
          <input className="h-11 w-full rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="appliesTo" placeholder="적용 카테고리/상품" />
          <button className="h-11 w-full rounded-xl bg-wadeal-red text-sm font-black text-white" type="submit">쿠폰 저장</button>
        </form>
        {adminCoupons.map((coupon) => <article className="rounded-2xl border border-wadeal-line bg-white p-4" key={coupon.id}><div className="flex items-start justify-between gap-3"><div><p className="text-[11px] font-black text-wadeal-muted">{coupon.id} · {audienceLabel[coupon.audience]}</p><h2 className="mt-1 text-base font-black text-wadeal-ink">{coupon.name}</h2><p className="mt-1 text-xs font-bold text-wadeal-muted">{coupon.startsAt} - {coupon.endsAt}</p></div><span className="rounded-full bg-gray-100 px-2 py-1 text-[11px] font-black text-gray-600">{coupon.status}</span></div><p className="mt-3 text-2xl font-black text-wadeal-red">{formatCouponDiscount(coupon)}</p><dl className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold"><div className="rounded-xl bg-gray-50 p-3"><dt className="text-wadeal-muted">최소 주문금액</dt><dd className="mt-1 text-wadeal-ink">{formatWon(coupon.minimumOrderAmount)}</dd></div><div className="rounded-xl bg-gray-50 p-3"><dt className="text-wadeal-muted">발급</dt><dd className="mt-1 text-wadeal-ink">{coupon.issuedCount}/{coupon.issueLimit}</dd></div><div className="rounded-xl bg-gray-50 p-3"><dt className="text-wadeal-muted">카테고리</dt><dd className="mt-1 text-wadeal-ink">{coupon.appliesTo.categories.join(", ")}</dd></div><div className="rounded-xl bg-gray-50 p-3"><dt className="text-wadeal-muted">상품</dt><dd className="mt-1 text-wadeal-ink">{coupon.appliesTo.products.length || "전체"}</dd></div></dl><form action={pauseAdminCouponAction} className="mt-3"><input name="couponId" type="hidden" value={coupon.id} /><button className="h-10 w-full rounded-xl border border-wadeal-line text-xs font-black text-wadeal-ink" type="submit">쿠폰 중지</button></form></article>)}
      </div>
      <BottomNavigation />
    </main>
  );
}

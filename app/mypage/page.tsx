import Link from "next/link";

import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import {
  accountCoupons,
  mockBuyerProfile,
  mypageSummary,
  pointBalance,
  recentViewDeals,
  wishlistDeals,
} from "@/lib/account";
import { mockCommercialOrders, orderStatusLabels } from "@/lib/order-status";
import { formatWon } from "@/lib/format";

const shortcutMenus = [
  ["개인정보 관리", "/mypage/profile", "이름, 연락처, 마케팅 수신"],
  ["배송지 관리", "/mypage/addresses", "기본 배송지와 요청사항"],
  ["결제수단 관리", "/mypage/payments", "Toss/PG 연결 준비"],
  ["쿠폰함", "/mypage/coupons", "사용 가능 쿠폰"],
  ["포인트", "/mypage/points", "적립/사용 내역"],
  ["고객센터", "/mypage/support", "문의와 도움말"],
];

export default function MypageHome() {
  const availableCoupons = accountCoupons.filter((coupon) => coupon.status === "available").length;

  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-wadeal-ink p-5 text-white">
          <p className="text-xs font-black text-red-200">My Wadeal</p>
          <div className="mt-3 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black">{mockBuyerProfile.name}님</h1>
              <p className="mt-1 text-sm font-bold text-gray-200">{mockBuyerProfile.nickname} · 구매자 계정</p>
            </div>
            <Link className="shrink-0 rounded-full bg-white px-3 py-2 text-xs font-black text-wadeal-ink" href="/mypage/profile">
              프로필 수정
            </Link>
          </div>
          <p className="mt-4 rounded-xl bg-white/10 p-3 text-xs font-bold leading-5 text-gray-200">
            로그인 사용자만 접근 가능하도록 서버 액션에서 userId를 검증합니다. Supabase 연결 전에는 mock auth.uid fallback을 사용합니다.
          </p>
        </section>

        <section className="grid grid-cols-4 gap-2">
          {[
            ["결제완료", mypageSummary.orderDelivery.paid],
            ["배송중", mypageSummary.orderDelivery.shipped],
            ["환불요청", mypageSummary.cancelRefund.refundRequested],
            ["환불완료", mypageSummary.cancelRefund.refunded],
          ].map(([label, value]) => (
            <Link className="rounded-2xl bg-gray-50 p-3 text-center" href="/mypage/orders" key={label}>
              <p className="text-xl font-black text-wadeal-red">{value}</p>
              <p className="mt-1 text-[11px] font-black text-wadeal-muted">{label}</p>
            </Link>
          ))}
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-wadeal-ink">주문/배송</h2>
            <Link className="text-xs font-black text-wadeal-red" href="/mypage/orders">전체보기</Link>
          </div>
          <div className="mt-3 space-y-2">
            {mockCommercialOrders.slice(0, 2).map((order) => (
              <Link className="block rounded-xl bg-gray-50 p-3" href={`/orders/${order.id}`} key={order.id}>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black text-wadeal-muted">{order.id}</p>
                  <span className="rounded-full bg-white px-2 py-1 text-[11px] font-black text-wadeal-red">{orderStatusLabels[order.status]}</span>
                </div>
                <p className="mt-2 text-sm font-black text-wadeal-ink">{order.items.join(" 외 ")}</p>
                <p className="mt-1 text-xs font-bold text-wadeal-muted">{formatWon(order.amount)}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-2">
          <Link className="rounded-2xl border border-wadeal-line p-4" href="/mypage/wishlist">
            <p className="text-sm font-black text-wadeal-ink">찜 목록</p>
            <p className="mt-2 text-2xl font-black text-wadeal-red">{wishlistDeals.length}</p>
          </Link>
          <Link className="rounded-2xl border border-wadeal-line p-4" href="/mypage/reviews">
            <p className="text-sm font-black text-wadeal-ink">리뷰 관리</p>
            <p className="mt-2 text-2xl font-black text-wadeal-red">2</p>
          </Link>
          <Link className="rounded-2xl border border-wadeal-line p-4" href="/mypage/coupons">
            <p className="text-sm font-black text-wadeal-ink">쿠폰함</p>
            <p className="mt-2 text-2xl font-black text-wadeal-red">{availableCoupons}</p>
          </Link>
          <Link className="rounded-2xl border border-wadeal-line p-4" href="/mypage/points">
            <p className="text-sm font-black text-wadeal-ink">포인트</p>
            <p className="mt-2 text-xl font-black text-wadeal-red">{formatWon(pointBalance)}</p>
          </Link>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">최근 본 상품</h2>
          <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar">
            {recentViewDeals.map((deal) => (
              <Link className="w-32 shrink-0" href={`/category/${deal.categorySlug}`} key={deal.id}>
                <div className="grid h-24 place-items-center rounded-xl bg-gray-100 text-5xl">{deal.image}</div>
                <p className="mt-2 line-clamp-2 text-xs font-black leading-4 text-wadeal-ink">{deal.title}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">나의 쇼핑 관리</h2>
          <div className="mt-3 divide-y divide-wadeal-line">
            {shortcutMenus.map(([label, href, description]) => (
              <Link className="flex items-center justify-between py-3" href={href} key={href}>
                <span>
                  <span className="block text-sm font-black text-wadeal-ink">{label}</span>
                  <span className="mt-1 block text-xs font-bold text-wadeal-muted">{description}</span>
                </span>
                <span className="text-gray-300">›</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <BottomNavigation />
    </main>
  );
}

import Link from "next/link";

import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import {
  favoriteDealIds,
  getDealsByIds,
  mockAddresses,
  mockOrders,
  mockPaymentMethods,
  mockPointBalance,
  recentViewDealIds,
} from "@/lib/buyer";
import { formatWon } from "@/lib/format";

const quickStats = [
  ["주문/배송", "2"],
  ["취소/환불", "1"],
  ["리뷰", "4"],
  ["쿠폰", "3"],
];

const managementMenus = [
  ["배송지 관리", "기본 배송지 1개 등록"],
  ["결제수단 관리", "Toss Payments 연결 준비"],
  ["쿠폰함", "사용 가능 쿠폰 1장"],
  ["포인트", `${formatWon(mockPointBalance)} 보유`],
  ["개인정보 관리", "이름, 연락처, 마케팅 수신 설정"],
];

export default function MyPage() {
  const favoriteDeals = getDealsByIds(favoriteDealIds);
  const recentDeals = getDealsByIds(recentViewDealIds);
  const defaultAddress = mockAddresses.find((address) => address.isDefault) ?? mockAddresses[0];

  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-wadeal-ink p-5 text-white">
          <p className="text-xs font-black text-red-200">My Wadeal</p>
          <div className="mt-3 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black">김가나님</h1>
              <p className="mt-1 text-sm font-bold text-gray-200">공동구매 멤버 · 구매자 모드</p>
            </div>
            <Link
              className="shrink-0 rounded-full bg-white px-3 py-2 text-xs font-black text-wadeal-ink"
              href="/checkout"
            >
              결제 이어가기
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-4 gap-2">
          {quickStats.map(([label, value]) => (
            <div className="rounded-2xl bg-gray-50 p-3 text-center" key={label}>
              <p className="text-xl font-black text-wadeal-red">{value}</p>
              <p className="mt-1 text-[11px] font-black text-wadeal-muted">{label}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-wadeal-ink">주문/배송 조회</h2>
            <span className="text-xs font-black text-wadeal-red">전체</span>
          </div>
          <div className="mt-3 space-y-3">
            {mockOrders.map((order) => (
              <article className="rounded-xl bg-gray-50 p-3" key={order.id}>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black text-wadeal-muted">{order.date}</p>
                  <span className="rounded-full bg-white px-2 py-1 text-[11px] font-black text-wadeal-red">
                    {order.status}
                  </span>
                </div>
                <p className="mt-2 text-sm font-black text-wadeal-ink">{order.items.join(" 외 ")}</p>
                <p className="mt-1 text-xs font-bold text-wadeal-muted">주문번호 {order.id}</p>
                <p className="mt-2 text-sm font-black text-wadeal-ink">{formatWon(order.total)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">취소/환불 내역</h2>
          <div className="mt-3 rounded-xl bg-gray-50 p-3">
            <p className="text-sm font-black text-wadeal-ink">프리미엄 한우 불고기 600g</p>
            <p className="mt-1 text-xs font-bold text-wadeal-muted">
              환불 요청 접수 · 관리자 승인 대기 UI
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-wadeal-ink">리뷰 관리</h2>
            <span className="text-xs font-black text-gray-400">작성 가능 2개</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {["작성 가능한 리뷰", "내가 쓴 리뷰"].map((label) => (
              <button className="rounded-xl bg-gray-50 p-3 text-sm font-black text-wadeal-ink" key={label} type="button">
                {label}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-wadeal-ink">찜 목록</h2>
            <Link className="text-xs font-black text-wadeal-red" href="/favorites">
              전체보기
            </Link>
          </div>
          <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar">
            {favoriteDeals.map((deal) => (
              <Link className="w-32 shrink-0" href={`/search?q=${encodeURIComponent(deal.title)}`} key={deal.id}>
                <div className="grid h-24 place-items-center rounded-xl bg-gray-100 text-5xl">{deal.image}</div>
                <p className="mt-2 line-clamp-2 text-xs font-black leading-4 text-wadeal-ink">{deal.title}</p>
                <p className="mt-1 text-xs font-black text-wadeal-red">{formatWon(deal.currentPrice)}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">최근 본 상품</h2>
          <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar">
            {recentDeals.map((deal) => (
              <Link className="w-32 shrink-0" href={`/category/${deal.categorySlug}`} key={deal.id}>
                <div className="grid h-24 place-items-center rounded-xl bg-gray-100 text-5xl">{deal.image}</div>
                <p className="mt-2 line-clamp-2 text-xs font-black leading-4 text-wadeal-ink">{deal.title}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">배송지/결제/개인정보</h2>
          <div className="mt-3 rounded-xl bg-red-50 p-3">
            <p className="text-sm font-black text-wadeal-red">기본 배송지</p>
            <p className="mt-1 text-xs font-bold leading-5 text-red-500">{defaultAddress.address}</p>
          </div>
          <div className="mt-3 divide-y divide-wadeal-line">
            {managementMenus.map(([label, description]) => (
              <button className="flex w-full items-center justify-between py-3 text-left" key={label} type="button">
                <span>
                  <span className="block text-sm font-black text-wadeal-ink">{label}</span>
                  <span className="mt-1 block text-xs font-bold text-wadeal-muted">{description}</span>
                </span>
                <span className="text-gray-300">›</span>
              </button>
            ))}
          </div>
          <p className="mt-3 rounded-xl bg-gray-50 p-3 text-xs font-bold text-wadeal-muted">
            결제수단 상태: {mockPaymentMethods[0].name} UI 준비 · 실제 저장은 Supabase 연결 후 활성화
          </p>
        </section>
      </div>
      <BottomNavigation />
    </main>
  );
}

import Link from "next/link";

import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import {
  getSellerAccess,
  sellerDashboardSummary,
  sellerNotifications,
  sellerOrders,
  sellerProfiles,
} from "@/lib/seller";
import { formatWon } from "@/lib/format";

const menu = [
  ["상품 관리", "/seller/products", "판매중/숨김/재고"],
  ["상품 등록 요청", "/seller/product-requests", "승인대기/반려/재요청"],
  ["주문 처리", "/seller/orders", "배송준비/송장/메모"],
  ["문의 관리", "/seller/support", "상품 문의 답변"],
  ["리뷰 관리", "/seller/reviews", "답글 작성/수정"],
  ["정산 관리", "/seller/settlements", "수수료/차감/입금"],
];

export default function SellerPage() {
  const access = getSellerAccess("approved");
  const summary = sellerDashboardSummary();
  const recentOrders = sellerOrders.slice(0, 3);
  const recentAlerts = sellerNotifications.slice(0, 4);

  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-wadeal-ink p-5 text-white">
          <p className="text-xs font-black text-red-200">Seller Center</p>
          <h1 className="mt-2 text-2xl font-black">{access.profile.name}</h1>
          <p className="mt-2 text-sm font-bold text-gray-200">{access.title} · {access.description}</p>
        </section>

        <section className="grid grid-cols-2 gap-2">
          {summary.map((item) => (
            <div className="rounded-2xl border border-wadeal-line bg-white p-4" key={item.label}>
              <p className="text-xs font-black text-wadeal-muted">{item.label}</p>
              <p className="mt-2 text-xl font-black text-wadeal-ink">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">상태별 접근 안내</h2>
          <div className="mt-3 grid gap-2">
            {Object.entries(sellerProfiles).map(([status]) => {
              const state = getSellerAccess(status as keyof typeof sellerProfiles);
              return (
                <div className="rounded-xl bg-gray-50 p-3" key={status}>
                  <div className="flex items-center justify-between"><p className="text-sm font-black text-wadeal-ink">{state.title}</p><span className={state.allowed ? "text-xs font-black text-emerald-600" : "text-xs font-black text-wadeal-red"}>{state.allowed ? "접근 가능" : "기능 제한"}</span></div>
                  <p className="mt-1 text-xs font-bold text-wadeal-muted">{state.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-2">
          {menu.map(([label, href, description]) => (
            <Link className="rounded-2xl bg-gray-50 p-4" href={href} key={href}>
              <span className="block text-sm font-black text-wadeal-ink">{label}</span>
              <span className="mt-1 block text-[11px] font-bold text-wadeal-muted">{description}</span>
            </Link>
          ))}
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <div className="flex items-center justify-between"><h2 className="text-base font-black text-wadeal-ink">최근 주문</h2><Link className="text-xs font-black text-wadeal-red" href="/seller/orders">전체</Link></div>
          <div className="mt-3 space-y-2">{recentOrders.map((order) => <Link className="block rounded-xl bg-gray-50 p-3" href={`/seller/orders/${order.id}`} key={order.id}><div className="flex items-center justify-between"><p className="text-xs font-black text-wadeal-muted">{order.id}</p><span className="text-xs font-black text-wadeal-red">{order.status}</span></div><p className="mt-2 text-sm font-black text-wadeal-ink">{order.product}</p><p className="mt-1 text-xs font-bold text-wadeal-muted">{order.buyer} · {formatWon(order.amount)}</p></Link>)}</div>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <div className="flex items-center justify-between"><h2 className="text-base font-black text-wadeal-ink">최근 알림</h2><Link className="text-xs font-black text-wadeal-red" href="/seller/notifications">전체</Link></div>
          <div className="mt-3 space-y-2">{recentAlerts.map((alert) => <div className="rounded-xl bg-red-50 p-3" key={alert.id}><p className="text-sm font-black text-wadeal-red">{alert.title}</p><p className="mt-1 text-xs font-bold text-red-500">{alert.message}</p></div>)}</div>
        </section>
      </div>
      <BottomNavigation />
    </main>
  );
}

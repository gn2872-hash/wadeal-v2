import Link from "next/link";

import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import { mockCommercialOrders, orderStatusLabels, paymentStatusLabels } from "@/lib/order-status";
import { formatWon } from "@/lib/format";

export default function MypageOrdersPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-wadeal-ink p-5 text-white"><p className="text-xs font-black text-red-200">Orders</p><h1 className="mt-2 text-2xl font-black">주문/배송 조회</h1></section>
        {mockCommercialOrders.map((order) => (
          <Link className="block rounded-2xl border border-wadeal-line bg-white p-4" href={`/orders/${order.id}`} key={order.id}>
            <div className="flex items-center justify-between"><p className="text-xs font-black text-wadeal-muted">{order.id}</p><span className="rounded-full bg-red-50 px-2 py-1 text-[11px] font-black text-wadeal-red">{orderStatusLabels[order.status]}</span></div>
            <h2 className="mt-2 text-sm font-black text-wadeal-ink">{order.items.join(" 외 ")}</h2>
            <p className="mt-1 text-xs font-bold text-wadeal-muted">결제 {paymentStatusLabels[order.paymentStatus]} · {order.seller}</p>
            <p className="mt-2 text-base font-black text-wadeal-ink">{formatWon(order.amount)}</p>
          </Link>
        ))}
      </div>
      <BottomNavigation />
    </main>
  );
}

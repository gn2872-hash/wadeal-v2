import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import { sellerNotifications } from "@/lib/seller";

const typeLabel = { order: "신규 주문", inquiry: "신규 문의", review: "신규 리뷰", refund: "환불 요청", product: "상품 승인/반려", settlement: "정산" } as const;

export default function SellerNotificationsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-wadeal-ink p-5 text-white">
          <p className="text-xs font-black text-red-200">Seller Notifications</p>
          <h1 className="mt-2 text-2xl font-black">판매자 알림</h1>
          <p className="mt-2 text-sm font-bold text-gray-200">주문, 문의, 리뷰, 환불, 상품 승인/반려, 정산 알림</p>
        </section>
        <section className="space-y-3">
          {sellerNotifications.map((item) => (
            <article className={`rounded-2xl border p-4 ${item.read ? "border-wadeal-line bg-white" : "border-red-100 bg-red-50"}`} key={item.id}>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white px-2 py-1 text-[11px] font-black text-wadeal-red">{typeLabel[item.type]}</span>
                <span className="text-[11px] font-bold text-wadeal-muted">{item.createdAt}</span>
              </div>
              <h2 className="mt-3 text-base font-black text-wadeal-ink">{item.title}</h2>
              <p className="mt-1 text-sm font-bold leading-5 text-wadeal-muted">{item.message}</p>
            </article>
          ))}
        </section>
      </div>
      <BottomNavigation />
    </main>
  );
}

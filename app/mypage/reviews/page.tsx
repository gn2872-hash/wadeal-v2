import Link from "next/link";

import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import { writableReviewItems, writtenReviews } from "@/lib/account";

export default function MypageReviewsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-wadeal-ink p-5 text-white"><p className="text-xs font-black text-red-200">Reviews</p><h1 className="mt-2 text-2xl font-black">리뷰 관리</h1><p className="mt-2 text-sm font-bold text-gray-200">구매 확정 후 15일 이내 작성 가능합니다.</p></section>
        <section className="rounded-2xl border border-wadeal-line bg-white p-4"><h2 className="text-base font-black text-wadeal-ink">작성 가능한 리뷰</h2><div className="mt-3 space-y-2">{writableReviewItems.map((item) => <div className="rounded-xl bg-gray-50 p-3" key={item.orderId}><p className="text-sm font-black text-wadeal-ink">{item.product}</p><p className="mt-1 text-xs font-bold text-wadeal-muted">마감 {item.deadline} · {item.status}</p><Link className="mt-3 block h-10 rounded-xl bg-wadeal-red text-center text-xs font-black leading-10 text-white" href="/products/jeju-tangerine-3kg?tab=reviews">리뷰 작성</Link></div>)}</div></section>
        <section className="rounded-2xl border border-wadeal-line bg-white p-4"><h2 className="text-base font-black text-wadeal-ink">내가 쓴 리뷰</h2><div className="mt-3 space-y-2">{writtenReviews.map((review) => <div className="rounded-xl bg-gray-50 p-3" key={review.id}><p className="text-sm font-black text-wadeal-ink">{review.product}</p><p className="mt-1 text-xs font-bold text-amber-500">★ {review.rating}.0</p><p className="mt-1 text-xs font-bold text-wadeal-muted">{review.content} · {review.date}</p></div>)}</div></section>
      </div>
      <BottomNavigation />
    </main>
  );
}

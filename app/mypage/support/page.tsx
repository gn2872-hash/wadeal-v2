import Link from "next/link";

import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";

export default function MypageSupportPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft"><Header /><div className="space-y-4 px-4 pt-4 pb-8"><section className="rounded-2xl bg-wadeal-ink p-5 text-white"><p className="text-xs font-black text-red-200">Support</p><h1 className="mt-2 text-2xl font-black">고객센터</h1><p className="mt-2 text-sm font-bold text-gray-200">주문/환불/상품 문의와 연결될 고객센터 준비 화면입니다.</p></section>{["주문/배송 문의", "취소/환불 문의", "상품 문의", "계정/보안 문의"].map((label) => <Link className="block rounded-2xl border border-wadeal-line bg-white p-4 text-sm font-black text-wadeal-ink" href="/mypage/orders" key={label}>{label}<span className="float-right text-gray-300">›</span></Link>)}</div><BottomNavigation /></main>
  );
}

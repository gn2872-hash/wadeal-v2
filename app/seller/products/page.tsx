import Link from "next/link";

import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import { sellerProducts } from "@/lib/seller";
import { formatWon } from "@/lib/format";
import { getProductSlugByDealId } from "@/lib/products";

export default function SellerProductsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft"><Header /><div className="space-y-4 px-4 pt-4 pb-8"><section className="rounded-2xl bg-wadeal-ink p-5 text-white"><p className="text-xs font-black text-red-200">Seller Products</p><h1 className="mt-2 text-2xl font-black">상품 관리</h1><p className="mt-2 text-sm font-bold text-gray-200">본인 판매 상품만 조회되는 fallback 구조입니다.</p></section>{sellerProducts.map((product)=><article className="rounded-2xl border border-wadeal-line bg-white p-4" key={product.id}><div className="flex items-start justify-between gap-3"><div><p className="text-[11px] font-black text-wadeal-muted">{product.id} · {product.status}</p><h2 className="mt-1 text-base font-black text-wadeal-ink">{product.title}</h2><p className="mt-1 text-xs font-bold text-wadeal-muted">재고 {product.stock}개 · 참여 {product.participants}명</p></div><p className="text-sm font-black text-wadeal-red">{formatWon(product.price)}</p></div><div className="mt-3 grid grid-cols-2 gap-2"><Link className="h-10 rounded-xl bg-wadeal-red text-center text-xs font-black leading-10 text-white" href={`/products/${getProductSlugByDealId(product.dealId)}`}>상품 보기</Link><button className="h-10 rounded-xl border border-wadeal-line text-xs font-black text-wadeal-ink" type="button">재고/숨김 관리</button></div></article>)}</div><BottomNavigation /></main>
  );
}

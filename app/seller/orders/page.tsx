import Link from "next/link";

import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import { sellerOrders, type SellerOrderStatus } from "@/lib/seller";
import { formatWon } from "@/lib/format";

type Props = { searchParams?: Promise<Record<string, string | string[] | undefined>> };
const filters: Array<[SellerOrderStatus | "all", string]> = [["all","전체"],["new","신규"],["preparing","배송준비"],["shipping","배송중"],["delivered","배송완료"],["confirmed","구매확정"],["refund_requested","환불요청"]];
function param(p: Record<string,string|string[]|undefined>, k:string){ const v=p[k]; return Array.isArray(v)?v[0]??"":v??""; }

export default async function SellerOrdersPage({ searchParams }: Props) {
  const query = (await searchParams) ?? {};
  const status = (param(query, 'status') || 'all') as SellerOrderStatus | 'all';
  const orders = status === 'all' ? sellerOrders : sellerOrders.filter((order)=>order.status===status);
  return <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft"><Header /><div className="space-y-4 px-4 pt-4 pb-8"><section className="rounded-2xl bg-wadeal-ink p-5 text-white"><p className="text-xs font-black text-red-200">Seller Orders</p><h1 className="mt-2 text-2xl font-black">주문 처리</h1><p className="mt-2 text-sm font-bold text-gray-200">상태별 필터, 송장, 메모, 구매확정 확인</p></section><nav className="flex gap-2 overflow-x-auto no-scrollbar">{filters.map(([value,label])=><Link className={`shrink-0 rounded-full px-3 py-2 text-xs font-black ${status===value?'bg-wadeal-red text-white':'bg-gray-100 text-gray-600'}`} href={value==='all'?'/seller/orders':`/seller/orders?status=${value}`} key={value}>{label}</Link>)}</nav><section className="space-y-3">{orders.map((order)=><Link className="block rounded-2xl border border-wadeal-line bg-white p-4" href={`/seller/orders/${order.id}`} key={order.id}><div className="flex items-start justify-between gap-3"><div><p className="text-[11px] font-black text-wadeal-muted">{order.id} · {order.orderedAt}</p><h2 className="mt-1 text-base font-black text-wadeal-ink">{order.product}</h2><p className="mt-1 text-xs font-bold text-wadeal-muted">{order.buyer} · 수량 {order.quantity} · {formatWon(order.amount)}</p></div><span className="rounded-full bg-red-50 px-2 py-1 text-[11px] font-black text-wadeal-red">{order.status}</span></div></Link>)}</section></div><BottomNavigation /></main>;
}

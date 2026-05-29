import Link from "next/link";
import { notFound } from "next/navigation";

import { submitProductRequestAction } from "@/app/actions/operations";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import { getProductRequest, productRequests } from "@/lib/operations";
import { formatWon } from "@/lib/format";

type SellerRequestDetailProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return productRequests.map((request) => ({ id: request.id }));
}

export default async function SellerRequestDetailPage({ params }: SellerRequestDetailProps) {
  const { id } = await params;
  const request = getProductRequest(id);

  if (!request) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-wadeal-ink p-5 text-white">
          <p className="text-xs font-black text-red-200">Product Request</p>
          <h1 className="mt-2 text-2xl font-black">상품 등록 요청 상세</h1>
          <p className="mt-2 text-sm font-bold text-gray-200">{request.id} · {request.requestedAt}</p>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <p className="text-xs font-black text-wadeal-red">{request.category}</p>
          <h2 className="mt-2 text-xl font-black leading-7 text-wadeal-ink">{request.title}</h2>
          <p className="mt-2 text-sm font-bold text-wadeal-muted">{request.memo}</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm font-bold">
            <div className="rounded-xl bg-gray-50 p-3"><dt className="text-wadeal-muted">요청가</dt><dd className="mt-1 text-wadeal-ink">{formatWon(request.requestedPrice)}</dd></div>
            <div className="rounded-xl bg-gray-50 p-3"><dt className="text-wadeal-muted">최저가</dt><dd className="mt-1 text-wadeal-red">{formatWon(request.lowestPrice)}</dd></div>
            <div className="rounded-xl bg-gray-50 p-3"><dt className="text-wadeal-muted">목표인원</dt><dd className="mt-1 text-wadeal-ink">{request.targetParticipants}명</dd></div>
            <div className="rounded-xl bg-gray-50 p-3"><dt className="text-wadeal-muted">상태</dt><dd className="mt-1 text-wadeal-ink">{request.status}</dd></div>
          </dl>
        </section>

        <form action={submitProductRequestAction} className="rounded-2xl border border-wadeal-line bg-white p-4">
          <input name="requestId" type="hidden" value={request.id} />
          <h2 className="text-base font-black text-wadeal-ink">요청 보완 메모</h2>
          <textarea className="mt-3 min-h-28 w-full rounded-xl bg-gray-50 p-3 text-sm font-bold outline-none" name="memo" defaultValue={request.memo} />
          <button className="mt-3 h-11 w-full rounded-xl bg-wadeal-red text-sm font-black text-white" type="submit">판매자 요청 저장</button>
        </form>

        <Link className="block text-center text-sm font-black text-wadeal-red" href="/seller">
          판매자 센터로 돌아가기
        </Link>
      </div>
      <BottomNavigation />
    </main>
  );
}

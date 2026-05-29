import Link from "next/link";

import {
  answerInquiryAction,
  replyReviewAction,
  updateDeliveryStatusAction,
  updateInvoiceAction,
} from "@/app/actions/operations";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import { canAccessSeller, canAccessAdmin, getMockUser } from "@/lib/auth/roles";
import {
  inquiries,
  notices,
  productRequests,
  sellerAlerts,
  sellerOrders,
  sellerReviews,
  sellerStats,
  settlements,
} from "@/lib/operations";
import { formatWon } from "@/lib/format";

const statusLabels: Record<string, string> = {
  pending: "승인대기",
  approved: "승인완료",
  rejected: "반려",
  paid: "결제완료",
  ready: "배송대기",
  shipping: "배송중",
  delivered: "배송완료",
  refund_requested: "환불요청",
  waiting: "답변대기",
  answered: "답변완료",
  scheduled: "정산예정",
  hold: "보류",
};

function StatusBadge({ status }: { status: string }) {
  const red = ["pending", "ready", "refund_requested", "waiting", "scheduled"].includes(status);
  return (
    <span className={`rounded-full px-2 py-1 text-[11px] font-black ${red ? "bg-red-50 text-wadeal-red" : "bg-gray-100 text-gray-600"}`}>
      {statusLabels[status] ?? status}
    </span>
  );
}

export default function SellerPage() {
  const sellerUser = getMockUser("seller");
  const sellerAccess = canAccessSeller(sellerUser);
  const buyerBlocked = canAccessSeller(getMockUser("buyer"));
  const pendingBlocked = canAccessSeller(getMockUser("pendingSeller"));
  const sellerAdminBlocked = canAccessAdmin(sellerUser);

  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-wadeal-ink p-5 text-white">
          <p className="text-xs font-black text-red-200">Seller Center</p>
          <h1 className="mt-2 text-2xl font-black">판매자 모드</h1>
          <p className="mt-2 text-sm font-medium leading-5 text-gray-200">
            상품 등록부터 주문, 배송, 리뷰, 문의, 정산까지 한 화면에서 처리합니다.
          </p>
          <div className="mt-4 rounded-xl bg-white/10 p-3 text-xs font-bold text-gray-200">
            권한 상태: {sellerAccess.title} · {sellerAccess.description}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-2">
          {sellerStats.map((stat) => (
            <div className="rounded-2xl border border-wadeal-line bg-white p-4" key={stat.label}>
              <p className="text-xs font-black text-wadeal-muted">{stat.label}</p>
              <p className="mt-2 text-xl font-black text-wadeal-ink">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">권한 보안 체크</h2>
          <div className="mt-3 grid gap-2 text-xs font-bold">
            {[
              ["buyer -> seller", buyerBlocked.allowed ? "위험" : "차단"],
              ["미승인 seller -> seller", pendingBlocked.allowed ? "위험" : "제한"],
              ["seller -> admin", sellerAdminBlocked.allowed ? "위험" : "차단"],
              ["서버 액션", "역할 검증 적용"],
            ].map(([label, value]) => (
              <div className="flex justify-between rounded-xl bg-gray-50 p-3" key={label}>
                <span className="text-wadeal-muted">{label}</span>
                <span className="text-wadeal-red">{value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-wadeal-ink">상품 등록 요청</h2>
            <span className="text-xs font-black text-wadeal-red">{productRequests.length}건</span>
          </div>
          <div className="mt-3 space-y-3">
            {productRequests.map((request) => (
              <article className="rounded-xl bg-gray-50 p-3" key={request.id}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-black text-wadeal-muted">{request.id} · {request.category}</p>
                    <h3 className="mt-1 line-clamp-2 text-sm font-black text-wadeal-ink">{request.title}</h3>
                    <p className="mt-1 text-xs font-bold text-wadeal-muted">목표 {request.targetParticipants}명 · 최저 {formatWon(request.lowestPrice)}</p>
                  </div>
                  <StatusBadge status={request.status} />
                </div>
                <Link className="mt-3 block h-10 rounded-xl bg-white text-center text-xs font-black leading-10 text-wadeal-red" href={`/seller/requests/${request.id}`}>
                  상세 보기
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">주문 관리 / 송장 입력</h2>
          <div className="mt-3 space-y-3">
            {sellerOrders.map((order) => (
              <article className="rounded-xl bg-gray-50 p-3" key={order.id}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-black text-wadeal-muted">{order.id} · {order.orderedAt}</p>
                    <h3 className="mt-1 line-clamp-2 text-sm font-black text-wadeal-ink">{order.item}</h3>
                    <p className="mt-1 text-xs font-bold text-wadeal-muted">{order.buyer} · 수량 {order.quantity} · {formatWon(order.amount)}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
                <form action={updateInvoiceAction} className="mt-3 grid grid-cols-[1fr_72px] gap-2">
                  <input name="orderId" type="hidden" value={order.id} />
                  <input className="h-10 rounded-xl bg-white px-3 text-xs font-bold outline-none" defaultValue={order.invoice ?? ""} name="invoice" placeholder="송장번호 입력" />
                  <button className="rounded-xl bg-wadeal-red text-xs font-black text-white" type="submit">저장</button>
                </form>
                <form action={updateDeliveryStatusAction} className="mt-2 grid grid-cols-[1fr_72px] gap-2">
                  <input name="orderId" type="hidden" value={order.id} />
                  <select className="h-10 rounded-xl bg-white px-3 text-xs font-bold outline-none" name="status" defaultValue={order.status}>
                    <option value="ready">배송대기</option>
                    <option value="shipping">배송중</option>
                    <option value="delivered">배송완료</option>
                  </select>
                  <button className="rounded-xl border border-wadeal-line bg-white text-xs font-black text-wadeal-ink" type="submit">변경</button>
                </form>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">리뷰 답글 관리</h2>
          <div className="mt-3 space-y-3">
            {sellerReviews.map((review) => (
              <article className="rounded-xl bg-gray-50 p-3" key={review.id}>
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="text-xs font-black text-amber-500">★ {review.rating}.0</p>
                    <h3 className="mt-1 text-sm font-black text-wadeal-ink">{review.item}</h3>
                  </div>
                  {review.reported ? <StatusBadge status="refund_requested" /> : null}
                </div>
                <p className="mt-2 text-sm font-bold leading-5 text-wadeal-muted">{review.content}</p>
                <form action={replyReviewAction} className="mt-3 space-y-2">
                  <input name="reviewId" type="hidden" value={review.id} />
                  <textarea className="min-h-20 w-full rounded-xl bg-white p-3 text-xs font-bold outline-none" defaultValue={review.reply ?? ""} name="reply" placeholder="판매자 답글 작성" />
                  <div className="grid grid-cols-3 gap-2">
                    <button className="h-10 rounded-xl bg-wadeal-red text-xs font-black text-white" type="submit">저장</button>
                    <button className="h-10 rounded-xl border border-wadeal-line bg-white text-xs font-black text-wadeal-ink" type="button">수정</button>
                    <button className="h-10 rounded-xl border border-wadeal-line bg-white text-xs font-black text-gray-400" type="button">삭제</button>
                  </div>
                </form>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">고객 문의 답변</h2>
          <div className="mt-3 space-y-3">
            {inquiries.map((inquiry) => (
              <article className="rounded-xl bg-gray-50 p-3" key={inquiry.id}>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black text-wadeal-muted">{inquiry.id} · {inquiry.customer}</p>
                  <StatusBadge status={inquiry.status} />
                </div>
                <h3 className="mt-2 text-sm font-black text-wadeal-ink">{inquiry.item}</h3>
                <p className="mt-1 text-sm font-bold text-wadeal-muted">Q. {inquiry.question}</p>
                <form action={answerInquiryAction} className="mt-3 grid gap-2">
                  <input name="inquiryId" type="hidden" value={inquiry.id} />
                  <textarea className="min-h-16 rounded-xl bg-white p-3 text-xs font-bold outline-none" defaultValue={inquiry.answer ?? ""} name="answer" placeholder="답변 입력" />
                  <button className="h-10 rounded-xl bg-wadeal-red text-xs font-black text-white" type="submit">답변 저장</button>
                </form>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">정산 내역</h2>
          <div className="mt-3 space-y-3">
            {settlements.map((settlement) => (
              <article className="rounded-xl bg-gray-50 p-3" key={settlement.id}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-black text-wadeal-ink">{settlement.period}</p>
                  <StatusBadge status={settlement.status} />
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold">
                  <div><dt className="text-wadeal-muted">매출</dt><dd className="mt-1 text-wadeal-ink">{formatWon(settlement.sales)}</dd></div>
                  <div><dt className="text-wadeal-muted">수수료</dt><dd className="mt-1 text-wadeal-ink">{formatWon(settlement.fee)}</dd></div>
                  <div><dt className="text-wadeal-muted">환불 보류</dt><dd className="mt-1 text-wadeal-ink">{formatWon(settlement.refundHold)}</dd></div>
                  <div><dt className="text-wadeal-muted">지급액</dt><dd className="mt-1 text-wadeal-red">{formatWon(settlement.payout)}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-wadeal-line bg-white p-4">
            <h2 className="text-base font-black text-wadeal-ink">공지사항</h2>
            <div className="mt-3 space-y-2">
              {notices.map((notice) => <p className="rounded-xl bg-gray-50 p-3 text-xs font-bold text-wadeal-muted" key={notice}>{notice}</p>)}
            </div>
          </div>
          <div className="rounded-2xl border border-wadeal-line bg-white p-4">
            <h2 className="text-base font-black text-wadeal-ink">판매자 알림</h2>
            <div className="mt-3 space-y-2">
              {sellerAlerts.map((alert) => <p className="rounded-xl bg-red-50 p-3 text-xs font-bold text-wadeal-red" key={alert}>{alert}</p>)}
            </div>
          </div>
        </section>
      </div>
      <BottomNavigation />
    </main>
  );
}

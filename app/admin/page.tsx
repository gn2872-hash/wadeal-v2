import {
  moderateProductRequestAction,
  moderateRefundAction,
  moderateSellerAction,
  resolveReportAction,
} from "@/app/actions/operations";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import { canAccessAdmin, canAccessSeller, getMockUser } from "@/lib/auth/roles";
import {
  adminStats,
  banners,
  categoriesForAdmin,
  inquiries,
  productRequests,
  refundRequests,
  reports,
  sellerApplications,
  sellerOrders,
  settlements,
} from "@/lib/operations";
import { formatWon } from "@/lib/format";

const statusLabels: Record<string, string> = {
  pending: "승인대기",
  approved: "승인",
  rejected: "반려",
  suspended: "정지",
  ready: "배송대기",
  shipping: "배송중",
  delivered: "배송완료",
  refund_requested: "환불요청",
  open: "처리대기",
  resolved: "처리완료",
  scheduled: "예정",
  paid: "지급완료",
  hold: "보류",
  active: "사용중",
  draft: "준비중",
  live: "노출중",
};

function Badge({ status }: { status: string }) {
  const important = ["pending", "refund_requested", "open", "scheduled", "draft"].includes(status);
  return (
    <span className={`rounded-full px-2 py-1 text-[11px] font-black ${important ? "bg-red-50 text-wadeal-red" : "bg-gray-100 text-gray-600"}`}>
      {statusLabels[status] ?? status}
    </span>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-dashed border-wadeal-line p-5 text-center">
      <p className="text-sm font-black text-wadeal-ink">{label}</p>
      <p className="mt-1 text-xs font-bold text-wadeal-muted">DB 연결 후 실시간 데이터로 대체됩니다.</p>
    </div>
  );
}

export default function AdminPage() {
  const adminUser = getMockUser("admin");
  const adminAccess = canAccessAdmin(adminUser);
  const buyerAdminBlocked = canAccessAdmin(getMockUser("buyer"));
  const sellerAdminBlocked = canAccessAdmin(getMockUser("seller"));
  const pendingSellerBlocked = canAccessSeller(getMockUser("pendingSeller"));

  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-wadeal-ink p-5 text-white">
          <p className="text-xs font-black text-red-200">Admin Console</p>
          <h1 className="mt-2 text-2xl font-black">관리자 모드</h1>
          <p className="mt-2 text-sm font-medium leading-5 text-gray-200">
            상품 승인, 판매자 관리, 주문/환불/정산, 카테고리와 이벤트를 운영합니다.
          </p>
          <div className="mt-4 rounded-xl bg-white/10 p-3 text-xs font-bold text-gray-200">
            권한 상태: {adminAccess.title} · {adminAccess.description}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-2">
          {adminStats.map((stat) => (
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
              ["buyer -> admin", buyerAdminBlocked.allowed ? "위험" : "차단"],
              ["seller -> admin", sellerAdminBlocked.allowed ? "위험" : "차단"],
              ["미승인 seller -> seller", pendingSellerBlocked.allowed ? "위험" : "제한"],
              ["서버 액션", "admin 검증 적용"],
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
            <h2 className="text-base font-black text-wadeal-ink">상품 등록 요청 승인/반려</h2>
            <Badge status="pending" />
          </div>
          <div className="mt-3 space-y-3">
            {productRequests.length > 0 ? productRequests.map((request) => (
              <article className="rounded-xl bg-gray-50 p-3" key={request.id}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-black text-wadeal-muted">{request.id} · {request.seller}</p>
                    <h3 className="mt-1 line-clamp-2 text-sm font-black text-wadeal-ink">{request.title}</h3>
                    <p className="mt-1 text-xs font-bold text-wadeal-muted">{request.category} · 최저 {formatWon(request.lowestPrice)}</p>
                  </div>
                  <Badge status={request.status} />
                </div>
                <form action={moderateProductRequestAction} className="mt-3 grid grid-cols-2 gap-2">
                  <input name="requestId" type="hidden" value={request.id} />
                  <button className="h-10 rounded-xl bg-wadeal-red text-xs font-black text-white" name="decision" type="submit" value="approve">승인</button>
                  <button className="h-10 rounded-xl border border-wadeal-line bg-white text-xs font-black text-wadeal-ink" name="decision" type="submit" value="reject">반려</button>
                </form>
              </article>
            )) : <EmptyState label="승인 대기 상품이 없습니다" />}
          </div>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">판매자 입점 승인/정지</h2>
          <div className="mt-3 space-y-3">
            {sellerApplications.map((seller) => (
              <article className="rounded-xl bg-gray-50 p-3" key={seller.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-black text-wadeal-muted">{seller.id} · {seller.requestedAt}</p>
                    <h3 className="mt-1 text-sm font-black text-wadeal-ink">{seller.seller}</h3>
                    <p className="mt-1 text-xs font-bold text-wadeal-muted">대표 {seller.representative} · {seller.riskMemo}</p>
                  </div>
                  <Badge status={seller.status} />
                </div>
                <form action={moderateSellerAction} className="mt-3 grid grid-cols-3 gap-2">
                  <input name="sellerId" type="hidden" value={seller.id} />
                  <button className="h-10 rounded-xl bg-wadeal-red text-xs font-black text-white" name="decision" type="submit" value="approve">승인</button>
                  <button className="h-10 rounded-xl border border-wadeal-line bg-white text-xs font-black text-wadeal-ink" name="decision" type="submit" value="reject">반려</button>
                  <button className="h-10 rounded-xl border border-wadeal-line bg-white text-xs font-black text-gray-500" name="decision" type="submit" value="suspend">정지</button>
                </form>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">주문 상세 관리</h2>
          <div className="mt-3 space-y-3">
            {sellerOrders.map((order) => (
              <article className="rounded-xl bg-gray-50 p-3" key={order.id}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-black text-wadeal-muted">{order.id} · {order.buyer}</p>
                    <h3 className="mt-1 line-clamp-2 text-sm font-black text-wadeal-ink">{order.item}</h3>
                    <p className="mt-1 text-xs font-bold text-wadeal-muted">수량 {order.quantity} · {formatWon(order.amount)} · 송장 {order.invoice ?? "미입력"}</p>
                  </div>
                  <Badge status={order.status} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">환불 요청 승인/반려</h2>
          <div className="mt-3 space-y-3">
            {refundRequests.map((refund) => (
              <article className="rounded-xl bg-gray-50 p-3" key={refund.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-black text-wadeal-muted">{refund.id} · {refund.orderId}</p>
                    <h3 className="mt-1 text-sm font-black text-wadeal-ink">{refund.buyer} · {formatWon(refund.amount)}</h3>
                    <p className="mt-1 text-xs font-bold text-wadeal-muted">{refund.reason}</p>
                  </div>
                  <Badge status={refund.status} />
                </div>
                <form action={moderateRefundAction} className="mt-3 grid grid-cols-2 gap-2">
                  <input name="refundId" type="hidden" value={refund.id} />
                  <button className="h-10 rounded-xl bg-wadeal-red text-xs font-black text-white" name="decision" type="submit" value="approve">환불 승인</button>
                  <button className="h-10 rounded-xl border border-wadeal-line bg-white text-xs font-black text-wadeal-ink" name="decision" type="submit" value="reject">반려</button>
                </form>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">리뷰/신고 관리</h2>
          <div className="mt-3 space-y-3">
            {reports.map((report) => (
              <article className="rounded-xl bg-gray-50 p-3" key={report.id}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-black text-wadeal-ink">{report.target}</p>
                  <Badge status={report.status} />
                </div>
                <p className="mt-1 text-xs font-bold text-wadeal-muted">{report.type} · {report.reason}</p>
                <form action={resolveReportAction} className="mt-3">
                  <input name="reportId" type="hidden" value={report.id} />
                  <button className="h-10 w-full rounded-xl bg-wadeal-red text-xs font-black text-white" type="submit">처리 완료</button>
                </form>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">고객센터 문의 관리</h2>
          <div className="mt-3 space-y-2">
            {inquiries.map((inquiry) => (
              <div className="rounded-xl bg-gray-50 p-3" key={inquiry.id}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-black text-wadeal-ink">{inquiry.customer}</p>
                  <Badge status={inquiry.status} />
                </div>
                <p className="mt-1 text-xs font-bold text-wadeal-muted">{inquiry.question}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">정산 관리</h2>
          <div className="mt-3 space-y-3">
            {settlements.map((settlement) => (
              <article className="rounded-xl bg-gray-50 p-3" key={settlement.id}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-black text-wadeal-ink">{settlement.id}</p>
                  <Badge status={settlement.status} />
                </div>
                <p className="mt-1 text-xs font-bold text-wadeal-muted">{settlement.period}</p>
                <p className="mt-2 text-lg font-black text-wadeal-red">지급 {formatWon(settlement.payout)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">카테고리 관리</h2>
          <div className="mt-3 grid gap-2">
            {categoriesForAdmin.map((category) => (
              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3" key={category.name}>
                <div>
                  <p className="text-sm font-black text-wadeal-ink">{category.name}</p>
                  <p className="mt-1 text-xs font-bold text-wadeal-muted">하위 {category.children}개</p>
                </div>
                <Badge status={category.status} />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">배너/이벤트 관리</h2>
          <div className="mt-3 space-y-2">
            {banners.map((banner) => (
              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3" key={banner.id}>
                <div>
                  <p className="text-sm font-black text-wadeal-ink">{banner.title}</p>
                  <p className="mt-1 text-xs font-bold text-wadeal-muted">{banner.id}</p>
                </div>
                <Badge status={banner.status} />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">공지사항 관리</h2>
          <textarea className="mt-3 min-h-24 w-full rounded-xl bg-gray-50 p-3 text-sm font-bold outline-none" defaultValue="판매자 센터 정산 정책 변경 안내" />
          <button className="mt-3 h-11 w-full rounded-xl bg-wadeal-red text-sm font-black text-white" type="button">공지 저장</button>
        </section>
      </div>
      <BottomNavigation />
    </main>
  );
}

import { deals } from "@/lib/deals";
import { formatWon } from "@/lib/format";

export type SellerStatus = "pending" | "approved" | "rejected" | "suspended";
export type SellerOrderStatus = "new" | "preparing" | "shipping" | "delivered" | "confirmed" | "refund_requested";
export type SellerRequestStatus = "draft" | "pending" | "approved" | "rejected";
export type SellerNotificationType = "order" | "inquiry" | "review" | "refund" | "product" | "settlement";

export type SellerProfile = {
  id: string;
  name: string;
  status: SellerStatus;
  representative: string;
  bankAccount: string;
  settlementCycle: string;
};

export type SellerProductRequest = {
  id: string;
  sellerId: string;
  title: string;
  category: string;
  salePrice: number;
  targetParticipants: number;
  discountTiers: { participants: number; price: number }[];
  representativeImage: string;
  detailImages: string[];
  stock: number;
  options: string[];
  deliveryInfo: string;
  status: SellerRequestStatus;
  rejectionReason?: string;
  updatedAt: string;
};

export type SellerProduct = {
  id: string;
  sellerId: string;
  dealId: number;
  title: string;
  status: "selling" | "sold_out" | "hidden";
  stock: number;
  price: number;
  participants: number;
};

export type SellerOrder = {
  id: string;
  sellerId: string;
  buyer: string;
  product: string;
  quantity: number;
  amount: number;
  status: SellerOrderStatus;
  invoice?: string;
  memo?: string;
  orderedAt: string;
};

export type SellerInquiry = {
  id: string;
  sellerId: string;
  product: string;
  buyer: string;
  question: string;
  answer?: string;
  status: "waiting" | "answered";
  createdAt: string;
};

export type SellerReview = {
  id: string;
  sellerId: string;
  product: string;
  buyer: string;
  rating: number;
  content: string;
  reply?: string;
  createdAt: string;
};

export type SellerRefund = {
  id: string;
  sellerId: string;
  orderId: string;
  product: string;
  amount: number;
  reason: string;
  adminStatus: "pending" | "approved" | "rejected";
};

export type SellerSettlement = {
  id: string;
  sellerId: string;
  orderId: string;
  product: string;
  sales: number;
  fee: number;
  shippingFee: number;
  refundDeduction: number;
  payout: number;
  status: "scheduled" | "confirmed" | "paid" | "hold";
};

export type SellerNotification = {
  id: string;
  sellerId: string;
  type: SellerNotificationType;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
};

export const sellerProfiles: Record<SellerStatus, SellerProfile> = {
  approved: { id: "seller-1", name: "제주하루농장", status: "approved", representative: "김제주", bankAccount: "국민 123456-01-123456", settlementCycle: "매주 금요일" },
  pending: { id: "seller-2", name: "입점대기상점", status: "pending", representative: "박대기", bankAccount: "미등록", settlementCycle: "승인 후 설정" },
  rejected: { id: "seller-3", name: "반려상점", status: "rejected", representative: "이반려", bankAccount: "미등록", settlementCycle: "재심사 필요" },
  suspended: { id: "seller-4", name: "정지상점", status: "suspended", representative: "최정지", bankAccount: "보류", settlementCycle: "정산 보류" },
};

export const sellerProductRequests: SellerProductRequest[] = [
  {
    id: "SPR-1001",
    sellerId: "seller-1",
    title: "제주 감귤 5kg 프리미엄 박스",
    category: "식품 > 과일",
    salePrice: 23900,
    targetParticipants: 150,
    discountTiers: [{ participants: 50, price: 22900 }, { participants: 100, price: 20900 }, { participants: 150, price: 19900 }],
    representativeImage: "🍊",
    detailImages: ["📦", "🌿", "🚚"],
    stock: 300,
    options: ["소과", "중과", "혼합"],
    deliveryInfo: "제주 산지 직송, 공동구매 마감 후 24시간 내 출고",
    status: "pending",
    updatedAt: "2026.05.29 08:10",
  },
  {
    id: "SPR-1000",
    sellerId: "seller-1",
    title: "못난이 감귤 실속형 3kg",
    category: "식품 > 과일",
    salePrice: 12900,
    targetParticipants: 200,
    discountTiers: [{ participants: 100, price: 11900 }, { participants: 200, price: 9900 }],
    representativeImage: "🍊",
    detailImages: ["📦"],
    stock: 0,
    options: ["3kg"],
    deliveryInfo: "무료배송",
    status: "rejected",
    rejectionReason: "상세 이미지에 원산지 표시가 부족합니다.",
    updatedAt: "2026.05.28 17:45",
  },
  {
    id: "SPR-0999",
    sellerId: "seller-1",
    title: "제주 한라봉 선물세트",
    category: "식품 > 과일",
    salePrice: 39900,
    targetParticipants: 80,
    discountTiers: [{ participants: 40, price: 36900 }, { participants: 80, price: 33900 }],
    representativeImage: "🍊",
    detailImages: ["🎁", "📦"],
    stock: 120,
    options: ["기본", "선물포장"],
    deliveryInfo: "선물 포장 선택 가능",
    status: "approved",
    updatedAt: "2026.05.27 12:20",
  },
];

export const sellerProducts: SellerProduct[] = deals.slice(0, 4).map((deal, index) => ({
  id: `SP-${deal.id}`,
  sellerId: "seller-1",
  dealId: deal.id,
  title: deal.title,
  status: index === 3 ? "hidden" : "selling",
  stock: Math.max(0, deal.targetParticipants - deal.participants),
  price: deal.currentPrice,
  participants: deal.participants,
}));

export const sellerOrders: SellerOrder[] = [
  { id: "SO-20260529-001", sellerId: "seller-1", buyer: "김가나", product: "제주 감귤 3kg 산지직송", quantity: 2, amount: 29800, status: "new", orderedAt: "2026.05.29 08:31" },
  { id: "SO-20260529-002", sellerId: "seller-1", buyer: "박하루", product: "제주 감귤 3kg 산지직송", quantity: 1, amount: 14900, status: "preparing", memo: "선물용, 포장 상태 확인", orderedAt: "2026.05.29 09:12" },
  { id: "SO-20260528-088", sellerId: "seller-1", buyer: "이로운", product: "성수동 디카페인 콜드브루 12병", quantity: 1, amount: 23900, status: "shipping", invoice: "CJ1234567890", orderedAt: "2026.05.28 16:40" },
  { id: "SO-20260527-044", sellerId: "seller-1", buyer: "최민", product: "제주 감귤 3kg 산지직송", quantity: 1, amount: 14900, status: "confirmed", orderedAt: "2026.05.27 14:05" },
  { id: "SO-20260527-033", sellerId: "seller-1", buyer: "한리뷰", product: "제주 감귤 3kg 산지직송", quantity: 1, amount: 14900, status: "refund_requested", memo: "배송 지연 문의 후 환불 요청", orderedAt: "2026.05.27 10:15" },
];

export const sellerInquiries: SellerInquiry[] = [
  { id: "SI-301", sellerId: "seller-1", product: "제주 감귤 3kg 산지직송", buyer: "김가나", question: "배송일 지정 가능한가요?", status: "waiting", createdAt: "2026.05.29 08:40" },
  { id: "SI-300", sellerId: "seller-1", product: "제주 감귤 3kg 산지직송", buyer: "박하루", question: "선물 포장 되나요?", answer: "현재 상품은 기본 포장만 가능합니다.", status: "answered", createdAt: "2026.05.28 20:10" },
];

export const sellerReviews: SellerReview[] = [
  { id: "SR-901", sellerId: "seller-1", product: "제주 감귤 3kg 산지직송", buyer: "김가나", rating: 5, content: "달고 신선했어요.", createdAt: "2026.05.29" },
  { id: "SR-900", sellerId: "seller-1", product: "제주 감귤 3kg 산지직송", buyer: "최민", rating: 4, content: "포장은 좋았는데 일부가 작았어요.", reply: "의견 감사합니다. 선별 기준을 더 꼼꼼히 확인하겠습니다.", createdAt: "2026.05.28" },
];

export const sellerRefunds: SellerRefund[] = [
  { id: "SRF-701", sellerId: "seller-1", orderId: "SO-20260527-033", product: "제주 감귤 3kg 산지직송", amount: 14900, reason: "배송 지연", adminStatus: "pending" },
];

export const sellerSettlements: SellerSettlement[] = [
  { id: "SST-001", sellerId: "seller-1", orderId: "SO-20260529-001", product: "제주 감귤 3kg 산지직송", sales: 29800, fee: 2384, shippingFee: 3000, refundDeduction: 0, payout: 24416, status: "scheduled" },
  { id: "SST-002", sellerId: "seller-1", orderId: "SO-20260527-044", product: "제주 감귤 3kg 산지직송", sales: 14900, fee: 1192, shippingFee: 3000, refundDeduction: 0, payout: 10708, status: "paid" },
  { id: "SST-003", sellerId: "seller-1", orderId: "SO-20260527-033", product: "제주 감귤 3kg 산지직송", sales: 14900, fee: 1192, shippingFee: 3000, refundDeduction: 14900, payout: 0, status: "hold" },
];

export const sellerNotifications: SellerNotification[] = [
  { id: "SN-001", sellerId: "seller-1", type: "order", title: "신규 주문", message: "김가나님의 신규 주문이 접수되었습니다.", createdAt: "2026.05.29 08:31", read: false },
  { id: "SN-002", sellerId: "seller-1", type: "inquiry", title: "신규 문의", message: "배송일 지정 문의가 도착했습니다.", createdAt: "2026.05.29 08:40", read: false },
  { id: "SN-003", sellerId: "seller-1", type: "review", title: "신규 리뷰", message: "별점 5점 리뷰가 등록되었습니다.", createdAt: "2026.05.29 09:01", read: false },
  { id: "SN-004", sellerId: "seller-1", type: "refund", title: "환불 요청", message: "관리자 확인 대기 중인 환불 요청이 있습니다.", createdAt: "2026.05.28 18:20", read: true },
  { id: "SN-005", sellerId: "seller-1", type: "product", title: "상품 반려", message: "못난이 감귤 요청이 반려되었습니다. 사유를 확인해주세요.", createdAt: "2026.05.28 17:45", read: true },
  { id: "SN-006", sellerId: "seller-1", type: "settlement", title: "정산 확정", message: "이번 주 정산 예정 금액이 확정되었습니다.", createdAt: "2026.05.29 07:00", read: false },
];

export function getSellerAccess(status: SellerStatus) {
  const profile = sellerProfiles[status];
  if (status === "approved") return { profile, allowed: true, title: "승인 판매자", description: "판매자센터 주요 기능을 사용할 수 있습니다." };
  if (status === "pending") return { profile, allowed: false, title: "입점 승인 대기", description: "승인 전에는 상품/주문/정산 기능이 제한됩니다." };
  if (status === "rejected") return { profile, allowed: false, title: "입점 반려", description: "반려 사유를 보완해 재심사를 요청해주세요." };
  return { profile, allowed: false, title: "판매 정지", description: "정지 상태에서는 주문/정산 기능을 사용할 수 없습니다." };
}

export function sellerDashboardSummary() {
  const todayOrders = sellerOrders.filter((order) => order.orderedAt.startsWith("2026.05.29")).length;
  const waitingShipping = sellerOrders.filter((order) => ["new", "preparing"].includes(order.status)).length;
  const refundRequests = sellerRefunds.filter((refund) => refund.adminStatus === "pending").length;
  const unansweredInquiries = sellerInquiries.filter((inquiry) => inquiry.status === "waiting").length;
  const unansweredReviews = sellerReviews.filter((review) => !review.reply).length;
  const settlementScheduled = sellerSettlements.filter((settlement) => settlement.status === "scheduled").reduce((sum, item) => sum + item.payout, 0);

  return [
    { label: "오늘 주문", value: `${todayOrders}건` },
    { label: "배송 대기", value: `${waitingShipping}건` },
    { label: "환불 요청", value: `${refundRequests}건` },
    { label: "미답변 문의", value: `${unansweredInquiries}건` },
    { label: "리뷰 미답변", value: `${unansweredReviews}건` },
    { label: "정산 예정", value: formatWon(settlementScheduled) },
  ];
}

export function getSellerOrder(id: string) {
  return sellerOrders.find((order) => order.id === id);
}

export function getSellerProductRequest(id: string) {
  return sellerProductRequests.find((request) => request.id === id);
}

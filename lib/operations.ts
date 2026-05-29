import { deals } from "@/lib/deals";

export type ProductRequest = {
  id: string;
  title: string;
  seller: string;
  category: string;
  status: "pending" | "approved" | "rejected";
  requestedAt: string;
  targetParticipants: number;
  requestedPrice: number;
  lowestPrice: number;
  memo: string;
};

export type SellerOrder = {
  id: string;
  buyer: string;
  item: string;
  quantity: number;
  amount: number;
  status: "paid" | "ready" | "shipping" | "delivered" | "refund_requested";
  invoice?: string;
  orderedAt: string;
};

export type SellerReview = {
  id: string;
  item: string;
  buyer: string;
  rating: number;
  content: string;
  reply?: string;
  reported?: boolean;
};

export type Inquiry = {
  id: string;
  item: string;
  customer: string;
  question: string;
  status: "waiting" | "answered";
  answer?: string;
};

export type Settlement = {
  id: string;
  period: string;
  sales: number;
  fee: number;
  refundHold: number;
  payout: number;
  status: "scheduled" | "paid" | "hold";
};

export type SellerApplication = {
  id: string;
  seller: string;
  representative: string;
  status: "pending" | "approved" | "suspended" | "rejected";
  requestedAt: string;
  riskMemo: string;
};

export type RefundRequest = {
  id: string;
  orderId: string;
  buyer: string;
  reason: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
};

export type Report = {
  id: string;
  target: string;
  type: "review" | "seller" | "product";
  reason: string;
  status: "open" | "resolved";
};

export const sellerStats = [
  { label: "오늘 주문", value: "18건", tone: "dark" },
  { label: "배송대기", value: "7건", tone: "red" },
  { label: "환불요청", value: "2건", tone: "amber" },
  { label: "정산예정", value: "1,284,000원", tone: "green" },
];

export const adminStats = [
  { label: "전체 주문", value: "1,284건", tone: "dark" },
  { label: "매출", value: "89,420,000원", tone: "red" },
  { label: "환불", value: "14건", tone: "amber" },
  { label: "판매자 수", value: "86곳", tone: "green" },
  { label: "승인대기 상품", value: "9건", tone: "purple" },
];

export const productRequests: ProductRequest[] = [
  {
    id: "PR-1024",
    title: "제주 감귤 5kg 프리미엄 박스",
    seller: "제주하루농장",
    category: "식품 > 과일",
    status: "pending",
    requestedAt: "2026.05.29 08:20",
    targetParticipants: 150,
    requestedPrice: 23900,
    lowestPrice: 19900,
    memo: "산지 수확 일정에 맞춰 24시간 공동구매로 운영 요청",
  },
  {
    id: "PR-1023",
    title: "국내산 대용량 물티슈 30팩",
    seller: "데일리케어",
    category: "생활용품 > 물티슈",
    status: "approved",
    requestedAt: "2026.05.28 17:12",
    targetParticipants: 300,
    requestedPrice: 28900,
    lowestPrice: 24900,
    memo: "무료배송 조건 확정, 상세페이지 검수 완료",
  },
  {
    id: "PR-1022",
    title: "노이즈캔슬링 무선 이어폰 Pro",
    seller: "테크와이드",
    category: "가전/디지털 > 이어폰",
    status: "rejected",
    requestedAt: "2026.05.28 10:44",
    targetParticipants: 100,
    requestedPrice: 99000,
    lowestPrice: 89900,
    memo: "KC 인증 이미지 보완 필요",
  },
];

export const sellerOrders: SellerOrder[] = [
  {
    id: "WD202605290001",
    buyer: "김가나",
    item: deals[0]?.title ?? "제주 감귤 3kg 산지직송",
    quantity: 2,
    amount: 29800,
    status: "ready",
    orderedAt: "2026.05.29 09:15",
  },
  {
    id: "WD202605290002",
    buyer: "박하루",
    item: deals[2]?.title ?? "국내산 대용량 물티슈 20팩",
    quantity: 1,
    amount: 19900,
    status: "shipping",
    invoice: "CJ1234567890",
    orderedAt: "2026.05.29 09:42",
  },
  {
    id: "WD202605280118",
    buyer: "이로운",
    item: deals[1]?.title ?? "프리미엄 한우 불고기 600g",
    quantity: 1,
    amount: 27900,
    status: "refund_requested",
    orderedAt: "2026.05.28 22:10",
  },
];

export const sellerReviews: SellerReview[] = [
  {
    id: "RV-501",
    item: "제주 감귤 3kg 산지직송",
    buyer: "김가나",
    rating: 5,
    content: "당도가 좋고 포장이 깔끔했어요. 다음 공동구매도 참여할게요.",
    reply: "좋은 후기 감사합니다. 다음 수확분도 꼼꼼히 준비하겠습니다.",
  },
  {
    id: "RV-502",
    item: "성수동 디카페인 콜드브루 12병",
    buyer: "최민",
    rating: 4,
    content: "맛은 좋은데 배송 박스가 조금 찌그러졌어요.",
    reported: true,
  },
];

export const inquiries: Inquiry[] = [
  {
    id: "Q-219",
    item: "제주 감귤 3kg 산지직송",
    customer: "김가나",
    question: "수령일 지정이 가능한가요?",
    status: "waiting",
  },
  {
    id: "Q-218",
    item: "프리미엄 한우 불고기 600g",
    customer: "박하루",
    question: "냉장 배송인가요?",
    status: "answered",
    answer: "네, 아이스팩 포함 냉장 배송으로 출고됩니다.",
  },
];

export const settlements: Settlement[] = [
  {
    id: "ST-202605-04",
    period: "2026.05.22 - 2026.05.28",
    sales: 3284000,
    fee: 262720,
    refundHold: 89000,
    payout: 2932280,
    status: "scheduled",
  },
  {
    id: "ST-202605-03",
    period: "2026.05.15 - 2026.05.21",
    sales: 2890000,
    fee: 231200,
    refundHold: 0,
    payout: 2658800,
    status: "paid",
  },
];

export const sellerApplications: SellerApplication[] = [
  {
    id: "SA-104",
    seller: "바른한우",
    representative: "정바른",
    status: "pending",
    requestedAt: "2026.05.29",
    riskMemo: "사업자등록증 검수 필요",
  },
  {
    id: "SA-103",
    seller: "코지홈",
    representative: "윤코지",
    status: "approved",
    requestedAt: "2026.05.28",
    riskMemo: "배송 SLA 확인 완료",
  },
  {
    id: "SA-102",
    seller: "리셀마켓",
    representative: "오리셀",
    status: "suspended",
    requestedAt: "2026.05.20",
    riskMemo: "반품 지연 신고 누적",
  },
];

export const refundRequests: RefundRequest[] = [
  {
    id: "RF-441",
    orderId: "WD202605280118",
    buyer: "이로운",
    reason: "배송 지연으로 인한 취소 요청",
    amount: 27900,
    status: "pending",
  },
  {
    id: "RF-440",
    orderId: "WD202605270089",
    buyer: "박하루",
    reason: "상품 파손",
    amount: 19900,
    status: "approved",
  },
];

export const reports: Report[] = [
  {
    id: "RP-302",
    target: "RV-502",
    type: "review",
    reason: "배송 이슈 반복 신고",
    status: "open",
  },
  {
    id: "RP-301",
    target: "테크와이드",
    type: "seller",
    reason: "인증서류 미흡",
    status: "resolved",
  },
];

export const notices = [
  "공동구매 마감 후 24시간 내 송장 입력 권장",
  "Toss 정산 리포트와 Wadeal 정산 내역 대조 필요",
  "추석 시즌 신선식품 카테고리 검수 강화 예정",
];

export const sellerAlerts = [
  "환불 요청 2건이 관리자 확인을 기다리고 있어요.",
  "제주 감귤 딜이 목표 인원 72%를 달성했어요.",
  "이번 주 정산 예정 금액이 확정되었습니다.",
];

export const categoriesForAdmin = [
  { name: "식품", children: 10, status: "active" },
  { name: "생활용품", children: 8, status: "active" },
  { name: "가전/디지털", children: 8, status: "active" },
  { name: "여행/티켓", children: 7, status: "draft" },
];

export const banners = [
  { id: "BN-01", title: "오늘 24시 마감 공동구매", status: "live" },
  { id: "BN-02", title: "첫 구매 쿠폰팩", status: "scheduled" },
];

export function getProductRequest(id: string) {
  return productRequests.find((request) => request.id === id);
}

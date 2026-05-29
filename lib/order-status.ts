export const orderStatuses = [
  "pending",
  "paid",
  "preparing",
  "shipped",
  "delivered",
  "confirmed",
  "refund_requested",
  "refunded",
  "cancelled",
] as const;

export type OrderStatus = (typeof orderStatuses)[number];

export const paymentStatuses = [
  "not_started",
  "ready",
  "paid",
  "failed",
  "cancel_requested",
  "cancelled",
  "partial_cancelled",
] as const;

export type PaymentStatus = (typeof paymentStatuses)[number];

export type CommercialOrder = {
  id: string;
  paymentKey?: string;
  buyer: string;
  seller: string;
  items: string[];
  amount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  address: string;
  adminMemo?: string;
  customerMessage?: string;
};

export const orderStatusLabels: Record<OrderStatus, string> = {
  pending: "주문대기",
  paid: "결제완료",
  preparing: "상품준비중",
  shipped: "배송중",
  delivered: "배송완료",
  confirmed: "구매확정",
  refund_requested: "환불요청",
  refunded: "환불완료",
  cancelled: "주문취소",
};

export const paymentStatusLabels: Record<PaymentStatus, string> = {
  not_started: "결제전",
  ready: "결제준비",
  paid: "결제완료",
  failed: "결제실패",
  cancel_requested: "취소요청",
  cancelled: "취소완료",
  partial_cancelled: "부분취소",
};

const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
  pending: ["paid", "cancelled"],
  paid: ["preparing", "refund_requested", "cancelled"],
  preparing: ["shipped", "refund_requested"],
  shipped: ["delivered", "refund_requested"],
  delivered: ["confirmed", "refund_requested"],
  confirmed: ["refund_requested"],
  refund_requested: ["refunded", "paid", "preparing", "shipped", "delivered"],
  refunded: [],
  cancelled: [],
};

export const mockCommercialOrders: CommercialOrder[] = [
  {
    id: "WD202605290128",
    paymentKey: "mock_payment_key_202605290128",
    buyer: "김가나",
    seller: "제주하루농장",
    items: ["제주 감귤 3kg 산지직송", "국내산 대용량 물티슈 20팩"],
    amount: 46700,
    status: "paid",
    paymentStatus: "paid",
    address: "서울시 강남구 테헤란로 123 Wadeal 아파트 1201호",
    customerMessage: "결제가 완료되었습니다. 공동구매 마감 후 배송이 시작됩니다.",
  },
  {
    id: "WD202605280118",
    paymentKey: "mock_payment_key_202605280118",
    buyer: "이로운",
    seller: "바른한우",
    items: ["프리미엄 한우 불고기 600g"],
    amount: 27900,
    status: "refund_requested",
    paymentStatus: "cancel_requested",
    address: "서울시 마포구 월드컵북로 12",
    adminMemo: "배송 지연 보상 정책 확인 필요",
    customerMessage: "환불 요청이 접수되었습니다. 관리자 확인 후 안내드릴게요.",
  },
  {
    id: "WD202605270089",
    paymentKey: "mock_payment_key_202605270089",
    buyer: "박하루",
    seller: "데일리케어",
    items: ["국내산 대용량 물티슈 20팩"],
    amount: 19900,
    status: "refunded",
    paymentStatus: "cancelled",
    address: "경기도 성남시 분당구 판교역로 20",
    customerMessage: "환불이 완료되었습니다.",
  },
];

export function getCommercialOrder(orderId: string) {
  return mockCommercialOrders.find((order) => order.id === orderId);
}

export function canTransitionOrderStatus(from: OrderStatus, to: OrderStatus) {
  return allowedTransitions[from]?.includes(to) ?? false;
}

export function getNextOrderStatuses(status: OrderStatus) {
  return allowedTransitions[status] ?? [];
}

export function validateOrderTransition(from: OrderStatus, to: OrderStatus) {
  if (from === to || canTransitionOrderStatus(from, to)) {
    return { ok: true, message: "상태 변경 가능" };
  }

  return {
    ok: false,
    message: `${orderStatusLabels[from]}에서 ${orderStatusLabels[to]} 상태로 바로 변경할 수 없습니다.`,
  };
}

export function isValidOrderStatus(value: string): value is OrderStatus {
  return orderStatuses.includes(value as OrderStatus);
}

export function isValidPaymentStatus(value: string): value is PaymentStatus {
  return paymentStatuses.includes(value as PaymentStatus);
}

export function expectedPaymentStatusForOrder(status: OrderStatus): PaymentStatus {
  if (status === "pending") return "ready";
  if (status === "refund_requested") return "cancel_requested";
  if (status === "refunded" || status === "cancelled") return "cancelled";
  return "paid";
}

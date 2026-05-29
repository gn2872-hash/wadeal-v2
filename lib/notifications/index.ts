import { orderStatusLabels, type CommercialOrder, type OrderStatus } from "@/lib/order-status";

export type NotificationAudience = "buyer" | "seller" | "admin";

export type NotificationEvent = {
  id: string;
  audience: NotificationAudience;
  title: string;
  message: string;
  orderId?: string;
  createdAt: string;
  read: boolean;
};

export function createOrderNotification(order: CommercialOrder, status: OrderStatus): NotificationEvent[] {
  const events: NotificationEvent[] = [];
  const createdAt = new Date().toISOString();

  if (status === "paid") {
    events.push({
      id: `${order.id}-buyer-paid`,
      audience: "buyer",
      title: "주문 완료",
      message: `${order.items[0]} 결제가 완료되었습니다.`,
      orderId: order.id,
      createdAt,
      read: false,
    });
    events.push({
      id: `${order.id}-seller-new-order`,
      audience: "seller",
      title: "신규 주문",
      message: `${order.buyer}님의 신규 주문이 접수되었습니다.`,
      orderId: order.id,
      createdAt,
      read: false,
    });
  }

  if (status === "shipped") {
    events.push({
      id: `${order.id}-buyer-shipped`,
      audience: "buyer",
      title: "배송 시작",
      message: "상품 배송이 시작되었습니다.",
      orderId: order.id,
      createdAt,
      read: false,
    });
  }

  if (status === "confirmed") {
    events.push({
      id: `${order.id}-buyer-confirmed`,
      audience: "buyer",
      title: "구매 확정",
      message: "구매가 확정되었습니다. 리뷰를 남겨보세요.",
      orderId: order.id,
      createdAt,
      read: false,
    });
    events.push({
      id: `${order.id}-seller-settlement`,
      audience: "seller",
      title: "정산 예정",
      message: "구매 확정 주문이 정산 예정 금액에 반영되었습니다.",
      orderId: order.id,
      createdAt,
      read: false,
    });
  }

  if (status === "refund_requested") {
    events.push({
      id: `${order.id}-buyer-refund-requested`,
      audience: "buyer",
      title: "환불 요청 접수",
      message: "환불 요청이 접수되었습니다.",
      orderId: order.id,
      createdAt,
      read: false,
    });
    events.push({
      id: `${order.id}-admin-refund-pending`,
      audience: "admin",
      title: "환불 승인 대기",
      message: `${order.buyer}님의 환불 요청 검토가 필요합니다.`,
      orderId: order.id,
      createdAt,
      read: false,
    });
  }

  if (status === "refunded" || status === "cancelled") {
    events.push({
      id: `${order.id}-buyer-${status}`,
      audience: "buyer",
      title: status === "refunded" ? "환불 승인" : "주문 취소",
      message: `${orderStatusLabels[status]} 처리가 완료되었습니다.`,
      orderId: order.id,
      createdAt,
      read: false,
    });
  }

  return events;
}

export const mockNotificationEvents: NotificationEvent[] = [
  {
    id: "admin-product-pending",
    audience: "admin",
    title: "승인 대기 상품",
    message: "검수가 필요한 상품 등록 요청 9건이 있습니다.",
    createdAt: "2026-05-29T07:00:00.000Z",
    read: false,
  },
  {
    id: "seller-settlement-ready",
    audience: "seller",
    title: "판매자 정산 알림",
    message: "이번 주 정산 예정 금액이 확정되었습니다.",
    createdAt: "2026-05-29T07:05:00.000Z",
    read: false,
  },
];

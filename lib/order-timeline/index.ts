import { orderStatusLabels, type CommercialOrder, type OrderStatus } from "@/lib/order-status";

export type TimelineVisibility = "customer" | "admin" | "seller" | "internal";

export type OrderTimelineEntry = {
  id: string;
  orderId: string;
  status: OrderStatus;
  title: string;
  customerMessage: string;
  adminMemo?: string;
  createdAt: string;
  visibility: TimelineVisibility;
};

export function createOrderTimelineEntry({
  orderId,
  status,
  customerMessage,
  adminMemo,
  visibility = "customer",
}: {
  orderId: string;
  status: OrderStatus;
  customerMessage?: string;
  adminMemo?: string;
  visibility?: TimelineVisibility;
}): OrderTimelineEntry {
  return {
    id: `${orderId}-${status}-${Date.now()}`,
    orderId,
    status,
    title: orderStatusLabels[status],
    customerMessage: customerMessage ?? `${orderStatusLabels[status]} 상태로 변경되었습니다.`,
    adminMemo,
    createdAt: new Date().toISOString(),
    visibility,
  };
}

export function getMockTimeline(order: CommercialOrder): OrderTimelineEntry[] {
  const base: OrderTimelineEntry[] = [
    {
      id: `${order.id}-pending`,
      orderId: order.id,
      status: "pending",
      title: "주문 생성",
      customerMessage: "주문서가 생성되었습니다.",
      createdAt: "2026-05-29T07:10:00.000Z",
      visibility: "customer",
    },
  ];

  if (["paid", "preparing", "shipped", "delivered", "confirmed", "refund_requested", "refunded"].includes(order.status)) {
    base.push({
      id: `${order.id}-paid`,
      orderId: order.id,
      status: "paid",
      title: "결제 완료",
      customerMessage: "결제가 완료되었습니다.",
      adminMemo: "paymentKey와 amount 검증 완료 필요",
      createdAt: "2026-05-29T07:12:00.000Z",
      visibility: "customer",
    });
  }

  if (["refund_requested", "refunded"].includes(order.status)) {
    base.push({
      id: `${order.id}-refund-requested`,
      orderId: order.id,
      status: "refund_requested",
      title: "환불 요청 접수",
      customerMessage: "환불 요청이 접수되었습니다.",
      adminMemo: order.adminMemo,
      createdAt: "2026-05-29T08:04:00.000Z",
      visibility: "customer",
    });
  }

  if (order.status === "refunded") {
    base.push({
      id: `${order.id}-refunded`,
      orderId: order.id,
      status: "refunded",
      title: "환불 완료",
      customerMessage: "환불이 완료되었습니다.",
      adminMemo: "Toss cancel API 결과 대조 필요",
      createdAt: "2026-05-29T09:20:00.000Z",
      visibility: "customer",
    });
  }

  return base;
}

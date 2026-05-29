"use server";

import { assertAdminAccess, getMockUser } from "@/lib/auth/roles";
import { validateOrderTransition, isValidOrderStatus } from "@/lib/order-status";
import { prepareTossCancel } from "@/lib/payments/toss/refunds";
import { validateTossSuccessParams } from "@/lib/payments/toss/validation";

export async function confirmTossPaymentAction(formData: FormData) {
  const orderId = formData.get("orderId")?.toString();
  const paymentKey = formData.get("paymentKey")?.toString();
  const amount = formData.get("amount")?.toString();
  const expectedAmount = Number(formData.get("expectedAmount") ?? amount);
  const result = validateTossSuccessParams({ orderId, paymentKey, amount }, expectedAmount);

  if (!result.ok) {
    throw new Error(result.reason ?? "결제 검증 실패");
  }
}

export async function requestRefundAction(formData: FormData) {
  const orderId = formData.get("orderId")?.toString();
  const reason = formData.get("reason")?.toString();

  if (!orderId || !reason) {
    throw new Error("환불 요청 정보가 부족합니다.");
  }
}

export async function updateOrderStatusAction(formData: FormData) {
  assertAdminAccess(getMockUser("admin"));
  const current = formData.get("currentStatus")?.toString() ?? "pending";
  const next = formData.get("nextStatus")?.toString() ?? "pending";

  if (!isValidOrderStatus(current) || !isValidOrderStatus(next)) {
    throw new Error("알 수 없는 주문 상태입니다.");
  }

  const result = validateOrderTransition(current, next);

  if (!result.ok) {
    throw new Error(result.message);
  }
}

export async function approveRefundAction(formData: FormData) {
  assertAdminAccess(getMockUser("admin"));
  const paymentKey = formData.get("paymentKey")?.toString();
  const reason = formData.get("reason")?.toString() || "관리자 환불 승인";
  const amount = Number(formData.get("amount") ?? 0);

  if (!paymentKey) {
    throw new Error("paymentKey가 없어 Toss 환불을 준비할 수 없습니다.");
  }

  await prepareTossCancel({ paymentKey, cancelReason: reason, cancelAmount: amount || undefined });
}

export async function rejectRefundAction(formData: FormData) {
  assertAdminAccess(getMockUser("admin"));
  const orderId = formData.get("orderId")?.toString();

  if (!orderId) {
    throw new Error("주문번호가 없습니다.");
  }
}

"use server";

import { getMockUser } from "@/lib/auth/roles";

function requireApprovedSeller() {
  const user = getMockUser("seller");

  if (user.role !== "seller" || user.sellerStatus !== "approved") {
    throw new Error("승인된 판매자만 사용할 수 있는 기능입니다.");
  }

  return user;
}

function requireValue(formData: FormData, key: string) {
  const value = formData.get(key)?.toString().trim();
  if (!value) throw new Error(`${key} 값이 필요합니다.`);
  return value;
}

export async function saveSellerProductRequestAction(formData: FormData) {
  requireApprovedSeller();
  requireValue(formData, "title");
  requireValue(formData, "category");
  const salePrice = Number(formData.get("salePrice") ?? 0);
  const targetParticipants = Number(formData.get("targetParticipants") ?? 0);
  if (!Number.isFinite(salePrice) || salePrice <= 0) throw new Error("판매가가 올바르지 않습니다.");
  if (!Number.isFinite(targetParticipants) || targetParticipants <= 0) throw new Error("목표 인원이 올바르지 않습니다.");
}

export async function resubmitSellerProductRequestAction(formData: FormData) {
  requireApprovedSeller();
  requireValue(formData, "requestId");
}

export async function markOrderPreparingAction(formData: FormData) {
  requireApprovedSeller();
  requireValue(formData, "orderId");
}

export async function saveSellerInvoiceAction(formData: FormData) {
  requireApprovedSeller();
  requireValue(formData, "orderId");
  requireValue(formData, "invoice");
}

export async function saveSellerOrderMemoAction(formData: FormData) {
  requireApprovedSeller();
  requireValue(formData, "orderId");
}

export async function answerSellerInquiryAction(formData: FormData) {
  requireApprovedSeller();
  requireValue(formData, "inquiryId");
  requireValue(formData, "answer");
}

export async function saveSellerReviewReplyAction(formData: FormData) {
  requireApprovedSeller();
  requireValue(formData, "reviewId");
  requireValue(formData, "reply");
}

export async function deleteSellerReviewReplyAction(formData: FormData) {
  requireApprovedSeller();
  requireValue(formData, "reviewId");
}

export async function acknowledgeSellerRefundAction(formData: FormData) {
  requireApprovedSeller();
  requireValue(formData, "refundId");
}

export async function updateSellerBankAccountAction(formData: FormData) {
  requireApprovedSeller();
  requireValue(formData, "bankAccount");
}

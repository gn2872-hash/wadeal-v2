"use server";

import { assertAdminAccess, assertSellerAccess, getMockUser } from "@/lib/auth/roles";

export async function submitProductRequestAction(formData: FormData) {
  assertSellerAccess(getMockUser("seller"));
  formData.get("requestId")?.toString();
}

export async function updateInvoiceAction(formData: FormData) {
  assertSellerAccess(getMockUser("seller"));
  formData.get("orderId")?.toString();
  formData.get("invoice")?.toString();
}

export async function updateDeliveryStatusAction(formData: FormData) {
  assertSellerAccess(getMockUser("seller"));
  formData.get("orderId")?.toString();
  formData.get("status")?.toString();
}

export async function replyReviewAction(formData: FormData) {
  assertSellerAccess(getMockUser("seller"));
  formData.get("reviewId")?.toString();
}

export async function answerInquiryAction(formData: FormData) {
  assertSellerAccess(getMockUser("seller"));
  formData.get("inquiryId")?.toString();
}

export async function moderateProductRequestAction(formData: FormData) {
  assertAdminAccess(getMockUser("admin"));
  formData.get("requestId")?.toString();
  formData.get("decision")?.toString();
}

export async function moderateSellerAction(formData: FormData) {
  assertAdminAccess(getMockUser("admin"));
  formData.get("sellerId")?.toString();
  formData.get("decision")?.toString();
}

export async function moderateRefundAction(formData: FormData) {
  assertAdminAccess(getMockUser("admin"));
  formData.get("refundId")?.toString();
  formData.get("decision")?.toString();
}

export async function resolveReportAction(formData: FormData) {
  assertAdminAccess(getMockUser("admin"));
  formData.get("reportId")?.toString();
}

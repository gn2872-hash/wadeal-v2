"use server";

import { assertAdminAccess, getMockUser } from "@/lib/auth/roles";

function requireAdmin() {
  assertAdminAccess(getMockUser("admin"));
}

function requireValue(formData: FormData, key: string) {
  const value = formData.get(key)?.toString().trim();
  if (!value) {
    throw new Error(`${key} 값이 필요합니다.`);
  }
  return value;
}

export async function saveCategoryAction(formData: FormData) {
  requireAdmin();
  requireValue(formData, "name");
}

export async function updateCategoryVisibilityAction(formData: FormData) {
  requireAdmin();
  requireValue(formData, "slug");
}

export async function updateCategoryOrderAction(formData: FormData) {
  requireAdmin();
  requireValue(formData, "slug");
  const displayOrder = Number(formData.get("displayOrder") ?? 0);
  if (!Number.isFinite(displayOrder) || displayOrder < 1) {
    throw new Error("노출 순서는 1 이상이어야 합니다.");
  }
}

export async function saveBannerAction(formData: FormData) {
  requireAdmin();
  requireValue(formData, "title");
  requireValue(formData, "linkUrl");
}

export async function deleteBannerAction(formData: FormData) {
  requireAdmin();
  requireValue(formData, "bannerId");
}

export async function saveEventAction(formData: FormData) {
  requireAdmin();
  requireValue(formData, "title");
  requireValue(formData, "status");
}

export async function deleteEventAction(formData: FormData) {
  requireAdmin();
  requireValue(formData, "eventId");
}

export async function saveAdminCouponAction(formData: FormData) {
  requireAdmin();
  requireValue(formData, "name");
  requireValue(formData, "discountType");
  const minimumOrderAmount = Number(formData.get("minimumOrderAmount") ?? 0);
  if (!Number.isFinite(minimumOrderAmount) || minimumOrderAmount < 0) {
    throw new Error("최소 주문금액이 올바르지 않습니다.");
  }
}

export async function pauseAdminCouponAction(formData: FormData) {
  requireAdmin();
  requireValue(formData, "couponId");
}

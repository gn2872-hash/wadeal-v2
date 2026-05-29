"use server";

import { assertOwnUser } from "@/lib/auth/session";

export async function selectCouponForCheckoutAction(formData: FormData) {
  const userId = formData.get("userId")?.toString() ?? "";
  const couponId = formData.get("couponId")?.toString();
  assertOwnUser(userId);

  if (!couponId) {
    throw new Error("선택할 쿠폰이 없습니다.");
  }
}

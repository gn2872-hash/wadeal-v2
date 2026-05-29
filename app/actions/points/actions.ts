"use server";

import { assertOwnUser } from "@/lib/auth/session";

export async function reservePointUseAction(formData: FormData) {
  const userId = formData.get("userId")?.toString() ?? "";
  const amount = Number(formData.get("amount") ?? 0);
  assertOwnUser(userId);

  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error("사용 포인트가 올바르지 않습니다.");
  }
}

"use server";

import { assertOwnUser } from "@/lib/auth/session";

export async function updateProfileAction(formData: FormData) {
  const userId = formData.get("userId")?.toString() ?? "";
  assertOwnUser(userId);

  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();

  if (!name || !email) {
    throw new Error("이름과 이메일은 필수입니다.");
  }
}

export async function updateMarketingConsentAction(formData: FormData) {
  const userId = formData.get("userId")?.toString() ?? "";
  assertOwnUser(userId);
}

export async function requestAccountDeletionAction(formData: FormData) {
  const userId = formData.get("userId")?.toString() ?? "";
  assertOwnUser(userId);
}

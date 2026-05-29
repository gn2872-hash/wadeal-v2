"use server";

import { assertOwnUser } from "@/lib/auth/session";

function assertAddressPayload(formData: FormData) {
  const recipient = formData.get("recipient")?.toString();
  const phone = formData.get("phone")?.toString();
  const address = formData.get("address")?.toString();

  if (!recipient || !phone || !address) {
    throw new Error("받는 사람, 연락처, 주소는 필수입니다.");
  }
}

export async function saveAddressAction(formData: FormData) {
  const userId = formData.get("userId")?.toString() ?? "";
  assertOwnUser(userId);
  assertAddressPayload(formData);
}

export async function setDefaultAddressAction(formData: FormData) {
  const userId = formData.get("userId")?.toString() ?? "";
  const addressId = formData.get("addressId")?.toString();
  assertOwnUser(userId);

  if (!addressId) {
    throw new Error("배송지 ID가 없습니다.");
  }
}

export async function deleteAddressAction(formData: FormData) {
  const userId = formData.get("userId")?.toString() ?? "";
  const addressId = formData.get("addressId")?.toString();
  assertOwnUser(userId);

  if (!addressId) {
    throw new Error("배송지 ID가 없습니다.");
  }
}

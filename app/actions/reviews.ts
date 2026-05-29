"use server";

import { canWriteReview } from "@/lib/reviews";

export async function submitReviewAction(formData: FormData) {
  const productSlug = formData.get("productSlug")?.toString();
  const rating = Number(formData.get("rating") ?? 0);
  const content = formData.get("content")?.toString();
  const permission = canWriteReview({
    role: "buyer",
    hasPurchased: true,
    confirmedAt: new Date().toISOString(),
    alreadyReviewed: false,
  });

  if (!permission.allowed) {
    throw new Error(permission.reason);
  }

  if (!productSlug || rating < 1 || rating > 5 || !content) {
    throw new Error("리뷰 작성 정보가 부족합니다.");
  }
}

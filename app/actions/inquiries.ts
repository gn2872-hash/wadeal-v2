"use server";

export async function submitProductInquiryAction(formData: FormData) {
  const productSlug = formData.get("productSlug")?.toString();
  const question = formData.get("question")?.toString();

  if (!productSlug || !question) {
    throw new Error("문의 작성 정보가 부족합니다.");
  }
}

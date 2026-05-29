export type ProductReview = {
  id: string;
  productSlug: string;
  buyer: string;
  rating: number;
  content: string;
  images: string[];
  createdAt: string;
  confirmedAt: string;
  sellerReply?: string;
};

export type ProductInquiry = {
  id: string;
  productSlug: string;
  buyer: string;
  question: string;
  isSecret: boolean;
  createdAt: string;
  answer?: string;
  hiddenByAdmin?: boolean;
};

export type ReviewSort = "latest" | "rating-high" | "rating-low";

export const mockReviews: ProductReview[] = [
  {
    id: "PRV-001",
    productSlug: "jeju-tangerine-3kg",
    buyer: "김가나",
    rating: 5,
    content: "감귤이 달고 포장이 꼼꼼했어요. 공동구매 가격도 만족합니다.",
    images: ["🍊", "📦"],
    createdAt: "2026.05.28",
    confirmedAt: "2026.05.20",
    sellerReply: "좋은 후기 감사합니다. 다음 수확분도 신선하게 준비하겠습니다.",
  },
  {
    id: "PRV-002",
    productSlug: "jeju-tangerine-3kg",
    buyer: "박하루",
    rating: 4,
    content: "맛은 좋은데 일부 크기가 작았어요. 그래도 가격 대비 괜찮습니다.",
    images: [],
    createdAt: "2026.05.27",
    confirmedAt: "2026.05.18",
  },
  {
    id: "PRV-003",
    productSlug: "daily-wet-tissue-20pack",
    buyer: "이로운",
    rating: 5,
    content: "육아용으로 넉넉하고 무향이라 좋아요.",
    images: ["👶"],
    createdAt: "2026.05.25",
    confirmedAt: "2026.05.16",
    sellerReply: "데일리케어를 이용해주셔서 감사합니다.",
  },
];

export const mockInquiries: ProductInquiry[] = [
  {
    id: "PINQ-001",
    productSlug: "jeju-tangerine-3kg",
    buyer: "김가나",
    question: "배송일 지정이 가능한가요?",
    isSecret: false,
    createdAt: "2026.05.29",
    answer: "공동구매 마감 후 순차 출고되며 개별 지정은 어렵습니다.",
  },
  {
    id: "PINQ-002",
    productSlug: "jeju-tangerine-3kg",
    buyer: "박하루",
    question: "선물 포장 가능한가요?",
    isSecret: true,
    createdAt: "2026.05.28",
  },
];

export function getProductReviews(productSlug: string, sort: ReviewSort = "latest") {
  const reviews = mockReviews.filter((review) => review.productSlug === productSlug);

  return [...reviews].sort((a, b) => {
    if (sort === "rating-high") return b.rating - a.rating;
    if (sort === "rating-low") return a.rating - b.rating;
    return b.createdAt.localeCompare(a.createdAt);
  });
}

export function getProductInquiries(productSlug: string) {
  return mockInquiries.filter((inquiry) => inquiry.productSlug === productSlug && !inquiry.hiddenByAdmin);
}

export function getReviewSummary(productSlug: string) {
  const reviews = mockReviews.filter((review) => review.productSlug === productSlug);
  const distribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
  }));
  const average = reviews.length
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  return {
    average,
    count: reviews.length,
    distribution,
  };
}

export function canWriteReview({
  role,
  hasPurchased,
  confirmedAt,
  alreadyReviewed,
}: {
  role: "buyer" | "seller" | "admin";
  hasPurchased: boolean;
  confirmedAt?: string;
  alreadyReviewed: boolean;
}) {
  if (role !== "buyer") return { allowed: false, reason: "구매자만 리뷰를 작성할 수 있습니다." };
  if (!hasPurchased) return { allowed: false, reason: "구매 확정된 상품만 리뷰 작성이 가능합니다." };
  if (alreadyReviewed) return { allowed: false, reason: "이미 리뷰를 작성한 상품입니다." };

  if (confirmedAt) {
    const confirmedDate = new Date(confirmedAt);
    const diffDays = Math.floor((Date.now() - confirmedDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays > 15) return { allowed: false, reason: "구매 확정 후 15일 이내에만 작성할 수 있습니다." };
  }

  return { allowed: true, reason: "리뷰 작성 가능" };
}

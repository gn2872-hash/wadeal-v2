export type CouponDiscountType = "fixed" | "rate";
export type CouponAudience = "new" | "all" | "specific";
export type CouponStatus = "active" | "paused" | "expired" | "scheduled";

export type AdminCoupon = {
  id: string;
  name: string;
  discountType: CouponDiscountType;
  discountValue: number;
  minimumOrderAmount: number;
  maxDiscountAmount?: number;
  startsAt: string;
  endsAt: string;
  issueLimit: number;
  issuedCount: number;
  status: CouponStatus;
  audience: CouponAudience;
  appliesTo: {
    categories: string[];
    products: string[];
  };
};

export const adminCoupons: AdminCoupon[] = [
  {
    id: "CP-NEW-3000",
    name: "첫 공동구매 3,000원 할인",
    discountType: "fixed",
    discountValue: 3000,
    minimumOrderAmount: 30000,
    startsAt: "2026.05.29",
    endsAt: "2026.06.30",
    issueLimit: 5000,
    issuedCount: 1240,
    status: "active",
    audience: "new",
    appliesTo: { categories: ["전체"], products: [] },
  },
  {
    id: "CP-LIFE-5",
    name: "생활용품 5% 할인",
    discountType: "rate",
    discountValue: 5,
    minimumOrderAmount: 20000,
    maxDiscountAmount: 5000,
    startsAt: "2026.05.29",
    endsAt: "2026.06.15",
    issueLimit: 3000,
    issuedCount: 840,
    status: "active",
    audience: "all",
    appliesTo: { categories: ["생활용품"], products: ["국내산 대용량 물티슈 20팩"] },
  },
  {
    id: "CP-VIP-10000",
    name: "VIP 공동구매 10,000원 할인",
    discountType: "fixed",
    discountValue: 10000,
    minimumOrderAmount: 100000,
    startsAt: "2026.06.01",
    endsAt: "2026.06.30",
    issueLimit: 200,
    issuedCount: 0,
    status: "scheduled",
    audience: "specific",
    appliesTo: { categories: ["가전/디지털"], products: ["노이즈캔슬링 무선 이어폰"] },
  },
  {
    id: "CP-OLD-1000",
    name: "오픈 기념 1,000원 할인",
    discountType: "fixed",
    discountValue: 1000,
    minimumOrderAmount: 10000,
    startsAt: "2026.05.01",
    endsAt: "2026.05.20",
    issueLimit: 10000,
    issuedCount: 9230,
    status: "expired",
    audience: "all",
    appliesTo: { categories: ["전체"], products: [] },
  },
];

export function formatCouponDiscount(coupon: AdminCoupon) {
  if (coupon.discountType === "fixed") {
    return `${coupon.discountValue.toLocaleString("ko-KR")}원 할인`;
  }

  return `${coupon.discountValue}% 할인${coupon.maxDiscountAmount ? ` · 최대 ${coupon.maxDiscountAmount.toLocaleString("ko-KR")}원` : ""}`;
}

export function getCheckoutSelectableCoupons() {
  return adminCoupons.filter((coupon) => coupon.status === "active");
}

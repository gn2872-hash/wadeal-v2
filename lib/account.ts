import { getDealsByIds, mockAddresses as buyerAddresses, mockPaymentMethods } from "@/lib/buyer";
import { mockCommercialOrders } from "@/lib/order-status";

export type BuyerProfile = {
  userId: string;
  name: string;
  nickname: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: "female" | "male" | "none";
  marketingEmail: boolean;
  marketingSms: boolean;
};

export type MypageAddress = {
  id: number;
  userId: string;
  label: string;
  recipient: string;
  phone: string;
  postalCode: string;
  address: string;
  detailAddress: string;
  request: string;
  isDefault: boolean;
};

export type Coupon = {
  id: string;
  name: string;
  amount: number;
  status: "available" | "used" | "expired";
  restriction: string;
  minimumOrderAmount: number;
  expiresAt: string;
};

export type PointLedger = {
  id: string;
  type: "earn" | "use" | "refund" | "expected";
  title: string;
  amount: number;
  date: string;
  orderId?: string;
};

export const mockBuyerProfile: BuyerProfile = {
  userId: "buyer-1",
  name: "김가나",
  nickname: "가나딜러",
  email: "gana@example.com",
  phone: "010-1234-5678",
  birthDate: "1992-05-29",
  gender: "none",
  marketingEmail: true,
  marketingSms: false,
};

export const mypageAddresses: MypageAddress[] = buyerAddresses.map((address, index) => ({
  id: address.id,
  userId: "buyer-1",
  label: address.label,
  recipient: address.recipient,
  phone: address.phone,
  postalCode: index === 0 ? "06234" : "04781",
  address: address.address.split(" Wadeal ")[0] ?? address.address,
  detailAddress: address.address.includes(" Wadeal ") ? `Wadeal ${address.address.split(" Wadeal ")[1]}` : "",
  request: address.request,
  isDefault: address.isDefault,
}));

export const accountPaymentMethods = mockPaymentMethods.map((method, index) => ({
  ...method,
  userId: "buyer-1",
  maskedNumber: index === 0 ? "Toss 간편결제" : "등록 준비 중",
  isDefault: index === 0,
  provider: method.id === "toss" ? "Toss" : "PG fallback",
}));

export const accountCoupons: Coupon[] = [
  {
    id: "CP-NEW-3000",
    name: "첫 공동구매 3,000원 할인",
    amount: 3000,
    status: "available",
    restriction: "전체 상품",
    minimumOrderAmount: 30000,
    expiresAt: "2026.06.30",
  },
  {
    id: "CP-LIFE-5",
    name: "생활용품 5% 할인",
    amount: 1200,
    status: "available",
    restriction: "생활용품 카테고리",
    minimumOrderAmount: 20000,
    expiresAt: "2026.06.15",
  },
  {
    id: "CP-OLD-1000",
    name: "오픈 기념 1,000원 할인",
    amount: 1000,
    status: "used",
    restriction: "전체 상품",
    minimumOrderAmount: 10000,
    expiresAt: "2026.05.20",
  },
  {
    id: "CP-EXPIRED",
    name: "주말 특가 쿠폰",
    amount: 2000,
    status: "expired",
    restriction: "식품 카테고리",
    minimumOrderAmount: 25000,
    expiresAt: "2026.05.01",
  },
];

export const pointBalance = 12600;
export const expectedPoints = 2300;

export const pointLedger: PointLedger[] = [
  { id: "PT-001", type: "earn", title: "제주 감귤 공동구매 적립", amount: 740, date: "2026.05.29", orderId: "WD202605290128" },
  { id: "PT-002", type: "use", title: "체크아웃 포인트 사용", amount: -2000, date: "2026.05.29", orderId: "WD202605290128" },
  { id: "PT-003", type: "expected", title: "구매확정 예정 적립", amount: 2300, date: "배송완료 후" },
  { id: "PT-004", type: "refund", title: "환불로 인한 포인트 복원", amount: 500, date: "2026.05.27", orderId: "WD202605270089" },
];

export const mypageSummary = {
  orderDelivery: {
    paid: mockCommercialOrders.filter((order) => order.status === "paid").length,
    preparing: mockCommercialOrders.filter((order) => order.status === "preparing").length,
    shipped: mockCommercialOrders.filter((order) => order.status === "shipped").length,
    delivered: mockCommercialOrders.filter((order) => order.status === "delivered").length,
  },
  cancelRefund: {
    refundRequested: mockCommercialOrders.filter((order) => order.status === "refund_requested").length,
    refunded: mockCommercialOrders.filter((order) => order.status === "refunded").length,
    cancelled: mockCommercialOrders.filter((order) => order.status === "cancelled").length,
  },
};

export const writableReviewItems = [
  { orderId: "WD202605180014", product: "성수동 디카페인 콜드브루 12병", deadline: "2026.06.02", status: "작성 가능" },
  { orderId: "WD202605200091", product: "국내산 대용량 물티슈 20팩", deadline: "2026.06.04", status: "작성 가능" },
];

export const writtenReviews = [
  { id: "RV-MY-001", product: "제주 감귤 3kg 산지직송", rating: 5, content: "달고 신선했어요.", date: "2026.05.28" },
];

export const wishlistDeals = getDealsByIds([1, 5, 7]);
export const recentViewDeals = getDealsByIds([8, 2, 10]);

import { deals, type Deal } from "@/lib/deals";

export type CartItem = {
  id: number;
  dealId: number;
  quantity: number;
  selected: boolean;
  reservedLowestPrice: boolean;
};

export type CartLine = CartItem & {
  deal: Deal;
};

export type Address = {
  id: number;
  label: string;
  recipient: string;
  phone: string;
  address: string;
  request: string;
  isDefault: boolean;
};

export type PaymentMethod = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
};

export type BuyerOrder = {
  id: string;
  date: string;
  status: string;
  total: number;
  items: string[];
};

export const mockCartItems: CartItem[] = [
  { id: 101, dealId: 1, quantity: 2, selected: true, reservedLowestPrice: true },
  { id: 102, dealId: 3, quantity: 1, selected: true, reservedLowestPrice: false },
  { id: 103, dealId: 7, quantity: 1, selected: false, reservedLowestPrice: false },
];

export const mockAddresses: Address[] = [
  {
    id: 1,
    label: "집",
    recipient: "김가나",
    phone: "010-1234-5678",
    address: "서울시 강남구 테헤란로 123 Wadeal 아파트 1201호",
    request: "문 앞에 놓아주세요",
    isDefault: true,
  },
  {
    id: 2,
    label: "회사",
    recipient: "김가나",
    phone: "010-1234-5678",
    address: "서울시 성동구 왕십리로 88 Wadeal 오피스 5층",
    request: "경비실에 맡겨주세요",
    isDefault: false,
  },
];

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "toss",
    name: "Toss Payments",
    description: "카드, 계좌, 간편결제 연결 준비 완료 UI",
    enabled: true,
  },
  {
    id: "card",
    name: "신용/체크카드",
    description: "일반 카드 결제는 PG 연결 후 활성화됩니다",
    enabled: false,
  },
  {
    id: "bank",
    name: "무통장입금",
    description: "관리자 주문 확인 기능 연결 후 활성화됩니다",
    enabled: false,
  },
];

export const mockCoupons = [
  { id: 1, name: "첫 공동구매 3,000원 할인", amount: 3000, enabled: true },
  { id: 2, name: "생활용품 5% 쿠폰", amount: 1200, enabled: false },
];

export const mockPointBalance = 12600;

export const mockOrders: BuyerOrder[] = [
  {
    id: "WD202605290001",
    date: "2026.05.29",
    status: "공동구매 진행중",
    total: 46700,
    items: ["제주 감귤 3kg 산지직송", "국내산 대용량 물티슈 20팩"],
  },
  {
    id: "WD202605180014",
    date: "2026.05.18",
    status: "배송완료",
    total: 23900,
    items: ["성수동 디카페인 콜드브루 12병"],
  },
];

export const recentViewDealIds = [8, 2, 10];
export const favoriteDealIds = [1, 5, 7];

export function getCartLines(items: CartItem[] = mockCartItems): CartLine[] {
  return items
    .map((item) => {
      const deal = deals.find((candidate) => candidate.id === item.dealId);
      return deal ? { ...item, deal } : null;
    })
    .filter((item): item is CartLine => item !== null);
}

export function getDealsByIds(ids: number[]) {
  return ids
    .map((id) => deals.find((deal) => deal.id === id))
    .filter((deal): deal is Deal => deal !== undefined);
}

export function getCartSummary(lines: CartLine[]) {
  const selectedLines = lines.filter((line) => line.selected);
  const productTotal = selectedLines.reduce(
    (sum, line) => sum + line.deal.currentPrice * line.quantity,
    0,
  );
  const originalTotal = selectedLines.reduce(
    (sum, line) => sum + line.deal.originalPrice * line.quantity,
    0,
  );
  const groupDiscount = originalTotal - productTotal;
  const couponDiscount = productTotal >= 30000 ? 3000 : 0;
  const pointDiscount = productTotal >= 50000 ? 2000 : 0;
  const deliveryFee = productTotal === 0 || productTotal >= 30000 ? 0 : 3000;
  const total = Math.max(0, productTotal + deliveryFee - couponDiscount - pointDiscount);
  const count = selectedLines.reduce((sum, line) => sum + line.quantity, 0);

  return {
    selectedLines,
    productTotal,
    originalTotal,
    groupDiscount,
    couponDiscount,
    pointDiscount,
    deliveryFee,
    total,
    count,
  };
}

export const mockCartLineCount = mockCartItems.reduce(
  (sum, item) => sum + item.quantity,
  0,
);

export const mockOrderNumber = "WD202605290128";

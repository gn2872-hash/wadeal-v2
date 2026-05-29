import { deals, type Deal } from "@/lib/deals";

export type DiscountTier = {
  participants: number;
  price: number;
  label: string;
};

export type ProductDetail = {
  slug: string;
  deal: Deal;
  images: string[];
  description: string;
  detailSections: { title: string; body: string }[];
  discountTiers: DiscountTier[];
  stock: number;
  soldCount: number;
  deliveryInfo: string;
  exchangeRefundInfo: string;
  sellerInfo: {
    name: string;
    rating: number;
    responseRate: number;
    shippedOnTimeRate: number;
    businessType: string;
  };
};

const productMeta: Record<number, Omit<ProductDetail, "deal">> = {
  1: {
    slug: "jeju-tangerine-3kg",
    images: ["🍊", "📦", "🌿"],
    description: "제주 산지에서 당일 선별한 감귤을 공동구매 특가로 제공합니다. 신선도 유지를 위해 출고일 기준으로 포장합니다.",
    detailSections: [
      { title: "산지직송 신선함", body: "수확 후 선별, 포장, 출고까지 한 번에 관리합니다." },
      { title: "공동구매 가격", body: "참여 인원이 늘어날수록 최저가 달성 가능성이 높아집니다." },
    ],
    discountTiers: [
      { participants: 50, price: 15900, label: "기본 공동구매가" },
      { participants: 100, price: 13900, label: "100명 달성가" },
      { participants: 120, price: 12900, label: "최저 목표가" },
    ],
    stock: 34,
    soldCount: 1240,
    deliveryInfo: "내일도착 가능 지역 우선 출고, 제주 산지 상황에 따라 1일 지연될 수 있습니다.",
    exchangeRefundInfo: "신선식품 특성상 단순 변심 교환은 제한되며, 파손/변질은 수령 후 24시간 내 접수해주세요.",
    sellerInfo: { name: "제주하루농장", rating: 4.8, responseRate: 98, shippedOnTimeRate: 96, businessType: "산지직송 판매자" },
  },
  2: {
    slug: "premium-hanwoo-bulgogi-600g",
    images: ["🥩", "❄️", "🔥"],
    description: "냉장 배송으로 받는 프리미엄 한우 불고기 공동구매 상품입니다.",
    detailSections: [
      { title: "냉장 배송", body: "아이스팩과 보냉재를 동봉해 신선하게 배송합니다." },
      { title: "손질 완료", body: "받은 즉시 조리하기 좋은 두께로 준비합니다." },
    ],
    discountTiers: [
      { participants: 30, price: 29900, label: "공동구매가" },
      { participants: 60, price: 26900, label: "60명 달성가" },
      { participants: 80, price: 24900, label: "최저 목표가" },
    ],
    stock: 18,
    soldCount: 642,
    deliveryInfo: "콜드체인 택배로 출고되며 도서산간은 배송이 제한될 수 있습니다.",
    exchangeRefundInfo: "냉장식품은 상품 하자 확인 시 사진 접수 후 환불/재배송을 지원합니다.",
    sellerInfo: { name: "바른한우", rating: 4.7, responseRate: 95, shippedOnTimeRate: 94, businessType: "축산물 전문 판매자" },
  },
  3: {
    slug: "daily-wet-tissue-20pack",
    images: ["🧻", "👶", "📦"],
    description: "국내산 대용량 물티슈 20팩을 육아/생활 필수 공동구매로 준비했습니다.",
    detailSections: [
      { title: "대용량 구성", body: "가정, 어린이집, 사무실에서 넉넉하게 사용할 수 있습니다." },
      { title: "안전한 사용감", body: "무향 캡형으로 매일 쓰기 편한 구성입니다." },
    ],
    discountTiers: [
      { participants: 80, price: 21900, label: "공동구매가" },
      { participants: 150, price: 18900, label: "150명 달성가" },
      { participants: 200, price: 17900, label: "최저 목표가" },
    ],
    stock: 86,
    soldCount: 3810,
    deliveryInfo: "무료배송, 평일 오후 2시 이전 결제 건 당일 출고됩니다.",
    exchangeRefundInfo: "미개봉 상품은 수령 후 7일 이내 교환/반품 신청 가능합니다.",
    sellerInfo: { name: "데일리케어", rating: 4.9, responseRate: 99, shippedOnTimeRate: 98, businessType: "생활용품 브랜드" },
  },
  7: {
    slug: "noise-cancelling-wireless-earbuds",
    images: ["🎧", "📱", "🔋"],
    description: "가성비 노이즈캔슬링 무선 이어폰을 공동구매 특가로 제공합니다.",
    detailSections: [
      { title: "ANC 지원", body: "출퇴근, 학습, 업무 환경에서 주변 소음을 줄여줍니다." },
      { title: "저지연 모드", body: "영상 시청과 게임에 적합한 저지연 모드를 지원합니다." },
    ],
    discountTiers: [
      { participants: 80, price: 89900, label: "공동구매가" },
      { participants: 150, price: 75900, label: "150명 달성가" },
      { participants: 180, price: 69900, label: "최저 목표가" },
    ],
    stock: 42,
    soldCount: 890,
    deliveryInfo: "오늘출발 가능 수량 우선 배송, 품절 시 순차 출고됩니다.",
    exchangeRefundInfo: "전자제품은 개봉 후 단순 변심 반품이 제한되며 초기 불량은 교환 가능합니다.",
    sellerInfo: { name: "테크와이드", rating: 4.5, responseRate: 93, shippedOnTimeRate: 92, businessType: "디지털기기 판매자" },
  },
};

function fallbackSlug(deal: Deal) {
  return deal.title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-|-$/g, "") || `deal-${deal.id}`;
}

function fallbackProduct(deal: Deal): ProductDetail {
  return {
    slug: productMeta[deal.id]?.slug ?? fallbackSlug(deal),
    deal,
    images: [deal.image || "🛒", "📦", "✨"],
    description: `${deal.title} 공동구매 상세 정보입니다. DB 상세 컬럼이 없으면 안전한 기본 설명을 표시합니다.`,
    detailSections: [
      { title: "Wadeal 공동구매", body: "참여 인원이 늘어날수록 최저가에 가까워지는 공동구매 상품입니다." },
      { title: "검수 안내", body: "판매자 정보, 배송 조건, 환불 정책은 관리자 검수 후 노출됩니다." },
    ],
    discountTiers: [
      { participants: Math.max(1, Math.floor(deal.targetParticipants * 0.4)), price: deal.currentPrice, label: "현재 공동구매가" },
      { participants: Math.max(1, Math.floor(deal.targetParticipants * 0.75)), price: Math.round((deal.currentPrice + deal.lowestPrice) / 2), label: "중간 목표가" },
      { participants: deal.targetParticipants, price: deal.lowestPrice, label: "최저 목표가" },
    ],
    stock: Math.max(0, deal.targetParticipants - deal.participants),
    soldCount: deal.reviewCount * 2,
    deliveryInfo: `${deal.deliveryBadge} 기준으로 출고되며 지역/재고에 따라 달라질 수 있습니다.`,
    exchangeRefundInfo: "상품별 교환/환불 정책은 결제 전 안내와 판매자 정책을 함께 확인해주세요.",
    sellerInfo: {
      name: deal.seller,
      rating: deal.rating,
      responseRate: 94,
      shippedOnTimeRate: 95,
      businessType: "Wadeal 입점 판매자",
    },
  };
}

export function getProducts() {
  return deals.map((deal) => ({ ...fallbackProduct(deal), ...productMeta[deal.id], deal }));
}

export function getProductBySlug(slug: string) {
  return getProducts().find((product) => product.slug === slug);
}

export function getProductSlugByDealId(dealId: number) {
  return getProducts().find((product) => product.deal.id === dealId)?.slug ?? `deal-${dealId}`;
}

export function getRecommendedProducts(product: ProductDetail) {
  const products = getProducts().filter((candidate) => candidate.slug !== product.slug);
  const sameCategory = products.filter((candidate) => candidate.deal.categorySlug === product.deal.categorySlug);
  const popular = [...products].sort((a, b) => b.deal.participants - a.deal.participants);
  const recentFallback = products.slice(0, 3);
  const merged = [...sameCategory, ...popular, ...recentFallback];
  const seen = new Set<string>();

  return merged.filter((item) => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  }).slice(0, 4);
}

import { categories } from "@/lib/categories";
import { deals } from "@/lib/deals";

export type AdminCategoryRow = {
  slug: string;
  name: string;
  visible: boolean;
  displayOrder: number;
  subcategories: { name: string; visible: boolean; displayOrder: number }[];
  connectedRoutes: string[];
};

export type AdminBanner = {
  id: string;
  title: string;
  imageUrl: string;
  mobileImageUrl: string;
  pcImageUrl: string;
  linkUrl: string;
  startsAt: string;
  endsAt: string;
  visible: boolean;
  device: "mobile" | "pc" | "all";
  position: "home-main" | "home-mid" | "category";
};

export type AdminEvent = {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
  status: "scheduled" | "live" | "ended";
  linkedDealIds: number[];
  heroImageUrl: string;
};

export const adminCategories: AdminCategoryRow[] = categories.map((category, index) => ({
  slug: category.slug,
  name: category.name,
  visible: true,
  displayOrder: index + 1,
  subcategories: category.subcategories.map((subcategory, subIndex) => ({
    name: subcategory,
    visible: true,
    displayOrder: subIndex + 1,
  })),
  connectedRoutes: ["/", "/search", `/category/${category.slug}`],
}));

export const adminBanners: AdminBanner[] = [
  {
    id: "BN-HOME-001",
    title: "오늘 24시 마감 공동구매",
    imageUrl: "fallback://wadeal/home-deadline",
    mobileImageUrl: "fallback://wadeal/mobile/home-deadline",
    pcImageUrl: "fallback://wadeal/pc/home-deadline",
    linkUrl: "/search?sort=deadline",
    startsAt: "2026.05.29 00:00",
    endsAt: "2026.05.29 23:59",
    visible: true,
    device: "all",
    position: "home-main",
  },
  {
    id: "BN-HOME-002",
    title: "첫 구매 쿠폰팩",
    imageUrl: "fallback://wadeal/coupon-pack",
    mobileImageUrl: "fallback://wadeal/mobile/coupon-pack",
    pcImageUrl: "fallback://wadeal/pc/coupon-pack",
    linkUrl: "/mypage/coupons",
    startsAt: "2026.05.29 00:00",
    endsAt: "2026.06.30 23:59",
    visible: true,
    device: "mobile",
    position: "home-mid",
  },
  {
    id: "BN-CAT-001",
    title: "식품 산지직송 특가",
    imageUrl: "fallback://wadeal/category-fresh",
    mobileImageUrl: "fallback://wadeal/mobile/category-fresh",
    pcImageUrl: "fallback://wadeal/pc/category-fresh",
    linkUrl: "/category/fresh-food",
    startsAt: "2026.06.01 00:00",
    endsAt: "2026.06.15 23:59",
    visible: false,
    device: "all",
    position: "category",
  },
];

export const adminEvents: AdminEvent[] = [
  {
    id: "EVT-202605-DEADLINE",
    title: "오늘 마감 공동구매 기획전",
    description: "마감 시간이 가까운 상품을 모아 전환율을 높이는 운영 기획전입니다.",
    startsAt: "2026.05.29 00:00",
    endsAt: "2026.05.29 23:59",
    status: "live",
    linkedDealIds: [1, 8, 2],
    heroImageUrl: "fallback://wadeal/events/deadline",
  },
  {
    id: "EVT-202606-BABY",
    title: "육아 필수템 공동구매",
    description: "출산/육아 카테고리 신규 회원 타깃 기획전입니다.",
    startsAt: "2026.06.01 00:00",
    endsAt: "2026.06.14 23:59",
    status: "scheduled",
    linkedDealIds: [3, 6],
    heroImageUrl: "fallback://wadeal/events/baby",
  },
  {
    id: "EVT-202605-OPEN",
    title: "오픈 기념 웰컴딜",
    description: "오픈 초기 웰컴 쿠폰과 연결된 종료 기획전입니다.",
    startsAt: "2026.05.01 00:00",
    endsAt: "2026.05.20 23:59",
    status: "ended",
    linkedDealIds: [4, 5],
    heroImageUrl: "fallback://wadeal/events/open",
  },
];

export function getVisibleHomeBanners() {
  return adminBanners.filter((banner) => banner.visible && banner.position.startsWith("home"));
}

export function getEventDeals(event: AdminEvent) {
  return event.linkedDealIds
    .map((id) => deals.find((deal) => deal.id === id))
    .filter((deal) => deal !== undefined);
}

export type Deal = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  originalPrice: number;
  currentPrice: number;
  lowestPrice: number;
  participants: number;
  targetParticipants: number;
  endsIn: string;
  badge: string;
};

export const deals: Deal[] = [
  {
    id: 1,
    title: "제주 감귤 3kg 산지직송",
    subtitle: "오늘 수확, 내일 도착",
    image: "🍊",
    originalPrice: 22900,
    currentPrice: 14900,
    lowestPrice: 12900,
    participants: 86,
    targetParticipants: 120,
    endsIn: "02:18:44",
    badge: "실시간 인기",
  },
  {
    id: 2,
    title: "프리미엄 한우 불고기 600g",
    subtitle: "냉장 배송 특가",
    image: "🥩",
    originalPrice: 39800,
    currentPrice: 27900,
    lowestPrice: 24900,
    participants: 51,
    targetParticipants: 80,
    endsIn: "04:52:11",
    badge: "최저가 임박",
  },
  {
    id: 3,
    title: "국내산 대용량 물티슈 20팩",
    subtitle: "육아 필수템 공동구매",
    image: "🧻",
    originalPrice: 31900,
    currentPrice: 19900,
    lowestPrice: 17900,
    participants: 142,
    targetParticipants: 200,
    endsIn: "07:05:29",
    badge: "생활특가",
  },
  {
    id: 4,
    title: "성수동 디카페인 콜드브루 12병",
    subtitle: "카페 납품 원두 사용",
    image: "☕",
    originalPrice: 36000,
    currentPrice: 23900,
    lowestPrice: 21900,
    participants: 68,
    targetParticipants: 100,
    endsIn: "11:41:02",
    badge: "신규 오픈",
  },
];

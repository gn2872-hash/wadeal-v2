export type Category = {
  slug: string;
  name: string;
  icon: string;
  description: string;
  featuredSubcategories: string[];
  subcategories: string[];
};

export const categories: Category[] = [
  {
    slug: "fresh-food",
    name: "식품",
    icon: "🥬",
    description: "산지직송, 신선식품, 간편식 공동구매",
    featuredSubcategories: ["과일", "정육", "수산", "간편식"],
    subcategories: ["과일", "채소", "쌀/잡곡", "정육", "수산", "반찬", "간편식", "건강식품", "커피/음료", "베이커리"],
  },
  {
    slug: "household",
    name: "생활용품",
    icon: "🧴",
    description: "대용량 생필품과 매일 쓰는 생활 필수품",
    featuredSubcategories: ["물티슈", "세제", "화장지", "청소용품"],
    subcategories: ["화장지", "물티슈", "세제", "청소용품", "욕실용품", "위생용품", "수납/정리", "생활잡화"],
  },
  {
    slug: "beauty",
    name: "뷰티",
    icon: "💄",
    description: "스킨케어, 메이크업, 헤어/바디 특가",
    featuredSubcategories: ["스킨케어", "마스크팩", "헤어", "바디"],
    subcategories: ["스킨케어", "마스크팩", "선케어", "메이크업", "클렌징", "헤어케어", "바디케어", "향수"],
  },
  {
    slug: "baby",
    name: "출산/육아",
    icon: "🍼",
    description: "기저귀, 분유, 유아식, 육아 필수템",
    featuredSubcategories: ["기저귀", "분유", "유아식", "장난감"],
    subcategories: ["기저귀", "분유", "물티슈", "유아식", "수유용품", "목욕/위생", "장난감", "유아동패션"],
  },
  {
    slug: "pet",
    name: "반려동물",
    icon: "🐾",
    description: "사료, 간식, 배변용품, 반려 생활용품",
    featuredSubcategories: ["강아지사료", "고양이사료", "간식", "모래"],
    subcategories: ["강아지사료", "고양이사료", "간식", "배변용품", "모래", "미용/목욕", "하우스", "장난감"],
  },
  {
    slug: "fashion",
    name: "패션",
    icon: "👟",
    description: "의류, 신발, 잡화 시즌 공동구매",
    featuredSubcategories: ["여성의류", "남성의류", "신발", "가방"],
    subcategories: ["여성의류", "남성의류", "언더웨어", "신발", "가방", "시계/주얼리", "패션소품", "키즈패션"],
  },
  {
    slug: "digital",
    name: "가전/디지털",
    icon: "🎧",
    description: "생활가전, 디지털 액세서리, 스마트기기",
    featuredSubcategories: ["이어폰", "충전기", "생활가전", "주방가전"],
    subcategories: ["이어폰", "충전기", "모바일액세서리", "PC주변기기", "생활가전", "주방가전", "카메라", "스마트기기"],
  },
  {
    slug: "home-living",
    name: "홈/인테리어",
    icon: "🛋️",
    description: "가구, 침구, 조명, 집 꾸미기 상품",
    featuredSubcategories: ["침구", "수납", "주방", "조명"],
    subcategories: ["침구", "커튼", "가구", "수납", "주방용품", "식기", "조명", "홈데코"],
  },
  {
    slug: "sports",
    name: "스포츠/레저",
    icon: "🏕️",
    description: "운동, 캠핑, 여행을 위한 공동구매",
    featuredSubcategories: ["캠핑", "헬스", "골프", "등산"],
    subcategories: ["캠핑", "헬스", "요가", "골프", "등산", "자전거", "수영", "여행용품"],
  },
  {
    slug: "kitchen",
    name: "주방용품",
    icon: "🍳",
    description: "조리도구, 식기, 보관용기, 주방 소모품",
    featuredSubcategories: ["프라이팬", "보관용기", "식기", "칼/도마"],
    subcategories: ["프라이팬", "냄비", "칼/도마", "보관용기", "식기", "컵/텀블러", "주방수납", "주방소모품"],
  },
  {
    slug: "travel",
    name: "여행/티켓",
    icon: "✈️",
    description: "숙박, 입장권, 체험권, 여행 준비물",
    featuredSubcategories: ["숙박", "입장권", "체험", "여행용품"],
    subcategories: ["숙박", "입장권", "체험", "렌터카", "여행용품", "면세", "지역특가"],
  },
  {
    slug: "book-hobby",
    name: "도서/취미",
    icon: "📚",
    description: "도서, 문구, 완구, 취미 생활",
    featuredSubcategories: ["도서", "문구", "완구", "DIY"],
    subcategories: ["도서", "문구", "완구", "DIY", "악기", "보드게임", "굿즈"],
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

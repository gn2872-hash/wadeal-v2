export type UserRole = "buyer" | "seller" | "admin";

export type MockUser = {
  id: string;
  name: string;
  role: UserRole;
  sellerStatus?: "pending" | "approved" | "suspended";
};

export type AccessState = {
  allowed: boolean;
  title: string;
  description: string;
};

export const mockUsers: Record<UserRole | "pendingSeller", MockUser> = {
  buyer: { id: "buyer-1", name: "김가나", role: "buyer" },
  seller: {
    id: "seller-1",
    name: "제주하루농장",
    role: "seller",
    sellerStatus: "approved",
  },
  pendingSeller: {
    id: "seller-2",
    name: "입점대기상점",
    role: "seller",
    sellerStatus: "pending",
  },
  admin: { id: "admin-1", name: "Wadeal 운영자", role: "admin" },
};

// Supabase auth가 붙기 전까지 라우트별 목업 세션을 사용한다.
export function getMockUser(mode: "buyer" | "seller" | "pendingSeller" | "admin") {
  return mockUsers[mode];
}

export function canAccessSeller(user: MockUser): AccessState {
  if (user.role === "admin") {
    return {
      allowed: true,
      title: "관리자 대리 접근",
      description: "관리자는 운영 점검 목적으로 판매자 화면을 확인할 수 있습니다.",
    };
  }

  if (user.role !== "seller") {
    return {
      allowed: false,
      title: "판매자 권한 필요",
      description: "구매자 계정은 판매자 기능에 접근할 수 없습니다.",
    };
  }

  if (user.sellerStatus !== "approved") {
    return {
      allowed: false,
      title: "입점 승인 대기",
      description: "미승인 판매자는 상품, 주문, 정산 기능을 사용할 수 없습니다.",
    };
  }

  return {
    allowed: true,
    title: "승인된 판매자",
    description: "상품 등록, 주문 처리, 정산 확인 기능을 사용할 수 있습니다.",
  };
}

export function canAccessAdmin(user: MockUser): AccessState {
  if (user.role !== "admin") {
    return {
      allowed: false,
      title: "관리자 권한 필요",
      description: "관리자 기능은 admin 역할에서만 접근할 수 있습니다.",
    };
  }

  return {
    allowed: true,
    title: "관리자 권한 확인",
    description: "승인, 환불, 정산, 신고, 카테고리 관리 기능을 사용할 수 있습니다.",
  };
}

export function assertSellerAccess(user: MockUser) {
  const access = canAccessSeller(user);

  if (!access.allowed) {
    throw new Error(access.title);
  }
}

export function assertAdminAccess(user: MockUser) {
  const access = canAccessAdmin(user);

  if (!access.allowed) {
    throw new Error(access.title);
  }
}

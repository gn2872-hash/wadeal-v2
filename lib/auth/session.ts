import { getMockUser } from "@/lib/auth/roles";

export type AuthSession = {
  uid: string;
  email: string;
  name: string;
  authenticated: boolean;
};

export function getMockAuthSession(): AuthSession {
  const buyer = getMockUser("buyer");

  return {
    uid: buyer.id,
    email: "gana@example.com",
    name: buyer.name,
    authenticated: true,
  };
}

export function requireAuthSession() {
  const session = getMockAuthSession();

  if (!session.authenticated || !session.uid) {
    throw new Error("로그인이 필요한 기능입니다.");
  }

  return session;
}

export function assertOwnUser(targetUserId: string) {
  const session = requireAuthSession();

  if (session.uid !== targetUserId) {
    throw new Error("다른 사용자의 정보는 조회하거나 수정할 수 없습니다.");
  }

  return session;
}

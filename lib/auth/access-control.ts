import type { MockUser } from "@/lib/auth/roles";

export type RouteArea = "public" | "buyer" | "seller" | "admin";

export type RouteAccessResult = {
  allowed: boolean;
  reason: string;
};

export function evaluateRouteAccess({
  user,
  area,
}: {
  user: MockUser | null;
  area: RouteArea;
}): RouteAccessResult {
  if (area === "public") {
    return { allowed: true, reason: "public route" };
  }

  if (!user) {
    return { allowed: false, reason: "login required" };
  }

  if (area === "buyer") {
    return user.role === "buyer"
      ? { allowed: true, reason: "buyer access granted" }
      : { allowed: false, reason: "buyer route requires buyer role" };
  }

  if (area === "seller") {
    if (user.role !== "seller") {
      return { allowed: false, reason: "seller route requires seller role" };
    }

    if (user.sellerStatus !== "approved") {
      return { allowed: false, reason: `seller status ${user.sellerStatus ?? "unknown"} is restricted` };
    }

    return { allowed: true, reason: "approved seller access granted" };
  }

  if (area === "admin") {
    return user.role === "admin"
      ? { allowed: true, reason: "admin access granted" }
      : { allowed: false, reason: "admin route requires admin role" };
  }

  return { allowed: false, reason: "unknown route area" };
}

export const openingQaAccessMatrix = [
  { scenario: "guest -> buyer", user: null, area: "buyer" as const, expected: false },
  { scenario: "guest -> seller", user: null, area: "seller" as const, expected: false },
  { scenario: "guest -> admin", user: null, area: "admin" as const, expected: false },
  { scenario: "buyer -> seller", user: "buyer", area: "seller" as const, expected: false },
  { scenario: "buyer -> admin", user: "buyer", area: "admin" as const, expected: false },
  { scenario: "seller -> admin", user: "seller", area: "admin" as const, expected: false },
  { scenario: "pending seller -> seller", user: "pendingSeller", area: "seller" as const, expected: false },
  { scenario: "approved seller -> seller", user: "seller", area: "seller" as const, expected: true },
  { scenario: "admin -> admin", user: "admin", area: "admin" as const, expected: true },
];

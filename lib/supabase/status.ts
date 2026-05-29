export type SupabaseReadiness = {
  readyForClient: boolean;
  readyForServer: boolean;
  missing: string[];
  fallbackMessage: string;
};

export function getSupabaseReadiness(): SupabaseReadiness {
  const requiredClientKeys = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  ];
  const requiredServerKeys = ["SUPABASE_SERVICE_ROLE_KEY"];
  const missing = [...requiredClientKeys, ...requiredServerKeys].filter(
    (key) => !process.env[key],
  );

  return {
    readyForClient: requiredClientKeys.every((key) => Boolean(process.env[key])),
    readyForServer: requiredServerKeys.every((key) => Boolean(process.env[key])),
    missing,
    fallbackMessage:
      missing.length > 0
        ? "Supabase 환경변수가 없어 mock auth.uid와 안전한 준비 중 UI를 사용합니다."
        : "Supabase 환경변수가 준비되었습니다. 실제 RLS/auth.uid 검증으로 교체할 수 있습니다.",
  };
}

export const mypageRequiredTables = [
  "profiles",
  "user_addresses",
  "payment_methods",
  "coupons",
  "user_coupons",
  "points_ledger",
  "orders",
  "reviews",
  "wishlists",
];

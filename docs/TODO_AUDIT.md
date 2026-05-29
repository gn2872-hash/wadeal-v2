# Wadeal TODO Audit

## Build and route audit

- `npm run build`: PASS
- Generated routes: 74
- TypeScript/import/server action errors: none in latest build

## Must fix before production

1. Supabase schema and RLS are not connected.
2. Route-level middleware for guest/buyer/seller/admin enforcement is not active.
3. Server actions use mock session/role guards and must be replaced with real auth.
4. Toss Confirm/Cancel/Webhook calls are fallback-only without production secrets.
5. Kakao production OAuth is not present in this repo.
6. Storage upload E2E for banners/products/reviews is not connected.
7. Coupon and point application in checkout is UI/structure only.
8. Seller/admin mutations are not persisted to DB.

## Ready for UI QA

- Buyer discovery and purchase fallback flows
- Product detail and review/inquiry fallback flows
- Buyer mypage management screens
- Seller center operation screens
- Admin commerce operation screens

## Reference

- `docs/QA_REPORT_2026-05-30.md`
- `docs/DEFERRED_ISSUES.md`
- `docs/work-queue.json`

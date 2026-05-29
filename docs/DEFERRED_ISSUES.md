# Deferred Issues

Wadeal currently uses safe mock/fallback data for buyer mypage flows until Supabase
auth, RLS, and tables are connected.

## Buyer mypage

- Replace mock auth in `lib/auth/session.ts` with Supabase `auth.uid()`.
- Add RLS policies so users can only read/write their own profile, addresses,
  coupons, points, wishlists, reviews, and payment method metadata.
- Create or verify these tables before enabling persistence:
  - `profiles`
  - `user_addresses`
  - `payment_methods`
  - `coupons`
  - `user_coupons`
  - `points_ledger`
  - `orders`
  - `reviews`
  - `wishlists`
- Connect `/mypage/coupons` coupon selection to checkout state.
- Connect `/mypage/points` point reservation to checkout and refund reversal.
- Replace payment method fallback with Toss/PG tokenized payment method storage.
- Add server-side error UI for failed profile/address/coupon/point mutations.

## Security

- Never trust a client-submitted `userId` after Supabase is connected.
- Derive the target user from the authenticated session on the server.
- Keep admin-only access separate from buyer mypage routes.


## Admin commerce operations

- Persist `lib/admin-commerce.ts` fallback data into Supabase tables for
  categories, banners, events, and operational coupons.
- Add RLS/admin policies so only admin users can mutate commerce operation data.
- Connect `adminCoupons` to buyer `/mypage/coupons` and checkout coupon selection
  with server-side validation of audience, period, product/category restriction,
  minimum order amount, issue limit, and usage count.
- Replace banner fallback URLs with uploaded assets and storage access policies.
- Add audit logs for category visibility/order changes, banner publish changes,
  event publish changes, and coupon pause/delete actions.


## Seller center

- Replace `lib/seller` fallback data with seller-scoped Supabase queries.
- Add RLS policies so approved sellers can only read/write their own products,
  product requests, orders, reviews, inquiries, refunds, settlements, and alerts.
- Replace `requireApprovedSeller` mock guard with Supabase session + seller status
  checks for `pending`, `rejected`, `suspended`, and `approved` sellers.
- Persist product request discount tiers, images, options, stock, delivery info,
  rejection reasons, and resubmission history.
- Persist seller order memos, invoice numbers, delivery state changes, and CS replies
  with audit logs.
- Connect settlement payout status to admin settlement confirmation and payment runs.


## Opening QA risks

- Add production Vercel env before deployment:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `NEXT_PUBLIC_TOSS_CLIENT_KEY`
  - `TOSS_SECRET_KEY`
  - `TOSS_WEBHOOK_SECRET`
  - `NEXT_PUBLIC_SITE_URL`
- Configure Kakao production OAuth app keys and callback URLs if Kakao login is in scope.
- Add route-level middleware or server layout guards for guest/buyer/seller/admin access.
- Verify Supabase RLS for profiles, orders, seller data, admin operation data, coupons,
  points, reviews, inquiries, wishlists, and storage objects.
- Verify Storage upload E2E for product images, detail images, banners, review images,
  and seller documents.
- Verify Toss Confirm, Cancel, and Webhook flows in test mode before using live keys.
- Keep push/Vercel production deployment pending until QA report deferred items are closed.


## Pre-deploy deferred items

- Vercel env is not verified from this Cloud environment because Vercel CLI is not installed in PATH.
- Current Cloud env is missing Supabase, Toss, Kakao, and `NEXT_PUBLIC_SITE_URL` keys.
- Supabase migration 030-045 status cannot be verified because migration files are not present in this repository checkout.
- Supabase RLS and Storage bucket policies must be verified externally before production deploy.
- Toss live payment/cancel/webhook must remain disabled until keys and webhook verification pass in test mode.
- Kakao production OAuth and Kakao notification sending are not configured in this checkout.
- Production deploy is pending explicit user instruction: `진짜 배포해`.


## Post-deploy QA blocker

- Production deployment URL currently returns Vercel HTTP 401 Authentication Required:
  `https://wadeal-v2-879rzws66-kimgome0222-2396s-projects.vercel.app`
- Real buyer/seller/admin/mobile QA is blocked until Vercel Deployment Protection
  is disabled or a valid bypass/auth method is provided.
- After public access is fixed, rerun `docs/POST_DEPLOY_QA.md` checklist against
  the same production URL or the current aliased production domain.

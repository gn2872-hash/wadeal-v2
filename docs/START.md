# Wadeal START

## Current branch status

Wadeal is in a mobile-first commercial UI/fallback QA phase. The current codebase
builds successfully and includes buyer, seller, admin, payment/refund/order,
notification, product detail, and mypage scaffolding.

## Verified command

```bash
npm run build
```

Latest QA result: PASS. See `docs/QA_REPORT_2026-05-30.md`.

## Current implementation baseline

- Buyer discovery: home, search, categories, category detail, product detail.
- Buyer purchase flow: cart, checkout, Toss fallback panel, success/fail callback,
  order complete, order detail, refund request.
- Buyer account: `/mypage` profile, addresses, orders, reviews, wishlist, coupons,
  points, payment methods, support.
- Seller center: dashboard, product requests, products, orders, reviews, support,
  settlements, notifications.
- Admin center: dashboard, orders, refunds, categories, banners, events, coupons,
  product/seller/refund/report/support/settlement management fallback UI.

## Next work

1. Add Supabase schema and RLS for buyer/seller/admin scoped data.
2. Replace mock auth/session with Supabase `auth.uid()` derived server checks.
3. Configure Vercel env for Supabase, Toss, site URL, and OAuth.
4. Run Toss test mode confirm/cancel/webhook E2E.
5. Connect image upload for product, banner, review assets to storage policies.
6. Run real mobile visual QA before production launch.

## Do not do yet

- Do not run production Vercel deployment until env/RLS/payment checklist is done.
- Do not enable live payments until Toss live key, webhook, and cancel API are verified.
- Do not trust client-submitted `userId`; server must derive user from session.


## Deployment readiness snapshot

- Latest deploy readiness build: `npm run build` PASS
- Actual Cloud path: `/workspace`
- Local requested path `~/Documents/wadeal-v2` is not present in this environment
- Vercel production deploy is intentionally pending user approval
- Required env and Supabase RLS/storage checks are documented in `docs/PRE_DEPLOY_CHECKLIST.md`
- Current production readiness verdict: UI/build ready, production external integrations deferred


## Post-deploy QA status

- Vercel deployment was created successfully by GitHub/Vercel integration.
- Production URL: `https://wadeal-v2-879rzws66-kimgome0222-2396s-projects.vercel.app`
- Public route access is blocked by Vercel Authentication Required (HTTP 401).
- Next task: disable/provide bypass for Vercel Deployment Protection and rerun
  buyer/seller/admin/mobile QA using `docs/POST_DEPLOY_QA.md`.

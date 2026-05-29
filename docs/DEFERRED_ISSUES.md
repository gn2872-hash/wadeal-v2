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

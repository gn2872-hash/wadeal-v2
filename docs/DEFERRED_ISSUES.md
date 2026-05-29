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

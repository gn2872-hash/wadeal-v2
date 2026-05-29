import Link from "next/link";
import { notFound } from "next/navigation";

import { submitProductInquiryAction } from "@/app/actions/inquiries";
import { submitReviewAction } from "@/app/actions/reviews";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import { getProductBySlug, getProducts, getRecommendedProducts } from "@/lib/products";
import {
  canWriteReview,
  getProductInquiries,
  getProductReviews,
  getReviewSummary,
  type ReviewSort,
} from "@/lib/reviews";
import { formatWon } from "@/lib/format";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const tabs = [
  ["description", "상품설명"],
  ["delivery", "배송/교환/환불"],
  ["reviews", "리뷰"],
  ["inquiries", "문의"],
  ["seller", "판매자"],
] as const;

function getParam(params: Record<string, string | string[] | undefined>, key: string) {
  const value = params[key];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function makeHref(slug: string, tab: string, sort?: string) {
  const query = new URLSearchParams({ tab });
  if (sort) query.set("reviewSort", sort);
  return `/products/${slug}?${query.toString()}`;
}

function StarRating({ value }: { value: number }) {
  return <span className="font-black text-amber-500">★ {value.toFixed(1)}</span>;
}

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({ params, searchParams }: ProductDetailPageProps) {
  const { slug } = await params;
  const query = (await searchParams) ?? {};
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const activeTab = getParam(query, "tab") || "description";
  const reviewSort = (getParam(query, "reviewSort") || "latest") as ReviewSort;
  const progress = Math.min(100, Math.round((product.deal.participants / product.deal.targetParticipants) * 100));
  const remainingUsers = Math.max(0, product.deal.targetParticipants - product.deal.participants);
  const remainingStock = Math.max(0, product.stock);
  const reviews = getProductReviews(product.slug, reviewSort);
  const reviewSummary = getReviewSummary(product.slug);
  const inquiries = getProductInquiries(product.slug);
  const recommendations = getRecommendedProducts(product);
  const reviewPermission = canWriteReview({
    role: "buyer",
    hasPurchased: true,
    confirmedAt: new Date().toISOString(),
    alreadyReviewed: false,
  });

  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-40 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="overflow-hidden rounded-2xl border border-wadeal-line bg-white">
          <div className="relative grid min-h-[300px] place-items-center bg-gray-100 text-[120px]">
            <span aria-hidden="true">{product.images[0] || product.deal.image || "🛒"}</span>
            <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-black text-wadeal-red shadow-soft">
              {product.deal.badge}
            </div>
            <div className="absolute bottom-3 right-3 flex gap-2">
              {product.images.slice(0, 3).map((image, index) => (
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-2xl shadow-soft" key={`${image}-${index}`}>{image}</span>
              ))}
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-black text-wadeal-red">{product.deal.categoryName} &gt; {product.deal.subcategory}</p>
              <span className="rounded-full bg-gray-100 px-2 py-1 text-[11px] font-black text-gray-600">{product.deal.deliveryBadge}</span>
            </div>
            <h1 className="mt-2 text-2xl font-black leading-8 text-wadeal-ink">{product.deal.title}</h1>
            <p className="mt-2 text-sm font-bold leading-5 text-wadeal-muted">{product.deal.subtitle}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-bold text-wadeal-muted">
              <StarRating value={product.deal.rating} />
              <span>리뷰 {product.deal.reviewCount.toLocaleString("ko-KR")}개</span>
              <span>·</span>
              <span>구매 {product.soldCount.toLocaleString("ko-KR")}개</span>
            </div>

            <div className="mt-4 rounded-2xl bg-red-50 p-4">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-black text-wadeal-red">공동구매가</span>
                <span className="text-3xl font-black text-wadeal-ink">{formatWon(product.deal.currentPrice)}</span>
              </div>
              <p className="mt-1 text-sm font-bold text-gray-400 line-through">정상가 {formatWon(product.deal.originalPrice)}</p>
              <div className="mt-3 flex items-center justify-between text-xs font-black">
                <span>{product.deal.participants}명 참여 / {product.deal.targetParticipants}명 목표</span>
                <span className="text-wadeal-red">{progress}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
                <div className="h-full rounded-full bg-wadeal-red" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold text-wadeal-muted">
                <div className="rounded-xl bg-white p-3">남은 시간 <strong className="block pt-1 text-wadeal-ink">{product.deal.endsIn}</strong></div>
                <div className="rounded-xl bg-white p-3">남은 수량 <strong className="block pt-1 text-wadeal-ink">{remainingStock}개</strong></div>
              </div>
            </div>

            <section className="mt-4 rounded-2xl border border-wadeal-line p-4" aria-label="목표 인원별 할인 가격">
              <h2 className="text-sm font-black text-wadeal-ink">목표 인원별 할인 가격</h2>
              <div className="mt-3 space-y-2">
                {product.discountTiers.map((tier) => {
                  const reached = product.deal.participants >= tier.participants;
                  return (
                    <div className={`flex items-center justify-between rounded-xl p-3 ${reached ? "bg-red-50" : "bg-gray-50"}`} key={tier.participants}>
                      <div>
                        <p className="text-xs font-black text-wadeal-ink">{tier.label}</p>
                        <p className="mt-1 text-[11px] font-bold text-wadeal-muted">{tier.participants}명 달성</p>
                      </div>
                      <span className={reached ? "text-sm font-black text-wadeal-red" : "text-sm font-black text-wadeal-ink"}>{formatWon(tier.price)}</span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 text-xs font-bold text-wadeal-muted">최저가까지 {remainingUsers}명 남았습니다.</p>
            </section>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="h-11 rounded-xl border border-wadeal-line text-sm font-black text-wadeal-ink" type="button">♡ 찜하기</button>
              <button className="h-11 rounded-xl border border-wadeal-line text-sm font-black text-wadeal-ink" type="button">공유하기</button>
            </div>
          </div>
        </section>

        <nav className="sticky top-[65px] z-10 flex gap-2 overflow-x-auto rounded-2xl border border-wadeal-line bg-white p-2 no-scrollbar" aria-label="상품 상세 탭">
          {tabs.map(([value, label]) => (
            <Link className={`shrink-0 rounded-full px-3 py-2 text-xs font-black ${activeTab === value ? "bg-wadeal-red text-white" : "bg-gray-100 text-gray-600"}`} href={makeHref(product.slug, value)} key={value}>{label}</Link>
          ))}
        </nav>

        {activeTab === "description" ? (
          <section className="space-y-3 rounded-2xl border border-wadeal-line bg-white p-4">
            <h2 className="text-lg font-black text-wadeal-ink">상품 설명</h2>
            <p className="text-sm font-bold leading-6 text-wadeal-muted">{product.description}</p>
            {product.detailSections.map((section) => (
              <div className="rounded-xl bg-gray-50 p-4" key={section.title}>
                <h3 className="text-base font-black text-wadeal-ink">{section.title}</h3>
                <p className="mt-2 text-sm font-bold leading-6 text-wadeal-muted">{section.body}</p>
              </div>
            ))}
            <div className="grid gap-3">
              {product.images.map((image, index) => (
                <div className="grid min-h-56 place-items-center rounded-2xl bg-gray-100 text-7xl" key={`${image}-detail-${index}`}>{image || "🛒"}</div>
              ))}
            </div>
          </section>
        ) : null}

        {activeTab === "delivery" ? (
          <section className="space-y-3 rounded-2xl border border-wadeal-line bg-white p-4">
            <h2 className="text-lg font-black text-wadeal-ink">배송/교환/환불 안내</h2>
            <div className="rounded-xl bg-gray-50 p-4"><h3 className="text-sm font-black text-wadeal-ink">배송 안내</h3><p className="mt-2 text-sm font-bold leading-6 text-wadeal-muted">{product.deliveryInfo}</p></div>
            <div className="rounded-xl bg-gray-50 p-4"><h3 className="text-sm font-black text-wadeal-ink">교환/환불</h3><p className="mt-2 text-sm font-bold leading-6 text-wadeal-muted">{product.exchangeRefundInfo}</p></div>
          </section>
        ) : null}

        {activeTab === "reviews" ? (
          <section className="space-y-4 rounded-2xl border border-wadeal-line bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-wadeal-ink">리뷰</h2>
                <p className="mt-1 text-xs font-bold text-wadeal-muted">구매 확정 후 15일 이내 작성 가능</p>
              </div>
              <div className="text-right"><StarRating value={reviewSummary.average} /><p className="text-xs font-bold text-wadeal-muted">{reviewSummary.count}개 리뷰</p></div>
            </div>
            <div className="space-y-1">
              {reviewSummary.distribution.map((item) => (
                <div className="grid grid-cols-[40px_1fr_28px] items-center gap-2 text-xs font-bold" key={item.rating}>
                  <span>{item.rating}점</span><div className="h-2 overflow-hidden rounded-full bg-gray-100"><div className="h-full bg-amber-400" style={{ width: `${reviewSummary.count ? (item.count / reviewSummary.count) * 100 : 0}%` }} /></div><span>{item.count}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {[['latest','최신순'], ['rating-high','별점 높은순'], ['rating-low','낮은순']].map(([value,label]) => (
                <Link className={`shrink-0 rounded-full px-3 py-2 text-xs font-black ${reviewSort === value ? "bg-wadeal-red text-white" : "bg-gray-100 text-gray-600"}`} href={makeHref(product.slug, 'reviews', value)} key={value}>{label}</Link>
              ))}
            </div>
            <form action={submitReviewAction} className="rounded-xl bg-gray-50 p-3">
              <input name="productSlug" type="hidden" value={product.slug} />
              <p className="text-sm font-black text-wadeal-ink">리뷰 작성</p>
              <p className={`mt-1 text-xs font-bold ${reviewPermission.allowed ? "text-wadeal-red" : "text-wadeal-muted"}`}>{reviewPermission.reason}</p>
              <div className="mt-3 grid grid-cols-[96px_1fr] gap-2">
                <select className="h-10 rounded-xl bg-white px-3 text-xs font-bold outline-none" name="rating" defaultValue="5"><option value="5">5점</option><option value="4">4점</option><option value="3">3점</option><option value="2">2점</option><option value="1">1점</option></select>
                <input className="h-10 rounded-xl bg-white px-3 text-xs font-bold outline-none" name="imageLabel" placeholder="이미지 리뷰 UI 준비" />
              </div>
              <textarea className="mt-2 min-h-20 w-full rounded-xl bg-white p-3 text-xs font-bold outline-none" name="content" placeholder="상품 리뷰를 입력하세요" />
              <button className="mt-2 h-10 w-full rounded-xl bg-wadeal-red text-xs font-black text-white" disabled={!reviewPermission.allowed} type="submit">리뷰 등록</button>
            </form>
            {reviews.length > 0 ? reviews.map((review) => (
              <article className="rounded-xl bg-gray-50 p-3" key={review.id}>
                <div className="flex justify-between"><div><StarRating value={review.rating} /><p className="mt-1 text-xs font-bold text-wadeal-muted">{review.buyer} · {review.createdAt}</p></div></div>
                <p className="mt-3 text-sm font-bold leading-6 text-wadeal-ink">{review.content}</p>
                {review.images.length > 0 ? <div className="mt-3 flex gap-2">{review.images.map((image) => <span className="grid h-14 w-14 place-items-center rounded-xl bg-white text-2xl" key={image}>{image}</span>)}</div> : null}
                {review.sellerReply ? <div className="mt-3 rounded-xl bg-white p-3"><p className="text-xs font-black text-wadeal-red">판매자 답글</p><p className="mt-1 text-sm font-bold text-wadeal-muted">{review.sellerReply}</p></div> : null}
              </article>
            )) : <div className="rounded-xl border border-dashed border-wadeal-line p-6 text-center"><p className="text-sm font-black text-wadeal-ink">아직 리뷰가 없어요</p><p className="mt-1 text-xs font-bold text-wadeal-muted">첫 구매 후 리뷰를 남겨보세요.</p></div>}
          </section>
        ) : null}

        {activeTab === "inquiries" ? (
          <section className="space-y-4 rounded-2xl border border-wadeal-line bg-white p-4">
            <h2 className="text-lg font-black text-wadeal-ink">상품 문의</h2>
            <form action={submitProductInquiryAction} className="rounded-xl bg-gray-50 p-3">
              <input name="productSlug" type="hidden" value={product.slug} />
              <label className="flex items-center gap-2 text-xs font-bold text-wadeal-muted"><input className="accent-wadeal-red" name="isSecret" type="checkbox" />비밀글로 문의하기</label>
              <textarea className="mt-2 min-h-20 w-full rounded-xl bg-white p-3 text-xs font-bold outline-none" name="question" placeholder="구매 전 궁금한 점을 입력하세요" />
              <button className="mt-2 h-10 w-full rounded-xl bg-wadeal-red text-xs font-black text-white" type="submit">문의 등록</button>
              <p className="mt-2 text-xs font-bold text-wadeal-muted">신고/숨김 처리는 관리자 모드 연결 시 적용됩니다.</p>
            </form>
            {inquiries.length > 0 ? inquiries.map((inquiry) => (
              <article className="rounded-xl bg-gray-50 p-3" key={inquiry.id}>
                <div className="flex items-center justify-between"><p className="text-xs font-black text-wadeal-muted">{inquiry.buyer} · {inquiry.createdAt}</p><span className="rounded-full bg-white px-2 py-1 text-[11px] font-black text-gray-600">{inquiry.isSecret ? "비밀글" : "공개"}</span></div>
                <p className="mt-2 text-sm font-bold text-wadeal-ink">Q. {inquiry.isSecret ? "비밀글 문의입니다." : inquiry.question}</p>
                {inquiry.answer ? <p className="mt-2 rounded-xl bg-white p-3 text-sm font-bold text-wadeal-muted">A. {inquiry.answer}</p> : <p className="mt-2 text-xs font-bold text-wadeal-red">판매자 답변 대기</p>}
              </article>
            )) : <div className="rounded-xl border border-dashed border-wadeal-line p-6 text-center"><p className="text-sm font-black text-wadeal-ink">등록된 문의가 없어요</p><p className="mt-1 text-xs font-bold text-wadeal-muted">구매 전 궁금한 점을 문의해보세요.</p></div>}
          </section>
        ) : null}

        {activeTab === "seller" ? (
          <section className="rounded-2xl border border-wadeal-line bg-white p-4">
            <h2 className="text-lg font-black text-wadeal-ink">판매자 정보</h2>
            <div className="mt-3 rounded-xl bg-gray-50 p-4">
              <p className="text-base font-black text-wadeal-ink">{product.sellerInfo.name}</p>
              <p className="mt-1 text-xs font-bold text-wadeal-muted">{product.sellerInfo.businessType}</p>
              <dl className="mt-3 grid grid-cols-3 gap-2 text-center text-xs font-bold"><div><dt className="text-wadeal-muted">평점</dt><dd className="mt-1 text-wadeal-red">{product.sellerInfo.rating}</dd></div><div><dt className="text-wadeal-muted">응답률</dt><dd className="mt-1 text-wadeal-red">{product.sellerInfo.responseRate}%</dd></div><div><dt className="text-wadeal-muted">정시출고</dt><dd className="mt-1 text-wadeal-red">{product.sellerInfo.shippedOnTimeRate}%</dd></div></dl>
            </div>
          </section>
        ) : null}

        <section className="rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-lg font-black text-wadeal-ink">추천 공동구매</h2>
          <p className="mt-1 text-xs font-bold text-wadeal-muted">같은 카테고리, 인기 상품, 최근 본 상품 fallback 기준</p>
          <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar">
            {recommendations.length > 0 ? recommendations.map((item) => (
              <Link className="w-36 shrink-0" href={`/products/${item.slug}`} key={item.slug}>
                <div className="grid h-28 place-items-center rounded-xl bg-gray-100 text-5xl">{item.images[0] || "🛒"}</div>
                <p className="mt-2 line-clamp-2 text-xs font-black leading-4 text-wadeal-ink">{item.deal.title}</p>
                <p className="mt-1 text-xs font-black text-wadeal-red">{formatWon(item.deal.currentPrice)}</p>
              </Link>
            )) : <div className="rounded-xl border border-dashed border-wadeal-line p-6 text-center text-sm font-black text-wadeal-ink">추천 상품 준비 중</div>}
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-[72px] z-20 mx-auto max-w-[480px] border-t border-wadeal-line bg-white p-4 shadow-[0_-8px_20px_rgba(17,24,39,0.08)]">
        <div className="mb-3 flex items-center justify-between"><span className="text-xs font-bold text-wadeal-muted">현재 공동구매가</span><span className="text-xl font-black text-wadeal-ink">{formatWon(product.deal.currentPrice)}</span></div>
        <div className="grid grid-cols-[1fr_1.4fr] gap-2"><Link className="h-12 rounded-xl border border-wadeal-line text-center text-sm font-black leading-[48px] text-wadeal-ink" href="/cart">장바구니 담기</Link><Link className="h-12 rounded-xl bg-wadeal-red text-center text-sm font-black leading-[48px] text-white" href="/checkout">바로 참여하기</Link></div>
      </div>
      <BottomNavigation />
    </main>
  );
}

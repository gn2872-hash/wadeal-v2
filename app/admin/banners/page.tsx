import { deleteBannerAction, saveBannerAction } from "@/app/actions/admin/commerce";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import { adminBanners } from "@/lib/admin-commerce";

export default function AdminBannersPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-wadeal-ink p-5 text-white"><p className="text-xs font-black text-red-200">Admin Banners</p><h1 className="mt-2 text-2xl font-black">배너 관리</h1><p className="mt-2 text-sm font-bold text-gray-200">홈 배너와 구매자 랜딩 영역에 연결 가능한 구조입니다.</p></section>
        <form action={saveBannerAction} className="space-y-3 rounded-2xl border border-wadeal-line bg-white p-4">
          <h2 className="text-base font-black text-wadeal-ink">배너 추가/수정</h2>
          <input className="h-11 w-full rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="title" placeholder="배너명" />
          <input className="h-11 w-full rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="imageUrl" placeholder="이미지 URL 또는 업로드 준비 경로" />
          <input className="h-11 w-full rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="linkUrl" placeholder="링크 URL" />
          <div className="grid grid-cols-2 gap-2"><input className="h-11 rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="startsAt" placeholder="시작일" /><input className="h-11 rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="endsAt" placeholder="종료일" /></div>
          <div className="grid grid-cols-2 gap-2"><select className="h-11 rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="device"><option value="all">모바일/PC</option><option value="mobile">모바일</option><option value="pc">PC</option></select><select className="h-11 rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="visible"><option value="true">노출</option><option value="false">숨김</option></select></div>
          <button className="h-11 w-full rounded-xl bg-wadeal-red text-sm font-black text-white" type="submit">배너 저장</button>
        </form>
        {adminBanners.map((banner) => <article className="rounded-2xl border border-wadeal-line bg-white p-4" key={banner.id}><div className="grid min-h-32 place-items-center rounded-xl bg-gray-100 text-center text-sm font-black text-wadeal-muted">{banner.imageUrl}</div><div className="mt-3 flex items-start justify-between gap-3"><div><p className="text-[11px] font-black text-wadeal-muted">{banner.id} · {banner.position} · {banner.device}</p><h2 className="mt-1 text-base font-black text-wadeal-ink">{banner.title}</h2><p className="mt-1 text-xs font-bold text-wadeal-muted">{banner.startsAt} - {banner.endsAt}</p><p className="mt-1 text-xs font-bold text-wadeal-red">{banner.linkUrl}</p></div><span className="rounded-full bg-gray-100 px-2 py-1 text-[11px] font-black text-gray-600">{banner.visible ? "노출" : "숨김"}</span></div><form action={deleteBannerAction} className="mt-3"><input name="bannerId" type="hidden" value={banner.id} /><button className="h-10 w-full rounded-xl border border-wadeal-line text-xs font-black text-gray-500" type="submit">삭제</button></form></article>)}
      </div>
      <BottomNavigation />
    </main>
  );
}

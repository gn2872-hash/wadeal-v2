import { updateMarketingConsentAction, updateProfileAction, requestAccountDeletionAction } from "@/app/actions/profile/actions";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import { mockBuyerProfile } from "@/lib/account";

export default function ProfilePage() {
  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-wadeal-ink p-5 text-white">
          <p className="text-xs font-black text-red-200">Profile</p>
          <h1 className="mt-2 text-2xl font-black">개인정보 관리</h1>
          <p className="mt-2 text-sm font-bold text-gray-200">DB 컬럼 연결 전에도 수정 UI와 실패 안전 메시지를 검증합니다.</p>
        </section>
        <form action={updateProfileAction} className="space-y-3 rounded-2xl border border-wadeal-line bg-white p-4">
          <input name="userId" type="hidden" value={mockBuyerProfile.userId} />
          {[
            ["이름", "name", mockBuyerProfile.name],
            ["닉네임", "nickname", mockBuyerProfile.nickname],
            ["이메일", "email", mockBuyerProfile.email],
            ["휴대폰 번호", "phone", mockBuyerProfile.phone],
            ["생년월일", "birthDate", mockBuyerProfile.birthDate],
          ].map(([label, name, value]) => (
            <label className="block" key={name}>
              <span className="text-xs font-black text-wadeal-ink">{label}</span>
              <input className="mt-2 h-11 w-full rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name={name} defaultValue={value} />
            </label>
          ))}
          <label className="block">
            <span className="text-xs font-black text-wadeal-ink">성별</span>
            <select className="mt-2 h-11 w-full rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name="gender" defaultValue={mockBuyerProfile.gender}>
              <option value="none">선택 안 함</option><option value="female">여성</option><option value="male">남성</option>
            </select>
          </label>
          <button className="h-11 w-full rounded-xl bg-wadeal-red text-sm font-black text-white" type="submit">개인정보 저장</button>
        </form>
        <form action={updateMarketingConsentAction} className="rounded-2xl border border-wadeal-line bg-white p-4">
          <input name="userId" type="hidden" value={mockBuyerProfile.userId} />
          <h2 className="text-base font-black text-wadeal-ink">마케팅 수신 동의</h2>
          <label className="mt-3 flex items-center gap-2 text-sm font-bold text-wadeal-muted"><input className="accent-wadeal-red" name="marketingEmail" type="checkbox" defaultChecked={mockBuyerProfile.marketingEmail} />이메일 수신 동의</label>
          <label className="mt-2 flex items-center gap-2 text-sm font-bold text-wadeal-muted"><input className="accent-wadeal-red" name="marketingSms" type="checkbox" defaultChecked={mockBuyerProfile.marketingSms} />SMS 수신 동의</label>
          <button className="mt-3 h-10 w-full rounded-xl border border-wadeal-line text-xs font-black text-wadeal-ink" type="submit">동의 설정 저장</button>
        </form>
        <form action={requestAccountDeletionAction} className="rounded-2xl border border-red-100 bg-red-50 p-4">
          <input name="userId" type="hidden" value={mockBuyerProfile.userId} />
          <h2 className="text-base font-black text-wadeal-red">계정 탈퇴 준비</h2>
          <p className="mt-2 text-xs font-bold leading-5 text-red-500">주문/정산/환불 데이터 보존 정책 연결 전까지 준비 중 UI로 표시합니다.</p>
          <button className="mt-3 h-10 w-full rounded-xl bg-white text-xs font-black text-wadeal-red" type="submit">탈퇴 요청 준비</button>
        </form>
      </div>
      <BottomNavigation />
    </main>
  );
}

import { deleteAddressAction, saveAddressAction, setDefaultAddressAction } from "@/app/actions/addresses/actions";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import { mockBuyerProfile, mypageAddresses } from "@/lib/account";

export default function AddressesPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-wadeal-ink p-5 text-white"><p className="text-xs font-black text-red-200">Addresses</p><h1 className="mt-2 text-2xl font-black">배송지 관리</h1></section>
        <section className="space-y-3">
          {mypageAddresses.map((address) => (
            <article className="rounded-2xl border border-wadeal-line bg-white p-4" key={address.id}>
              <div className="flex items-center justify-between"><h2 className="text-base font-black text-wadeal-ink">{address.label}</h2>{address.isDefault ? <span className="rounded-full bg-red-50 px-2 py-1 text-[11px] font-black text-wadeal-red">기본배송지</span> : null}</div>
              <p className="mt-2 text-sm font-black text-wadeal-ink">{address.recipient} · {address.phone}</p>
              <p className="mt-1 text-sm font-bold leading-5 text-wadeal-muted">({address.postalCode}) {address.address} {address.detailAddress}</p>
              <p className="mt-1 text-xs font-bold text-wadeal-muted">요청사항: {address.request}</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <form action={setDefaultAddressAction}><input name="userId" type="hidden" value={mockBuyerProfile.userId} /><input name="addressId" type="hidden" value={address.id} /><button className="h-10 w-full rounded-xl bg-wadeal-red text-xs font-black text-white" type="submit">기본 설정</button></form>
                <button className="h-10 rounded-xl border border-wadeal-line text-xs font-black text-wadeal-ink" type="button">수정</button>
                <form action={deleteAddressAction}><input name="userId" type="hidden" value={mockBuyerProfile.userId} /><input name="addressId" type="hidden" value={address.id} /><button className="h-10 w-full rounded-xl border border-wadeal-line text-xs font-black text-gray-500" type="submit">삭제</button></form>
              </div>
            </article>
          ))}
        </section>
        <form action={saveAddressAction} className="space-y-3 rounded-2xl border border-wadeal-line bg-white p-4">
          <input name="userId" type="hidden" value={mockBuyerProfile.userId} />
          <h2 className="text-base font-black text-wadeal-ink">배송지 추가</h2>
          {[["받는 사람","recipient"],["연락처","phone"],["우편번호","postalCode"],["주소","address"],["상세주소","detailAddress"],["배송 요청사항","request"]].map(([label,name]) => <label className="block" key={name}><span className="text-xs font-black text-wadeal-ink">{label}</span><input className="mt-2 h-10 w-full rounded-xl bg-gray-50 px-3 text-sm font-bold outline-none" name={name} /></label>)}
          <button className="h-11 w-full rounded-xl bg-wadeal-red text-sm font-black text-white" type="submit">배송지 저장</button>
        </form>
      </div>
      <BottomNavigation />
    </main>
  );
}

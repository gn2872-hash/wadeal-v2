import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import { accountPaymentMethods } from "@/lib/account";

export default function PaymentMethodsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-4 px-4 pt-4 pb-8">
        <section className="rounded-2xl bg-wadeal-ink p-5 text-white"><p className="text-xs font-black text-red-200">Payments</p><h1 className="mt-2 text-2xl font-black">결제수단 관리</h1><p className="mt-2 text-sm font-bold text-gray-200">Toss/PG 연동 전까지 안전 fallback UI를 유지합니다.</p></section>
        <section className="space-y-3">
          {accountPaymentMethods.map((method) => (
            <article className="rounded-2xl border border-wadeal-line bg-white p-4" key={method.id}>
              <div className="flex items-center justify-between"><h2 className="text-base font-black text-wadeal-ink">{method.name}</h2>{method.isDefault ? <span className="rounded-full bg-red-50 px-2 py-1 text-[11px] font-black text-wadeal-red">기본</span> : null}</div>
              <p className="mt-2 text-sm font-bold text-wadeal-muted">{method.maskedNumber} · {method.description}</p>
              <p className="mt-3 rounded-xl bg-gray-50 p-3 text-xs font-bold text-wadeal-muted">{method.enabled ? "체크아웃에서 선택 가능하도록 구조 준비됨" : "카드 등록은 PG 저장 토큰 연결 후 활성화"}</p>
            </article>
          ))}
        </section>
        <button className="h-12 w-full rounded-xl bg-wadeal-red text-sm font-black text-white" type="button">카드 등록 준비 중</button>
      </div>
      <BottomNavigation />
    </main>
  );
}

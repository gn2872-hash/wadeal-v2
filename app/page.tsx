import { BottomNavigation } from "@/components/bottom-navigation";
import { CategoryGrid } from "@/components/category-grid";
import { DealSection } from "@/components/deal-section";
import { Header } from "@/components/header";
import { HeroBanner } from "@/components/hero-banner";
import { deals } from "@/lib/deals";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <div className="space-y-5 px-4 pt-4">
        <HeroBanner />
        <CategoryGrid />
        <DealSection deals={deals} />
      </div>
      <BottomNavigation />
    </main>
  );
}

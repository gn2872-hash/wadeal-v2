import { BottomNavigation } from "@/components/bottom-navigation";
import { Header } from "@/components/header";
import { CartClient } from "@/app/cart/cart-client";
import { getCartLines, mockCartItems } from "@/lib/buyer";

export default function CartPage() {
  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-white pb-24 shadow-soft">
      <Header />
      <CartClient initialLines={getCartLines(mockCartItems)} />
      <BottomNavigation />
    </main>
  );
}

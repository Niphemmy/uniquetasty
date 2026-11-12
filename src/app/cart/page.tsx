import type { Metadata } from "next";
import { CartSummary } from "@/components/cart/CartSummary";

export const metadata: Metadata = {
  title: "Your cart",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <section className="mx-auto max-w-wrap px-4 py-14">
      <h1 className="font-display text-4xl font-bold mb-8">Your cart</h1>
      <CartSummary />
    </section>
  );
}

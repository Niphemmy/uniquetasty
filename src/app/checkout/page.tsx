import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <section className="mx-auto max-w-wrap px-4 py-14">
      <h1 className="font-display text-4xl font-bold mb-8">Checkout</h1>
      <CheckoutForm />
    </section>
  );
}

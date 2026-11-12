"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/store", label: "Store" },
  { href: "/our-story", label: "Our story" },
  { href: "/blog", label: "Blog" },
  { href: "/find-us", label: "Find us" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-30 bg-cream/90 backdrop-blur border-b border-ink/5">
      <div className="mx-auto max-w-wrap px-4 h-14 flex items-center justify-between gap-3">
        <Link href="/" className="font-display text-lg font-bold text-red">
          Unique Tasty
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-ink">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-red">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative rounded-full px-3 py-1.5 text-sm font-semibold bg-ink text-cream"
          >
            Cart
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-red text-white text-[10px] font-bold rounded-full h-5 min-w-5 px-1 inline-flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-ink"
            aria-label="Open menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-[max-height] duration-200",
          open ? "max-h-72 border-t border-ink/5" : "max-h-0"
        )}
      >
        <div className="mx-auto max-w-wrap px-4 py-3 flex flex-col gap-2 text-sm font-semibold">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="py-1.5"
            >
              {n.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

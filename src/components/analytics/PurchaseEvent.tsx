"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function PurchaseEvent({
  reference,
  valueNaira,
  items,
}: {
  reference: string;
  valueNaira: number;
  items: { sku: string; name: string; price: number; qty: number }[];
}) {
  useEffect(() => {
    const key = `purchase_sent_${reference}`;
    try {
      if (sessionStorage.getItem(key)) return;
    } catch {}
    track("purchase", {
      transactionId: reference,
      value: valueNaira,
      items,
      eventId: reference,
    });
    try {
      sessionStorage.setItem(key, "1");
    } catch {}
  }, [reference, valueNaira, items]);
  return null;
}

"use client";

import { useState } from "react";
import { Field, Input, Select, Textarea } from "@/components/ui/Input";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { quoteMessage } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

export default function CustomOrderPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    need: "Office",
    bottles: "",
    date: "",
    notes: "",
  });

  const summary = [
    `Request: ${form.need}`,
    form.bottles && `Bottles: ${form.bottles}`,
    form.date && `Date: ${form.date}`,
    form.name && `Name: ${form.name}`,
    form.phone && `Phone: ${form.phone}`,
    form.notes && `Notes: ${form.notes}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <section className="mx-auto max-w-wrap px-4 py-14">
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-5">
        Drinks for offices, events and gifts
      </h1>
      <p className="text-lg text-inkSoft max-w-2xl mb-10">
        Need drinks for more than a few people? We supply 12-packs, hampers and
        monthly office orders from Old Bodija, Ibadan. Tell us what you need
        and we reply with a quote within 1 working day.
      </p>

      <div className="grid md:grid-cols-4 gap-5 mb-12">
        {[
          ["Office supply", "A regular delivery for your fridge. Weekly or monthly."],
          ["Events", "Weddings, birthdays, launches and meetings. Tell us the date and the number of guests."],
          ["Gifts and hampers", "Boxes for family, clients and staff. December hampers are open for orders."],
          ["Shops and outlets", "Stock Unique Tasty in your shop, pharmacy, gym or café. Ask for the trade price sheet."],
        ].map(([t, b]) => (
          <div key={t} className="rounded-2xl border border-ink/10 bg-cream p-5">
            <div className="font-display text-lg font-bold mb-2">{t}</div>
            <p className="text-sm text-inkSoft">{b}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl bg-paper p-6 md:p-10 max-w-2xl">
        <h2 className="font-display text-2xl font-bold mb-5">Tell us what you need</h2>
        <div className="grid gap-4">
          <Field id="co-name" label="Your name">
            <Input id="co-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field id="co-phone" label="Phone / WhatsApp" hint="0803 000 0000">
            <Input id="co-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </Field>
          <Field id="co-need" label="What you need">
            <Select id="co-need" value={form.need} onChange={(e) => setForm({ ...form, need: e.target.value })}>
              <option>Office</option>
              <option>Event</option>
              <option>Gift</option>
              <option>Shop</option>
            </Select>
          </Field>
          <Field id="co-bottles" label="How many bottles">
            <Input id="co-bottles" value={form.bottles} onChange={(e) => setForm({ ...form, bottles: e.target.value })} />
          </Field>
          <Field id="co-date" label="Date needed">
            <Input id="co-date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </Field>
          <Field id="co-notes" label="Notes">
            <Textarea id="co-notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </Field>
        </div>
        <div className="mt-6">
          <WhatsAppButton
            message={quoteMessage(summary || "I'd like a quote for a larger order.")}
            size="lg"
          >
            Send on WhatsApp
          </WhatsAppButton>
        </div>
        <p className="text-xs text-inkSoft mt-4">
          We reply on WhatsApp within 1 working day.
        </p>
      </div>
    </section>
  );
}

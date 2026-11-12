// Client-side analytics shim. Loads/calls GA4, Meta and TikTok pixels only
// when the consent cookie is granted. See src/components/analytics/*.

type Item = { sku: string; name: string; price: number; qty: number };

type Payload = {
  value?: number;
  items?: Item[];
  transactionId?: string;
  method?: string;
  eventId?: string;
};

const consented = () =>
  typeof document !== "undefined" && document.cookie.includes("ut_consent=granted");

const eventId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

const ga: Record<string, string> = {
  view_item: "view_item",
  add_to_cart: "add_to_cart",
  begin_checkout: "begin_checkout",
  purchase: "purchase",
  whatsapp_click: "generate_lead",
  quote_request: "generate_lead",
};

const meta: Record<string, string> = {
  view_item: "ViewContent",
  add_to_cart: "AddToCart",
  begin_checkout: "InitiateCheckout",
  purchase: "Purchase",
  whatsapp_click: "Contact",
  quote_request: "Lead",
};

const tt: Record<string, string> = {
  view_item: "ViewContent",
  add_to_cart: "AddToCart",
  begin_checkout: "InitiateCheckout",
  purchase: "CompletePayment",
  whatsapp_click: "Contact",
  quote_request: "SubmitForm",
};

export function track(name: keyof typeof ga, p: Payload = {}) {
  if (!consented()) return;
  const id = p.eventId ?? eventId();
  const base = { currency: "NGN", value: p.value };
  const items = p.items?.map((i) => ({
    item_id: i.sku,
    item_name: i.name,
    price: i.price,
    quantity: i.qty,
  }));
  const contents = p.items?.map((i) => ({ id: i.sku, quantity: i.qty }));

  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (...args: unknown[]) => void };
  };

  w.gtag?.("event", ga[name], {
    ...base,
    items,
    transaction_id: p.transactionId,
    method: p.method,
  });

  w.fbq?.(
    "track",
    meta[name],
    { ...base, contents, content_type: "product" },
    { eventID: id }
  );

  w.ttq?.track(
    tt[name],
    { ...base, contents, content_type: "product" },
    { event_id: id }
  );

  return id;
}

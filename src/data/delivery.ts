// Delivery zones. The client has not supplied fees yet (file 08 item 10).
// A null feeKobo means "confirm on WhatsApp"; checkout charges for drinks
// only and the order flags deliveryFeePending.

export type Zone = {
  id: string;
  label: string;
  feeKobo: number | null;
  note?: string;
};

export const pickup = { id: "pickup", label: "Pickup, free", feeKobo: 0 } as const;

export const zones: Zone[] = [
  { id: "ibadan-central", label: "Ibadan, central areas", feeKobo: null },
  { id: "ibadan-outer",   label: "Ibadan, outer areas",   feeKobo: null },
  { id: "lagos",          label: "Lagos",                 feeKobo: null, note: "Partner and courier delivery. Confirm on WhatsApp." },
  { id: "ogun",           label: "Ogun State",            feeKobo: null, note: "Confirm on WhatsApp." },
];

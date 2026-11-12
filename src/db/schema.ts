import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  uuid,
  index,
} from "drizzle-orm/pg-core";

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    reference: text("reference").notNull().unique(),
    status: text("status", {
      enum: ["pending", "paid", "failed", "abandoned"],
    })
      .notNull()
      .default("pending"),
    customerName: text("customer_name").notNull(),
    phone: text("phone").notNull(),
    email: text("email"),
    fulfilment: text("fulfilment", { enum: ["pickup", "delivery"] }).notNull(),
    zoneId: text("zone_id"),
    address: text("address"),
    notes: text("notes"),
    lines: jsonb("lines").notNull(),
    productsKobo: integer("products_kobo").notNull(),
    deliveryKobo: integer("delivery_kobo").notNull().default(0),
    deliveryFeePending: boolean("delivery_fee_pending").notNull().default(false),
    totalKobo: integer("total_kobo").notNull(),
    paystackAccessCode: text("paystack_access_code"),
    paystackTransactionId: text("paystack_transaction_id"),
    channel: text("channel"),
    paidAt: timestamp("paid_at", { withTimezone: true }),
    utm: jsonb("utm"),
    ip: text("ip"),
    userAgent: text("user_agent"),
    trackingConsent: boolean("tracking_consent").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("orders_status_idx").on(t.status),
    index("orders_created_idx").on(t.createdAt),
  ]
);

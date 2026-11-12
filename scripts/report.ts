// Weekly report queries (file 05 section 7). Run with `pnpm report`.
// Prints revenue, pack share, source breakdown, and old pending orders.

import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const sql = neon(url);

async function run() {
  const totals = await sql`
    select count(*)::int as orders,
           coalesce(sum(total_kobo), 0) / 100 as revenue_naira,
           coalesce(round(avg(total_kobo)), 0) / 100 as avg_order_naira
    from orders
    where status = 'paid' and paid_at >= now() - interval '7 days'
  `;

  const packs = await sql`
    select (l->>'name') as item, sum((l->>'qty')::int)::int as units
    from orders, jsonb_array_elements(lines) l
    where status = 'paid' and paid_at >= now() - interval '7 days'
    group by 1 order by 2 desc
  `;

  const sources = await sql`
    select coalesce(utm->>'utm_source','direct') as source,
           coalesce(utm->>'utm_campaign','none') as campaign,
           count(*)::int as orders,
           coalesce(sum(total_kobo), 0) / 100 as revenue_naira
    from orders
    where status = 'paid' and paid_at >= now() - interval '7 days'
    group by 1, 2 order by revenue_naira desc
  `;

  const pending = await sql`
    select reference, customer_name, phone, total_kobo / 100 as total_naira, created_at
    from orders
    where status = 'pending' and created_at < now() - interval '2 hours'
    order by created_at
  `;

  console.log("TOTALS (last 7 days)\n", totals);
  console.log("\nPACK SHARE\n", packs);
  console.log("\nSOURCES\n", sources);
  console.log("\nPENDING > 2h\n", pending);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

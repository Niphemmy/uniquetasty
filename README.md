# Unique Tasty Naturals, Next.js build

Second-generation site for Unique Tasty Naturals, Old Bodija, Ibadan. Pay on
Paystack, confirm on WhatsApp. Target domain `uniquetasty.com.ng`.

Replaces the legacy static site at `github.com/Niphemmy/uniquetasty`. See
[`docs/decisions.md`](docs/decisions.md) for the Step 0 audit and every build
decision.

## Stack

- Next.js 15, App Router, TypeScript strict
- Tailwind CSS
- Neon Postgres + Drizzle ORM for `orders`
- Zod on every API input
- Paystack (Initialize, Verify, Webhook)
- Resend for owner alerts and buyer receipts
- next-mdx-remote for the blog
- GA4 + Meta pixel + TikTok pixel (consent-gated)

## Scripts

```bash
pnpm install
cp .env.example .env.local   # fill values
pnpm dev                     # http://localhost:3000
pnpm typecheck
pnpm lint
pnpm claims-check            # fails on any banned phrase in source copy
pnpm preflight               # production-only env + content check
pnpm db:generate && pnpm db:migrate
pnpm report                  # weekly dashboard queries
```

`pnpm build` runs `claims-check` first, Vercel's build command adds
`preflight` for production deploys.

## What ships, what blocks

Preflight and claims-check both exit non-zero when something is missing. The
production build stays red until Oluwadamilola supplies the items in
file 08, section A, of the handoff pack:

- NAFDAC registration number
- Street address + hours for both Old Bodija and Akobo Ojurin
- Owner alert email + customer email
- Immunity Shot label (full ingredient list + bottle size)
- Elixir and Shot taste descriptions in her own words
- Her six founder answers for the "In her words" block
- Delivery fees per zone
- Returns / refund decisions on every CONFIRM line in the policy pages

Testimonials from the legacy site are held: two of the three contain claims
that fail the check, and all three need buyer permission before they can
show. Replace them before launch.

## Deploy

Vercel, framework "Next.js", build command `pnpm claims-check && pnpm preflight && next build`.
Webhook URL `https://uniquetasty.com.ng/api/paystack/webhook`. Set the
Paystack live keys only in the production environment.

## Attribution

Built by Northern Star Business Consulting for Unique Tasty Naturals.

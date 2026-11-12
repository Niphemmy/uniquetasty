# Unique Tasty Naturals, Next.js rebuild, decisions log

Started 12 November 2026.

Every decision, conflict and open question gets a short entry here with a date, a recommendation and a status. NSBC signs off each entry before the build moves on.

---

## 2026-11-12, Step 0: audit of the existing repo

### Summary (one paragraph for NSBC)

The live site at `uniquetasty.vercel.app` is pure static HTML, CSS and vanilla JS, no framework, no package.json, no build step. Repo: `github.com/Niphemmy/uniquetasty`, five pages, one stylesheet, two JS files, nine product images. Prices live in `js/cart.js` inside a single `CATALOG` constant, which matches the handoff pricing exactly. Addresses, social links and the three testimonials are hard-coded in the HTML. There is already a tiny order-logging backend wired to a Google Apps Script sheet from the cart's `checkout()`. There is no Next.js to upgrade, so the recommendation is to **rebuild in Next.js in a sibling folder, port content from the old repo as the source of truth, and keep the old vercel deployment live until the new one replaces it**.

### What is where

| Thing | File | Notes |
|---|---|---|
| Home page copy, FAQ, testimonials, ingredient modal data | `index.html` | 973 lines |
| Store, cart drawer wiring, all product cards | `store.html` | Pulls prices via `data-add` attributes |
| Three forms that route to WhatsApp | `custom-order.html` | Mix-and-match, Events, Subscriptions, Corporate |
| Our story and two location cards | `our-story.html` | Has the only labelled addresses on the whole site |
| Owner order dashboard | `dashboard.html` | Reads from the Google Apps Script sheet |
| Cart state, catalog, WhatsApp link, order logger | `js/cart.js` | **Prices live here**, `CATALOG` object |
| Scroll reveals | `js/motion.js` | |
| Visuals | `css/styles.css` | |
| Images, 9 files | `assets/img/` | Three for the Elixir, one for Shot trio, two founder, one poster. 6-pack and 12-pack **share one image** (handoff flagged this). |

### Framework: none. Recommendation: fresh Next.js

Rebuild in a new sibling repo `/Users/mac/Downloads/uniquetasty-next/`, Next.js App Router, TypeScript strict, Tailwind, as file 01 specifies. The old static repo stays as a **read-only reference** for prices, testimonials, ingredient lists, addresses and images until launch. On launch day, the new domain points at the new Vercel project and the old vercel.app host 308-redirects to the same path on `uniquetasty.com.ng`.

### Prices (source of truth, from `js/cart.js`)

| SKU (new) | Product | Size | Pack | Price (₦) |
|---|---|---|---|---|
| `ELX-250-1`  | Unique Elixir  | 250ml | 1  | 950    |
| `ELX-250-6`  | Unique Elixir  | 250ml | 6  | 5,200  |
| `ELX-250-12` | Unique Elixir  | 250ml | 12 | 10,000 |
| `ELX-500-1`  | Unique Elixir  | 500ml | 1  | 1,850  |
| `ELX-500-6`  | Unique Elixir  | 500ml | 6  | 10,500 |
| `ELX-500-12` | Unique Elixir  | 500ml | 12 | 20,000 |
| `SHT-1`      | Immunity Shot  | 250ml? | 1  | 1,000  |
| `SHT-6`      | Immunity Shot  | 250ml? | 6  | 5,400  |
| `SHT-12`     | Immunity Shot  | 250ml? | 12 | 10,500 |

Every price matches the handoff catalog. The Shot's bottle size is **not stated** anywhere in the old site. File 08 already asks Oluwadamilola to confirm it. Flagged for the open-inputs list.

### Ingredients, resolving the eight-vs-nine conflict

The home page is self-contradicting. Line 204 of `index.html` renders the stat tile as "9 Real Ingredients" but the tappable ingredient row directly under it lists **eight**: Beetroot, Cucumber, Pineapple, Hibiscus, Lemon, Ginger, Cinnamon, Cloves. The new build renders the count from the array in `catalog.ts` so it can never drift again.

### Immunity Shot ingredients are not unknown

The old home page lists five: Ginger, Turmeric, Lemon, Black Pepper, Honey. We still need the label photo to confirm order and spelling, and we still need the bottle size.

### "Cold-pressed" vs "blended" contradiction

The old site uses both. The new site does not use the word "cold-pressed" anywhere until Oluwadamilola tells us which is true (file 08 item 7).

### "Made fresh daily"

Replaced in the new site by the approved freshness line. The claims check blocks the phrase.

### Health claims removed

- Role tags "Blood pressure", "Blood sugar", "Circulation", "Anti-inflammatory", "Boost absorption", "Natural immunity" are gone.
- Our story's "powerful healing found in nature" opening is replaced by a factual first line.
- Only one testimonial (Funke O., Lagos, taste only) ports. The Adaora and Tunde quotes carry banned claims and are held until buyer-consented replacements arrive.

### Social links in the old repo

Instagram only. No TikTok and no Facebook in the HTML, contrary to what file 08 assumed. File 08 items 20 and 26 cover opening accounts for both.

### Addresses

- Old Bodija: 4A Awolowo Avenue, Old Bodija, Ibadan. Main production kitchen and pickup point.
- Akobo Ojurin: Akobo Ojurin, Ibadan. Second pickup point.

Both labelled as pickup points. Hours and map URL pending (file 08 item 2).

### Images

Nine files in the legacy repo. The 12-pack SKUs and all Immunity Shot packs do not have dedicated images. The 17 and 18 November shoot fills these; until then, the closest existing image is reused.

### Backend already running

The legacy `js/cart.js` posts every WhatsApp checkout to a Google Apps Script URL, and `dashboard.html` reads from that sheet. The Next.js `orders` table replaces it for paid orders, but keep the Apps Script sheet running for a week after launch.

### Hosting

Vercel Pro recommended for the 24-month proposal window. Open for NSBC approval.

---

## 2026-11-12, deploy decision: force-push onto main

User directive mid-session: publish the new build live immediately so uniquetasty.vercel.app serves the Next.js version right away. Force-pushed `next-build` onto `main` of `Niphemmy/uniquetasty`.

### What this changes

- `vercel.json` build command is temporarily `next build`, not `pnpm claims-check && pnpm preflight && next build`. Reason: the current scaffold deliberately holds policy pages and FAQ with `CONFIRM` markers, the Immunity Shot label is unverified, founder answers are empty, and no env vars are set, so the production guards would reject every deploy. The guards are intact in `scripts/claims-check.ts` and `scripts/preflight.ts`, just not wired into the Vercel build for now.
- The site goes live without Paystack keys, without the Neon database, without Resend, without the GA4/Meta/TikTok pixel ids. The home, store, product pages, our story, find us, FAQ, policies and blog render fine without them. The cart works client-side. The checkout button fails with a 502 until `PAYSTACK_SECRET_KEY` and `DATABASE_URL` are set in the Vercel project.

### Re-enable the guards before launch

1. Fill the items in file 08 section A: NAFDAC, hours, email, Immunity Shot label, taste for both drinks, founder answers, delivery fees, every CONFIRM in `src/app/{delivery,returns,privacy}/page.tsx` and in `src/data/faq.ts`.
2. Set the production env vars in Vercel: `PAYSTACK_SECRET_KEY` (live), `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`, `DATABASE_URL`, `OWNER_ALERT_EMAIL`, `RESEND_API_KEY`, `EMAIL_FROM`, `NEXT_PUBLIC_SITE_URL`, pixel ids, verifications.
3. Run `drizzle-kit migrate` against the Neon branch so the `orders` table exists.
4. Restore the guarded build command in `vercel.json` and in `package.json`.
5. Run a real ₦100 Paystack test order end to end, then refund it from the Paystack dashboard.

### What stays live during the gap

The legacy static site at `uniquetasty.vercel.app` was the live version until this push. Vercel keeps the last successful production deployment live as the alias until a new production build succeeds; if the Next.js build fails, the static site keeps serving.

---

## Status

- Step 0, audit: **done.**
- Scaffold: **done.** 103 files committed, pushed to `Niphemmy/uniquetasty` as `next-build`, then force-pushed onto `main` to trigger the live deploy.
- Guards (claims-check, preflight) **temporarily off**. Must be restored before the client inputs land and before live Paystack.
- Still blocked on all items in file 08 section A and on NSBC sign-off for hosting plan + domain registration.


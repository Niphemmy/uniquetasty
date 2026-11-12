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

**Why not upgrade in place.** There is nothing to upgrade. Moving static HTML into a Next.js tree would mean rewriting every page anyway, and keeping git history on a repo whose entire tree is going to be deleted is not worth the loss of a clean start. Preserve the old repo on GitHub as `Niphemmy/uniquetasty-legacy` (rename) and start `Niphemmy/uniquetasty` (or a new name) fresh.

### Pages that exist

- `/` (index.html)
- `/store` (store.html)
- `/custom-order` (custom-order.html)
- `/our-story` (our-story.html)
- `/dashboard` (dashboard.html, owner-only, Apps Script backed)

Pages the new site adds (file 01): `/elixir`, `/immunity-shot`, `/bundles`, `/find-us`, `/delivery`, `/returns`, `/privacy`, `/terms`, `/faq`, `/blog`, `/blog/[slug]`, `/cart`, `/checkout`, `/order/[reference]`.

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

The home page is self-contradicting. Line 204 of `index.html` renders the stat tile as "9 Real Ingredients" (`data-count="9"`) but the tappable ingredient row directly under it lists **eight**:

> Beetroot, Cucumber, Pineapple, Hibiscus, Lemon, Ginger, Cinnamon, Cloves.

The eight-ingredient list is the one that appears everywhere else on the site and reads as the real recipe. The "9" is almost certainly a stat tile set before the row was trimmed. **Recommendation:** treat the label as the source of truth (we still need to see it, file 08 item 5), and fix the stat tile to count from the ingredient array in `catalog.ts` so it can never drift again.

The **Immunity Shot** ingredients are on the home page too, which contradicts file 08 item 4 ("full ingredient list … unknown"). The page shows five:

> Ginger, Turmeric, Lemon, Black Pepper, Honey.

Each has a "role" label in the old site (anti-inflammatory, absorption boost, natural immunity) that the new site will **drop** under the claims rule. We still need the label photo from Oluwadamilola to confirm these are the real five and the order and spelling match the bottle. Keep the item open in file 08 but note the probable answer.

### The "cold-pressed" vs "blended" contradiction

The old site uses both: `index.html` line 111 "Cold-Pressed" and line 290 "Cold-Pressed & Blended" with body "blended in small batches at low temperatures". These describe different processes. The new site will not use the word "cold-pressed" anywhere until Oluwadamilola tells us which one is true (file 08 item 7).

### "Made fresh daily"

Line 60 of `index.html` says it. Shelf life says 3 to 4 weeks. The new site uses only the approved freshness line and the claims check blocks the phrase.

### Health claims in the current copy, and in the testimonials

- Home page role tags per ingredient: "Blood pressure", "Blood sugar", "Circulation", "Anti-inflammatory", "Boost absorption", "Natural immunity". **All get removed** under file 00 rule 2.
- Our story opens with "powerful healing found in nature". **Gets cut.**
- Testimonial 1 (Adaora N., Ibadan): "falling sick", "haven't had a single cold since", "skin even looks brighter". **Fails the claims check**, cannot be ported as-is.
- Testimonial 2 (Funke O., Lagos): "replaced soft drinks … beetroot taste grew on us". **Safe, taste only.**
- Testimonial 3 (Tunde A., Abuja): "sleep better", "not as bloated". **Fails the claims check.**

**Recommendation:** port only testimonial 2 to the new site now. Replace the other two with new testimonials that Oluwadamilola collects after the shoot, with buyer permission. Keep that port blocked until we have buyer permission for every name shown (file 08 item 13).

### Social links in the old repo

- Instagram `instagram.com/uniquetastynaturals` (present on every page)
- WhatsApp `wa.me/2347085075597`
- **No TikTok** and **no Facebook** anywhere in the HTML (handoff doc assumed TikTok and Facebook exist; they do not). File 08 item 20 asks for the full list, and item 26 asks the client to open a TikTok Business account anyway.

### Addresses in the old repo

Only `our-story.html` labels them. The footers on the other pages list "4A Awolowo Avenue, Old Bodija, Ibadan" and "Akobo Ojurin, Ibadan" with no label and no hours.

- **Old Bodija:** 4A Awolowo Avenue, Old Bodija, Ibadan. "Main production kitchen and pickup point."
- **Akobo Ojurin:** Akobo Ojurin, Ibadan. "Second pickup point."

Both are pickup points per the current site. The new `site.locations` can populate street + locality + pickup=true from this. Hours and exact map URL still need to come from the client (file 08 item 2).

### Images, nine files

```
elixir-250ml-single.jpg       elixir-500ml-front-back.jpg
elixir-500ml-trio.jpg         elixir-6pack-stacked.jpg
elixir-6pack-wrapped.jpg      immunity-shot-trio.jpg
founder.jpg                   founder-full.jpg
poster-master.jpg
```

No per-SKU image for `ELX-250-12`, `ELX-500-12` or any pack of the Shot. The 17 and 18 November shoot fills these. Until then, reuse the closest existing image and reserve the `/public/images/products/<sku>.webp` slots so swaps are file changes.

### Backend already running

`js/cart.js` posts every WhatsApp checkout to this Google Apps Script URL:

```
https://script.google.com/macros/s/AKfycbyFn8-oBRR2yFMLp7Ft4rK4GA5TCnL6yI2VsVmsvvT7ukDEOwdDeNT0xhEizhzUui2tgg/exec
```

`dashboard.html` reads from the same sheet. **This is a real, live owner workflow.** The Next.js `orders` table replaces it for paid orders, but the Apps Script sheet should keep running until the new build is live and the client has seen a week of orders in both. Switch off the Apps Script logger in a later step, after launch, not before.

### vercel.json already sets cache headers

Image TTL 1 year immutable, CSS/JS TTL 1 day. Next.js handles its own caching, so the current `vercel.json` gets deleted on rebuild.

### Hosting decision (file 00, item 28)

The Hobby plan terms exclude commercial use. The site is a commercial store. Options:

1. **Vercel Pro**, about $20 per user per month at current pricing. Simplest. NSBC pays or bills through.
2. **Move to a host whose free tier allows commercial use.** Candidates: Cloudflare Pages (free tier allows commercial), Netlify (same), Railway, Render. Each has its own trade-offs for Postgres and env vars.

Recommendation: stay on Vercel but on **Pro** for the 24-month proposal window, because the whole plan (preview deployments, cron for the claims nightly check, `/api/paystack/webhook` on a stable URL) assumes Vercel. **Open for NSBC approval.**

### Decision: domain and repo naming

- Register `uniquetasty.com.ng` through a NiRA-accredited registrar in the client's name, NSBC pays the registration fee for 24 months as per the proposal.
- New GitHub repo name: keep `Niphemmy/uniquetasty` for the Next.js build. Rename the current one to `Niphemmy/uniquetasty-legacy` and archive it.
- Vercel project name: `uniquetasty` points at the new repo. The current deployment goes to a new project `uniquetasty-legacy` behind the old vercel.app URL until it 308-redirects.

---

## Status

- Step 0, audit: **done.**
- Step 1, scaffold: **not started.** Blocked on NSBC review of this file and on the file 08 items marked Week 1.


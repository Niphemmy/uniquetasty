# Unique Tasty Naturals — Static Site

Ecommerce landing site for **Unique Tasty Naturals** (Ibadan, Nigeria). Two products: Unique Elixir (wellness drink, 250ml + 500ml) and Unique Immunity Shot. Every checkout routes to WhatsApp `+2347085075597` for confirmation and payment.

## Pages
- `index.html` — Home (landing + long-form health copy with both product deep-dives)
- `store.html` — Full product grid, all pack tiers, cart drawer
- `custom-order.html` — Mix-and-match builder + Event/Bulk, Subscription, Corporate Gifting forms

## Stack
Pure static HTML / CSS / JS. No build step. Open `index.html` directly in a browser to develop.

```
/
├── index.html
├── store.html
├── custom-order.html
├── css/styles.css
├── js/cart.js          ← localStorage cart + WhatsApp checkout
├── js/motion.js        ← scroll reveals + animations
├── assets/img/         ← brand photos
├── vercel.json
└── README.md
```

## Cart + WhatsApp checkout

Cart state lives in `localStorage` under key `ut_cart_v1`. Add-to-cart buttons declare a SKU:

```html
<button data-add="elixir-500-x6">Add to Cart</button>
```

SKUs and prices are the single source of truth in `js/cart.js` → `CATALOG`. On checkout, the cart builds a formatted WhatsApp message and opens `wa.me/2347085075597?text=…` in a new tab.

The custom-order page has its own inline form handlers that also route to WhatsApp via `UT.sendWA(message)`.

## Deploy

### GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

### Vercel
1. Connect the GitHub repo in the Vercel dashboard
2. Framework preset: **Other** (it's a static site)
3. Build command: *leave empty*
4. Output directory: *leave empty* (project root)
5. Deploy

`vercel.json` already sets long-cache headers for images and shorter cache for CSS/JS.

## Editing prices

Change prices in **two** places (keep them in sync):
1. `js/cart.js` → `CATALOG` object (the cart math)
2. Visible labels in `store.html`, `index.html`, and `custom-order.html`

## Editing WhatsApp number
1. `js/cart.js` → `WA_NUMBER` constant
2. All `https://wa.me/…` links in the three HTML files
3. The `tel:` and "Call:" links in each footer

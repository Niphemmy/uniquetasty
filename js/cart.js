/* =========================================================
   UNIQUE TASTY NATURALS, CART + WHATSAPP CHECKOUT
   ========================================================= */

const UT = (() => {
  const WA_NUMBER = "2347085075597";
  const STORAGE_KEY = "ut_cart_v1";
  const NGN = (n) => "₦" + n.toLocaleString("en-NG");

  /* ---------- Catalog (single source of truth) ---------- */
  /* Pricing logic: bulk packs always save ≥ ₦500 vs buying singles. */
  const CATALOG = {
    "elixir-250-x1":   { product: "Unique Elixir", variant: "250ml × 1",        price: 950,   emoji: "🧉" },
    "elixir-250-x6":   { product: "Unique Elixir", variant: "250ml · Family Pack (×6)",  price: 5200,  emoji: "🧉", save: "save ₦500" },
    "elixir-250-x12":  { product: "Unique Elixir", variant: "250ml · Best Value (×12)",  price: 10000, emoji: "🧉", save: "save ₦1,400" },
    "elixir-500-x1":   { product: "Unique Elixir", variant: "500ml × 1",        price: 1850,  emoji: "🧃" },
    "elixir-500-x6":   { product: "Unique Elixir", variant: "500ml · Family Pack (×6)",  price: 10500, emoji: "🧃", save: "save ₦600" },
    "elixir-500-x12":  { product: "Unique Elixir", variant: "500ml · Best Value (×12)",  price: 20000, emoji: "🧃", save: "save ₦2,200" },
    "shot-x1":         { product: "Immunity Shot", variant: "Single shot",      price: 1000,  emoji: "⚡" },
    "shot-x6":         { product: "Immunity Shot", variant: "Family Pack (×6)", price: 5400,  emoji: "⚡", save: "save ₦600" },
    "shot-x12":        { product: "Immunity Shot", variant: "Best Value (×12)", price: 10500, emoji: "⚡", save: "save ₦1,500" },
  };

  /* ---------- State ---------- */
  let state = load();
  const listeners = new Set();

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch { return {}; }
  }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
    listeners.forEach((fn) => fn(state));
  }

  /* ---------- Mutators ---------- */
  function add(sku, qty = 1) {
    if (!CATALOG[sku]) return;
    state[sku] = (state[sku] || 0) + qty;
    save();
    toast(`Added ${CATALOG[sku].variant} to cart`);
  }
  function set(sku, qty) {
    if (!CATALOG[sku]) return;
    if (qty <= 0) delete state[sku]; else state[sku] = qty;
    save();
  }
  function remove(sku) { delete state[sku]; save(); }
  function clear() { state = {}; save(); }

  /* ---------- Derived ---------- */
  function lines() {
    return Object.entries(state)
      .filter(([sku]) => CATALOG[sku])
      .map(([sku, qty]) => ({ sku, qty, ...CATALOG[sku], subtotal: CATALOG[sku].price * qty }));
  }
  function total() { return lines().reduce((a, b) => a + b.subtotal, 0); }
  function count() { return Object.values(state).reduce((a, b) => a + b, 0); }

  /* ---------- WhatsApp checkout ---------- */
  function buildOrderMessage(extras = {}) {
    const ls = lines();
    if (ls.length === 0) return null;
    const head = "Hello UniqueTasty! 👋  I'd like to place an order:\n\n";
    const body = ls.map((l) => `• ${l.qty} × ${l.product} ${l.variant}, ${NGN(l.subtotal)}`).join("\n");
    const totalLine = `\n\n*Total: ${NGN(total())}*`;
    const note = extras.note ? `\n\n📝 ${extras.note}` : "";
    const name = extras.name ? `\n\nName: ${extras.name}` : "";
    const address = extras.address ? `\nDelivery address: ${extras.address}` : "";
    const tail = "\n\nPlease confirm availability and share payment details. Thank you!";
    return head + body + totalLine + name + address + note + tail;
  }
  function waLink(message) {
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  }
  function checkout(extras = {}) {
    const msg = buildOrderMessage(extras);
    if (!msg) { toast("Your cart is empty"); return; }
    window.open(waLink(msg), "_blank", "noopener");
  }

  /* ---------- Generic WA send (for custom-order forms) ---------- */
  function sendWA(message) {
    window.open(waLink(message), "_blank", "noopener");
  }

  /* ---------- Listeners + UI helpers ---------- */
  function subscribe(fn) { listeners.add(fn); fn(state); return () => listeners.delete(fn); }

  function toast(message) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = message;
    requestAnimationFrame(() => el.classList.add("is-show"));
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("is-show"), 2200);
  }

  /* ---------- Cart drawer wiring (auto) ---------- */
  function mountDrawer() {
    const overlay = document.querySelector("[data-cart-overlay]");
    const drawer = document.querySelector("[data-cart-drawer]");
    const openers = document.querySelectorAll("[data-cart-open]");
    const closer = document.querySelector("[data-cart-close]");
    if (!drawer) return;

    const open = () => { overlay?.classList.add("is-open"); drawer.classList.add("is-open"); };
    const close = () => { overlay?.classList.remove("is-open"); drawer.classList.remove("is-open"); };

    openers.forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); render(); open(); }));
    closer?.addEventListener("click", close);
    overlay?.addEventListener("click", close);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

    const body = drawer.querySelector("[data-cart-body]");
    const totalEl = drawer.querySelector("[data-cart-total]");
    const checkoutBtn = drawer.querySelector("[data-cart-checkout]");

    function render() {
      const ls = lines();
      if (ls.length === 0) {
        body.innerHTML = `<div class="cart-empty">
          <div class="ico">🛒</div>
          <p>Your basket is empty.<br>Add an Elixir or Immunity Shot to get started.</p>
        </div>`;
      } else {
        body.innerHTML = ls.map((l) => `
          <div class="cart-line" data-sku="${l.sku}">
            <div class="cart-line__thumb">${l.emoji}</div>
            <div>
              <div class="cart-line__title">${l.product}</div>
              <div class="cart-line__meta">${l.variant} · ${NGN(l.price)} ea</div>
              <div class="cart-line__qty">
                <button data-dec aria-label="Decrease">−</button>
                <span>${l.qty}</span>
                <button data-inc aria-label="Increase">+</button>
                <a data-rm class="cart-line__remove">remove</a>
              </div>
            </div>
            <div class="cart-line__price">${NGN(l.subtotal)}</div>
          </div>
        `).join("");
      }
      totalEl.textContent = NGN(total());
      checkoutBtn.disabled = ls.length === 0;
      checkoutBtn.style.opacity = ls.length === 0 ? 0.5 : 1;
    }

    body.addEventListener("click", (e) => {
      const line = e.target.closest(".cart-line");
      if (!line) return;
      const sku = line.dataset.sku;
      const cur = state[sku] || 0;
      if (e.target.matches("[data-inc]")) set(sku, cur + 1);
      if (e.target.matches("[data-dec]")) set(sku, cur - 1);
      if (e.target.matches("[data-rm]"))  remove(sku);
      render();
    });

    checkoutBtn.addEventListener("click", () => checkout());

    subscribe(() => render());
  }

  /* ---------- Mount add-to-cart buttons + nav count ---------- */
  function mountButtons() {
    document.querySelectorAll("[data-add]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const sku = btn.dataset.add;
        const qty = parseInt(btn.dataset.qty || "1", 10);
        add(sku, qty);
      });
    });
    const counts = document.querySelectorAll("[data-cart-count]");
    const updateCount = () => {
      const c = count();
      counts.forEach((el) => {
        el.textContent = c;
        el.style.display = c > 0 ? "inline-flex" : "none";
      });
    };
    subscribe(updateCount);
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    mountDrawer();
    mountButtons();
  });

  return { CATALOG, add, set, remove, clear, lines, total, count, checkout, sendWA, buildOrderMessage, waLink, NGN, subscribe };
})();

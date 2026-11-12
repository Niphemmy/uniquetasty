"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "ut_cart_v2";
const UTM_KEY = "ut_utm_v1";

export type CartState = Record<string, number>;

type Ctx = {
  state: CartState;
  count: number;
  add: (sku: string, qty?: number) => void;
  set: (sku: string, qty: number) => void;
  remove: (sku: string) => void;
  clear: () => void;
};

const CartContext = createContext<Ctx | null>(null);

function loadCart(): CartState {
  try {
    const raw = typeof window !== "undefined"
      ? localStorage.getItem(STORAGE_KEY)
      : null;
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveCart(state: CartState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>({});

  // Hydrate on mount so SSR output stays empty-safe.
  useEffect(() => {
    setState(loadCart());
    captureUtm();
  }, []);

  useEffect(() => {
    saveCart(state);
  }, [state]);

  const add = useCallback((sku: string, qty = 1) => {
    setState((s) => ({ ...s, [sku]: (s[sku] ?? 0) + qty }));
  }, []);

  const set = useCallback((sku: string, qty: number) => {
    setState((s) => {
      const next = { ...s };
      if (qty <= 0) delete next[sku];
      else next[sku] = qty;
      return next;
    });
  }, []);

  const remove = useCallback((sku: string) => {
    setState((s) => {
      const next = { ...s };
      delete next[sku];
      return next;
    });
  }, []);

  const clear = useCallback(() => setState({}), []);

  const count = useMemo(
    () => Object.values(state).reduce((a, b) => a + b, 0),
    [state]
  );

  const value = useMemo(
    () => ({ state, count, add, set, remove, clear }),
    [state, count, add, set, remove, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    // Allow SSR / outside-provider reads so the header renders before hydration
    return { state: {}, count: 0, add() {}, set() {}, remove() {}, clear() {} };
  }
  return ctx;
}

function captureUtm() {
  try {
    if (sessionStorage.getItem(UTM_KEY)) return;
    const u = new URL(window.location.href);
    const keys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "ttclid",
      "fbclid",
    ];
    const utm: Record<string, string> = {};
    for (const k of keys) {
      const v = u.searchParams.get(k);
      if (v) utm[k] = v;
    }
    const cookie = Object.fromEntries(
      document.cookie.split(";").map((c) => {
        const [k, v] = c.trim().split("=");
        return [k, v];
      })
    );
    for (const k of ["_fbp", "_fbc", "_ttp"]) {
      if (cookie[k]) utm[k] = cookie[k];
    }
    if (Object.keys(utm).length) {
      sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
    }
  } catch {}
}

export function readUtm(): Record<string, string> {
  try {
    const raw = sessionStorage.getItem(UTM_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

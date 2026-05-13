/* =========================================================
   UNIQUE TASTY NATURALS, MOTION + INTERACTIVE BEHAVIOR
   ========================================================= */

(() => {
  /* ---------- Scroll reveals ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("is-open"));
    links.addEventListener("click", (e) => {
      if (e.target.tagName === "A") links.classList.remove("is-open");
    });
  }

  /* ---------- Mark active nav link ---------- */
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;
    if (href === path || (path === "" && href === "index.html") || (path === "index.html" && href === "./")) {
      a.classList.add("active");
    }
  });

  /* ---------- Tabs ---------- */
  document.querySelectorAll("[data-tabs]").forEach((group) => {
    const btns = group.querySelectorAll(".tab-btn");
    const panels = group.querySelectorAll(".tab-panel");
    btns.forEach((btn) =>
      btn.addEventListener("click", () => {
        const id = btn.dataset.tab;
        btns.forEach((b) => b.classList.toggle("is-active", b === btn));
        panels.forEach((p) => p.classList.toggle("is-active", p.dataset.panel === id));
      })
    );
  });

  /* ---------- Animated counter (for facts) ---------- */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const dur = 1400;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString();
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        co.unobserve(el);
      });
    });
    counters.forEach((el) => co.observe(el));
  }

  /* ---------- Parallax hero splash ---------- */
  const splash = document.querySelector(".hero__splash");
  if (splash && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      splash.style.transform = `translateY(${y * 0.2}px) rotate(${y * 0.05}deg)`;
    }, { passive: true });
  }

  /* ---------- Smooth-scroll to anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ---------- Lazy-loading fallback ---------- */
  document.querySelectorAll("img").forEach((img) => {
    if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
  });
})();

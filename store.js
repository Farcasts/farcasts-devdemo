/* Halo store logic. One shared script across all pages: product catalog, cart drawer,
   quick-view modal, newsletter popup, sticky promo, and the shop-page category/concern
   filters. Cart persists in sessionStorage so the drawer count survives navigation.
   All overlays are DOM overlays; no alert/confirm/prompt anywhere. */

const CATALOG = [
  { id: "hy-01", name: "Reservoir",        cat: "Serums",    concern: "Hydration",   price: 46, code: "HY-01", img: "prod-serum-a.jpg",   note: "Triple hyaluronic serum",      desc: "A weightless triple hyaluronic serum that draws water into the skin and holds it there. Layers clean under anything.", spec: { Volume: "30 ml", Actives: "Hyaluronic acid, panthenol", Use: "AM and PM", Feel: "Water gel" } },
  { id: "br-02", name: "Clearday",         cat: "Serums",    concern: "Brightening", price: 54, code: "BR-02", img: "prod-serum-b.jpg",   note: "15% vitamin C complex",        desc: "A stabilised 15% vitamin C complex that evens tone and lifts dullness over a few weeks of steady use.", spec: { Volume: "30 ml", Actives: "Ascorbic acid, ferulic", Use: "AM", Feel: "Light fluid" } },
  { id: "re-03", name: "Nightshift",       cat: "Serums",    concern: "Fine lines",  price: 62, code: "RE-03", img: "prod-serum-a.jpg",   note: "Encapsulated retinal 0.1%",    desc: "An encapsulated retinal that renews texture through the night with less of the sting retinoids are known for.", spec: { Volume: "30 ml", Actives: "Retinal 0.1%", Use: "PM", Feel: "Silk fluid" } },
  { id: "ca-04", name: "Quiet Skin",       cat: "Serums",    concern: "Sensitive",   price: 44, code: "CA-04", img: "prod-serum-b.jpg",   note: "Centella + niacinamide",       desc: "A calming serum built for reactive skin. Centella and niacinamide settle redness and rebuild the barrier.", spec: { Volume: "30 ml", Actives: "Centella, niacinamide 4%", Use: "AM and PM", Feel: "Fluid" } },

  { id: "mo-05", name: "Daylong",          cat: "Creams",    concern: "Hydration",   price: 48, code: "MO-05", img: "prod-cream-a.jpg",   note: "Barrier day cream",            desc: "A daily barrier cream with ceramides and squalane. Sits invisible under sunscreen and holds moisture till dusk.", spec: { Volume: "50 ml", Actives: "Ceramides, squalane", Use: "AM", Feel: "Cushioned" } },
  { id: "mo-06", name: "Overnight",        cat: "Creams",    concern: "Fine lines",  price: 58, code: "MO-06", img: "prod-cream-b.jpg",   note: "Peptide recovery cream",       desc: "A richer night cream with peptides and shea that works with your skin's own repair window while you sleep.", spec: { Volume: "50 ml", Actives: "Peptides, shea, squalane", Use: "PM", Feel: "Rich balm-cream" } },
  { id: "ca-07", name: "Bare Minimum",     cat: "Creams",    concern: "Sensitive",   price: 42, code: "CA-07", img: "prod-cream-a.jpg",   note: "Fragrance-free moisturiser",   desc: "The shortest possible ingredient list that still works. No fragrance, no essential oils, nothing to react to.", spec: { Volume: "50 ml", Actives: "Glycerin, ceramides", Use: "AM and PM", Feel: "Fragrance-free" } },
  { id: "br-08", name: "Even Ground",      cat: "Creams",    concern: "Brightening", price: 52, code: "BR-08", img: "prod-cream-b.jpg",   note: "Niacinamide tone cream",       desc: "A tone-correcting cream that softens the look of dark marks over time while it keeps the barrier fed.", spec: { Volume: "50 ml", Actives: "Niacinamide 5%, tranexamic", Use: "AM and PM", Feel: "Light cream" } },

  { id: "cl-09", name: "First Rinse",      cat: "Cleansers", concern: "Hydration",   price: 28, code: "CL-09", img: "prod-cleanser-a.jpg",note: "Cream gel cleanser",           desc: "A cream gel cleanser that lifts the day off without stripping. Skin feels clean, never tight.", spec: { Volume: "150 ml", Actives: "Glycerin, amino surfactants", Use: "AM and PM", Feel: "Cream gel" } },
  { id: "cl-10", name: "Second Look",      cat: "Cleansers", concern: "Sensitive",   price: 32, code: "CL-10", img: "prod-cleanser-a.jpg",note: "Milky makeup cleanser",        desc: "A milky first cleanse that melts sunscreen and makeup, gentle enough for the eye area.", spec: { Volume: "150 ml", Actives: "Squalane, oat", Use: "PM", Feel: "Milk" } },
  { id: "ex-11", name: "Fine Line",        cat: "Cleansers", concern: "Brightening", price: 34, code: "EX-11", img: "prod-cleanser-a.jpg",note: "PHA polish cleanser",          desc: "A weekly polishing cleanser with gentle PHA acids that resurface without the grit of a scrub.", spec: { Volume: "120 ml", Actives: "Gluconolactone (PHA)", Use: "2x weekly", Feel: "Soft gel" } },

  { id: "oi-12", name: "Golden Hour",      cat: "Oils",      concern: "Hydration",   price: 56, code: "OI-12", img: "prod-oil-a.jpg",     note: "Nightly restoring oil",        desc: "A dry-finish facial oil that seals in the layers below it and leaves skin supple, not slick, by morning.", spec: { Volume: "30 ml", Actives: "Squalane, rosehip", Use: "PM", Feel: "Dry oil" } },
  { id: "ca-13", name: "Low Tide",         cat: "Oils",      concern: "Sensitive",   price: 50, code: "CA-13", img: "prod-oil-a.jpg",     note: "Barrier repair oil",           desc: "A minimal repair oil for skin that has been over-worked. Fatty acids to patch the barrier back together.", spec: { Volume: "30 ml", Actives: "Sunflower, ceramide NP", Use: "PM", Feel: "Light oil" } },
  { id: "br-14", name: "Slow Light",       cat: "Oils",      concern: "Brightening", price: 58, code: "BR-14", img: "prod-oil-a.jpg",     note: "Radiance facial oil",          desc: "A radiance oil pressed with sea buckthorn that lends a lit-from-within finish under makeup or alone.", spec: { Volume: "30 ml", Actives: "Sea buckthorn, jojoba", Use: "AM or PM", Feel: "Glow oil" } },

  { id: "ma-15", name: "Cold Compress",    cat: "Masks",     concern: "Sensitive",   price: 38, code: "MA-15", img: "prod-mask-a.jpg",    note: "Cooling gel mask",             desc: "A ten-minute cooling gel mask that takes the heat out of flushed, angry skin after sun or travel.", spec: { Volume: "75 ml", Actives: "Centella, allantoin", Use: "As needed", Feel: "Cool gel" } },
  { id: "de-16", name: "Deep Draw",        cat: "Masks",     concern: "Brightening", price: 40, code: "DE-16", img: "prod-mask-a.jpg",    note: "Clay clarity mask",            desc: "A weekly clay mask that pulls congestion out of the pores and leaves the skin looking clearer, not stripped.", spec: { Volume: "75 ml", Actives: "Kaolin, zinc", Use: "Weekly", Feel: "Soft clay" } },
  { id: "hy-17", name: "Long Soak",        cat: "Masks",     concern: "Hydration",   price: 42, code: "HY-17", img: "prod-mask-a.jpg",    note: "Overnight water mask",         desc: "A leave-on water mask for the nights skin drinks everything. Wake to a plumper, calmer face.", spec: { Volume: "75 ml", Actives: "Hyaluronic, glycerin", Use: "PM, 2x weekly", Feel: "Water cream" } },

  { id: "se-18", name: "The Short List",   cat: "Sets",      concern: "Hydration",   price: 96, code: "SE-18", img: "prod-serum-a.jpg",   note: "Cleanse, serum, moisturise",   desc: "The three-step routine, boxed. First Rinse, Reservoir, and Daylong at a set price to start clean.", spec: { Includes: "3 full sizes", Best: "New to Halo", Value: "Save $26", Feel: "Everyday" } },
  { id: "se-19", name: "Night Protocol",   cat: "Sets",      concern: "Fine lines",  price: 118,code: "SE-19", img: "prod-cream-b.jpg",   note: "The evening renewal set",      desc: "The full PM routine, boxed. Second Look, Nightshift, and Overnight for the skin you repair at night.", spec: { Includes: "3 full sizes", Best: "Renewal focus", Value: "Save $34", Feel: "Evening" } },
  { id: "se-20", name: "Calm Kit",         cat: "Sets",      concern: "Sensitive",   price: 88, code: "SE-20", img: "prod-cream-a.jpg",   note: "Barrier rescue trio",          desc: "For reactive skin having a hard week. Quiet Skin, Bare Minimum, and Cold Compress to settle things down.", spec: { Includes: "3 full sizes", Best: "Sensitive skin", Value: "Save $28", Feel: "Gentle" } },
];

const ASSET = (f) => `assets/${f}`;
const money = (n) => `$${n}`;

/* ---------------- cart state ---------------- */
const CART_KEY = "halo.cart";
const readCart = () => JSON.parse(sessionStorage.getItem(CART_KEY) || "[]");
const writeCart = (c) => sessionStorage.setItem(CART_KEY, JSON.stringify(c));
const productById = (id) => CATALOG.find((p) => p.id === id);

function cartCount(cart) { return cart.reduce((n, l) => n + l.qty, 0); }
function cartTotal(cart) { return cart.reduce((s, l) => s + productById(l.id).price * l.qty, 0); }

function addToCart(id) {
  const cart = readCart();
  const line = cart.find((l) => l.id === id);
  if (line) line.qty += 1; else cart.push({ id, qty: 1 });
  writeCart(cart);
  renderCart();
  openDrawer();
}
function removeFromCart(id) {
  writeCart(readCart().filter((l) => l.id !== id));
  renderCart();
}

/* ---------------- cart drawer render ---------------- */
function renderCart() {
  const cart = readCart();
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    const n = cartCount(cart);
    el.textContent = n; el.dataset.count = n;
  });
  const list = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!list) return;
  if (!cart.length) {
    list.innerHTML = `<p class="cart-empty">Your bag is empty. The routine starts with one step.</p>`;
  } else {
    list.innerHTML = cart.map((l) => {
      const p = productById(l.id);
      return `<div class="cart-line">
        <img src="${ASSET(p.img)}" alt="${p.name}" />
        <div>
          <div class="cl-name">${p.name}</div>
          <div class="cl-meta">${p.cat} &middot; No. ${p.code}${l.qty > 1 ? ` &middot; x${l.qty}` : ""}</div>
          <button class="cl-remove" data-remove="${p.id}">Remove</button>
        </div>
        <div class="cl-price">${money(p.price * l.qty)}</div>
      </div>`;
    }).join("");
  }
  if (totalEl) totalEl.textContent = money(cartTotal(cart));
}

/* ---------------- drawer / modal / popup open-close ---------------- */
const scrim = () => document.getElementById("scrim");
function openDrawer() {
  document.getElementById("cart-drawer")?.classList.add("open");
  scrim()?.classList.add("open");
}
function closeDrawer() {
  document.getElementById("cart-drawer")?.classList.remove("open");
  if (!document.querySelector(".modal.open")) scrim()?.classList.remove("open");
}

function openQuickView(id) {
  const p = productById(id);
  const modal = document.getElementById("quickview");
  if (!p || !modal) return;
  modal.querySelector(".qv-figure img").src = ASSET(p.img);
  modal.querySelector(".qv-figure img").alt = p.name;
  modal.querySelector(".qv-tag").textContent = `${p.cat} · ${p.concern}`;
  modal.querySelector(".qv-body h3").textContent = p.name;
  modal.querySelector(".qv-code").textContent = `No. ${p.code} · ${p.note}`;
  modal.querySelector(".qv-desc").textContent = p.desc;
  modal.querySelector(".qv-price").textContent = money(p.price);
  modal.querySelector(".qv-spec").innerHTML = Object.entries(p.spec)
    .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
  modal.querySelector("[data-qv-add]").dataset.qvAdd = p.id;
  modal.classList.add("open");
  scrim()?.classList.add("open");
}
function closeQuickView() {
  document.getElementById("quickview")?.classList.remove("open");
  if (!document.querySelector(".cart-drawer.open")) scrim()?.classList.remove("open");
}

/* ---------------- newsletter popup ---------------- */
const POP_KEY = "halo.pop.seen";
function openPop() { document.getElementById("newsletter-pop")?.classList.add("open"); }
function closePop() {
  document.getElementById("newsletter-pop")?.classList.remove("open");
  sessionStorage.setItem(POP_KEY, "1");
}

/* ---------------- sticky promo ---------------- */
const PROMO_KEY = "halo.promo.dismissed";
function dismissPromo() {
  document.getElementById("sticky-promo")?.classList.add("hidden");
  sessionStorage.setItem(PROMO_KEY, "1");
}

/* ---------------- shop filters ---------------- */
function currentFilter() {
  return {
    cat: document.querySelector("[data-filter-cat].active")?.dataset.filterCat || "All",
    concern: document.querySelector("[data-filter-concern].active")?.dataset.filterConcern || "All",
  };
}
function applyFilters() {
  const { cat, concern } = currentFilter();
  let shown = 0;
  document.querySelectorAll("[data-product]").forEach((card) => {
    const okCat = cat === "All" || card.dataset.cat === cat;
    const okCon = concern === "All" || card.dataset.concern === concern;
    const on = okCat && okCon;
    card.hidden = !on;
    if (on) shown += 1;
  });
  const count = document.getElementById("result-count");
  if (count) count.textContent = `${shown} ${shown === 1 ? "product" : "products"}`;
  const empty = document.getElementById("no-results");
  if (empty) empty.hidden = shown !== 0;
}

/* ---------------- wiring ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-add],[data-quick],[data-remove],[data-qv-add],[data-open-cart],[data-close]");
    if (!t) return;
    if (t.dataset.add !== undefined) { e.preventDefault(); addToCart(t.dataset.add); }
    else if (t.dataset.quick !== undefined) { e.preventDefault(); openQuickView(t.dataset.quick); }
    else if (t.dataset.remove !== undefined) { removeFromCart(t.dataset.remove); }
    else if (t.dataset.qvAdd !== undefined) { e.preventDefault(); addToCart(t.dataset.qvAdd); closeQuickView(); }
    else if (t.dataset.openCart !== undefined) { e.preventDefault(); openDrawer(); }
    else if (t.dataset.close !== undefined) {
      const k = t.dataset.close;
      if (k === "cart") closeDrawer();
      else if (k === "quickview") closeQuickView();
      else if (k === "pop") closePop();
      else if (k === "promo") dismissPromo();
    }
  });

  scrim()?.addEventListener("click", () => { closeDrawer(); closeQuickView(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeDrawer(); closeQuickView(); closePop(); }
  });

  /* filters */
  document.querySelectorAll("[data-filter-cat],[data-filter-concern]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.hasAttribute("data-filter-cat") ? "[data-filter-cat]" : "[data-filter-concern]";
      document.querySelectorAll(group).forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilters();
    });
  });
  if (document.querySelector("[data-product]")) applyFilters();

  /* newsletter popup: once per session, after a short beat, DOM overlay only */
  if (!sessionStorage.getItem(POP_KEY) && document.getElementById("newsletter-pop")) {
    setTimeout(openPop, 3200);
  }
  document.getElementById("pop-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const card = document.querySelector("#newsletter-pop .pop-card");
    if (card) card.innerHTML = `<span class="mark" aria-hidden="true">${HALO_MARK(40)}</span>
      <h2>You're on the list.</h2><p>Look for a first note from the lab soon. Ten percent is on its way.</p>
      <button class="btn btn--slate" data-close="pop" type="button" style="width:100%;justify-content:center;">Close</button>`;
  });

  /* sticky promo */
  if (sessionStorage.getItem(PROMO_KEY)) document.getElementById("sticky-promo")?.classList.add("hidden");

  /* contact form (visit page) */
  document.getElementById("contact-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = e.target.querySelector("[type=submit]");
    if (btn) { btn.textContent = "Sent, thank you"; btn.disabled = true; }
  });
});

/* brand mark, reused by JS-injected popup success state */
function HALO_MARK(size) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.2">
    <circle cx="20" cy="20" r="2.4" fill="currentColor" stroke="none"/>
    <circle cx="20" cy="20" r="11" opacity=".9"/><circle cx="20" cy="20" r="16.5" opacity=".4"/></svg>`;
}

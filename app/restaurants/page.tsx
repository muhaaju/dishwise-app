"use client";

import { useState } from "react";
import Link from "next/link";

const ALL_RESTAURANTS = [
  {
    id: 1,
    name: "Paragon Restaurant",
    cuisine: "Malabar Biryani · Kerala",
    location: "Kozhikode Rd, Ernakulam",
    rating: 4.8,
    reviews: 2847,
    time: "20–30 min",
    avgCost: "₹300 for two",
    saving: "₹130",
    tags: ["Top Rated", "Biryani"],
    isOpen: true,
    discount: "20% OFF",
    veg: false,
    img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 2,
    name: "Kayees Rahmathulla Hotel",
    cuisine: "Mutton Biryani · Mughlai",
    location: "Banerji Rd, Kochi",
    rating: 4.7,
    reviews: 3412,
    time: "25–35 min",
    avgCost: "₹250 for two",
    saving: "₹115",
    tags: ["Legendary", "Biryani"],
    isOpen: true,
    discount: "15% OFF",
    veg: false,
    img: "https://images.unsplash.com/photo-1575526854473-e85fdba07b7a?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 3,
    name: "Hotel Sagar",
    cuisine: "Seafood · Coastal Kerala",
    location: "Marine Drive, Kochi",
    rating: 4.6,
    reviews: 1923,
    time: "20–25 min",
    avgCost: "₹450 for two",
    saving: "₹95",
    tags: ["Seafood", "Top Rated"],
    isOpen: true,
    discount: null,
    veg: false,
    img: "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 4,
    name: "Kashi Art Café",
    cuisine: "Continental · Café · Breakfast",
    location: "Burgher Street, Fort Kochi",
    rating: 4.5,
    reviews: 1104,
    time: "15–20 min",
    avgCost: "₹350 for two",
    saving: "₹80",
    tags: ["Café", "New on DishWise"],
    isOpen: true,
    discount: "10% OFF",
    veg: true,
    img: "https://images.unsplash.com/photo-1614030421738-45753c1df75e?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 5,
    name: "Dal Roti",
    cuisine: "North Indian · Punjabi",
    location: "MG Road, Kochi",
    rating: 4.4,
    reviews: 876,
    time: "30–40 min",
    avgCost: "₹280 for two",
    saving: "₹70",
    tags: ["Pocket Friendly"],
    isOpen: true,
    discount: null,
    veg: false,
    img: "https://images.unsplash.com/photo-1630851840633-f96999247032?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 6,
    name: "Saravana Bhavan",
    cuisine: "South Indian · Pure Veg",
    location: "Broadway, Ernakulam",
    rating: 4.6,
    reviews: 2341,
    time: "15–25 min",
    avgCost: "₹180 for two",
    saving: "₹75",
    tags: ["Pure Veg", "Fast Delivery"],
    isOpen: true,
    discount: "12% OFF",
    veg: true,
    img: "https://images.unsplash.com/photo-1680359871322-aabe6b33eff5?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 7,
    name: "Malabar Junction",
    cuisine: "Kerala Sadya · Traditional",
    location: "Willingdon Island, Kochi",
    rating: 4.7,
    reviews: 1567,
    time: "25–35 min",
    avgCost: "₹400 for two",
    saving: "₹140",
    tags: ["Top Rated", "Premium"],
    isOpen: false,
    discount: null,
    veg: false,
    img: "https://images.unsplash.com/photo-1722698030083-75d1d50cabe4?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 8,
    name: "Chai Wala",
    cuisine: "Street Food · Snacks · Tea",
    location: "Palarivattom, Kochi",
    rating: 4.3,
    reviews: 598,
    time: "10–15 min",
    avgCost: "₹120 for two",
    saving: "₹40",
    tags: ["Pocket Friendly", "Fast Delivery"],
    isOpen: true,
    discount: "Free Chai",
    veg: true,
    img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop&auto=format",
  },
];

const CATEGORIES = ["All", "Biryani", "Seafood", "South Indian", "Café", "North Indian", "Street Food", "Pure Veg"];
const SORT_OPTIONS = ["Relevance", "Rating", "Delivery Time", "Cost: Low to High", "Cost: High to Low"];
const QUICK_FILTERS = [
  { label: "🎁 Offers", key: "offers" },
  { label: "⭐ Top Rated", key: "topRated" },
  { label: "✨ New", key: "new" },
  { label: "⚡ Fast Pickup", key: "fast" },
  { label: "🥗 Pure Veg", key: "veg" },
  { label: "💰 Budget", key: "budget" },
];

export default function Restaurants() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Relevance");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (key: string) => {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  };

  const filtered = ALL_RESTAURANTS.filter((r) => {
    const matchSearch =
      search === "" ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      category === "All" ||
      r.cuisine.toLowerCase().includes(category.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(category.toLowerCase()));
    const matchVeg = !activeFilters.includes("veg") || r.veg;
    const matchFast = !activeFilters.includes("fast") || r.time.startsWith("10") || r.time.startsWith("15");
    return matchSearch && matchCategory && matchVeg && matchFast;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "Rating") return b.rating - a.rating;
    if (sort === "Delivery Time") return parseInt(a.time) - parseInt(b.time);
    if (sort === "Cost: Low to High") return parseInt(a.avgCost.replace(/\D/g, "")) - parseInt(b.avgCost.replace(/\D/g, ""));
    if (sort === "Cost: High to Low") return parseInt(b.avgCost.replace(/\D/g, "")) - parseInt(a.avgCost.replace(/\D/g, ""));
    return 0;
  });

  return (
    <main className="min-h-screen bg-bg pt-20">
      {/* ── Hero Search ── */}
      <section className="relative overflow-hidden border-b border-border bg-surface py-14">
        <div className="pointer-events-none absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1709992804576-0c742c56631a?w=1400&h=400&fit=crop&auto=format"
            alt="restaurant"
            className="h-full w-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/80 to-surface" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-amber">
            Kochi · Ordering Direct
          </p>
          <h1
            className="mb-6 text-5xl font-semibold text-cream"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Find Your Next Meal
          </h1>

          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
            <div className="flex items-center gap-3 px-5 py-4">
              <span className="text-amber text-lg">🔍</span>
              <input
                type="text"
                placeholder="Search restaurants, cuisines, dishes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm text-cream placeholder-muted outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-muted hover:text-cream text-sm"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {["Biryani", "Kerala Meals", "Seafood", "Café", "Breakfast"].map((s) => (
              <button
                key={s}
                onClick={() => setSearch(s)}
                className="rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-cream-dim transition-colors hover:border-amber/40 hover:text-cream"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        {/* ── Quick Filters ── */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
          {QUICK_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => toggleFilter(f.key)}
              className={`flex-shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                activeFilters.includes(f.key)
                  ? "border-amber bg-amber/10 text-amber"
                  : "border-border text-cream-dim hover:border-amber/40 hover:text-cream"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ── Category + Sort ── */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`flex-shrink-0 rounded-lg px-3.5 py-2 text-xs font-medium transition-all ${
                  category === c
                    ? "bg-amber text-bg"
                    : "bg-card text-cream-dim hover:bg-card-hover hover:text-cream"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted">Sort:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-border bg-card px-3 py-2 text-xs text-cream outline-none"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Results count ── */}
        <div className="mt-6 mb-4 flex items-center justify-between">
          <p className="text-sm text-muted">
            Showing{" "}
            <span className="font-semibold text-cream">{sorted.length}</span>{" "}
            restaurant{sorted.length !== 1 ? "s" : ""} in Kochi
          </p>
          {activeFilters.length > 0 && (
            <button
              onClick={() => setActiveFilters([])}
              className="text-xs text-amber hover:text-amber-light"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* ── Restaurant Grid ── */}
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 text-5xl">🍽</div>
            <h3
              className="mb-2 text-2xl font-semibold text-cream"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              No restaurants found
            </h3>
            <p className="text-sm text-muted">Try a different search or filter</p>
            <button
              onClick={() => { setSearch(""); setCategory("All"); setActiveFilters([]); }}
              className="mt-5 rounded-full bg-amber px-6 py-2.5 text-sm font-semibold text-bg"
            >
              Show All
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sorted.map((r) => (
              <Link
                key={r.id}
                href="/restaurants/spice-garden"
                className={`group cursor-pointer overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:border-amber/30 hover:shadow-lg hover:shadow-amber/5 block ${
                  r.isOpen ? "border-border" : "border-border opacity-60"
                }`}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-surface">
                  <img
                    src={r.img}
                    alt={r.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/50 to-transparent" />

                  {/* Badges */}
                  <div className="absolute left-3 top-3 flex gap-2">
                    {r.discount && (
                      <span className="rounded-full bg-orange/90 px-2.5 py-1 text-xs font-bold text-cream shadow">
                        {r.discount}
                      </span>
                    )}
                    {r.veg && (
                      <span className="rounded-full bg-green/20 border border-green/40 px-2 py-1 text-xs font-semibold text-green-light">
                        Veg
                      </span>
                    )}
                  </div>

                  {!r.isOpen && (
                    <div className="absolute inset-0 flex items-center justify-center bg-bg/60">
                      <span className="rounded-full bg-card/90 px-4 py-1.5 text-xs font-semibold text-muted">
                        Currently Closed
                      </span>
                    </div>
                  )}

                  <div className="absolute right-3 top-3 rounded-full bg-green/20 border border-green/30 px-2.5 py-1 text-xs font-semibold text-green-light">
                    Save {r.saving}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3
                    className="text-base font-semibold leading-tight text-cream group-hover:text-amber transition-colors"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    {r.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted">{r.cuisine}</p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-amber text-sm">★</span>
                      <span className="text-sm font-semibold text-cream">{r.rating}</span>
                      <span className="text-xs text-muted">({r.reviews.toLocaleString()})</span>
                    </div>
                    <span className="text-xs text-muted">⏱ {r.time}</span>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                    <span className="text-xs text-muted">{r.avgCost}</span>
                    <span className="text-xs text-muted">{r.location.split(",")[0]}</span>
                  </div>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {r.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Order button */}
                <div className="border-t border-border px-4 py-3">
                  <div className="block w-full rounded-xl bg-amber/10 py-2.5 text-center text-xs font-semibold text-amber transition-all group-hover:bg-amber group-hover:text-bg">
                    Order Direct · Save {r.saving} →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* ── App download nudge ── */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-10">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-amber">Coming Soon</p>
              <h3
                className="text-2xl font-semibold text-cream"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                DishWise Mobile App
              </h3>
              <p className="mt-2 text-sm text-muted">
                Order on the go, track your savings, get exclusive app-only deals.
              </p>
              <div className="mt-5 flex gap-3">
                <button className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-cream-dim hover:border-amber/40">
                  <span>🍎</span> App Store
                </button>
                <button className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-cream-dim hover:border-amber/40">
                  <span>🤖</span> Google Play
                </button>
              </div>
            </div>
            <div className="text-6xl">📱</div>
          </div>
        </div>
      </div>
    </main>
  );
}

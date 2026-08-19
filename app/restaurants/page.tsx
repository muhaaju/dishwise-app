"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Restaurant {
  id: string;
  name: string;
  slug: string;
  cuisine_type: string;
  location: string;
  rating: number;
  total_reviews: number;
  avg_delivery_time: string;
  avg_cost_for_two: number;
  image_url: string | null;
  is_active: boolean;
  is_vegetarian: boolean;
  discount_text: string | null;
  tags: string[];
}

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
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Relevance");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  async function fetchRestaurants() {
    try {
      const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .eq("is_active", true)
        .order("rating", { ascending: false });

      if (error) throw error;
      setRestaurants(data || []);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  }

  const toggleFilter = (key: string) => {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  };

  const filtered = restaurants.filter((r) => {
    const matchSearch =
      search === "" ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine_type.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      category === "All" ||
      r.cuisine_type.toLowerCase().includes(category.toLowerCase()) ||
      r.tags?.some((t) => t.toLowerCase().includes(category.toLowerCase()));
    const matchVeg = !activeFilters.includes("veg") || r.is_vegetarian;
    const matchFast = !activeFilters.includes("fast") || parseInt(r.avg_delivery_time) <= 20;
    const matchTopRated = !activeFilters.includes("topRated") || r.rating >= 4.5;
    const matchBudget = !activeFilters.includes("budget") || r.avg_cost_for_two <= 300;
    const matchOffers = !activeFilters.includes("offers") || r.discount_text;
    
    return matchSearch && matchCategory && matchVeg && matchFast && matchTopRated && matchBudget && matchOffers;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "Rating") return b.rating - a.rating;
    if (sort === "Delivery Time") return parseInt(a.avg_delivery_time) - parseInt(b.avg_delivery_time);
    if (sort === "Cost: Low to High") return a.avg_cost_for_two - b.avg_cost_for_two;
    if (sort === "Cost: High to Low") return b.avg_cost_for_two - a.avg_cost_for_two;
    return 0;
  });

  if (loading) {
    return (
      <main className="min-h-screen bg-bg pt-20">
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <div className="mb-4 text-5xl">🍽️</div>
            <p className="text-sm text-muted">Loading restaurants...</p>
          </div>
        </div>
      </main>
    );
  }

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
            {sorted.map((r) => {
              const savings = Math.round(r.avg_cost_for_two * 0.3); // 30% savings estimate
              return (
                <Link
                  key={r.id}
                  href={`/restaurants/${r.slug}`}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-amber/30 hover:shadow-lg hover:shadow-amber/5 block"
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden bg-surface">
                    <img
                      src={r.image_url || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop"}
                      alt={r.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/50 to-transparent" />

                    {/* Badges */}
                    <div className="absolute left-3 top-3 flex gap-2">
                      {r.discount_text && (
                        <span className="rounded-full bg-orange/90 px-2.5 py-1 text-xs font-bold text-cream shadow">
                          {r.discount_text}
                        </span>
                      )}
                      {r.is_vegetarian && (
                        <span className="rounded-full bg-green/20 border border-green/40 px-2 py-1 text-xs font-semibold text-green-light">
                          Veg
                        </span>
                      )}
                    </div>

                    <div className="absolute right-3 top-3 rounded-full bg-green/20 border border-green/30 px-2.5 py-1 text-xs font-semibold text-green-light">
                      Save ₹{savings}
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
                    <p className="mt-0.5 text-xs text-muted">{r.cuisine_type}</p>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-amber text-sm">★</span>
                        <span className="text-sm font-semibold text-cream">{r.rating}</span>
                        <span className="text-xs text-muted">({r.total_reviews?.toLocaleString() || 0})</span>
                      </div>
                      <span className="text-xs text-muted">⏱ {r.avg_delivery_time} min</span>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                      <span className="text-xs text-muted">₹{r.avg_cost_for_two} for two</span>
                      <span className="text-xs text-muted">{r.location?.split(",")[0] || "Kochi"}</span>
                    </div>

                    {/* Tags */}
                    {r.tags && r.tags.length > 0 && (
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
                    )}
                  </div>

                  {/* Order button */}
                  <div className="border-t border-border px-4 py-3">
                    <div className="block w-full rounded-xl bg-amber/10 py-2.5 text-center text-xs font-semibold text-amber transition-all group-hover:bg-amber group-hover:text-bg">
                      Order Direct · Save ₹{savings} →
                    </div>
                  </div>
                </Link>
              );
            })}
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
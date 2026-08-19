"use client";

import Link from "next/link";
import { useState } from "react";

const categories = [
  { label: "Biryani", emoji: "🍚", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300&h=200&fit=crop&auto=format" },
  { label: "Kerala Meals", emoji: "🍛", img: "https://images.unsplash.com/photo-1722698030083-75d1d50cabe4?w=300&h=200&fit=crop&auto=format" },
  { label: "Seafood", emoji: "🦞", img: "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=300&h=200&fit=crop&auto=format" },
  { label: "Breakfast", emoji: "🥞", img: "https://images.unsplash.com/photo-1680359871322-aabe6b33eff5?w=300&h=200&fit=crop&auto=format" },
  { label: "Desserts", emoji: "🍮", img: "https://images.unsplash.com/photo-1630851840633-f96999247032?w=300&h=200&fit=crop&auto=format" },
  { label: "Snacks", emoji: "🥙", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&h=200&fit=crop&auto=format" },
];

const features = [
  {
    icon: "💸",
    title: "Save ₹70–150 Per Order",
    body: "Every order placed directly through DishWise saves you the platform markup that Swiggy and Zomato silently add. Real food, real prices.",
  },
  {
    icon: "🔍",
    title: "Full Price Transparency",
    body: "See exactly what you pay. No surge pricing, no hidden service fees, no delivery charges inflated at checkout. The menu price is your price.",
  },
  {
    icon: "🏘",
    title: "Support Local Kitchens",
    body: "When you order direct, 100% of the restaurant's margin stays with them — not commission-skimmed by a VC-backed aggregator. Community first.",
  },
];

const steps = [
  { n: "01", title: "Browse Restaurants", body: "Explore Kochi's best local eateries — filtered by cuisine, rating, or distance." },
  { n: "02", title: "Compare Real Prices", body: "See the direct menu price side-by-side with what the aggregators charge you." },
  { n: "03", title: "Order & Pay Securely", body: "UPI, cards, or cash on pickup — checkout in under 60 seconds." },
  { n: "04", title: "Pick Up Fresh", body: "Skip the soggy delivery bag. Walk in, pick up your order hot and ready." },
];

const topRestaurants = [
  {
    name: "Paragon Restaurant",
    cuisine: "Malabar Biryani · Kerala",
    rating: 4.8,
    time: "20 min",
    saving: "Save ₹130",
    img: "https://images.unsplash.com/photo-1575526854473-e85fdba07b7a?w=600&h=400&fit=crop&auto=format",
  },
  {
    name: "Hotel Sagar",
    cuisine: "Seafood · Coastal",
    rating: 4.6,
    time: "25 min",
    saving: "Save ₹95",
    img: "https://images.unsplash.com/photo-1709992804576-0c742c56631a?w=600&h=400&fit=crop&auto=format",
  },
  {
    name: "Kashi Art Café",
    cuisine: "Continental · Café",
    rating: 4.5,
    time: "15 min",
    saving: "Save ₹80",
    img: "https://images.unsplash.com/photo-1614030421738-45753c1df75e?w=600&h=400&fit=crop&auto=format",
  },
];

export default function Home() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-bg pt-20">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1636375584142-23b44ef2fb4c?w=1600&h=1000&fit=crop&auto=format"
            alt="Kerala kitchen"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/90 to-bg/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
        </div>

        {/* Decorative amber glow */}
        <div className="pointer-events-none absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-amber/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-20 lg:grid-cols-2 lg:px-10">
          <div className="flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber">
                Kochi&apos;s Direct-Order Platform
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-6xl font-semibold leading-[1.05] tracking-tight text-cream lg:text-7xl"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Order Direct.
              <br />
              <em className="not-italic text-amber">Save More.</em>
              <br />
              Every Time.
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-cream-dim">
              Skip Swiggy and Zomato markups. Order straight from Kochi&apos;s best restaurants and save{" "}
              <span className="font-semibold text-cream">₹70–150 per meal</span> — every single order.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/restaurants"
                className="rounded-full bg-amber px-7 py-3.5 text-sm font-semibold text-bg transition-all hover:bg-amber-dark hover:shadow-lg hover:shadow-amber/20"
              >
                Browse Restaurants →
              </Link>
              <button
                onClick={() => {
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-cream-dim transition-colors hover:border-cream/40 hover:text-cream"
              >
                How It Works
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap gap-4">
              {["🔒 100% Secure Payments", "✅ No Hidden Fees", "⚡ Instant Confirmation"].map((b) => (
                <span key={b} className="text-xs font-medium text-muted">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Floating food card — desktop only */}
          <div className="relative hidden lg:flex lg:items-center lg:justify-center">
            <div className="relative h-[480px] w-[380px]">
              <img
                src="https://images.unsplash.com/photo-1575526854473-e85fdba07b7a?w=760&h=960&fit=crop&auto=format"
                alt="Kerala food"
                className="h-full w-full rounded-3xl object-cover shadow-2xl"
              />
              {/* Savings badge */}
              <div className="absolute -left-8 bottom-20 rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-xl backdrop-blur-sm">
                <p className="text-xs text-muted">You save vs Swiggy</p>
                <p className="text-2xl font-bold text-green" style={{ fontFamily: "'Fraunces', serif" }}>
                  ₹130
                </p>
                <p className="text-xs text-muted">on this order</p>
              </div>
              {/* Rating badge */}
              <div className="absolute -right-6 top-16 rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-xl backdrop-blur-sm">
                <div className="flex items-center gap-1.5">
                  <span className="text-amber text-lg">★</span>
                  <span className="text-xl font-bold text-cream" style={{ fontFamily: "'Fraunces', serif" }}>4.8</span>
                </div>
                <p className="text-xs text-muted">2,847 reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-2 divide-x divide-border lg:grid-cols-4">
            {[
              { value: "₹150", label: "Avg. savings per order" },
              { value: "50+", label: "Partner restaurants" },
              { value: "1,000+", label: "Happy customers" },
              { value: "30 min", label: "Avg. pickup time" },
            ].map((s) => (
              <div key={s.label} className="px-8 py-8 text-center first:pl-0 last:pr-0">
                <p
                  className="text-4xl font-semibold text-amber"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  {s.value}
                </p>
                <p className="mt-1.5 text-sm text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber">
              What are you craving?
            </p>
            <h2
              className="text-4xl font-semibold text-cream"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Browse by Category
            </h2>
          </div>
          <Link
            href="/restaurants"
            className="hidden text-sm font-medium text-amber hover:text-amber-light sm:block"
          >
            See all →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link
              key={c.label}
              href="/restaurants"
              className="group relative overflow-hidden rounded-2xl bg-card"
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={c.img}
                  alt={c.label}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                <p className="text-sm font-semibold text-cream">{c.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Why DishWise ── */}
      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-amber">
              The DishWise Difference
            </p>
            <h2
              className="text-4xl font-semibold text-cream lg:text-5xl"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Why Choose DishWise?
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-amber/40 hover:bg-card-hover"
              >
                <div className="mb-5 text-3xl">{f.icon}</div>
                <h3
                  className="mb-3 text-xl font-semibold text-cream"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Top Restaurants Preview ── */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber">
              Popular right now
            </p>
            <h2
              className="text-4xl font-semibold text-cream"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Top Restaurants in Kochi
            </h2>
          </div>
          <Link
            href="/restaurants"
            className="hidden text-sm font-medium text-amber hover:text-amber-light sm:block"
          >
            View all 50+ →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topRestaurants.map((r) => (
            <Link
              key={r.name}
              href="/restaurants"
              className="group overflow-hidden rounded-2xl border border-border bg-card text-left transition-all duration-300 hover:border-amber/30 hover:shadow-lg hover:shadow-amber/5"
            >
              <div className="relative h-52 overflow-hidden bg-surface">
                <img
                  src={r.img}
                  alt={r.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />
                <div className="absolute right-3 top-3 rounded-full bg-green/20 px-2.5 py-1 text-xs font-semibold text-green-light border border-green/30">
                  {r.saving}
                </div>
              </div>
              <div className="p-5">
                <h3
                  className="text-lg font-semibold text-cream"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  {r.name}
                </h3>
                <p className="mt-1 text-xs text-muted">{r.cuisine}</p>
                <div className="mt-3 flex items-center gap-4">
                  <span className="flex items-center gap-1 text-sm font-medium text-cream">
                    <span className="text-amber">★</span> {r.rating}
                  </span>
                  <span className="text-xs text-muted">·</span>
                  <span className="text-sm text-muted">⏱ {r.time} pickup</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/restaurants"
            className="rounded-full border border-border px-7 py-3 text-sm font-medium text-cream-dim hover:text-cream"
          >
            View all restaurants →
          </Link>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-amber">
              Simple as 1, 2, 3, 4
            </p>
            <h2
              className="text-4xl font-semibold text-cream lg:text-5xl"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              How DishWise Works
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.n} className="relative">
                {i < steps.length - 1 && (
                  <div className="absolute left-14 top-7 hidden h-px w-[calc(100%-3.5rem)] bg-border lg:block" />
                )}
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card">
                  <span
                    className="text-2xl font-semibold text-amber"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    {s.n}
                  </span>
                </div>
                <h3
                  className="mb-2 text-lg font-semibold text-cream"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative overflow-hidden bg-amber py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange/30 blur-3xl" />
          <div className="absolute -bottom-10 left-1/4 h-48 w-48 rounded-full bg-bg/10 blur-2xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2
            className="text-5xl font-semibold leading-tight text-bg"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Hungry? Skip the markup.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-bg/70 text-lg">
            Join 1,000+ Kochi residents who already save on every meal by ordering direct.
          </p>
          <Link
            href="/restaurants"
            className="mt-8 inline-block rounded-full bg-bg px-8 py-4 text-sm font-bold text-amber shadow-xl transition-all hover:shadow-2xl"
          >
            Find Restaurants Near You →
          </Link>
        </div>
      </section>
    </main>
  );
}

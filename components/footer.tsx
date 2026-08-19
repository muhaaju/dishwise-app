"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber text-bg text-sm">
                🍽
              </span>
              <span
                className="text-xl font-semibold text-cream"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                DishWise
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              Skip the aggregators. Order directly from Kochi&apos;s best restaurants and keep more money in your pocket.
            </p>
            <div className="mt-5 flex gap-3">
              {["𝕏", "📘", "📸"].map((icon, i) => (
                <button
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-sm text-muted transition-colors hover:border-amber hover:text-amber"
                  aria-label={`Social link ${i + 1}`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-amber">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Restaurants", href: "/restaurants" },
                { label: "Track Order", href: "/track-order" },
                { label: "Offers & Deals", href: "/restaurants" },
                { label: "Top Rated", href: "/restaurants" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream-dim transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-amber">
              Company
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Partner With Us", href: "/admin/login" },
                { label: "Careers", href: "/careers" },
                { label: "Blog", href: "/blog" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream-dim transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-amber">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-cream-dim">
                <span className="mt-0.5 text-amber">📍</span>
                <span>Marine Drive, Kochi, Kerala 682031</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-cream-dim">
                <span className="text-amber">📞</span>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-cream-dim">
                <span className="text-amber">✉</span>
                <span>hello@dishwise.in</span>
              </li>
            </ul>
            <div className="mt-5 rounded-xl border border-border bg-card px-4 py-3">
              <p className="text-xs font-medium text-amber">🕐 Support Hours</p>
              <p className="mt-1 text-xs text-muted">Mon–Sun · 8 AM – 11 PM IST</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            © 2024 DishWise. Made with ❤ in Kochi, Kerala.
          </p>
          <p className="text-xs text-muted">
            Empowering local restaurants · Saving customers money
          </p>
        </div>
      </div>
    </footer>
  );
}
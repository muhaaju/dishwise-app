"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const supabase = createClient();

  const links = [
    { id: "/", label: "Home" },
    { id: "/restaurants", label: "Restaurants" },
    { id: "/track-order", label: "Track Order" },
  ];

  const isActive = (path: string) => pathname === path;

  // Check user session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}${pathname}`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-bg/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber text-bg text-sm font-bold">
            🍽
          </span>
          <span
            className="text-xl font-semibold tracking-tight text-cream"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            DishWise
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <Link
                href={l.id}
                className={`text-sm font-medium transition-colors duration-150 ${
                  isActive(l.id)
                    ? "text-amber"
                    : "text-cream-dim hover:text-cream"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + Auth + mobile toggle */}
        <div className="flex items-center gap-3">
          {/* Desktop Auth */}
          {loading ? (
            <div className="hidden md:flex h-9 w-9 items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-amber border-t-transparent" />
            </div>
          ) : user ? (
            <div className="relative hidden md:block">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 transition-all hover:border-amber/40"
              >
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata?.full_name || 'User'}
                    className="h-7 w-7 rounded-full border-2 border-amber"
                  />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber text-bg text-xs font-bold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-medium text-cream">
                  {user.user_metadata?.full_name?.split(' ')[0] || 'Profile'}
                </span>
                <svg className={`h-4 w-4 text-cream-dim transition-transform ${profileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-border bg-card shadow-2xl">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center gap-3">
                      {user.user_metadata?.avatar_url ? (
                        <img
                          src={user.user_metadata.avatar_url}
                          alt={user.user_metadata?.full_name || 'User'}
                          className="h-12 w-12 rounded-full border-2 border-amber"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber text-bg text-lg font-bold">
                          {user.email?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-cream truncate">
                          {user.user_metadata?.full_name || 'User'}
                        </p>
                        <p className="text-xs text-muted truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <Link
                      href="/track-order"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-cream-dim hover:bg-surface hover:text-cream transition-colors"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span>My Orders</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-cream-dim hover:bg-surface hover:text-red-400 transition-colors"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              className="hidden md:flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-cream-dim transition-all hover:border-amber/40 hover:text-cream"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Sign In</span>
            </button>
          )}

          <Link
            href="/restaurants"
            className="hidden rounded-full bg-amber px-5 py-2 text-sm font-semibold text-bg transition-colors hover:bg-amber-dark md:block"
          >
            Order Now
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-cream-dim hover:text-cream md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border bg-surface px-6 py-4 md:hidden">
          {/* Mobile Auth Section */}
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber border-t-transparent" />
            </div>
          ) : user ? (
            <div className="mb-4 rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center gap-3 mb-3">
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata?.full_name || 'User'}
                    className="h-12 w-12 rounded-full border-2 border-amber"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber text-bg text-lg font-bold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-cream truncate">
                    {user.user_metadata?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-muted truncate">{user.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Link
                  href="/track-order"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-cream-dim hover:bg-surface hover:text-cream transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>My Orders</span>
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-cream-dim hover:bg-surface hover:text-red-400 transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                handleSignIn();
                setMenuOpen(false);
              }}
              className="mb-4 flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-3 text-sm font-medium text-cream-dim transition-all hover:border-amber/40 hover:text-cream"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Sign In with Google</span>
            </button>
          )}

          {/* Navigation Links */}
          {links.map((l) => (
            <Link
              key={l.id}
              href={l.id}
              onClick={() => setMenuOpen(false)}
              className={`block w-full py-3 text-left text-sm font-medium transition-colors ${
                isActive(l.id) ? "text-amber" : "text-cream-dim hover:text-cream"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/restaurants"
            onClick={() => setMenuOpen(false)}
            className="mt-3 block w-full rounded-full bg-amber py-2.5 text-center text-sm font-semibold text-bg"
          >
            Order Now
          </Link>
        </div>
      )}
    </header>
  );
}
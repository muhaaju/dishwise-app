'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import type { User } from '@supabase/supabase-js';

interface CustomerProfile {
  id: string;
  auth_user_id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  default_address: string | null;
}

interface GoogleAuthProps {
  onAuthSuccess?: (user: User, profile?: CustomerProfile) => void;
}

export default function GoogleAuth({ onAuthSuccess }: GoogleAuthProps) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  // Fetch customer profile
  const fetchProfile = async (userId: string) => {
    try {
      const response = await fetch('/api/customers/profile');
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setProfile(result.data);
          return result.data;
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
    return null;
  };

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const customerProfile = await fetchProfile(session.user.id);
        if (onAuthSuccess) {
          onAuthSuccess(session.user, customerProfile || undefined);
        }
      }
      
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const customerProfile = await fetchProfile(session.user.id);
        if (onAuthSuccess) {
          onAuthSuccess(session.user, customerProfile || undefined);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, onAuthSuccess]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-card p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="bg-white rounded-2xl shadow-card p-6">
        <div className="flex items-center gap-4 mb-4">
          {user.user_metadata?.avatar_url && (
            <img
              src={user.user_metadata.avatar_url}
              alt={user.user_metadata?.full_name || 'User'}
              className="w-16 h-16 rounded-full border-2 border-primary"
            />
          )}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-primary">
              {user.user_metadata?.full_name || 'User'}
            </h3>
            <p className="text-sm text-text-muted">{user.email}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-200 mb-4">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-semibold text-green-700">Signed in with Google</span>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full py-2 text-sm text-text-muted hover:text-primary transition-colors"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-card p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-primary mb-2">Quick Checkout</h3>
        <p className="text-sm text-text-muted">
          Sign in with Google to auto-fill your details and track orders easily
        </p>
      </div>

      <div className="space-y-4">
        {/* Google Sign In Button */}
        <button
          onClick={async () => {
            await supabase.auth.signInWithOAuth({
              provider: 'google',
              options: {
                redirectTo: `${window.location.origin}/checkout`,
                queryParams: {
                  access_type: 'offline',
                  prompt: 'consent',
                },
              },
            });
          }}
          className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-text-muted">or continue as guest</span>
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Auto-fill your details</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Track all your orders</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Faster future checkouts</span>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils/calculations';

interface DashboardStats {
  totalOrders: number;
  todayOrders: number;
  totalRevenue: number;
  todayRevenue: number;
  activeRestaurants: number;
  totalMenuItems: number;
  pendingOrders: number;
  completedOrders: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    // Check admin session
    const session = localStorage.getItem('admin_session');
    if (!session) {
      router.push('/admin/login');
      return;
    }

    const sessionData = JSON.parse(session);
    setAdminName(sessionData.admin?.name || 'Admin');

    // Fetch dashboard stats
    fetchStats();
  }, [router]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard/stats');
      if (response.ok) {
        const result = await response.json();
        setStats(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      localStorage.removeItem('admin_session');
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local session and redirect
      localStorage.removeItem('admin_session');
      router.push('/admin/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-text-muted">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="text-2xl font-display font-bold text-primary">
                DishWise Admin
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-text-muted">Welcome, {adminName}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold text-cta hover:text-cta-dark transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-primary mb-2">
            Dashboard
          </h1>
          <p className="text-text-muted">Overview of your business metrics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Orders */}
          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">📦</div>
              <div className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                All Time
              </div>
            </div>
            <div className="text-3xl font-bold text-primary mb-1">
              {stats?.totalOrders || 0}
            </div>
            <div className="text-sm text-text-muted">Total Orders</div>
          </div>

          {/* Today's Orders */}
          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">🔥</div>
              <div className="text-sm font-semibold text-highlight-dark bg-highlight/10 px-3 py-1 rounded-full">
                Today
              </div>
            </div>
            <div className="text-3xl font-bold text-primary mb-1">
              {stats?.todayOrders || 0}
            </div>
            <div className="text-sm text-text-muted">Orders Today</div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">💰</div>
              <div className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                Revenue
              </div>
            </div>
            <div className="text-3xl font-bold text-primary mb-1 font-mono">
              {formatCurrency(stats?.totalRevenue || 0)}
            </div>
            <div className="text-sm text-text-muted">Total Revenue</div>
          </div>

          {/* Today's Revenue */}
          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">💵</div>
              <div className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                Today
              </div>
            </div>
            <div className="text-3xl font-bold text-primary mb-1 font-mono">
              {formatCurrency(stats?.todayRevenue || 0)}
            </div>
            <div className="text-sm text-text-muted">Revenue Today</div>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="text-2xl mb-2">🏪</div>
            <div className="text-2xl font-bold text-primary mb-1">
              {stats?.activeRestaurants || 0}
            </div>
            <div className="text-sm text-text-muted">Active Restaurants</div>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="text-2xl mb-2">🍽️</div>
            <div className="text-2xl font-bold text-primary mb-1">
              {stats?.totalMenuItems || 0}
            </div>
            <div className="text-sm text-text-muted">Menu Items</div>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="text-2xl mb-2">⏳</div>
            <div className="text-2xl font-bold text-yellow-600 mb-1">
              {stats?.pendingOrders || 0}
            </div>
            <div className="text-sm text-text-muted">Pending Orders</div>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="text-2xl mb-2">✅</div>
            <div className="text-2xl font-bold text-green-600 mb-1">
              {stats?.completedOrders || 0}
            </div>
            <div className="text-sm text-text-muted">Completed Orders</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="text-xl font-bold text-primary mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/restaurants"
              className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
            >
              <span className="text-3xl">🏪</span>
              <div>
                <div className="font-semibold text-primary">Restaurants</div>
                <div className="text-xs text-text-muted">Manage restaurants</div>
              </div>
            </Link>

            <Link
              href="/admin/menu"
              className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
            >
              <span className="text-3xl">🍽️</span>
              <div>
                <div className="font-semibold text-primary">Menu Items</div>
                <div className="text-xs text-text-muted">Manage menu</div>
              </div>
            </Link>

            <Link
              href="/admin/orders"
              className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
            >
              <span className="text-3xl">📦</span>
              <div>
                <div className="font-semibold text-primary">Orders</div>
                <div className="text-xs text-text-muted">View & manage orders</div>
              </div>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
            >
              <span className="text-3xl">🌐</span>
              <div>
                <div className="font-semibold text-primary">View Site</div>
                <div className="text-xs text-text-muted">Customer portal</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

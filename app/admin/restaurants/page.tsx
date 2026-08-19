'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Restaurant } from '@/types/database';

export default function AdminRestaurantsPage() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    // Check admin session
    const session = localStorage.getItem('admin_session');
    if (!session) {
      router.push('/admin/login');
      return;
    }

    fetchRestaurants();
  }, [router]);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('/api/admin/restaurants');
      if (response.ok) {
        const result = await response.json();
        setRestaurants(result.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleRestaurantStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/restaurants/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !currentStatus }),
      });

      if (response.ok) {
        fetchRestaurants();
      }
    } catch (error) {
      console.error('Failed to toggle restaurant status:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      localStorage.removeItem('admin_session');
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('admin_session');
      router.push('/admin/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-text-muted">Loading restaurants...</p>
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
            <div className="flex items-center gap-6">
              <Link href="/admin/dashboard" className="text-2xl font-display font-bold text-primary">
                DishWise Admin
              </Link>
              <div className="flex gap-4 text-sm">
                <Link href="/admin/dashboard" className="text-text-muted hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link href="/admin/restaurants" className="text-primary font-semibold">
                  Restaurants
                </Link>
                <Link href="/admin/menu" className="text-text-muted hover:text-primary transition-colors">
                  Menu
                </Link>
                <Link href="/admin/orders" className="text-text-muted hover:text-primary transition-colors">
                  Orders
                </Link>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-semibold text-cta hover:text-cta-dark transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-primary mb-2">
              Restaurants
            </h1>
            <p className="text-text-muted">Manage restaurant listings</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-cta text-white rounded-xl font-semibold hover:bg-cta-dark transition-colors"
          >
            + Add Restaurant
          </button>
        </div>

        {/* Restaurants Grid */}
        {restaurants.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-card">
            <div className="text-6xl mb-4">🏪</div>
            <h3 className="text-xl font-bold text-primary mb-2">No Restaurants Yet</h3>
            <p className="text-text-muted mb-6">Add your first restaurant to get started</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-cta text-white rounded-xl font-semibold hover:bg-cta-dark transition-colors"
            >
              + Add Restaurant
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-lg transition-shadow">
                {/* Restaurant Image */}
                <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5">
                  {restaurant.image_url ? (
                    <img
                      src={restaurant.image_url}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl">🏪</span>
                    </div>
                  )}
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      restaurant.is_active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {restaurant.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                {/* Restaurant Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {restaurant.name}
                  </h3>
                  {restaurant.description && (
                    <p className="text-sm text-text-muted mb-4 line-clamp-2">
                      {restaurant.description}
                    </p>
                  )}

                  {/* Details */}
                  <div className="space-y-2 mb-4 text-sm">
                    {restaurant.address && (
                      <div className="flex items-start gap-2">
                        <span>📍</span>
                        <span className="text-text-muted">{restaurant.address}</span>
                      </div>
                    )}
                    {restaurant.phone && (
                      <div className="flex items-center gap-2">
                        <span>📞</span>
                        <span className="text-text-muted">{restaurant.phone}</span>
                      </div>
                    )}
                    {restaurant.cuisine_type && (
                      <div className="flex items-center gap-2">
                        <span>🍽️</span>
                        <span className="text-text-muted">{restaurant.cuisine_type}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/restaurants/${restaurant.id}/edit`}
                      className="flex-1 px-4 py-2 bg-primary text-white text-center rounded-xl font-semibold hover:bg-primary-dark transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => toggleRestaurantStatus(restaurant.id, restaurant.is_active)}
                      className={`flex-1 px-4 py-2 rounded-xl font-semibold transition-colors ${
                        restaurant.is_active
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {restaurant.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Restaurant Modal - Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-primary mb-4">Add Restaurant</h2>
            <p className="text-text-muted mb-6">
              Restaurant creation form will be implemented here
            </p>
            <button
              onClick={() => setShowAddModal(false)}
              className="w-full px-4 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils/calculations';
import { MenuItem, Restaurant } from '@/types/database';

export default function AdminMenuPage() {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    // Check admin session
    const session = localStorage.getItem('admin_session');
    if (!session) {
      router.push('/admin/login');
      return;
    }

    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      // Fetch restaurants
      const restaurantsRes = await fetch('/api/admin/restaurants');
      if (restaurantsRes.ok) {
        const restaurantsResult = await restaurantsRes.json();
        setRestaurants(restaurantsResult.data || []);
      }

      // Fetch menu items
      const menuRes = await fetch('/api/admin/menu');
      if (menuRes.ok) {
        const menuResult = await menuRes.json();
        setMenuItems(menuResult.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleItemAvailability = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/menu/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_available: !currentStatus }),
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Failed to toggle item availability:', error);
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

  const filteredItems = selectedRestaurant === 'all'
    ? menuItems
    : menuItems.filter(item => item.restaurant_id === selectedRestaurant);

  const getRestaurantName = (restaurantId: string) => {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    return restaurant?.name || 'Unknown';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-text-muted">Loading menu items...</p>
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
                <Link href="/admin/restaurants" className="text-text-muted hover:text-primary transition-colors">
                  Restaurants
                </Link>
                <Link href="/admin/menu" className="text-primary font-semibold">
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
              Menu Items
            </h1>
            <p className="text-text-muted">Manage menu items and pricing</p>
          </div>
          <div className="flex gap-4">
            <select
              value={selectedRestaurant}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Restaurants</option>
              {restaurants.map(restaurant => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-cta text-white rounded-xl font-semibold hover:bg-cta-dark transition-colors"
            >
              + Add Menu Item
            </button>
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-card">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-bold text-primary mb-2">No Menu Items Yet</h3>
            <p className="text-text-muted mb-6">Add your first menu item to get started</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-cta text-white rounded-xl font-semibold hover:bg-cta-dark transition-colors"
            >
              + Add Menu Item
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-lg transition-shadow">
                {/* Item Image */}
                <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl">🍽️</span>
                    </div>
                  )}
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.is_available
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {item.is_available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                  {/* Veg/Non-veg Badge */}
                  <div className="absolute top-4 left-4">
                    {item.is_vegetarian ? (
                      <div className="w-6 h-6 border-2 border-green-600 bg-white flex items-center justify-center rounded">
                        <div className="w-3 h-3 rounded-full bg-green-600"></div>
                      </div>
                    ) : (
                      <div className="w-6 h-6 border-2 border-red-600 bg-white flex items-center justify-center rounded">
                        <div className="w-3 h-3 rounded-full bg-red-600"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Item Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-text-muted mb-3">
                    {getRestaurantName(item.restaurant_id)}
                  </p>

                  {item.description && (
                    <p className="text-sm text-text-muted mb-4 line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  {/* Pricing */}
                  <div className="space-y-2 mb-4 p-3 bg-background rounded-xl">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">Direct Price:</span>
                      <span className="font-bold text-primary font-mono">
                        {formatCurrency(item.in_shop_price)}
                      </span>
                    </div>
                    {item.swiggy_price && (
                      <div className="flex justify-between text-sm">
                        <span className="text-text-muted">Swiggy Price:</span>
                        <span className="font-semibold font-mono">
                          {formatCurrency(item.swiggy_price)}
                        </span>
                      </div>
                    )}
                    {item.zomato_price && (
                      <div className="flex justify-between text-sm">
                        <span className="text-text-muted">Zomato Price:</span>
                        <span className="font-semibold font-mono">
                          {formatCurrency(item.zomato_price)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/menu/${item.id}/edit`}
                      className="flex-1 px-4 py-2 bg-primary text-white text-center rounded-xl font-semibold hover:bg-primary-dark transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => toggleItemAvailability(item.id, item.is_available)}
                      className={`flex-1 px-4 py-2 rounded-xl font-semibold transition-colors ${
                        item.is_available
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {item.is_available ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Menu Item Modal - Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-primary mb-4">Add Menu Item</h2>
            <p className="text-text-muted mb-6">
              Menu item creation form will be implemented here
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

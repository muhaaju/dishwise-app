'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { formatCurrency, formatDate, getOrderStatusColor, getOrderStatusLabel } from '@/lib/utils/calculations';
import { Order } from '@/types/database';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const phoneFromUrl = searchParams.get('phone') || '';
  
  const [phone, setPhone] = useState(phoneFromUrl);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSearched(true);

    try {
      // Format phone number
      const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;

      // Fetch orders
      const response = await fetch(`/api/orders/track?phone=${encodeURIComponent(formattedPhone)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const result = await response.json();
      setOrders(result.data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-display font-bold text-primary">
              DishWise
            </Link>
            <Link
              href="/restaurants"
              className="text-sm font-semibold text-primary hover:text-cta transition-colors"
            >
              Browse Restaurants
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">📦</div>
            <h1 className="text-3xl font-display font-bold text-primary mb-2">
              Track Your Orders
            </h1>
            <p className="text-text-muted">
              Enter your phone number to view your order history
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-2xl shadow-card p-6 mb-8">
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Mobile Number
                </label>
                <div className="flex gap-2">
                  <div className="flex flex-1">
                    <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-200 bg-background text-text-muted">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phone.replace('+91', '')}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-r-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="9876543210"
                      maxLength={10}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-cta text-white rounded-xl font-semibold hover:bg-cta-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Searching...' : 'Track'}
                  </button>
                </div>
              </div>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Orders List */}
          {searched && !loading && (
            <div>
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-primary mb-2">No Orders Found</h3>
                  <p className="text-text-muted mb-6">
                    We couldn't find any orders with this phone number
                  </p>
                  <Link
                    href="/restaurants"
                    className="inline-block px-6 py-3 bg-cta text-white rounded-xl font-semibold hover:bg-cta-dark transition-colors"
                  >
                    Start Ordering
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-primary mb-4">
                    Your Orders ({orders.length})
                  </h2>
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-2xl shadow-card p-6 hover:shadow-lg transition-shadow">
                      {/* Order Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="font-mono font-bold text-primary mb-1">
                            {order.order_number}
                          </div>
                          <div className="text-sm text-text-muted">
                            {formatDate(order.placed_at)}
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getOrderStatusColor(order.status)}`}>
                          {getOrderStatusLabel(order.status)}
                        </span>
                      </div>

                      {/* Order Items */}
                      <div className="mb-4 pb-4 border-b border-gray-200">
                        <div className="space-y-2">
                          {order.items.map((item: any, index: number) => (
                            <div key={index} className="flex justify-between text-sm">
                              <div>
                                <span className="font-medium">{item.name}</span>
                                <span className="text-text-muted"> × {item.quantity}</span>
                              </div>
                              <span className="font-semibold font-mono">
                                {formatCurrency(item.subtotal)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Footer */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-text-muted mb-1">Total Amount</div>
                          <div className="text-xl font-bold text-primary font-mono">
                            {formatCurrency(order.total_amount)}
                          </div>
                          {order.savings_amount && order.savings_amount > 0 && (
                            <div className="text-sm text-highlight-dark font-semibold">
                              Saved {formatCurrency(order.savings_amount)}
                            </div>
                          )}
                        </div>
                        <Link
                          href={`/order-confirmation/${order.id}`}
                          className="px-4 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
                        >
                          View Details
                        </Link>
                      </div>

                      {/* Pickup Time */}
                      {order.pickup_time && order.status !== 'completed' && order.status !== 'cancelled' && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-2 text-sm">
                            <span>📍</span>
                            <span className="text-text-muted">
                              Pickup: {formatDate(order.pickup_time)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">📦</div>
          <p className="text-text-muted">Loading...</p>
        </div>
      </div>
    }>
      <TrackOrderContent />
    </Suspense>
  );
}
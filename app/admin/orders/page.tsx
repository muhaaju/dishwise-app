'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatCurrency, formatDate, getOrderStatusColor, getOrderStatusLabel } from '@/lib/utils/calculations';
import { Order } from '@/types/database';

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    // Check admin session
    const session = localStorage.getItem('admin_session');
    if (!session) {
      router.push('/admin/login');
      return;
    }

    fetchOrders();
  }, [router]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders');
      if (response.ok) {
        const result = await response.json();
        setOrders(result.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
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

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'placed', label: 'Placed' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'preparing', label: 'Preparing' },
    { value: 'ready', label: 'Ready' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-text-muted">Loading orders...</p>
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
                <Link href="/admin/menu" className="text-text-muted hover:text-primary transition-colors">
                  Menu
                </Link>
                <Link href="/admin/orders" className="text-primary font-semibold">
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
              Orders
            </h1>
            <p className="text-text-muted">Manage customer orders</p>
          </div>
          
          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-card">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-primary mb-2">No Orders Found</h3>
            <p className="text-text-muted">
              {filter === 'all' ? 'No orders yet' : `No ${filter} orders`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-card p-6">
                {/* Order Header */}
                <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <div className="font-mono font-bold text-primary text-lg mb-1">
                      {order.order_number}
                    </div>
                    <div className="text-sm text-text-muted">
                      {formatDate(order.placed_at)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary font-mono mb-1">
                      {formatCurrency(order.total_amount)}
                    </div>
                    {order.savings_amount && order.savings_amount > 0 && (
                      <div className="text-sm text-highlight-dark font-semibold">
                        Saved {formatCurrency(order.savings_amount)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left Column - Customer & Items */}
                  <div>
                    {/* Customer Info */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-primary mb-2">Customer Details</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-text-muted">Name:</span>
                          <span className="font-medium">{order.customer_name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-text-muted">Phone:</span>
                          <span className="font-medium">{order.customer_phone}</span>
                        </div>
                        {order.customer_email && (
                          <div className="flex items-center gap-2">
                            <span className="text-text-muted">Email:</span>
                            <span className="font-medium">{order.customer_email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Items</h4>
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
                  </div>

                  {/* Right Column - Status & Actions */}
                  <div>
                    {/* Pickup Info */}
                    {order.pickup_time && (
                      <div className="mb-4 p-3 bg-background rounded-xl">
                        <div className="flex items-center gap-2 text-sm">
                          <span>📍</span>
                          <div>
                            <div className="font-semibold text-primary">Pickup Time</div>
                            <div className="text-text-muted">{formatDate(order.pickup_time)}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Status */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-primary mb-2">Order Status</h4>
                      <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getOrderStatusColor(order.status)}`}>
                        {getOrderStatusLabel(order.status)}
                      </span>
                    </div>

                    {/* Status Actions */}
                    {order.status !== 'completed' && order.status !== 'cancelled' && (
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Update Status</h4>
                        <div className="space-y-2">
                          {order.status === 'placed' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'confirmed')}
                              className="w-full px-4 py-2 bg-green-100 text-green-700 rounded-xl font-semibold hover:bg-green-200 transition-colors"
                            >
                              Confirm Order
                            </button>
                          )}
                          {order.status === 'confirmed' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'preparing')}
                              className="w-full px-4 py-2 bg-yellow-100 text-yellow-700 rounded-xl font-semibold hover:bg-yellow-200 transition-colors"
                            >
                              Start Preparing
                            </button>
                          )}
                          {order.status === 'preparing' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'ready')}
                              className="w-full px-4 py-2 bg-purple-100 text-purple-700 rounded-xl font-semibold hover:bg-purple-200 transition-colors"
                            >
                              Mark as Ready
                            </button>
                          )}
                          {order.status === 'ready' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'completed')}
                              className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-semibold hover:bg-blue-200 transition-colors"
                            >
                              Complete Order
                            </button>
                          )}
                          <button
                            onClick={() => updateOrderStatus(order.id, 'cancelled')}
                            className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-xl font-semibold hover:bg-red-200 transition-colors"
                          >
                            Cancel Order
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

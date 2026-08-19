import { Suspense } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { formatCurrency, formatDate } from '@/lib/utils/calculations';
import { Order } from '@/types/database';

interface OrderConfirmationPageProps {
  params: Promise<{ orderId: string }>;
}

async function getOrder(orderId: string): Promise<Order | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  if (error) {
    console.error('Error fetching order:', error);
    return null;
  }

  return data;
}

export default async function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const { orderId } = await params;
  const order = await getOrder(orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-primary mb-2">Order Not Found</h2>
          <p className="text-text-muted mb-6">We couldn't find this order.</p>
          <Link
            href="/restaurants"
            className="inline-block px-6 py-3 bg-cta text-white rounded-xl font-semibold hover:bg-cta-dark transition-colors"
          >
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-display font-bold text-primary">
            DishWise
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-success/10 rounded-full mb-4 animate-pulse-glow">
              <span className="text-5xl">✓</span>
            </div>
            <h1 className="text-3xl font-display font-bold text-primary mb-2">
              Order Confirmed!
            </h1>
            <p className="text-text-muted">
              Your order has been placed successfully
            </p>
          </div>

          {/* Savings Highlight */}
          {order.savings_amount && order.savings_amount > 0 && (
            <div className="bg-gradient-to-r from-highlight/20 to-highlight/10 border-2 border-highlight rounded-2xl p-6 mb-6 text-center">
              <div className="text-4xl mb-2">🎉</div>
              <h2 className="text-2xl font-bold text-highlight-dark mb-2">
                You Saved {formatCurrency(order.savings_amount)}!
              </h2>
              <p className="text-text-muted">
                By ordering direct instead of using delivery apps
              </p>
            </div>
          )}

          {/* Order Details Card */}
          <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
            <h3 className="text-xl font-bold text-primary mb-4">Order Details</h3>

            {/* Order Number */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-text-muted">Order Number</span>
                <span className="font-mono font-bold text-primary">{order.order_number}</span>
              </div>
            </div>

            {/* Customer Info */}
            <div className="mb-4 pb-4 border-b border-gray-200 space-y-2">
              <div className="flex justify-between">
                <span className="text-text-muted">Name</span>
                <span className="font-semibold">{order.customer_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Phone</span>
                <span className="font-semibold">{order.customer_phone}</span>
              </div>
              {order.customer_email && (
                <div className="flex justify-between">
                  <span className="text-text-muted">Email</span>
                  <span className="font-semibold">{order.customer_email}</span>
                </div>
              )}
            </div>

            {/* Pickup Info */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📍</span>
                <div className="flex-1">
                  <div className="font-semibold text-primary mb-1">Pickup Details</div>
                  {order.pickup_time && (
                    <div className="text-sm text-text-muted">
                      Pickup Time: {formatDate(order.pickup_time)}
                    </div>
                  )}
                  <div className="text-sm text-text-muted mt-2">
                    Please arrive at the scheduled time to collect your order
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <h4 className="font-semibold text-primary mb-3">Items Ordered</h4>
              <div className="space-y-2">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-text-muted">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-semibold font-mono">
                      {formatCurrency(item.subtotal)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center text-lg">
              <span className="font-bold">Total Paid</span>
              <span className="font-bold text-primary font-mono text-2xl">
                {formatCurrency(order.total_amount)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href={`/track-order?phone=${encodeURIComponent(order.customer_phone)}`}
              className="block w-full py-4 bg-primary text-white text-center rounded-xl font-semibold hover:bg-primary-dark transition-colors"
            >
              Track Your Order
            </Link>
            <Link
              href="/restaurants"
              className="block w-full py-4 bg-white text-primary text-center rounded-xl font-semibold border-2 border-primary hover:bg-primary/5 transition-colors"
            >
              Order Again
            </Link>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-background rounded-xl">
            <h4 className="font-semibold text-primary mb-2">What's Next?</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>✓ Your order is being prepared</li>
              <li>✓ You'll receive updates on your phone</li>
              <li>✓ Pick up at the scheduled time</li>
              <li>✓ Show this order number at the counter</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

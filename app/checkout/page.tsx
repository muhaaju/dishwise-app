'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCartStore } from '@/lib/store/cart';
import { formatCurrency, calculatePickupTime, formatDate } from '@/lib/utils/calculations';
import GoogleAuth from '@/components/customer/GoogleAuth';
import type { User } from '@supabase/supabase-js';

// Payment method types
type PaymentMethod = 'pay_at_pickup' | 'online_porter_delivery' | 'online_restaurant_delivery';

// Validation Schema with conditional delivery address
const checkoutSchema = z.object({
  customer_name: z.string().min(3, 'Name must be at least 3 characters'),
  customer_phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile number'),
  customer_email: z.string().email('Enter valid email').optional().or(z.literal('')),
  pickup_time: z.string().min(1, 'Please select pickup time'),
  payment_method: z.enum(['pay_at_pickup', 'online_porter_delivery', 'online_restaurant_delivery'], {
    required_error: 'Please select a payment method',
  }),
  delivery_address: z.string().optional(),
  accepted_terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine((data) => {
  // Require delivery address for delivery options
  if (data.payment_method === 'online_porter_delivery' || data.payment_method === 'online_restaurant_delivery') {
    return data.delivery_address && data.delivery_address.trim().length >= 10;
  }
  return true;
}, {
  message: 'Delivery address is required (minimum 10 characters)',
  path: ['delivery_address'],
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getSavings, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('pay_at_pickup');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  // Handle Google Auth success - auto-fill form with profile data
  const handleAuthSuccess = (user: User, profile?: any) => {
    // Priority: Use customer profile data if available, fallback to user metadata
    if (profile?.full_name || user.user_metadata?.full_name) {
      setValue('customer_name', profile?.full_name || user.user_metadata.full_name);
    }
    
    if (profile?.email || user.email) {
      setValue('customer_email', profile?.email || user.email);
    }
    
    // Auto-fill phone from profile or user metadata
    if (profile?.phone) {
      const phone = profile.phone.replace(/^\+91/, '');
      setValue('customer_phone', phone);
    } else if (user.user_metadata?.phone) {
      const phone = user.user_metadata.phone.replace(/^\+91/, '');
      setValue('customer_phone', phone);
    }
    
    // Auto-fill default address if available
    if (profile?.default_address) {
      setValue('delivery_address', profile.default_address);
    }
  };

  const subtotal = getSubtotal();
  const savings = getSavings();

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-primary mb-2">Your cart is empty</h2>
          <p className="text-text-muted mb-6">Add some delicious items to get started!</p>
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

  // Get restaurant info from first item (all items should be from same restaurant)
  const restaurantName = items[0].restaurant_name;

  // Generate pickup time options (30 mins to 3 hours from now)
  const pickupTimeOptions = Array.from({ length: 7 }, (_, i) => {
    const time = new Date(Date.now() + (30 + i * 30) * 60000);
    return {
      value: time.toISOString(),
      label: formatDate(time),
    };
  });

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);

    try {
      // Calculate delivery charges based on payment method
      let deliveryCharges = 0;
      if (data.payment_method === 'online_porter_delivery') {
        deliveryCharges = 60; // Average Porter/Zomato delivery charge
      }
      // online_restaurant_delivery has 0 delivery charges (FREE)

      const totalAmount = subtotal + deliveryCharges;

      // Create order
      const orderData = {
        ...data,
        customer_phone: `+91${data.customer_phone}`,
        restaurant_id: items[0].restaurant_id,
        items: items.map((item) => ({
          menu_item_id: item.menu_item_id,
          name: item.name,
          quantity: item.quantity,
          price_snapshot: item.price,
          subtotal: item.price * item.quantity,
        })),
        subtotal,
        delivery_charges: deliveryCharges,
        total_amount: totalAmount,
        savings_amount: savings,
        payment_method: data.payment_method,
        delivery_address: data.delivery_address || null,
      };

      // For pay_at_pickup, create order without payment
      if (data.payment_method === 'pay_at_pickup') {
        const response = await fetch('/api/orders/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...orderData,
            payment_status: 'pending', // Will be paid at pickup
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create order');
        }

        const result = await response.json();
        clearCart();
        router.push(`/order-confirmation/${result.data.order.id}`);
        return;
      }

      // For online payment methods, proceed with Razorpay
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const result = await response.json();

      // Initialize Razorpay payment for online payment methods
      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: result.data.amount,
          currency: result.data.currency,
          name: 'DishWise',
          description: `Order from ${restaurantName}`,
          order_id: result.data.razorpayOrderId,
          handler: async (response: any) => {
            // Verify payment
            const verifyResponse = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (verifyResponse.ok) {
              const verifyResult = await verifyResponse.json();
              clearCart();
              router.push(`/order-confirmation/${verifyResult.data.order.id}`);
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          },
          prefill: {
            name: data.customer_name,
            email: data.customer_email || '',
            contact: `+91${data.customer_phone}`,
          },
          theme: {
            color: '#20361F',
          },
          modal: {
            ondismiss: () => {
              setIsProcessing(false);
            },
          },
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      } else {
        alert('Payment gateway not loaded. Please refresh and try again.');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to process order. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/restaurants" className="text-text-muted hover:text-primary transition-colors">
                <span className="text-2xl">←</span>
              </Link>
              <Link href="/" className="text-2xl font-display font-bold text-primary">
                DishWise
              </Link>
            </div>
            <div className="text-lg font-semibold text-primary">Checkout</div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Checkout Form - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Google Auth Component */}
            <GoogleAuth onAuthSuccess={handleAuthSuccess} />

            <div className="bg-white rounded-2xl shadow-card p-6">
              <h2 className="text-2xl font-display font-bold text-primary mb-6">
                Customer Details
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register('customer_name')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Enter your full name"
                  />
                  {errors.customer_name && (
                    <p className="mt-1 text-sm text-cta">{errors.customer_name.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Mobile Number *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-200 bg-background text-text-muted">
                      +91
                    </span>
                    <input
                      type="tel"
                      {...register('customer_phone')}
                      className="flex-1 px-4 py-3 rounded-r-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="9876543210"
                      maxLength={10}
                    />
                  </div>
                  {errors.customer_phone && (
                    <p className="mt-1 text-sm text-cta">{errors.customer_phone.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    {...register('customer_email')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="your.email@example.com"
                  />
                  {errors.customer_email && (
                    <p className="mt-1 text-sm text-cta">{errors.customer_email.message}</p>
                  )}
                </div>

                {/* Pickup Time */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    {selectedPaymentMethod === 'pay_at_pickup' ? 'Pickup Time *' : 'Delivery Time *'}
                  </label>
                  <select
                    {...register('pickup_time')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    <option value="">Select {selectedPaymentMethod === 'pay_at_pickup' ? 'pickup' : 'delivery'} time</option>
                    {pickupTimeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.pickup_time && (
                    <p className="mt-1 text-sm text-cta">{errors.pickup_time.message}</p>
                  )}
                </div>

                {/* Payment Method Selection */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-4">
                    Payment & Delivery Method *
                  </label>
                  <div className="space-y-3">
                    {/* Pay at Pickup */}
                    <label className="flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-primary hover:bg-primary/5 has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                      <input
                        type="radio"
                        value="pay_at_pickup"
                        {...register('payment_method')}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value as PaymentMethod)}
                        className="mt-1 w-5 h-5 text-primary focus:ring-primary"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">💵</span>
                          <span className="font-bold text-primary">Pay at Pickup</span>
                          <span className="ml-auto px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">RECOMMENDED</span>
                        </div>
                        <p className="text-sm text-text-muted">Pay cash/UPI when you collect your order at the restaurant</p>
                      </div>
                    </label>

                    {/* Online Payment + Porter/Uber Parcel Delivery */}
                    <label className="flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-primary hover:bg-primary/5 has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                      <input
                        type="radio"
                        value="online_porter_delivery"
                        {...register('payment_method')}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value as PaymentMethod)}
                        className="mt-1 w-5 h-5 text-primary focus:ring-primary"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">🛵</span>
                          <span className="font-bold text-primary">Online Payment + Porter/Uber Parcel Delivery</span>
                        </div>
                        <p className="text-sm text-text-muted">Pay online now, delivery via Porter/Uber Parcel (charges apply)</p>
                        <p className="text-xs text-highlight-dark font-semibold mt-1">Delivery charges: ₹40-80 (based on distance)</p>
                      </div>
                    </label>

                    {/* Online Payment + Free Restaurant Delivery */}
                    <label className="flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-primary hover:bg-primary/5 has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                      <input
                        type="radio"
                        value="online_restaurant_delivery"
                        {...register('payment_method')}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value as PaymentMethod)}
                        className="mt-1 w-5 h-5 text-primary focus:ring-primary"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">🚗</span>
                          <span className="font-bold text-primary">Online Payment + Free Restaurant Delivery</span>
                          <span className="ml-auto px-2 py-0.5 bg-highlight text-white text-xs font-bold rounded-full">FREE</span>
                        </div>
                        <p className="text-sm text-text-muted">Pay online now, restaurant delivers for FREE (within 5km)</p>
                        <p className="text-xs text-green-600 font-semibold mt-1">Save delivery charges!</p>
                      </div>
                    </label>
                  </div>
                  {errors.payment_method && (
                    <p className="mt-2 text-sm text-cta">{errors.payment_method.message}</p>
                  )}
                </div>

                {/* Delivery Address - Show only for delivery options */}
                {(selectedPaymentMethod === 'online_porter_delivery' || selectedPaymentMethod === 'online_restaurant_delivery') && (
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      Delivery Address *
                    </label>
                    <textarea
                      {...register('delivery_address')}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      placeholder="Enter your complete delivery address with landmark"
                    />
                    {errors.delivery_address && (
                      <p className="mt-1 text-sm text-cta">{errors.delivery_address.message}</p>
                    )}
                  </div>
                )}

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    {...register('accepted_terms')}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label className="text-sm text-text-muted">
                    I agree to the{' '}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms & Conditions
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {errors.accepted_terms && (
                  <p className="text-sm text-cta">{errors.accepted_terms.message}</p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-gradient-to-r from-cta to-cta-dark text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : selectedPaymentMethod === 'pay_at_pickup' ? (
                    'Confirm Order (Pay at Pickup)'
                  ) : (
                    'Proceed to Online Payment'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-card p-6 sticky top-24">
              <h3 className="text-xl font-bold text-primary mb-4">Order Summary</h3>

              {/* Restaurant */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <span>📍</span>
                  <span>{restaurantName}</span>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                {items.map((item) => (
                  <div key={item.menu_item_id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <div className="font-medium text-primary">{item.name}</div>
                      <div className="text-text-muted">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-semibold text-primary font-mono">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Savings */}
              {savings > 0 && (
                <div className="bg-highlight/10 border border-highlight/20 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">💰</span>
                      <span className="font-semibold text-highlight-dark">You're Saving</span>
                    </div>
                    <span className="text-lg font-bold text-highlight-dark font-mono">
                      {formatCurrency(savings)}
                    </span>
                  </div>
                </div>
              )}

              {/* Bill Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Item Total</span>
                  <span className="font-semibold font-mono">{formatCurrency(subtotal)}</span>
                </div>
                
                {/* Delivery Charges */}
                {selectedPaymentMethod === 'online_porter_delivery' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Delivery Charges</span>
                    <span className="font-semibold font-mono text-highlight-dark">₹60</span>
                  </div>
                )}
                {selectedPaymentMethod === 'online_restaurant_delivery' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Delivery Charges</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                )}
                {selectedPaymentMethod === 'pay_at_pickup' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Delivery Charges</span>
                    <span className="font-semibold text-green-600">₹0 (Pickup)</span>
                  </div>
                )}

                {/* Total */}
                <div className="pt-3 border-t-2 border-dashed border-gray-300">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-primary">Total Amount</span>
                    <span className="font-bold text-primary font-mono text-2xl">
                      {formatCurrency(selectedPaymentMethod === 'online_porter_delivery' ? subtotal + 60 : subtotal)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Method Info */}
              <div className="bg-background rounded-xl p-4 text-xs text-text-muted space-y-2">
                <p className="font-semibold text-primary mb-2">Payment Options:</p>
                <p>💵 Pay at Pickup - Cash/UPI at restaurant</p>
                <p>🛵 Porter/Uber Parcel - Online + Delivery charges</p>
                <p>🚗 Restaurant Delivery - Online + FREE delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Razorpay Script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
    </div>
  );
}

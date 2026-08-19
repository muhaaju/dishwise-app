'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart';
import { formatCurrency } from '@/lib/utils/calculations';

export default function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { items, updateQuantity, removeItem, getSubtotal, getSavings, getItemCount } = useCartStore();

  const itemCount = getItemCount();
  const subtotal = getSubtotal();
  const savings = getSavings();

  // Handle hydration - wait for client-side mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Animate cart button when items change
  useEffect(() => {
    if (itemCount > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-white border-2 border-gray-300 text-gray-400 px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3 cursor-default">
          <div className="relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold">Cart</div>
            <div className="text-xs">Loading...</div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Floating Cart Button - Modern & Animated - Always Visible */}
      <div className="fixed bottom-8 right-8 z-50">
        {itemCount === 0 ? (
          /* Empty Cart Button */
          <button
            className="bg-white border-2 border-gray-300 text-gray-400 px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 cursor-default"
          >
            <div className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold">Cart Empty</div>
              <div className="text-xs">Add items</div>
            </div>
          </button>
        ) : (
          /* Cart with Items - Enhanced with Savings */
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`bg-gradient-to-r from-cta to-cta-dark text-white px-8 py-5 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-4 group hover:scale-105 ${
            isAnimating ? 'animate-bounce' : ''
          }`}
        >
          {/* Cart Icon with Badge */}
          <div className="relative">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-white text-cta text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
              {itemCount}
            </span>
          </div>

          {/* Cart Info - Enhanced with Savings */}
          <div className="text-left">
            <div className="text-sm font-bold">View Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})</div>
            <div className="flex items-center gap-2">
              <div className="text-xs opacity-90 font-semibold">{formatCurrency(subtotal)}</div>
              {savings > 0 && (
                <>
                  <span className="text-xs opacity-70">•</span>
                  <div className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
                    Save {formatCurrency(savings)}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Arrow */}
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        )}
      </div>

      {/* Cart Sidebar - Only show when cart has items */}
      {isOpen && itemCount > 0 && (
        <>
          {/* Backdrop with Blur */}
          <div
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* Cart Panel - Slides from Right */}
          <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
            {/* Header - Gradient */}
            <div className="bg-gradient-to-r from-primary to-primary-light text-white p-6 flex items-center justify-between shadow-lg">
              <div>
                <h2 className="text-3xl font-display font-bold mb-1">Your Cart</h2>
                <p className="text-sm opacity-90 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/20 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Items - Scrollable with Custom Scrollbar */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-background">
              {items.map((item, index) => (
                <div 
                  key={item.menu_item_id} 
                  className="bg-white rounded-2xl p-5 shadow-card hover:shadow-lg transition-all border border-gray-100"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Item Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 pr-4">
                      <h3 className="font-bold text-primary text-lg mb-1 line-clamp-1">{item.name}</h3>
                      <p className="text-sm text-text-muted flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span>{item.restaurant_name}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.menu_item_id)}
                      className="text-text-muted hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg"
                      title="Remove item"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  {/* Quantity and Price Row */}
                  <div className="flex items-center justify-between">
                    {/* Quantity Controls - Modern */}
                    <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1.5 border border-gray-200">
                      <button
                        onClick={() => updateQuantity(item.menu_item_id, item.quantity - 1)}
                        className="w-9 h-9 flex items-center justify-center text-primary hover:bg-white rounded-lg transition-all font-bold text-lg active:scale-95"
                      >
                        −
                      </button>
                      <span className="w-10 text-center font-bold text-lg text-primary">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.menu_item_id, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center text-primary hover:bg-white rounded-lg transition-all font-bold text-lg active:scale-95"
                      >
                        +
                      </button>
                    </div>

                    {/* Price Display */}
                    <div className="text-right">
                      <div className="font-bold text-primary font-mono text-xl">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                      {(item.swiggy_price || item.zomato_price) && (
                        <div className="text-sm text-text-muted line-through font-mono">
                          {formatCurrency((item.swiggy_price || item.zomato_price || 0) * item.quantity)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Item Savings */}
                  {(item.swiggy_price || item.zomato_price) && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Savings on this item</span>
                        <span className="font-bold text-highlight-dark">
                          {formatCurrency(((item.swiggy_price || item.zomato_price || 0) - item.price) * item.quantity)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Cart Summary - Fixed at Bottom */}
            <div className="border-t border-gray-200 p-6 space-y-5 bg-white shadow-2xl">
              {/* Total Savings - Highlighted */}
              {savings > 0 && (
                <div className="bg-gradient-to-r from-highlight/20 to-highlight/10 border-2 border-highlight/30 rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-highlight rounded-xl flex items-center justify-center text-2xl">
                        💰
                      </div>
                      <div>
                        <div className="font-bold text-highlight-dark text-lg">Total Savings</div>
                        <div className="text-sm text-text-muted">vs delivery apps</div>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-highlight-dark font-mono">
                      {formatCurrency(savings)}
                    </div>
                  </div>
                </div>
              )}

              {/* Bill Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-base">
                  <span className="text-text-muted">Item Total</span>
                  <span className="font-semibold font-mono">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-base">
                  <span className="text-text-muted">Delivery Fee</span>
                  <span className="font-semibold text-green-600">FREE (Pickup)</span>
                </div>
                <div className="flex items-center justify-between text-base">
                  <span className="text-text-muted">Platform Fee</span>
                  <span className="font-semibold text-green-600">₹0</span>
                </div>
                
                {/* Total */}
                <div className="pt-3 border-t-2 border-dashed border-gray-300">
                  <div className="flex items-center justify-between text-xl">
                    <span className="font-bold text-primary">To Pay</span>
                    <span className="font-bold text-primary font-mono text-2xl">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Checkout Button - Primary */}
                <Link href="/checkout" onClick={() => setIsOpen(false)}>
                  <button className="w-full bg-gradient-to-r from-cta to-cta-dark text-white py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3">
                    <span>Proceed to Checkout</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </Link>

                {/* Continue Shopping - Secondary */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full text-primary font-bold py-3 hover:text-primary-dark transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Continue Shopping</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
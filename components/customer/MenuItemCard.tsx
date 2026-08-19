'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MenuItem } from '@/types/database';
import { calculateSavings, formatCurrency, getSpiceLevelEmoji } from '@/lib/utils/calculations';
import { useCartStore } from '@/lib/store/cart';

interface MenuItemCardProps {
  menuItem: MenuItem;
  restaurantName: string;
}

export default function MenuItemCard({ menuItem, restaurantName }: MenuItemCardProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  // Calculate savings from aggregator prices
  const swiggyPrice = menuItem.swiggy_price || 0;
  const zomatoPrice = menuItem.zomato_price || 0;
  const directPrice = menuItem.in_shop_price;
  
  const swiggySavings = swiggyPrice > 0 ? calculateSavings(directPrice, swiggyPrice) : 0;
  const zomatoSavings = zomatoPrice > 0 ? calculateSavings(directPrice, zomatoPrice) : 0;
  const maxSavings = Math.max(swiggySavings, zomatoSavings);
  const hasSavings = maxSavings > 0;

  const handleAddToCart = (qty?: number) => {
    const quantityToAdd = qty !== undefined ? qty : (quantity === 0 ? 1 : quantity);
    
    setIsAdding(true);
    addItem({
      menu_item_id: menuItem.id,
      name: menuItem.name,
      quantity: quantityToAdd,
      price: menuItem.in_shop_price,
      swiggy_price: menuItem.swiggy_price || undefined,
      zomato_price: menuItem.zomato_price || undefined,
      restaurant_id: menuItem.restaurant_id,
      restaurant_name: restaurantName,
    });
    
    // Update local quantity state if adding from ADD button
    if (quantity === 0 && qty === undefined) {
      setQuantity(1);
    }
    
    // Reset loading state
    setTimeout(() => {
      setIsAdding(false);
    }, 300);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary/20">
      <div className="flex gap-4 p-4">
        {/* Item Info - Left Side */}
        <div className="flex-1 min-w-0">
          {/* Top Row: Indicators & Name */}
          <div className="flex items-start gap-2 mb-2">
            {/* Veg/Non-veg Indicator */}
            {menuItem.is_vegetarian ? (
              <div className="w-5 h-5 border-2 border-green-600 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2.5 h-2.5 rounded-full bg-green-600"></div>
              </div>
            ) : (
              <div className="w-5 h-5 border-2 border-red-600 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
              </div>
            )}

            {/* Item Name */}
            <h3 className="text-lg font-bold text-primary line-clamp-1 group-hover:text-cta transition-colors flex-1">
              {menuItem.name}
            </h3>

            {/* Bestseller Badge */}
            <div className="px-2 py-0.5 bg-gradient-to-r from-highlight to-highlight-dark text-white rounded text-xs font-bold flex items-center gap-1 flex-shrink-0">
              <span>⭐</span>
            </div>
          </div>

          {/* Description */}
          {menuItem.description && (
            <p className="text-xs text-text-muted mb-3 line-clamp-2 leading-relaxed">
              {menuItem.description}
            </p>
          )}

          {/* Price Section - Redesigned to emphasize savings */}
          <div className="space-y-2">
            {/* HUGE Savings Badge - Most Prominent */}
            {hasSavings && (
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg">
                <span className="text-xl">💰</span>
                <span className="text-lg">SAVE {formatCurrency(maxSavings)}</span>
              </div>
            )}

            {/* Direct Price - Medium Size */}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary font-mono">
                {formatCurrency(menuItem.in_shop_price)}
              </span>
              <span className="text-xs text-green-600 font-bold px-2 py-1 bg-green-50 rounded-full">
                Direct Price
              </span>
            </div>

            {/* Aggregator Prices - Show as "They charge MORE" */}
            {(menuItem.swiggy_price || menuItem.zomato_price) && (
              <div className="space-y-1.5">
                {menuItem.swiggy_price && (
                  <div className="flex items-center justify-between text-sm bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
                    <span className="text-text-muted font-medium">Swiggy charges</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-red-600 font-mono">
                        {formatCurrency(menuItem.swiggy_price)}
                      </span>
                      <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                        +{Math.round((swiggySavings / directPrice) * 100)}%
                      </span>
                    </div>
                  </div>
                )}
                {menuItem.zomato_price && (
                  <div className="flex items-center justify-between text-sm bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
                    <span className="text-text-muted font-medium">Zomato charges</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-red-600 font-mono">
                        {formatCurrency(menuItem.zomato_price)}
                      </span>
                      <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                        +{Math.round((zomatoSavings / directPrice) * 100)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Price Breakdown Toggle */}
            {(menuItem.swiggy_price || menuItem.zomato_price) && (
              <button
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="text-xs text-primary hover:text-primary-dark flex items-center gap-1 font-semibold group/btn transition-colors"
              >
                <svg 
                  className={`w-3 h-3 transition-transform ${showBreakdown ? 'rotate-90' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>{showBreakdown ? 'Hide' : 'Show'} breakdown</span>
              </button>
            )}
          </div>

          {/* Price Breakdown - Compact */}
          {showBreakdown && (
            <div className="mt-3 p-4 bg-gradient-to-br from-background to-gray-50 rounded-xl space-y-3 text-sm border border-gray-200 animate-fade-in">
              <div className="font-bold text-primary text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Why Order Direct?</span>
              </div>
              
              <div className="space-y-2">
                {/* Direct Price */}
                <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">✅</span>
                    <span className="font-semibold text-green-700 text-xs">You Pay</span>
                  </div>
                  <span className="font-bold text-green-700 font-mono">
                    {formatCurrency(directPrice)}
                  </span>
                </div>

                {/* Swiggy Price */}
                {menuItem.swiggy_price && (
                  <div className="flex justify-between items-center p-2 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🛵</span>
                      <span className="font-semibold text-red-700 text-xs">Swiggy</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-red-700 font-mono text-sm">
                        {formatCurrency(menuItem.swiggy_price)}
                      </div>
                      {swiggySavings > 0 && (
                        <div className="text-xs text-red-600 font-bold">
                          +{Math.round((swiggySavings / directPrice) * 100)}% more
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Zomato Price */}
                {menuItem.zomato_price && (
                  <div className="flex justify-between items-center p-2 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🛵</span>
                      <span className="font-semibold text-red-700 text-xs">Zomato</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-red-700 font-mono text-sm">
                        {formatCurrency(menuItem.zomato_price)}
                      </div>
                      {zomatoSavings > 0 && (
                        <div className="text-xs text-red-600 font-bold">
                          +{Math.round((zomatoSavings / directPrice) * 100)}% more
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Total Savings */}
              {hasSavings && (
                <div className="pt-3 border-t border-dashed border-gray-300">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                    <span className="font-bold text-white text-sm flex items-center gap-2">
                      <span className="text-lg">💰</span>
                      <span>Your Savings</span>
                    </span>
                    <span className="font-bold text-white font-mono text-xl">
                      {formatCurrency(maxSavings)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Item Image & Actions - Right Side */}
        <div className="flex-shrink-0 flex flex-col items-center gap-3">
          {/* Item Image */}
          <div className="relative w-28 h-28 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
            {menuItem.image_url ? (
              <Image
                src={menuItem.image_url}
                alt={menuItem.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary/10 to-highlight/20 flex items-center justify-center">
                <span className="text-5xl opacity-80">🍽️</span>
              </div>
            )}
            
            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* Add to Cart Section */}
          <div className="w-full">
            {menuItem.is_available ? (
              <div className="space-y-3">
                {quantity === 0 ? (
                  /* Initial Add Button - Directly adds to cart */
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className={`w-full px-4 py-2.5 bg-gradient-to-r from-cta to-cta-dark text-white rounded-lg font-bold hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-sm ${
                      isAdding ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isAdding ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>ADD</span>
                      </>
                    )}
                  </button>
                ) : (
                  <>
                    {/* Quantity Selector */}
                    <div className="flex items-center justify-center gap-1 bg-gray-100 rounded-lg p-1 border border-gray-200">
                      <button
                        onClick={() => {
                          const newQty = Math.max(0, quantity - 1);
                          setQuantity(newQty);
                          if (newQty > 0) {
                            handleAddToCart(newQty);
                          }
                        }}
                        className="w-7 h-7 flex items-center justify-center text-primary hover:bg-white rounded-md transition-all font-bold"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-bold text-primary">{quantity}</span>
                      <button
                        onClick={() => {
                          const newQty = Math.min(10, quantity + 1);
                          setQuantity(newQty);
                          handleAddToCart(newQty);
                        }}
                        disabled={quantity >= 10}
                        className="w-7 h-7 flex items-center justify-center text-primary hover:bg-white rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal Display */}
                    <div className="text-center text-xs text-text-muted">
                      <span className="font-bold text-primary font-mono">{formatCurrency(directPrice * quantity)}</span>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center py-2 px-4 bg-gray-100 rounded-lg border border-gray-200">
                <p className="text-xs font-semibold text-text-muted">Unavailable</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Restaurant } from '@/types/database';
import { Clock, MapPin, Star } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const isOpen = true; // TODO: Implement actual time check
  const rating = 4.3;
  const totalOrders = 500;

  return (
    <Link href={`/restaurants/${restaurant.slug}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
        {/* Restaurant Image */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          {restaurant.image_url ? (
            <Image
              src={restaurant.image_url}
              alt={restaurant.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center">
              <span className="text-6xl opacity-80">🍽️</span>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Discount Badge */}
          <div className="absolute top-3 left-3">
            <div className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
              💰 SAVE ₹70-150
            </div>
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            {isOpen ? (
              <div className="bg-white/95 backdrop-blur-sm text-green-600 px-2.5 py-1 rounded-md text-xs font-bold shadow-lg">
                OPEN
              </div>
            ) : (
              <div className="bg-white/95 backdrop-blur-sm text-red-600 px-2.5 py-1 rounded-md text-xs font-bold shadow-lg">
                CLOSED
              </div>
            )}
          </div>

          {/* Quick Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="flex items-center gap-2 text-sm font-medium">
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                <Clock className="w-3.5 h-3.5" />
                <span>{restaurant.avg_prep_time_minutes} mins</span>
              </div>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                <MapPin className="w-3.5 h-3.5" />
                <span>{restaurant.city}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="p-4">
          {/* Name & Rating */}
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1 flex-1 group-hover:text-yellow-600 transition-colors">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded text-xs font-bold ml-2 flex-shrink-0">
              <Star className="w-3 h-3 fill-current" />
              <span>{rating}</span>
            </div>
          </div>

          {/* Cuisine & Orders */}
          <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
            <span className="font-medium">{restaurant.cuisine_type}</span>
            <span className="text-gray-400">•</span>
            <span>{totalOrders}+ orders</span>
          </div>

          {/* Description */}
          {restaurant.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {restaurant.description}
            </p>
          )}

          {/* Divider */}
          <div className="border-t border-gray-100 my-3"></div>

          {/* Price Info */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Direct Pickup</p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-gray-900">₹250</span>
                <span className="text-sm text-gray-400 line-through">₹320</span>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-green-100 text-green-700 px-2.5 py-1 rounded-lg text-xs font-bold">
                ₹70 OFF
              </div>
            </div>
          </div>

          {/* CTA Button - Shows on Hover */}
          <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
            <button className="w-full py-2.5 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors text-sm">
              View Menu →
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

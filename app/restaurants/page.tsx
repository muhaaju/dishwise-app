"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSpinner } from "@/components/hero-spinner";
import { Sidebar } from "@/components/sidebar";
import { SkeletonGrid } from "@/components/skeleton-grid";
import { Footer } from "@/components/footer";
import RestaurantCard from "@/components/customer/RestaurantCard";
import { Restaurant } from "@/types/database";

export default function RestaurantsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const response = await fetch('/api/restaurants');
        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
        } else {
          setRestaurants(data.restaurants || []);
        }
      } catch (err) {
        console.error('Error fetching restaurants:', err);
        setError('Failed to load restaurants');
      } finally {
        setIsLoading(false);
      }
    }

    fetchRestaurants();
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Content starts after fixed navbar */}
      <div className="pt-20 flex-grow">
        {/* Hero Section with Spinner */}
        <HeroSpinner />

        {/* Main Content Area */}
        <div className="max-w-[1200px] mx-auto px-5 py-12">
          <div className="flex gap-12">
            {/* Left Sidebar */}
            <Sidebar />

            {/* Right Content Grid */}
            <div className="flex-1">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              {isLoading ? (
                <SkeletonGrid />
              ) : restaurants.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No restaurants found. Please add restaurants in Supabase.</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-foreground tracking-tight">
                      Restaurants with online food delivery in {restaurants[0]?.city || 'your area'}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10">
                    {restaurants.map((restaurant) => (
                      <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </main>
  );
}
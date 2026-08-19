"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const RESTAURANTS = [
  {
    id: 1,
    name: "Spice Garden",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
    rating: 4.5,
    time: "25-30 mins",
    cuisines: "Kerala, South Indian",
    location: "MG Road",
    offer: "SAVE ₹120",
    savings: 120,
  },
  {
    id: 2,
    name: "Coastal Delights",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80",
    rating: 4.3,
    time: "30-35 mins",
    cuisines: "Seafood, Coastal",
    location: "Fort Kochi",
    offer: "SAVE ₹100",
    savings: 100,
  },
  {
    id: 3,
    name: "Biryani House",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80",
    rating: 4.6,
    time: "20-25 mins",
    cuisines: "Biryani, North Indian",
    location: "Edappally",
    offer: "SAVE ₹150",
    savings: 150,
  },
  {
    id: 4,
    name: "Dosa Corner",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=800&q=80",
    rating: 4.4,
    time: "15-20 mins",
    cuisines: "South Indian, Breakfast",
    location: "Kakkanad",
    offer: "SAVE ₹80",
    savings: 80,
  },
  {
    id: 5,
    name: "Tandoor Express",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80",
    rating: 4.2,
    time: "25-30 mins",
    cuisines: "North Indian, Tandoor",
    location: "Palarivattom",
    offer: "SAVE ₹110",
    savings: 110,
  },
  {
    id: 6,
    name: "Chinese Wok",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&q=80",
    rating: 4.1,
    time: "30-35 mins",
    cuisines: "Chinese, Asian",
    location: "Vyttila",
    offer: "SAVE ₹90",
    savings: 90,
  },
];

export function RestaurantGrid() {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-foreground tracking-tight">
          Restaurants with online food delivery in Kochi
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10">
        {RESTAURANTS.map((restaurant, i) => (
          <Link 
            key={restaurant.id}
            href={`/restaurants/${restaurant.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="block"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group cursor-pointer"
            >
            <div className="relative aspect-[1.6/1] w-full overflow-hidden rounded-2xl mb-3 shadow-card group-hover:shadow-card-hover transition-all duration-300">
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
              <div className="absolute inset-0 gradient-card-overlay" />
              
              {/* Offer Badge */}
              <div className="absolute bottom-3 left-3 text-white font-black text-xl uppercase tracking-tighter">
                {restaurant.offer}
              </div>

              {/* Savings Badge */}
              <div className="absolute top-3 right-3 bg-savings text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
                Save ₹{restaurant.savings}
              </div>
            </div>

            <div className="px-1">
              <h3 className="text-lg font-bold text-foreground truncate mb-0.5">
                {restaurant.name}
              </h3>
              <div className="flex items-center gap-1.5 font-bold text-foreground mb-1">
                <div className="bg-success rounded-full p-0.5">
                  <Star className="w-3 h-3 fill-white text-white" />
                </div>
                <span>{restaurant.rating}</span>
                <span className="text-gray-300">•</span>
                <span>{restaurant.time}</span>
              </div>
              <p className="text-muted text-base truncate mt-0.5">
                {restaurant.cuisines}
              </p>
              <p className="text-muted text-base truncate">
                {restaurant.location}
              </p>
            </div>
          </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}

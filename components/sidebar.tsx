"use client";

import { motion } from "framer-motion";

const SIDEBAR_ITEMS = [
  { label: "Offers", icon: "🎁" },
  { label: "Top Rated", icon: "⭐" },
  { label: "New on DishWise", icon: "✨" },
  { label: "Fast Delivery", icon: "⚡" },
  { label: "Pure Veg", icon: "🥗" },
  { label: "Pocket Friendly", icon: "💰" },
];

const FILTER_OPTIONS = [
  "Relevance",
  "Delivery Time",
  "Rating",
  "Cost: Low to High",
  "Cost: High to Low",
];

export function Sidebar() {
  return (
    <aside className="w-[254px] shrink-0 hidden lg:block sticky top-28 h-fit">
      <div className="space-y-1">
        {SIDEBAR_ITEMS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center text-xl">
              {item.icon}
            </div>
            <span className="text-sm font-medium text-secondary group-hover:text-primary transition-colors">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 pt-10 border-t border-gray-100">
        <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-4">
          Filters
        </h3>
        <div className="space-y-3">
          {FILTER_OPTIONS.map((filter, i) => (
            <motion.label
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-4 h-4 border border-gray-300 rounded-sm group-hover:border-primary transition-colors flex items-center justify-center">
                {/* Checkbox will be controlled by state in future */}
              </div>
              <span className="text-sm text-secondary group-hover:text-primary transition-colors">
                {filter}
              </span>
            </motion.label>
          ))}
        </div>
      </div>
    </aside>
  );
}

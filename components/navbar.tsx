"use client";

import { Search, Percent, LifeBuoy, User, ShoppingBag, ChevronDown, MapPin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-sm z-[1000] swiggy-shadow px-5">
      <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between">
        {/* Left: Logo & Location */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="transition-transform hover:scale-105 duration-200">
            <div className="flex items-center gap-2 group">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center shadow-md">
                <span className="text-xl">🍽️</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                DishWise
              </span>
            </div>
          </Link>

          {/* Location Selector */}
          <div className="hidden md:flex items-center gap-2 cursor-pointer group">
            <div className="flex items-center gap-2 border-b-2 border-foreground pb-1 group-hover:border-primary transition-colors">
              <MapPin className="w-4 h-4 text-primary" />
              <div className="flex flex-col">
                <span className="text-xs text-muted">Deliver to</span>
                <span className="font-bold text-sm group-hover:text-primary transition-colors">
                  Kochi
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>

        {/* Right: Nav Links */}
        <ul className="hidden md:flex items-center gap-12">
          <NavItem 
            icon={<Search className="w-5 h-5" />} 
            label="Search" 
            href="/restaurants"
          />
          <NavItem 
            icon={<Percent className="w-5 h-5" />} 
            label="Offers" 
            badge="NEW"
            href="/restaurants"
          />
          <NavItem 
            icon={<LifeBuoy className="w-5 h-5" />} 
            label="Help"
            href="/track-order"
          />
          <NavItem 
            icon={<User className="w-5 h-5" />} 
            label="Sign In"
            href="/admin/login"
          />
          <NavItem 
            icon={<ShoppingBag className="w-5 h-5" />} 
            label="Cart" 
            count={0}
            href="/checkout"
          />
        </ul>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <Link href="/checkout" className="relative">
            <ShoppingBag className="w-6 h-6 text-secondary" />
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  count?: number;
  href?: string;
}

function NavItem({ icon, label, badge, count, href = "#" }: NavItemProps) {
  return (
    <li className="flex items-center gap-3 text-secondary font-medium text-base cursor-pointer hover:text-primary transition-colors relative group">
      <Link href={href} className="flex items-center gap-3">
        <span className="relative">
          {icon}
          {count !== undefined && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-white text-[10px] font-bold px-1"
            >
              {count}
            </motion.span>
          )}
        </span>
        <span>{label}</span>
        {badge && (
          <motion.span 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] text-warning font-bold absolute -top-3 -right-4"
          >
            {badge}
          </motion.span>
        )}
      </Link>
    </li>
  );
}

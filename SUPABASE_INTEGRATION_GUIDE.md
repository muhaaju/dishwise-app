# Supabase Integration Guide - Connect Your Data to UI

## Overview
This guide will help you connect your Supabase database data to the DishWise UI.

---

## Step 1: Configure Environment Variables

### 1.1 Get Your Supabase Credentials

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Click on your project
3. Go to **Settings** → **API**
4. Copy the following:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### 1.2 Update .env.local File

Create or update `.env.local` in the project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Razorpay Configuration (for later)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3001
NODE_ENV=development
```

**Important:** Replace the placeholder values with your actual Supabase credentials.

---

## Step 2: Update Restaurants Page to Fetch Real Data

### 2.1 Create API Route for Restaurants

Create: `app/api/restaurants/route.ts`

```typescript
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createClient();
    
    const { data: restaurants, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Error fetching restaurants:', error);
      return NextResponse.json(
        { error: 'Failed to fetch restaurants' },
        { status: 500 }
      );
    }

    return NextResponse.json({ restaurants });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### 2.2 Update Restaurants Page Component

Update: `app/restaurants/page.tsx`

```typescript
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

      <div className="pt-20 flex-grow">
        <HeroSpinner />

        <div className="max-w-[1200px] mx-auto px-5 py-12">
          <div className="flex gap-12">
            <Sidebar />

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
                  <p className="text-gray-500 text-lg">No restaurants found</p>
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

      <Footer />
    </main>
  );
}
```

---

## Step 3: Update Restaurant Detail Page

### 3.1 Create API Route for Restaurant Details

Create: `app/api/restaurants/[slug]/route.ts`

```typescript
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const supabase = createClient();
    
    // Fetch restaurant
    const { data: restaurant, error: restaurantError } = await supabase
      .from('restaurants')
      .select('*')
      .eq('slug', params.slug)
      .eq('is_active', true)
      .single();

    if (restaurantError || !restaurant) {
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      );
    }

    // Fetch menu items
    const { data: menuItems, error: menuError } = await supabase
      .from('menu_items')
      .select('*')
      .eq('restaurant_id', restaurant.id)
      .eq('is_available', true)
      .order('category')
      .order('name');

    if (menuError) {
      console.error('Error fetching menu items:', menuError);
      return NextResponse.json(
        { error: 'Failed to fetch menu items' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      restaurant,
      menuItems: menuItems || []
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### 3.2 Update Restaurant Detail Page Component

Update: `app/restaurants/[slug]/page.tsx`

Replace the mock data section with:

```typescript
"use client";

import { Suspense, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import MenuItemCard from '@/components/customer/MenuItemCard';
import ShoppingCart from '@/components/customer/ShoppingCart';
import { Restaurant, MenuItem } from '@/types/database';

export default function RestaurantDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/restaurants/${slug}`);
        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
        } else {
          setRestaurant(data.restaurant);
          setMenuItems(data.menuItems || []);
          
          // Set first category as active
          if (data.menuItems && data.menuItems.length > 0) {
            const categories = [...new Set(data.menuItems.map((item: MenuItem) => item.category))];
            setActiveCategory(categories[0]);
          }
        }
      } catch (err) {
        console.error('Error fetching restaurant:', err);
        setError('Failed to load restaurant details');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-muted">Loading restaurant...</p>
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Restaurant Not Found</h1>
          <p className="text-text-muted mb-6">{error || 'The restaurant you are looking for does not exist.'}</p>
          <Link 
            href="/restaurants"
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-all"
          >
            Back to Restaurants
          </Link>
        </div>
      </div>
    );
  }

  // Group menu items by category
  const groupedMenuItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const categories = Object.keys(groupedMenuItems);

  const scrollToCategory = (category: string) => {
    setActiveCategory(category);
    const element = document.getElementById(category.toLowerCase().replace(/\s+/g, '-'));
    if (element) {
      const offset = 200;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Rest of the component JSX remains the same...
  // (Keep all the existing JSX structure)
}
```

---

## Step 4: Verify Data in Supabase

### 4.1 Check Your Tables

1. Go to Supabase Dashboard → **Table Editor**
2. Verify you have data in:
   - **restaurants** table (at least 3-5 restaurants)
   - **menu_items** table (at least 10-15 items per restaurant)

### 4.2 Sample Data Check

Run this query in Supabase SQL Editor:

```sql
-- Check restaurants
SELECT id, name, slug, city, is_active FROM restaurants;

-- Check menu items count per restaurant
SELECT 
  r.name as restaurant_name,
  COUNT(m.id) as menu_items_count
FROM restaurants r
LEFT JOIN menu_items m ON r.id = m.restaurant_id
GROUP BY r.id, r.name;
```

---

## Step 5: Restart Development Server

After updating environment variables:

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

The server should now connect to Supabase and display your real data!

---

## Step 6: Enable Row Level Security (RLS)

### 6.1 Enable RLS on Tables

In Supabase Dashboard → **Authentication** → **Policies**:

```sql
-- Enable RLS
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active restaurants
CREATE POLICY "Public can view active restaurants"
ON restaurants FOR SELECT
USING (is_active = true);

-- Allow public read access to available menu items
CREATE POLICY "Public can view available menu items"
ON menu_items FOR SELECT
USING (is_available = true);

-- Allow public to create orders
CREATE POLICY "Public can create orders"
ON orders FOR INSERT
WITH CHECK (true);

-- Allow customers to view their own orders
CREATE POLICY "Customers can view own orders"
ON orders FOR SELECT
USING (customer_phone = current_setting('request.jwt.claims', true)::json->>'phone');
```

---

## Troubleshooting

### Issue: "Failed to fetch restaurants"

**Solution:**
1. Check `.env.local` has correct Supabase URL and key
2. Verify tables exist in Supabase
3. Check RLS policies are set correctly
4. Look at browser console for detailed errors

### Issue: "No restaurants found"

**Solution:**
1. Verify data exists in Supabase tables
2. Check `is_active = true` for restaurants
3. Check `is_available = true` for menu items

### Issue: Environment variables not loading

**Solution:**
1. Restart the development server
2. Verify `.env.local` is in project root
3. Check variable names start with `NEXT_PUBLIC_` for client-side access

---

## Next Steps

Once data is displaying:

1. ✅ Test restaurant listing page
2. ✅ Test restaurant detail pages
3. ✅ Test menu item display
4. ✅ Test cart functionality
5. ✅ Implement order creation API
6. ✅ Integrate Razorpay for payments

---

## Quick Checklist

- [ ] Supabase project created
- [ ] Database migration run
- [ ] Sample data added to tables
- [ ] `.env.local` configured with Supabase credentials
- [ ] API routes created (`/api/restaurants`, `/api/restaurants/[slug]`)
- [ ] Pages updated to fetch from API
- [ ] RLS policies enabled
- [ ] Development server restarted
- [ ] Data displaying in UI

---

## Support

If you encounter issues:
1. Check browser console for errors
2. Check Supabase logs in dashboard
3. Verify API routes are working: `http://localhost:3001/api/restaurants`
4. Review the DATA_REQUIREMENTS.md for complete setup guide

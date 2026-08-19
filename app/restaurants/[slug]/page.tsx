'use client';

import { Suspense, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import MenuItemCard from '@/components/customer/MenuItemCard';
import ShoppingCart from '@/components/customer/ShoppingCart';
import { Restaurant, MenuItem } from '@/types/database';

// Mock data for fallback - will be replaced with Supabase fetch
const mockRestaurant: Restaurant = {
  id: '1',
  name: 'Spice Garden',
  slug: 'spice-garden',
  description: 'Authentic Kerala cuisine with traditional flavors. Experience the rich taste of Malabar spices and coastal delicacies.',
  address: '123 MG Road, Kochi',
  city: 'Kochi',
  pincode: '682001',
  phone: '+919876543210',
  email: 'contact@spicegarden.com',
  cuisine_type: 'Kerala',
  image_url: null,
  is_active: true,
  avg_prep_time_minutes: 30,
  opening_time: '09:00',
  closing_time: '22:00',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    restaurant_id: '1',
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice layered with tender chicken pieces, aromatic spices, and herbs',
    category: 'Main Course',
    image_url: null,
    in_shop_price: 250,
    swiggy_price: 320,
    zomato_price: 335,
    is_available: true,
    is_vegetarian: false,
    is_vegan: false,
    spice_level: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    restaurant_id: '1',
    name: 'Paneer Butter Masala',
    description: 'Cottage cheese cubes in rich, creamy tomato-based gravy with butter and cream',
    category: 'Main Course',
    image_url: null,
    in_shop_price: 180,
    swiggy_price: 240,
    zomato_price: 250,
    is_available: true,
    is_vegetarian: true,
    is_vegan: false,
    spice_level: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    restaurant_id: '1',
    name: 'Fish Curry',
    description: 'Fresh catch of the day in traditional Kerala-style coconut curry',
    category: 'Main Course',
    image_url: null,
    in_shop_price: 220,
    swiggy_price: 280,
    zomato_price: 290,
    is_available: true,
    is_vegetarian: false,
    is_vegan: false,
    spice_level: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    restaurant_id: '1',
    name: 'Masala Dosa',
    description: 'Crispy rice crepe filled with spiced potato filling, served with sambar and chutney',
    category: 'Breakfast',
    image_url: null,
    in_shop_price: 80,
    swiggy_price: 120,
    zomato_price: 125,
    is_available: true,
    is_vegetarian: true,
    is_vegan: true,
    spice_level: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    restaurant_id: '1',
    name: 'Gulab Jamun',
    description: 'Soft milk-solid dumplings soaked in rose-flavored sugar syrup',
    category: 'Desserts',
    image_url: null,
    in_shop_price: 60,
    swiggy_price: 90,
    zomato_price: 95,
    is_available: true,
    is_vegetarian: true,
    is_vegan: false,
    spice_level: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Group menu items by category
const groupedMenuItems = mockMenuItems.reduce((acc, item) => {
  if (!acc[item.category]) {
    acc[item.category] = [];
  }
  acc[item.category].push(item);
  return acc;
}, {} as Record<string, MenuItem[]>);

const categories = Object.keys(groupedMenuItems);

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
            setActiveCategory(categories[0] as string);
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
      const offset = 200; // Account for sticky headers
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar - Modern */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-lg bg-white/95">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Back & Logo */}
            <div className="flex items-center gap-4">
              <Link 
                href="/restaurants" 
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🍽️</span>
                </div>
                <span className="text-2xl font-display font-bold text-primary hidden sm:block">DishWise</span>
              </Link>
            </div>

            {/* Restaurant Name - Shows on Scroll */}
            {isScrolled && (
              <div className="hidden md:block animate-fade-in">
                <h2 className="text-xl font-bold text-primary">{restaurant.name}</h2>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="hidden md:flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-xl transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span className="font-medium">Share</span>
              </button>
              <Link 
                href="/track-order" 
                className="px-4 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-all"
              >
                Track Order
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Restaurant Header - Hero Style */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Restaurant Image - Larger */}
            <div className="flex-shrink-0">
              <div className="relative w-full md:w-48 h-48 rounded-3xl overflow-hidden shadow-xl">
                {restaurant.image_url ? (
                  <Image
                    src={restaurant.image_url}
                    alt={restaurant.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary via-primary-light to-highlight flex items-center justify-center">
                    <span className="text-7xl opacity-90">🍽️</span>
                  </div>
                )}
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    <span>OPEN NOW</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Restaurant Info */}
            <div className="flex-1">
              {/* Name & Rating */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h1 className="text-4xl font-display font-bold text-primary mb-2">
                    {restaurant.name}
                  </h1>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                      {restaurant.cuisine_type}
                    </span>
                    <div className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                      <span>⭐</span>
                      <span>4.5</span>
                      <span className="text-xs opacity-90">(500+ ratings)</span>
                    </div>
                  </div>
                </div>
                
                {/* Favorite Button */}
                <button className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 transition-all group">
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Description */}
              <p className="text-text-muted mb-6 leading-relaxed text-lg">
                {restaurant.description}
              </p>

              {/* Meta Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-text-muted">Prep Time</div>
                    <div className="font-bold text-primary">{restaurant.avg_prep_time_minutes} mins</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-text-muted">Location</div>
                    <div className="font-bold text-primary line-clamp-1">{restaurant.city}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-text-muted">Contact</div>
                    <div className="font-bold text-primary">{restaurant.phone}</div>
                  </div>
                </div>
              </div>

              {/* Savings Banner - Prominent */}
              <div className="bg-gradient-to-r from-highlight/20 to-highlight/10 border-2 border-highlight/30 rounded-2xl p-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-highlight rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                    💰
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-highlight-dark text-lg mb-1">
                      Save ₹70-150 per order
                    </div>
                    <div className="text-sm text-text-muted">
                      Order direct and skip platform fees • No delivery charges
                    </div>
                  </div>
                  <Link 
                    href="/#how-it-works"
                    className="hidden md:block px-6 py-3 bg-highlight text-white rounded-xl font-bold hover:bg-highlight-dark transition-all whitespace-nowrap"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs - Modern Sticky */}
      <div className="bg-white border-b border-gray-100 sticky top-20 z-40 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => scrollToCategory(category)}
                className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-text hover:bg-gray-200'
                }`}
              >
                <span>{category}</span>
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                  activeCategory === category
                    ? 'bg-white/20'
                    : 'bg-white'
                }`}>
                  {groupedMenuItems[category].length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items - Spacious Layout */}
      <div className="container mx-auto px-4 lg:px-8 py-10">
        <div className="max-w-5xl mx-auto space-y-16">
          {categories.map((category) => (
            <div key={category} id={category.toLowerCase().replace(/\s+/g, '-')}>
              {/* Category Header - Enhanced */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-3">
                  <h2 className="text-3xl font-display font-bold text-primary">
                    {category}
                  </h2>
                  <div className="h-1 flex-1 bg-gradient-to-r from-primary/20 to-transparent rounded-full"></div>
                </div>
                <p className="text-text-muted text-lg">
                  {groupedMenuItems[category].length} delicious {groupedMenuItems[category].length === 1 ? 'item' : 'items'} to choose from
                </p>
              </div>

              {/* Menu Items in Category */}
              <div className="space-y-6">
                {groupedMenuItems[category].map((item) => (
                  <MenuItemCard
                    key={item.id}
                    menuItem={item}
                    restaurantName={restaurant.name}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Info Cards - Modern Grid */}
        <div className="max-w-5xl mx-auto mt-16 grid md:grid-cols-2 gap-6">
          {/* How It Works Card */}
          <div className="bg-white rounded-3xl p-8 shadow-card border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-primary">How It Works</h3>
            </div>
            <ol className="space-y-4">
              {[
                'Add items to your cart',
                'Proceed to checkout and pay online',
                'Pick up your order at scheduled time',
                'Enjoy your savings!'
              ].map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-text-muted pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Restaurant Info Card */}
          <div className="bg-white rounded-3xl p-8 shadow-card border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-primary">Contact Info</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <div className="font-semibold text-primary mb-1">Address</div>
                  <div className="text-text-muted">{restaurant.address}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <div className="font-semibold text-primary mb-1">Phone</div>
                  <div className="text-text-muted">{restaurant.phone}</div>
                </div>
              </div>
              {restaurant.email && (
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div className="font-semibold text-primary mb-1">Email</div>
                    <div className="text-text-muted">{restaurant.email}</div>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <div className="font-semibold text-primary mb-1">Hours</div>
                  <div className="text-text-muted">{restaurant.opening_time} - {restaurant.closing_time}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
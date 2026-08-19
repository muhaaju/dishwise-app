import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// Mock data fallback
const mockRestaurant = {
  id: '1',
  name: 'Spice Garden',
  slug: 'spice-garden',
  description: 'Authentic Kerala cuisine with traditional flavors',
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

const mockMenuItems = [
  {
    id: '1',
    restaurant_id: '1',
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice layered with tender chicken pieces',
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
    description: 'Cottage cheese cubes in rich, creamy tomato-based gravy',
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
];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log('Supabase not configured, using mock data for', slug);
      return NextResponse.json({ 
        restaurant: mockRestaurant,
        menuItems: mockMenuItems
      });
    }

    const supabase = await createClient();
    
    // Fetch restaurant
    const { data: restaurant, error: restaurantError } = await supabase
      .from('restaurants')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (restaurantError || !restaurant) {
      console.log('Restaurant not found in DB, using mock data');
      return NextResponse.json({ 
        restaurant: mockRestaurant,
        menuItems: mockMenuItems
      });
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
      return NextResponse.json({ 
        restaurant,
        menuItems: mockMenuItems
      });
    }

    return NextResponse.json({ 
      restaurant,
      menuItems: menuItems || []
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ 
      restaurant: mockRestaurant,
      menuItems: mockMenuItems
    });
  }
}
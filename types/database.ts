// Database Types for DishWise MVP

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  address: string;
  city: string;
  pincode: string;
  phone: string;
  email: string | null;
  cuisine_type: string | null;
  image_url: string | null;
  is_active: boolean;
  avg_prep_time_minutes: number;
  opening_time: string;
  closing_time: string;
  created_at: string;
  updated_at: string;
}

export interface MenuItem {
  id: string;
  restaurant_id: string;
  name: string;
  description: string | null;
  category: string;
  image_url: string | null;
  in_shop_price: number;
  swiggy_price: number | null;
  zomato_price: number | null;
  is_available: boolean;
  is_vegetarian: boolean;
  is_vegan: boolean;
  spice_level: number | null;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  restaurant_id: string;
  items: OrderItem[];
  subtotal: number;
  total_amount: number;
  fulfillment_type: 'pickup';
  pickup_time: string | null;
  aggregator_comparison_total: number | null;
  savings_amount: number | null;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method: string | null;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  razorpay_signature: string | null;
  status: 'placed' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  placed_at: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  menu_item_id: string;
  name: string;
  quantity: number;
  price_snapshot: number;
  subtotal: number;
}

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: 'admin';
  is_active: boolean;
  created_at: string;
}

// Form Input Types
export interface RestaurantFormData {
  name: string;
  description?: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
  email?: string;
  image_url?: string;
  avg_prep_time_minutes: number;
}

export interface MenuItemFormData {
  restaurant_id: string;
  name: string;
  description?: string;
  category: string;
  in_shop_price: number;
  swiggy_price?: number;
  zomato_price?: number;
  image_url?: string;
  is_vegetarian: boolean;
  is_vegan: boolean;
  spice_level?: number;
  is_available: boolean;
}

export interface CheckoutFormData {
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  pickup_time: string;
  accepted_terms: boolean;
}

// Cart Types
export interface CartItem {
  menu_item_id: string;
  name: string;
  quantity: number;
  price: number;
  swiggy_price?: number;
  zomato_price?: number;
  restaurant_id: string;
  restaurant_name: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

// Savings Calculation
export interface SavingsBreakdown {
  directPrice: number;
  swiggyPrice?: number;
  zomatoPrice?: number;
  swiggyFees?: PriceFees;
  zomatoFees?: PriceFees;
  savingsVsSwiggy?: number;
  savingsVsZomato?: number;
  averageSavings?: number;
}

export interface PriceFees {
  basePrice: number;
  packagingFee: number;
  platformFee: number;
  deliveryFee: number;
  gst: number;
  total: number;
}

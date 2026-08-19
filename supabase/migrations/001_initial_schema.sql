-- DishWise MVP Database Schema
-- Migration: 001_initial_schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- RESTAURANTS TABLE
-- ============================================================================
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  pincode TEXT NOT NULL CHECK (pincode ~ '^\d{6}$'),
  phone TEXT NOT NULL CHECK (phone ~ '^\+?[1-9]\d{9,14}$'),
  email TEXT CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  avg_prep_time_minutes INTEGER DEFAULT 30 CHECK (avg_prep_time_minutes > 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for restaurants
CREATE INDEX idx_restaurants_city ON restaurants(city);
CREATE INDEX idx_restaurants_slug ON restaurants(slug);
CREATE INDEX idx_restaurants_active ON restaurants(is_active);
CREATE INDEX idx_restaurants_name ON restaurants(name);

-- ============================================================================
-- MENU ITEMS TABLE
-- ============================================================================
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  image_url TEXT,
  
  -- Pricing
  in_shop_price DECIMAL(10, 2) NOT NULL CHECK (in_shop_price >= 0),
  swiggy_price DECIMAL(10, 2) CHECK (swiggy_price >= 0),
  zomato_price DECIMAL(10, 2) CHECK (zomato_price >= 0),
  
  -- Availability
  is_available BOOLEAN DEFAULT TRUE,
  
  -- Metadata
  is_vegetarian BOOLEAN DEFAULT FALSE,
  is_vegan BOOLEAN DEFAULT FALSE,
  spice_level INTEGER CHECK (spice_level BETWEEN 0 AND 5),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for menu_items
CREATE INDEX idx_menu_items_restaurant ON menu_items(restaurant_id);
CREATE INDEX idx_menu_items_category ON menu_items(category);
CREATE INDEX idx_menu_items_available ON menu_items(is_available);
CREATE INDEX idx_menu_items_name ON menu_items(name);

-- ============================================================================
-- ORDERS TABLE
-- ============================================================================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  
  -- Customer info (no auth required for MVP)
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL CHECK (customer_phone ~ '^\+?[1-9]\d{9,14}$'),
  customer_email TEXT CHECK (customer_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  
  -- Order details
  restaurant_id UUID NOT NULL REFERENCES restaurants(id),
  items JSONB NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal >= 0),
  total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
  
  -- Fulfillment (pickup only for MVP)
  fulfillment_type TEXT DEFAULT 'pickup' CHECK (fulfillment_type = 'pickup'),
  pickup_time TIMESTAMPTZ,
  
  -- Savings
  aggregator_comparison_total DECIMAL(10, 2),
  savings_amount DECIMAL(10, 2),
  
  -- Payment
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method TEXT,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  
  -- Status
  status TEXT DEFAULT 'placed' CHECK (status IN ('placed', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled')),
  
  -- Timestamps
  placed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for orders
CREATE INDEX idx_orders_restaurant ON orders(restaurant_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_phone ON orders(customer_phone);
CREATE INDEX idx_orders_placed_at ON orders(placed_at DESC);
CREATE INDEX idx_orders_order_number ON orders(order_number);

-- ============================================================================
-- ADMIN USERS TABLE
-- ============================================================================
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role = 'admin'),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for admin_users
CREATE INDEX idx_admin_users_email ON admin_users(email);

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_restaurants_updated_at
  BEFORE UPDATE ON restaurants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON menu_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- SEED DATA (Optional - for development)
-- ============================================================================

-- Insert a default admin user (password: admin123 - CHANGE IN PRODUCTION!)
-- Password hash generated with bcrypt, rounds=10
INSERT INTO admin_users (email, password_hash, name) VALUES
  ('admin@dishwise.app', '$2b$10$rKvVPZqGhXqKX8YqKqKqKOqKqKqKqKqKqKqKqKqKqKqKqKqKqKqKq', 'Admin User');

-- Note: Replace the password_hash above with actual bcrypt hash before running in production
-- You can generate it using: bcrypt.hash('your_password', 10)

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE restaurants IS 'Stores restaurant information';
COMMENT ON TABLE menu_items IS 'Stores menu items with pricing from direct counter, Swiggy, and Zomato';
COMMENT ON TABLE orders IS 'Stores customer orders with payment and fulfillment details';
COMMENT ON TABLE admin_users IS 'Stores admin user credentials for the admin panel';

COMMENT ON COLUMN menu_items.in_shop_price IS 'Direct counter price at the restaurant';
COMMENT ON COLUMN menu_items.swiggy_price IS 'Listed price on Swiggy (before fees)';
COMMENT ON COLUMN menu_items.zomato_price IS 'Listed price on Zomato (before fees)';
COMMENT ON COLUMN orders.items IS 'JSONB array of order items with menu_item_id, name, quantity, price_snapshot, subtotal';
COMMENT ON COLUMN orders.savings_amount IS 'Amount saved by ordering direct vs aggregators';

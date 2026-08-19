# DishWise Data Requirements for Production

## Overview
This document outlines all the data requirements needed to host the restaurant pages and enable the complete ordering flow in DishWise.

---

## 1. Database Tables Required

### ✅ Already Defined in Schema (`supabase/migrations/001_initial_schema.sql`)

1. **restaurants** - Restaurant information
2. **menu_items** - Menu items with pricing
3. **orders** - Customer orders
4. **admin_users** - Admin panel access

---

## 2. Minimum Data Requirements

### 2.1 Restaurants Table

**Required Fields:**
```typescript
{
  name: string;              // e.g., "Spice Garden"
  slug: string;              // e.g., "spice-garden" (URL-friendly, unique)
  address: string;           // Full address
  city: string;              // e.g., "Kochi"
  pincode: string;           // 6-digit pincode
  phone: string;             // Contact number with country code
  avg_prep_time_minutes: number; // e.g., 30
  opening_time: string;      // e.g., "09:00"
  closing_time: string;      // e.g., "22:00"
}
```

**Optional but Recommended:**
```typescript
{
  description: string;       // Restaurant description
  email: string;            // Contact email
  cuisine_type: string;     // e.g., "Kerala", "North Indian"
  image_url: string;        // Restaurant image URL
}
```

**Example Data:**
```sql
INSERT INTO restaurants (name, slug, description, address, city, pincode, phone, email, cuisine_type, avg_prep_time_minutes, opening_time, closing_time) VALUES
('Spice Garden', 'spice-garden', 'Authentic Kerala cuisine with traditional flavors', '123 MG Road, Kochi', 'Kochi', '682001', '+919876543210', 'contact@spicegarden.com', 'Kerala', 30, '09:00', '22:00'),
('Coastal Delights', 'coastal-delights', 'Fresh seafood and coastal specialties', '456 Fort Road, Fort Kochi', 'Kochi', '682002', '+919876543211', 'info@coastaldelights.com', 'Seafood', 35, '10:00', '23:00'),
('Biryani House', 'biryani-house', 'Authentic Hyderabadi and Lucknowi biryani', '789 Edappally Road', 'Kochi', '682024', '+919876543212', 'orders@biryanihouse.com', 'Biryani', 25, '11:00', '23:00');
```

---

### 2.2 Menu Items Table

**Required Fields:**
```typescript
{
  restaurant_id: string;     // UUID of the restaurant
  name: string;              // e.g., "Chicken Biryani"
  category: string;          // e.g., "Main Course", "Breakfast", "Desserts"
  in_shop_price: number;     // Direct price in rupees (e.g., 250.00)
  is_available: boolean;     // true/false
  is_vegetarian: boolean;    // true/false
  is_vegan: boolean;         // true/false
}
```

**Optional but Recommended:**
```typescript
{
  description: string;       // Item description
  image_url: string;        // Item image URL
  swiggy_price: number;     // Swiggy price for comparison
  zomato_price: number;     // Zomato price for comparison
  spice_level: number;      // 0-5 scale
}
```

**Example Data:**
```sql
-- For Spice Garden (replace <restaurant_id> with actual UUID)
INSERT INTO menu_items (restaurant_id, name, description, category, in_shop_price, swiggy_price, zomato_price, is_vegetarian, is_vegan, spice_level) VALUES
('<restaurant_id>', 'Chicken Biryani', 'Fragrant basmati rice with tender chicken', 'Main Course', 250.00, 320.00, 335.00, false, false, 3),
('<restaurant_id>', 'Paneer Butter Masala', 'Cottage cheese in rich tomato gravy', 'Main Course', 180.00, 240.00, 250.00, true, false, 2),
('<restaurant_id>', 'Fish Curry', 'Fresh catch in Kerala-style coconut curry', 'Main Course', 220.00, 280.00, 290.00, false, false, 4),
('<restaurant_id>', 'Masala Dosa', 'Crispy rice crepe with spiced potato', 'Breakfast', 80.00, 120.00, 125.00, true, true, 2),
('<restaurant_id>', 'Gulab Jamun', 'Soft milk dumplings in sugar syrup', 'Desserts', 60.00, 90.00, 95.00, true, false, 0);
```

---

### 2.3 Admin Users Table

**Required for Admin Panel Access:**
```sql
-- Create admin user (password should be hashed with bcrypt)
INSERT INTO admin_users (email, password_hash, name) VALUES
('admin@dishwise.app', '<bcrypt_hash>', 'Admin User');
```

**To generate password hash:**
```javascript
// Using bcrypt in Node.js
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash('your_password', 10);
```

---

## 3. Data Flow for Orders

### 3.1 Order Creation Process

**Step 1: Customer adds items to cart (Frontend - Zustand store)**
```typescript
// Cart state stored in browser
{
  items: [
    {
      menu_item_id: "uuid",
      name: "Chicken Biryani",
      quantity: 2,
      price: 250.00,
      swiggy_price: 320.00,
      zomato_price: 335.00,
      restaurant_id: "uuid",
      restaurant_name: "Spice Garden"
    }
  ]
}
```

**Step 2: Customer proceeds to checkout**
- Fills in: name, phone, email (optional), pickup time
- Reviews order summary with savings calculation

**Step 3: Payment integration (Razorpay)**
- Create Razorpay order
- Customer completes payment
- Verify payment signature

**Step 4: Order saved to database**
```typescript
{
  order_number: "DW-20260819-001",  // Auto-generated
  customer_name: "John Doe",
  customer_phone: "+919876543210",
  customer_email: "john@example.com",
  restaurant_id: "uuid",
  items: [/* cart items */],
  subtotal: 500.00,
  total_amount: 500.00,
  fulfillment_type: "pickup",
  pickup_time: "2026-08-19T14:30:00Z",
  aggregator_comparison_total: 640.00,
  savings_amount: 140.00,
  payment_status: "paid",
  payment_method: "razorpay",
  razorpay_order_id: "order_xxx",
  razorpay_payment_id: "pay_xxx",
  razorpay_signature: "signature_xxx",
  status: "placed"
}
```

---

## 4. Supabase Setup Checklist

### 4.1 Database Setup
- [ ] Run migration: `001_initial_schema.sql`
- [ ] Verify all tables created successfully
- [ ] Check indexes are created
- [ ] Test triggers for `updated_at` columns

### 4.2 Row Level Security (RLS) Policies

**For Public Access (Customers):**
```sql
-- Allow public to read active restaurants
CREATE POLICY "Public can view active restaurants"
ON restaurants FOR SELECT
USING (is_active = true);

-- Allow public to read available menu items
CREATE POLICY "Public can view available menu items"
ON menu_items FOR SELECT
USING (is_available = true);

-- Allow public to create orders
CREATE POLICY "Public can create orders"
ON orders FOR INSERT
WITH CHECK (true);

-- Allow customers to view their own orders (by phone)
CREATE POLICY "Customers can view own orders"
ON orders FOR SELECT
USING (customer_phone = current_setting('request.jwt.claims')::json->>'phone');
```

**For Admin Access:**
```sql
-- Admins can do everything on all tables
CREATE POLICY "Admins have full access to restaurants"
ON restaurants FOR ALL
USING (auth.jwt()->>'role' = 'admin');

CREATE POLICY "Admins have full access to menu_items"
ON menu_items FOR ALL
USING (auth.jwt()->>'role' = 'admin');

CREATE POLICY "Admins have full access to orders"
ON orders FOR ALL
USING (auth.jwt()->>'role' = 'admin');
```

### 4.3 Environment Variables

**Required in `.env.local`:**
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Razorpay (for payments)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your-secret-key

# Admin (for API routes)
ADMIN_JWT_SECRET=your-jwt-secret
```

---

## 5. Image Storage Requirements

### 5.1 Restaurant Images
- **Recommended size:** 800x600px (4:3 aspect ratio)
- **Format:** JPG, PNG, WebP
- **Max size:** 500KB
- **Storage:** Supabase Storage bucket: `restaurant-images`

### 5.2 Menu Item Images
- **Recommended size:** 400x400px (1:1 aspect ratio)
- **Format:** JPG, PNG, WebP
- **Max size:** 300KB
- **Storage:** Supabase Storage bucket: `menu-item-images`

### 5.3 Supabase Storage Setup
```sql
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
('restaurant-images', 'restaurant-images', true),
('menu-item-images', 'menu-item-images', true);

-- Set storage policies
CREATE POLICY "Public can view restaurant images"
ON storage.objects FOR SELECT
USING (bucket_id = 'restaurant-images');

CREATE POLICY "Admins can upload restaurant images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'restaurant-images' AND auth.jwt()->>'role' = 'admin');
```

---

## 6. Minimum Viable Data for Launch

### For Testing/MVP Launch:
- **Restaurants:** Minimum 3-5 restaurants
- **Menu Items per Restaurant:** Minimum 10-15 items
- **Categories:** At least 3-4 categories (e.g., Breakfast, Main Course, Desserts)
- **Admin User:** 1 admin account

### Sample Data Script:
```sql
-- 1. Insert Restaurants
INSERT INTO restaurants (name, slug, description, address, city, pincode, phone, cuisine_type, avg_prep_time_minutes, opening_time, closing_time) VALUES
('Spice Garden', 'spice-garden', 'Authentic Kerala cuisine', '123 MG Road', 'Kochi', '682001', '+919876543210', 'Kerala', 30, '09:00', '22:00'),
('Coastal Delights', 'coastal-delights', 'Fresh seafood specialties', '456 Fort Road', 'Kochi', '682002', '+919876543211', 'Seafood', 35, '10:00', '23:00'),
('Biryani House', 'biryani-house', 'Authentic biryani varieties', '789 Edappally Road', 'Kochi', '682024', '+919876543212', 'Biryani', 25, '11:00', '23:00');

-- 2. Get restaurant IDs and insert menu items
-- (Use actual UUIDs from the restaurants table)

-- 3. Create admin user
INSERT INTO admin_users (email, password_hash, name) VALUES
('admin@dishwise.app', '$2b$10$...', 'Admin User');
```

---

## 7. Data Validation Rules

### Restaurant Data:
- ✅ Phone must be valid Indian mobile number (+91 format)
- ✅ Pincode must be 6 digits
- ✅ Email must be valid format
- ✅ Opening/closing times in HH:MM format
- ✅ Slug must be unique and URL-friendly

### Menu Item Data:
- ✅ Prices must be positive numbers
- ✅ Swiggy/Zomato prices should be higher than in_shop_price
- ✅ Spice level between 0-5
- ✅ Category should be consistent across items

### Order Data:
- ✅ Customer phone must be valid
- ✅ Pickup time must be in future
- ✅ Total amount must match calculated subtotal
- ✅ Items array must not be empty

---

## 8. API Endpoints Required

### Customer-Facing APIs:
- `GET /api/restaurants` - List all active restaurants
- `GET /api/restaurants/[slug]` - Get restaurant details
- `GET /api/restaurants/[slug]/menu` - Get menu items
- `POST /api/orders/create` - Create new order
- `GET /api/orders/track?phone=xxx&order_number=xxx` - Track order
- `POST /api/payments/verify` - Verify Razorpay payment

### Admin APIs:
- `POST /api/admin/auth/login` - Admin login
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/orders` - List all orders
- `PATCH /api/admin/orders/[id]` - Update order status
- `GET /api/admin/restaurants` - List restaurants
- `POST /api/admin/restaurants` - Create restaurant
- `PATCH /api/admin/restaurants/[id]` - Update restaurant
- `GET /api/admin/menu` - List menu items
- `POST /api/admin/menu` - Create menu item
- `PATCH /api/admin/menu/[id]` - Update menu item

---

## 9. Testing Data Checklist

Before going live, ensure:
- [ ] At least 3 restaurants with complete data
- [ ] Each restaurant has 10+ menu items
- [ ] Menu items have Swiggy/Zomato prices for comparison
- [ ] All restaurant images uploaded
- [ ] Admin user created and tested
- [ ] Test order flow end-to-end
- [ ] Payment integration tested (test mode)
- [ ] Order status updates working
- [ ] Email/SMS notifications configured (if applicable)

---

## 10. Production Deployment Checklist

- [ ] Database migration run successfully
- [ ] RLS policies enabled and tested
- [ ] Storage buckets created with proper policies
- [ ] Environment variables set in production
- [ ] Razorpay production keys configured
- [ ] Admin password changed from default
- [ ] Backup strategy in place
- [ ] Monitoring and logging configured
- [ ] SSL certificate active
- [ ] Domain configured correctly

---

## Next Steps

1. **Set up Supabase project**
   - Create new project
   - Run migration script
   - Configure RLS policies

2. **Prepare initial data**
   - Collect restaurant information
   - Get menu items with pricing
   - Prepare images

3. **Configure integrations**
   - Set up Razorpay account
   - Configure payment webhooks
   - Test payment flow

4. **Deploy and test**
   - Deploy to Vercel/production
   - Test complete order flow
   - Monitor for issues

---

## Support & Resources

- **Supabase Docs:** https://supabase.com/docs
- **Razorpay Docs:** https://razorpay.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **DishWise GitHub:** [Your repository URL]

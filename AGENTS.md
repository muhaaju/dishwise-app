<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# DishWise Project Context - Updated August 19, 2026

## Project Overview
DishWise is a food ordering platform MVP that helps customers save money by ordering directly from restaurants instead of using delivery aggregators like Swiggy/Zomato. The platform emphasizes cost savings (₹70-150 per order) by showing transparent price comparisons.

## Tech Stack
- **Framework**: Next.js 16.3.1 (Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **State Management**: Zustand (with persist middleware)
- **Payment**: Razorpay integration
- **Dev Server**: Port 3001 (http://localhost:3001)

## Project Structure
```
/app
  /restaurants - Restaurant listing page
  /restaurants/[slug] - Restaurant detail & menu page
  /checkout - Checkout with multiple payment options
  /order-confirmation/[orderId] - Order confirmation
  /admin - Admin dashboard (login, restaurants, menu, orders)
  /api - API routes for orders, payments, restaurants
/components
  /customer - MenuItemCard, RestaurantCard, ShoppingCart
/lib
  /store - Zustand cart store with persistence
  /supabase - Supabase client setup
  /utils - Calculation utilities
/types - TypeScript database types
```

## Key Features Implemented

### 1. Restaurant Listing Page (/restaurants)
- Modern orange gradient hero with search
- Horizontal scrollable filter chips
- Cuisine type tabs with active states
- Professional restaurant cards with:
  - Hover effects and badges
  - Price comparison display
  - Responsive grid (1/2/3/4 columns)
- Clean navigation with logo and location selector

### 2. Restaurant Detail & Menu Page (/restaurants/[slug])
- **Compact Swiggy/Zomato Style UI**:
  - Reduced padding (p-4 instead of p-6)
  - Smaller images (28×28)
  - Inline badges with item names
  - Professional, space-efficient layout

- **Pricing Display - Emphasizes Savings**:
  - **HUGE Green "SAVE ₹70" badge** at top of each card (most prominent)
  - Direct price with green "Direct Price" badge
  - Aggregator prices shown as "charging MORE":
    - Red background highlighting
    - Bold red text showing higher prices
    - Percentage markup badges (+40%, +50%, +60%)
    - Clear messaging: "Swiggy charges ₹320" vs "You Pay ₹250"
  - Expandable breakdown showing "Why Order Direct?"

- **Menu Item Cards**:
  - Veg/Non-veg indicators
  - Bestseller badges
  - Spice level indicators
  - Quantity selector
  - Add to cart button with loading state
  - Price comparison with savings calculation

### 3. Shopping Cart (Always Visible)
- **Fixed hydration mismatch** - Properly syncs between server/client
- Floating button at bottom-right on ALL pages (z-index: 50)
- Two states:
  - **Empty**: Gray button showing "Cart Empty"
  - **With Items**: Orange gradient button showing:
    - Item count: "View Cart (2 items)"
    - Total amount: "₹500"
    - Savings badge: "Save ₹140"
- Sidebar with:
  - Item list with quantity controls
  - Individual item savings
  - Total savings prominently displayed
  - Bill breakdown
  - "Proceed to Checkout" button

### 4. Checkout Page (/checkout)
- **Multiple Payment Options**:
  1. **💵 Pay at Pickup (Recommended)**:
     - Pay cash/UPI when collecting order
     - No online payment required
     - Zero delivery charges
  
  2. **🛵 Online Payment + Porter/Uber Parcel Delivery**:
     - Pay online via Razorpay
     - Delivery by Porter/Uber Parcel
     - ₹40-80 delivery charges (based on distance)
  
  3. **🚗 Online Payment + Free Restaurant Delivery**:
     - Pay online via Razorpay
     - Restaurant delivers for FREE
     - Within 5km radius
     - Save delivery charges!

- **Dynamic Order Summary**:
  - Shows delivery charges based on selected method
  - Real-time total calculation
  - Clear breakdown of all charges
  - Savings display

- **Form Validation**:
  - Customer name, phone, email
  - Pickup/delivery time selection
  - Conditional delivery address (required for delivery options)
  - Terms & conditions acceptance

### 5. Cart Store (Zustand)
- Persistent storage using localStorage ('dishwise-cart')
- Functions:
  - addItem: Add or update item quantity
  - removeItem: Remove item from cart
  - updateQuantity: Update item quantity
  - clearCart: Clear all items
  - getSubtotal: Calculate total price
  - getSavings: Calculate total savings
  - getItemCount: Get total item count

## Current State

### Completed Features ✅
- Restaurant listing with modern UI
- Restaurant detail pages with menu
- Compact menu item cards (Swiggy/Zomato style)
- Prominent savings display (90-150% markup emphasis)
- Shopping cart with hydration fix
- Cart visible on all pages
- Enhanced cart button showing count, amount, and savings
- Multiple payment options (3 methods)
- Dynamic checkout with delivery charges
- Responsive design across all pages

### Mock Data
Currently using mock data for:
- 3 restaurants: Spice Garden, Coastal Delights, Biryani House
- Menu items with price comparisons
- All routes building successfully

### Pending/Next Steps
- Connect to Supabase for real restaurant data
- Implement actual restaurant filtering and sorting
- Add restaurant detail pages with real data
- Implement order tracking functionality
- Build admin dashboard for restaurant partners
- Add payment gateway integration (Razorpay)
- Implement order management system

## Key Design Principles

### 1. Savings-First Approach
- Savings are the MOST prominent element
- Green badges for savings (positive reinforcement)
- Red backgrounds for aggregator prices (warning)
- Percentage markups clearly displayed
- "They charge MORE" messaging

### 2. User Experience
- Always-visible cart (no hidden state)
- Clear call-to-actions
- Minimal friction in checkout
- Multiple payment options for flexibility
- Transparent pricing

### 3. Visual Hierarchy
1. Savings badge (largest, green, top)
2. Direct price (medium, green badge)
3. Aggregator prices (smaller, red, below)
4. Additional details (expandable)

## Technical Notes

### Hydration Fix
The shopping cart component had a hydration mismatch issue. Fixed by:
- Adding `isMounted` state
- Waiting for client-side mount before rendering cart state
- Showing loading state during hydration

### Cart Persistence
- Uses Zustand persist middleware
- Stores in localStorage as 'dishwise-cart'
- Automatically syncs across tabs
- Survives page refreshes

### Payment Flow
1. User selects payment method
2. For "Pay at Pickup": Order created with pending status
3. For online methods: Razorpay payment initiated
4. Payment verified via webhook
5. Order confirmed and user redirected

## Development Commands
```bash
npm run dev          # Start dev server on port 3001
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

## Important Files
- `/app/restaurants/page.tsx` - Restaurant listing
- `/app/restaurants/[slug]/page.tsx` - Restaurant detail & menu
- `/app/checkout/page.tsx` - Checkout with payment options
- `/components/customer/MenuItemCard.tsx` - Menu item display
- `/components/customer/RestaurantCard.tsx` - Restaurant card
- `/components/customer/ShoppingCart.tsx` - Shopping cart component
- `/lib/store/cart.ts` - Cart state management
- `/types/database.ts` - TypeScript types

## Recent Updates (August 19, 2026)
1. Fixed menu item cards to be more compact (Swiggy/Zomato style)
2. Redesigned pricing display to emphasize 90-150% markup by aggregators
3. Made savings calculations highly prominent with green badges
4. Fixed cart visibility - now shows on all pages
5. Enhanced cart button to show item count, amount, and savings
6. Added multiple payment options (Pay at Pickup, Porter/Uber Parcel, Restaurant Delivery)
7. Implemented dynamic delivery charges based on payment method
8. Fixed hydration mismatch in shopping cart component
9. Updated checkout page with conditional delivery address field

## Value Proposition
**Save ₹70-150 per order** by ordering directly from restaurants vs Swiggy/Zomato. No platform fees, no delivery charges for pickup, transparent pricing.
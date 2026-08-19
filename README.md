# DishWise MVP - Week 1 Setup Complete ✅

A Next.js application that helps customers save money by comparing restaurant direct prices with delivery aggregator prices (Swiggy/Zomato).

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Payment**: Razorpay
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account
- Razorpay account (for payment integration)

## 🛠️ Setup Instructions

### 1. Clone and Install Dependencies

```bash
cd dishwise-app
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API to get your credentials
3. Run the database migration:
   - Go to SQL Editor in Supabase Dashboard
   - Copy contents from `supabase/migrations/001_initial_schema.sql`
   - Execute the SQL

### 3. Set Up Razorpay

1. Create account at [razorpay.com](https://razorpay.com)
2. Get your API keys from Dashboard > Settings > API Keys
3. Use Test Mode keys for development

### 4. Configure Environment Variables

Create `.env.local` file in the root directory:

```bash
# Copy from env.example
cp env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
dishwise-app/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with fonts
│   ├── page.tsx             # Home page
│   ├── restaurants/         # Restaurant listing & details
│   ├── checkout/            # Checkout flow
│   ├── admin/               # Admin panel
│   └── api/                 # API routes
├── components/              # React components
│   ├── ui/                  # Base UI components
│   ├── customer/            # Customer-facing components
│   └── admin/               # Admin components
├── lib/                     # Utilities and helpers
│   ├── supabase/           # Supabase clients
│   ├── store/              # Zustand stores
│   └── utils/              # Helper functions
├── types/                   # TypeScript type definitions
├── supabase/               # Database migrations
└── public/                 # Static assets
```

## 🎨 Design System

### Colors

```typescript
Primary (Trust): #20361F (Deep Green)
CTA (Action): #C1401F (Chili Red)
Highlight (Savings): #D9A441 (Turmeric Gold)
Background: #FBFAF6 (Warm Off-White)
Text: #1C1B19 (Charcoal)
```

### Typography

- **Display/Headers**: Playfair Display (Serif)
- **Body Text**: Inter (Sans-serif)
- **Monospace**: JetBrains Mono (for prices)

## 🗄️ Database Schema

### Tables

1. **restaurants** - Restaurant information
2. **menu_items** - Menu items with pricing (direct, Swiggy, Zomato)
3. **orders** - Customer orders
4. **admin_users** - Admin authentication

See `supabase/migrations/001_initial_schema.sql` for complete schema.

## 🔐 Admin Access

Default admin credentials (CHANGE IN PRODUCTION):
- Email: `admin@dishwise.app`
- Password: `admin123`

**⚠️ IMPORTANT**: Update the password hash in the migration file before deploying to production.

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## 🧪 Testing (Coming Soon)

```bash
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
```

## 📦 Key Dependencies

- `next` - React framework
- `react` & `react-dom` - React library
- `@supabase/supabase-js` - Supabase client
- `@supabase/ssr` - Supabase SSR helpers
- `razorpay` - Payment gateway SDK
- `react-hook-form` - Form handling
- `zod` - Schema validation
- `zustand` - State management
- `axios` - HTTP client
- `tailwindcss` - Utility-first CSS

## 🚧 Week 1 Completed Tasks

- ✅ Next.js project initialized with TypeScript
- ✅ Tailwind CSS configured with brand colors
- ✅ Supabase setup (client & server)
- ✅ Database schema created
- ✅ TypeScript types defined
- ✅ Utility functions (calculations, formatting)
- ✅ Cart store with persistence
- ✅ Layout and home page
- ✅ Environment configuration

## 📅 Next Steps (Week 2)

- [ ] Restaurant listing page
- [ ] Restaurant detail page
- [ ] Menu item components
- [ ] Price comparison card
- [ ] Shopping cart UI
- [ ] API endpoints for restaurants

## 🤝 Contributing

This is an MVP project. For questions or issues, contact the development team.

## 📄 License

Proprietary - DishWise 2026

---

**Status**: Week 1 Setup Complete ✅  
**Last Updated**: August 19, 2026
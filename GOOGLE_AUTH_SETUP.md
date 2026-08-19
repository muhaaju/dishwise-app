# Google Authentication Setup Guide

## Overview
This guide explains how to set up Google OAuth authentication for the DishWise checkout page.

## What's Implemented

### 1. GoogleAuth Component (`/components/customer/GoogleAuth.tsx`)
- **Google Sign-In Button**: One-click authentication with Google
- **Auto-fill Form**: Automatically fills customer name and email after sign-in
- **User Profile Display**: Shows user avatar, name, and email when signed in
- **Sign Out**: Allows users to sign out
- **Guest Checkout**: Users can still checkout without signing in

### 2. Checkout Page Integration (`/app/checkout/page.tsx`)
- GoogleAuth component placed above customer details form
- Auto-fills name and email when user signs in with Google
- Seamless integration with existing checkout flow

## Benefits for Users
✅ **Faster Checkout**: Auto-fill name and email
✅ **Order Tracking**: Track all orders in one place (future feature)
✅ **Saved Preferences**: Remember delivery addresses (future feature)
✅ **No Password Required**: Use Google account for authentication

## Supabase Configuration Required

### Step 1: Enable Google Provider in Supabase

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Select your project: `dishwise-app`
3. Navigate to **Authentication** → **Providers**
4. Find **Google** in the list of providers
5. Toggle **Enable Sign in with Google**

### Step 2: Configure Google OAuth Credentials

#### A. Create Google OAuth Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Select **Web application**
6. Configure:
   - **Name**: DishWise App
   - **Authorized JavaScript origins**:
     - `http://localhost:3001` (for development)
     - `https://yourdomain.com` (for production)
   - **Authorized redirect URIs**:
     - `https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback`
     - Get this URL from Supabase dashboard under Authentication → Providers → Google

7. Click **Create**
8. Copy the **Client ID** and **Client Secret**

#### B. Add Credentials to Supabase

1. Back in Supabase Dashboard → Authentication → Providers → Google
2. Paste the **Client ID** from Google Console
3. Paste the **Client Secret** from Google Console
4. Click **Save**

### Step 3: Configure Redirect URLs

In Supabase Dashboard → Authentication → URL Configuration:

1. **Site URL**: 
   - Development: `http://localhost:3001`
   - Production: `https://yourdomain.com`

2. **Redirect URLs** (add these):
   - `http://localhost:3001/checkout`
   - `https://yourdomain.com/checkout`

### Step 4: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to checkout page: `http://localhost:3001/checkout`

3. Click **Continue with Google** button

4. Sign in with your Google account

5. Verify that:
   - User is redirected back to checkout page
   - Name and email are auto-filled in the form
   - User profile is displayed in the GoogleAuth component

## Environment Variables

Make sure these are set in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## User Flow

### First-Time User
1. User adds items to cart
2. Goes to checkout page
3. Sees "Quick Checkout" card with Google sign-in
4. Clicks "Continue with Google"
5. Authenticates with Google (redirected to Google)
6. Returns to checkout with name/email auto-filled
7. Completes remaining fields (phone, pickup time, etc.)
8. Places order

### Returning User
1. User adds items to cart
2. Goes to checkout page
3. Already signed in - sees profile card
4. Form is auto-filled with saved details
5. Completes order faster

### Guest User
1. User adds items to cart
2. Goes to checkout page
3. Sees Google sign-in option
4. Clicks "or continue as guest"
5. Manually fills all form fields
6. Places order

## Database Schema (✅ IMPLEMENTED)

The `customers` table has been created with full Row Level Security:

**Migration File**: `/supabase/migrations/002_create_customers_table.sql`

**Features**:
- ✅ Automatic profile creation on user signup (via trigger)
- ✅ Row Level Security (RLS) enabled
- ✅ Auto-update timestamp on changes
- ✅ Stores: name, email, phone, default address
- ✅ Linked to auth.users table

**API Endpoints**:
- `GET /api/customers/profile` - Fetch user profile
- `POST /api/customers/profile` - Create/update full profile
- `PATCH /api/customers/profile` - Update specific fields

**To Apply Migration**:
```bash
# Run in Supabase SQL Editor or via CLI
psql -h [your-db-host] -U postgres -d postgres -f supabase/migrations/002_create_customers_table.sql
```

Or copy the SQL from the migration file and run it in Supabase Dashboard → SQL Editor.

## Security Considerations

✅ **Secure by Default**: Uses Supabase Auth which handles security
✅ **No Password Storage**: Google handles authentication
✅ **Token Management**: Supabase manages JWT tokens
✅ **HTTPS Required**: OAuth requires HTTPS in production
✅ **Row Level Security**: Can be enabled for user data

## Troubleshooting

### Issue: "Invalid redirect URI"
**Solution**: Make sure the redirect URI in Google Console exactly matches the one from Supabase

### Issue: "OAuth client not found"
**Solution**: Verify Client ID and Secret are correctly copied to Supabase

### Issue: User not redirected back
**Solution**: Check that redirect URLs are configured in Supabase URL Configuration

### Issue: Form not auto-filling
**Solution**: Check browser console for errors, verify `handleAuthSuccess` is being called

## Next Steps

1. **Set up Google OAuth** following steps above
2. **Test in development** with localhost
3. **Configure production** URLs when deploying
4. **Add customer profile page** to manage saved details
5. **Implement order history** for authenticated users
6. **Add saved addresses** feature

## Support

For issues with:
- **Supabase Auth**: Check [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- **Google OAuth**: Check [Google OAuth Docs](https://developers.google.com/identity/protocols/oauth2)
- **DishWise App**: Contact development team

---

**Status**: ✅ Code implemented, awaiting Supabase configuration
**Last Updated**: August 19, 2026

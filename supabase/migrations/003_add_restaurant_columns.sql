-- Add missing columns to restaurants table
-- Migration: 003_add_restaurant_columns.sql

-- Add rating column (1.0 to 5.0)
ALTER TABLE restaurants 
ADD COLUMN IF NOT EXISTS rating DECIMAL(2,1) DEFAULT 4.0 CHECK (rating >= 1.0 AND rating <= 5.0);

-- Add total reviews count
ALTER TABLE restaurants 
ADD COLUMN IF NOT EXISTS total_reviews INTEGER DEFAULT 0 CHECK (total_reviews >= 0);

-- Add average delivery time (in minutes as string like "20-30")
ALTER TABLE restaurants 
ADD COLUMN IF NOT EXISTS avg_delivery_time TEXT DEFAULT '30-40';

-- Add average cost for two people
ALTER TABLE restaurants 
ADD COLUMN IF NOT EXISTS avg_cost_for_two INTEGER DEFAULT 300 CHECK (avg_cost_for_two > 0);

-- Add cuisine type
ALTER TABLE restaurants 
ADD COLUMN IF NOT EXISTS cuisine_type TEXT DEFAULT 'Multi-Cuisine';

-- Add location (area/locality)
ALTER TABLE restaurants 
ADD COLUMN IF NOT EXISTS location TEXT;

-- Add vegetarian flag
ALTER TABLE restaurants 
ADD COLUMN IF NOT EXISTS is_vegetarian BOOLEAN DEFAULT FALSE;

-- Add discount text
ALTER TABLE restaurants 
ADD COLUMN IF NOT EXISTS discount_text TEXT;

-- Add tags array
ALTER TABLE restaurants 
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- Create indexes for new columns
CREATE INDEX IF NOT EXISTS idx_restaurants_rating ON restaurants(rating);
CREATE INDEX IF NOT EXISTS idx_restaurants_cuisine_type ON restaurants(cuisine_type);
CREATE INDEX IF NOT EXISTS idx_restaurants_is_vegetarian ON restaurants(is_vegetarian);
CREATE INDEX IF NOT EXISTS idx_restaurants_avg_cost_for_two ON restaurants(avg_cost_for_two);

-- Update location column with address if null
UPDATE restaurants 
SET location = address 
WHERE location IS NULL;

COMMENT ON COLUMN restaurants.rating IS 'Restaurant rating from 1.0 to 5.0';
COMMENT ON COLUMN restaurants.total_reviews IS 'Total number of customer reviews';
COMMENT ON COLUMN restaurants.avg_delivery_time IS 'Average delivery time range (e.g., "20-30")';
COMMENT ON COLUMN restaurants.avg_cost_for_two IS 'Average cost for two people in INR';
COMMENT ON COLUMN restaurants.cuisine_type IS 'Type of cuisine (e.g., "North Indian", "Chinese")';
COMMENT ON COLUMN restaurants.location IS 'Area or locality name';
COMMENT ON COLUMN restaurants.is_vegetarian IS 'Whether restaurant serves only vegetarian food';
COMMENT ON COLUMN restaurants.discount_text IS 'Discount offer text (e.g., "20% OFF")';
COMMENT ON COLUMN restaurants.tags IS 'Array of tags (e.g., ["Fast Delivery", "Top Rated"])';

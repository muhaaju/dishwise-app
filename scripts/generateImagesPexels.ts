/**
 * Pexels Image Generation Script for DishWise
 * 
 * This script fetches high-quality food images from Pexels (free)
 * and updates the Supabase database with the image URLs.
 * 
 * Usage:
 *   npm run generate:restaurants:pexels
 * 
 * Requirements:
 *   - PEXELS_API_KEY in .env (get free at https://www.pexels.com/api/)
 *   - NEXT_PUBLIC_SUPABASE_URL in .env
 *   - NEXT_PUBLIC_SUPABASE_ANON_KEY in .env
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import {
  fetchRestaurantImageFromPexels,
  fetchMenuItemImageFromPexels,
} from '../lib/utils/pexelsImageFetcher';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  cuisine_type: string;
  image_url: string | null;
}

/**
 * Upload image buffer to Supabase Storage
 */
async function uploadImageToSupabase(
  imageBuffer: Buffer,
  fileName: string,
  bucketName: string = 'restaurant-images'
): Promise<string> {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, imageBuffer, {
      contentType: 'image/jpeg',
      upsert: true,
    });

  if (error) {
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}

/**
 * Generate images for all restaurants without images
 */
async function generateRestaurantImages() {
  console.log('🏪 Fetching restaurants without images...');
  
  const { data: restaurants, error } = await supabase
    .from('restaurants')
    .select('*')
    .is('image_url', null)
    .eq('is_active', true);

  if (error) {
    console.error('❌ Error fetching restaurants:', error);
    return;
  }

  if (!restaurants || restaurants.length === 0) {
    console.log('✅ All restaurants already have images!');
    return;
  }

  console.log(`📸 Fetching images for ${restaurants.length} restaurants from Pexels...`);
  console.log(`⏱️  This will take approximately ${Math.ceil(restaurants.length * 3 / 60)} minutes\n`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < restaurants.length; i++) {
    const restaurant = restaurants[i] as Restaurant;
    console.log(`[${i + 1}/${restaurants.length}] Fetching image for: ${restaurant.name}`);

    try {
      // Fetch image from Pexels
      const imageBuffer = await fetchRestaurantImageFromPexels(
        restaurant.name,
        restaurant.cuisine_type || 'restaurant'
      );

      // Upload to Supabase Storage
      const fileName = `${restaurant.slug}-${Date.now()}.jpg`;
      const imageUrl = await uploadImageToSupabase(imageBuffer, fileName);

      // Update database with image URL
      const { error: updateError } = await supabase
        .from('restaurants')
        .update({ image_url: imageUrl })
        .eq('id', restaurant.id);

      if (updateError) {
        console.error(`   ❌ Failed to update database for ${restaurant.name}:`, updateError);
        errorCount++;
      } else {
        console.log(`   ✅ Image fetched and saved for ${restaurant.name}`);
        successCount++;
      }

      // Delay to respect rate limits (200 requests/hour = ~18 seconds per request)
      if (i < restaurants.length - 1) {
        console.log('   ⏳ Waiting 3 seconds...\n');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (error) {
      console.error(`   ❌ Error processing ${restaurant.name}:`, error);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary:');
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📈 Total: ${restaurants.length}`);
  console.log('='.repeat(60));
}

/**
 * Main execution
 */
async function main() {
  console.log('🎨 DishWise Image Fetcher (Pexels)\n');
  console.log('📋 Configuration:');
  console.log(`   - Supabase URL: ${supabaseUrl}`);
  console.log(`   - Pexels API Key: ${process.env.PEXELS_API_KEY ? '✅ Set' : '❌ Missing'}`);
  console.log(`   - Image Source: Pexels (Free - 200 requests/hour)\n`);

  if (!process.env.PEXELS_API_KEY || process.env.PEXELS_API_KEY === 'YOUR_API_KEY_HERE') {
    console.error('❌ PEXELS_API_KEY is not set in environment variables');
    console.error('\n📝 To get a free Pexels API key:');
    console.error('   1. Go to https://www.pexels.com/api/');
    console.error('   2. Click "Get Started"');
    console.error('   3. Sign up for a free account');
    console.error('   4. Copy your API key');
    console.error('   5. Add to .env: PEXELS_API_KEY=your_key_here\n');
    process.exit(1);
  }

  console.log('🗄️  Checking Supabase Storage...');
  
  // Check if storage bucket exists
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
  
  if (bucketsError) {
    console.error('❌ Error checking storage buckets:', bucketsError);
    process.exit(1);
  }

  const bucketExists = buckets?.some(b => b.name === 'restaurant-images');
  
  if (!bucketExists) {
    console.log('⚠️  Storage bucket "restaurant-images" does not exist');
    console.log('   Creating bucket...');
    
    const { error: createError } = await supabase.storage.createBucket('restaurant-images', {
      public: true,
    });
    
    if (createError) {
      console.error('❌ Error creating storage bucket:', createError);
      process.exit(1);
    }
    
    console.log('✅ Storage bucket created');
  } else {
    console.log('✅ Storage bucket exists\n');
  }

  try {
    await generateRestaurantImages();
    console.log('\n🎉 All done! Images have been fetched and saved to the database.');
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run the script
main();

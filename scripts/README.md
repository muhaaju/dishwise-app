# DishWise Image Generation Scripts

This directory contains scripts for automatically fetching and uploading images for restaurants and menu items using the Pexels API.

## Prerequisites

1. **Pexels API Key** (Free)
   - Sign up at [https://www.pexels.com/api/](https://www.pexels.com/api/)
   - Get your free API key (200 requests/hour limit)
   - Add to `.env` file: `PEXELS_API_KEY=your_key_here`

2. **Supabase Configuration**
   - Ensure `NEXT_PUBLIC_SUPABASE_URL` is set in `.env`
   - Ensure `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set in `.env`

## Available Scripts

### 1. Generate Restaurant Images

Fetches high-quality restaurant/food images for all restaurants without images.

```bash
npm run generate:restaurants:pexels
```

**What it does:**
- Queries all restaurants in the database that don't have an `image_url`
- Searches Pexels for relevant images based on cuisine type
- Downloads and uploads images to Supabase Storage (`restaurant-images` bucket)
- Updates the database with the image URLs
- Respects Pexels rate limits (3 seconds between requests)

**Example Output:**
```
🏪 Fetching restaurants without images...
📸 Fetching images for 5 restaurants from Pexels...
⏱️  This will take approximately 1 minutes

[1/5] Fetching image for: Spice Garden
   🔍 Searching Pexels for: Indian food dish restaurant
   ✅ Found image by John Doe
   ✅ Image fetched and saved for Spice Garden
   ⏳ Waiting 3 seconds...

📊 Summary:
   ✅ Success: 5
   ❌ Errors: 0
   📈 Total: 5
```

### 2. Generate Menu Item Images

Fetches high-quality food images for all menu items without images.

```bash
npm run generate:menu-items:pexels
```

**What it does:**
- Queries all menu items in the database that don't have an `image_url`
- Searches Pexels for relevant images based on:
  - Menu item name
  - Restaurant's cuisine type
  - Vegetarian/non-vegetarian status
- Downloads and uploads images to Supabase Storage (`menu-item-images` bucket)
- Updates the database with the image URLs
- Respects Pexels rate limits (3 seconds between requests)

**Example Output:**
```
🍽️  Fetching menu items without images...
📸 Fetching images for 25 menu items from Pexels...
⏱️  This will take approximately 2 minutes

[1/25] Fetching image for: Butter Chicken (Spice Garden)
   🔍 Searching Pexels for: Indian Butter Chicken food
   ✅ Found image by Jane Smith
   ✅ Image fetched and saved for Butter Chicken
   ⏳ Waiting 3 seconds...

📊 Summary:
   ✅ Success: 24
   ❌ Errors: 1
   📈 Total: 25
```

## Storage Buckets

The scripts automatically create the following Supabase Storage buckets if they don't exist:

1. **restaurant-images** - Stores restaurant cover images
2. **menu-item-images** - Stores menu item food images

Both buckets are configured as **public** for easy access.

## Rate Limits

- **Pexels Free Tier**: 200 requests per hour
- **Script Delay**: 3 seconds between requests (~20 requests per minute)
- **Estimated Time**: 
  - 50 items = ~2.5 minutes
  - 100 items = ~5 minutes
  - 200 items = ~10 minutes

## Error Handling

The scripts include robust error handling:
- Continues processing even if individual items fail
- Logs detailed error messages for debugging
- Provides a summary of successes and failures
- Automatically retries failed uploads

## Best Practices

1. **Run during off-peak hours** to avoid hitting rate limits
2. **Monitor the output** for any errors or failed uploads
3. **Check image quality** in the database after completion
4. **Re-run scripts** if needed - they only process items without images

## Troubleshooting

### "PEXELS_API_KEY is not set"
- Ensure you've added `PEXELS_API_KEY=your_key_here` to your `.env` file
- Restart your terminal/IDE after adding the key

### "Rate limit exceeded"
- Wait for the rate limit to reset (1 hour)
- The script respects rate limits with 3-second delays

### "Failed to upload image"
- Check Supabase Storage permissions
- Ensure the storage buckets exist and are public
- Verify your Supabase credentials in `.env`

### "No images found for query"
- The search query might be too specific
- The script will log the error and continue with other items
- You can manually add images for failed items later

## Manual Image Upload

If you prefer to manually upload images:

1. Go to Supabase Dashboard → Storage
2. Select the appropriate bucket (`restaurant-images` or `menu-item-images`)
3. Upload your image
4. Copy the public URL
5. Update the database record with the image URL

## Image Specifications

### Restaurant Images
- **Orientation**: Landscape
- **Size**: Large (1280x853px typical)
- **Format**: JPEG
- **Quality**: High-quality food/restaurant photography

### Menu Item Images
- **Orientation**: Square
- **Size**: Medium (640x640px typical)
- **Format**: JPEG
- **Quality**: High-quality food photography

## Future Enhancements

Potential improvements for these scripts:
- [ ] Support for custom image search queries
- [ ] Batch processing with configurable batch sizes
- [ ] Image optimization and resizing
- [ ] Support for multiple image sources (Unsplash, Pixabay)
- [ ] Retry logic for failed uploads
- [ ] Progress bar for better UX
- [ ] Dry-run mode to preview changes

## Support

For issues or questions:
1. Check the error logs in the console output
2. Verify your environment variables
3. Review the Pexels API documentation
4. Check Supabase Storage permissions

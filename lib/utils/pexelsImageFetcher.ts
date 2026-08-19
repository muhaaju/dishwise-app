/**
 * Pexels Image Fetcher
 * Fetches high-quality food and restaurant images from Pexels
 * Free API with 200 requests/hour limit
 */

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
}

interface PexelsSearchResponse {
  photos: PexelsPhoto[];
  total_results: number;
  page: number;
  per_page: number;
}

// Pexels API key (free tier: 200 requests/hour)
// Get your free API key at: https://www.pexels.com/api/
const PEXELS_API_KEY = process.env.PEXELS_API_KEY || 'YOUR_API_KEY_HERE';

/**
 * Fetch a restaurant image from Pexels based on cuisine type
 */
export async function fetchRestaurantImageFromPexels(
  restaurantName: string,
  cuisineType: string
): Promise<Buffer> {
  try {
    // Build search query based on cuisine type
    const searchQuery = `${cuisineType} food dish restaurant`;
    
    console.log(`   🔍 Searching Pexels for: ${searchQuery}`);
    
    // Pexels API endpoint
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=1&orientation=landscape`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': PEXELS_API_KEY,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status} ${response.statusText}`);
    }
    
    const data: PexelsSearchResponse = await response.json();
    
    if (!data.photos || data.photos.length === 0) {
      throw new Error(`No images found for query: ${searchQuery}`);
    }
    
    // Get the first photo's large URL
    const photo = data.photos[0];
    const imageUrl = photo.src.large;
    
    console.log(`   ✅ Found image by ${photo.photographer}`);
    
    // Download the image
    const imageResponse = await fetch(imageUrl);
    
    if (!imageResponse.ok) {
      throw new Error(`Failed to download image: ${imageResponse.status}`);
    }
    
    const arrayBuffer = await imageResponse.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error('Error fetching restaurant image from Pexels:', error);
    throw error;
  }
}

/**
 * Fetch a menu item image from Pexels
 */
export async function fetchMenuItemImageFromPexels(
  itemName: string,
  cuisineType: string,
  isVegetarian: boolean = false
): Promise<Buffer> {
  try {
    // Build search query
    const vegLabel = isVegetarian ? 'vegetarian' : '';
    const searchQuery = `${cuisineType} ${itemName} ${vegLabel} food`.trim();
    
    console.log(`   🔍 Searching Pexels for: ${searchQuery}`);
    
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=1&orientation=square`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': PEXELS_API_KEY,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status} ${response.statusText}`);
    }
    
    const data: PexelsSearchResponse = await response.json();
    
    if (!data.photos || data.photos.length === 0) {
      throw new Error(`No images found for query: ${searchQuery}`);
    }
    
    // Get the first photo's medium URL
    const photo = data.photos[0];
    const imageUrl = photo.src.medium;
    
    console.log(`   ✅ Found image by ${photo.photographer}`);
    
    // Download the image
    const imageResponse = await fetch(imageUrl);
    
    if (!imageResponse.ok) {
      throw new Error(`Failed to download image: ${imageResponse.status}`);
    }
    
    const arrayBuffer = await imageResponse.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error('Error fetching menu item image from Pexels:', error);
    throw error;
  }
}

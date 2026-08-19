/**
 * Utility functions for calculations, formatting, and validation
 */

// Currency formatting
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Calculate savings between direct and aggregator prices
export function calculateSavings(
  directPrice: number,
  aggregatorPrice: number
): number {
  return Math.max(0, aggregatorPrice - directPrice);
}

// Calculate total savings for cart items
export function calculateCartSavings(items: any[]): number {
  return items.reduce((total, item) => {
    const aggregatorPrice = item.swiggy_price || item.zomato_price || item.price;
    const savings = calculateSavings(item.price, aggregatorPrice);
    return total + savings * item.quantity;
  }, 0);
}

// Get spice level emoji
export function getSpiceLevelEmoji(level: string): string {
  const emojis: Record<string, string> = {
    mild: '🟢',
    medium: '🟡',
    hot: '🔴',
    'extra-hot': '🔥',
  };
  return emojis[level.toLowerCase()] || '';
}

// Calculate percentage savings
export function calculateSavingsPercentage(
  directPrice: number,
  aggregatorPrice: number
): number {
  if (aggregatorPrice === 0) return 0;
  const savings = calculateSavings(directPrice, aggregatorPrice);
  return Math.round((savings / aggregatorPrice) * 100);
}

// Format date and time
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(d);
}

// Format time only
export function formatTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-IN', {
    timeStyle: 'short',
  }).format(d);
}

// Calculate pickup time (30 mins to 3 hours from now)
export function calculatePickupTime(minutesFromNow: number): Date {
  return new Date(Date.now() + minutesFromNow * 60000);
}

// Generate order number
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `DW${timestamp}${random}`;
}

// Validate phone number (Indian format)
export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
}

// Validate email
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Calculate delivery fee (for future use)
export function calculateDeliveryFee(distance: number): number {
  // Base fee + per km charge
  const baseFee = 20;
  const perKmCharge = 8;
  return baseFee + Math.ceil(distance) * perKmCharge;
}

// Calculate platform fee (for future use)
export function calculatePlatformFee(subtotal: number): number {
  // 2% platform fee with minimum ₹5
  return Math.max(5, Math.round(subtotal * 0.02));
}

// Calculate GST (for future use)
export function calculateGST(amount: number, rate: number = 5): number {
  return Math.round((amount * rate) / 100);
}

// Format distance
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
}

// Calculate estimated time
export function calculateEstimatedTime(distance: number): number {
  // Assume 30 km/h average speed + 5 min prep time
  const prepTime = 5;
  const travelTime = (distance / 1000 / 30) * 60;
  return Math.ceil(prepTime + travelTime);
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

// Slugify text for URLs
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Parse slug to title
export function parseSlug(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Get relative time (e.g., "2 hours ago")
export function getRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return formatDate(d);
}

// Check if restaurant is open
export function isRestaurantOpen(
  openTime: string,
  closeTime: string
): boolean {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const [openHour, openMin] = openTime.split(':').map(Number);
  const [closeHour, closeMin] = closeTime.split(':').map(Number);

  const openMinutes = openHour * 60 + openMin;
  const closeMinutes = closeHour * 60 + closeMin;

  if (closeMinutes < openMinutes) {
    // Crosses midnight
    return currentTime >= openMinutes || currentTime <= closeMinutes;
  }

  return currentTime >= openMinutes && currentTime <= closeMinutes;
}

// Get order status color
export function getOrderStatusColor(status: string): string {
  const colors: Record<string, string> = {
    placed: 'text-blue-600 bg-blue-50',
    confirmed: 'text-green-600 bg-green-50',
    preparing: 'text-yellow-600 bg-yellow-50',
    ready: 'text-purple-600 bg-purple-50',
    completed: 'text-gray-600 bg-gray-50',
    cancelled: 'text-red-600 bg-red-50',
  };
  return colors[status] || 'text-gray-600 bg-gray-50';
}

// Get order status label
export function getOrderStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    placed: 'Order Placed',
    confirmed: 'Confirmed',
    preparing: 'Preparing',
    ready: 'Ready for Pickup',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };
  return labels[status] || status;
}
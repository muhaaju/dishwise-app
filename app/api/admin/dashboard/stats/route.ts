import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    // Create Supabase client
    const supabase = await createClient();

    // Get today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayISO = today.toISOString();

    // Fetch all orders
    const { data: allOrders, error: ordersError } = await supabase
      .from('orders')
      .select('*');

    if (ordersError) {
      throw ordersError;
    }

    // Fetch active restaurants
    const { data: restaurants, error: restaurantsError } = await supabase
      .from('restaurants')
      .select('id')
      .eq('is_active', true);

    if (restaurantsError) {
      throw restaurantsError;
    }

    // Fetch menu items
    const { data: menuItems, error: menuError } = await supabase
      .from('menu_items')
      .select('id')
      .eq('is_available', true);

    if (menuError) {
      throw menuError;
    }

    // Calculate stats
    const totalOrders = allOrders?.length || 0;
    const todayOrders = allOrders?.filter(order => 
      new Date(order.placed_at) >= today
    ).length || 0;

    const totalRevenue = allOrders?.reduce((sum, order) => 
      sum + (order.total_amount || 0), 0
    ) || 0;

    const todayRevenue = allOrders?.filter(order => 
      new Date(order.placed_at) >= today
    ).reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;

    const pendingOrders = allOrders?.filter(order => 
      ['placed', 'confirmed', 'preparing'].includes(order.status)
    ).length || 0;

    const completedOrders = allOrders?.filter(order => 
      order.status === 'completed'
    ).length || 0;

    return NextResponse.json({
      success: true,
      data: {
        totalOrders,
        todayOrders,
        totalRevenue,
        todayRevenue,
        activeRestaurants: restaurants?.length || 0,
        totalMenuItems: menuItems?.length || 0,
        pendingOrders,
        completedOrders,
      },
    });
  } catch (error: any) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message || 'Failed to fetch dashboard stats',
        },
      },
      { status: 500 }
    );
  }
}

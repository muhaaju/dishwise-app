import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET all menu items
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const { data: menuItems, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: menuItems || [],
    });
  } catch (error: any) {
    console.error('Fetch menu items error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message || 'Failed to fetch menu items',
        },
      },
      { status: 500 }
    );
  }
}

// POST create new menu item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      restaurant_id,
      name,
      description,
      category,
      in_shop_price,
      swiggy_price,
      zomato_price,
      is_vegetarian,
      spice_level,
      image_url,
      is_available,
    } = body;

    // Validate required fields
    if (!restaurant_id || !name || !in_shop_price) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Restaurant ID, name, and in-shop price are required',
          },
        },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Insert menu item
    const { data: menuItem, error } = await supabase
      .from('menu_items')
      .insert({
        restaurant_id,
        name,
        description: description || null,
        category: category || null,
        in_shop_price,
        swiggy_price: swiggy_price || null,
        zomato_price: zomato_price || null,
        is_vegetarian: is_vegetarian !== undefined ? is_vegetarian : true,
        spice_level: spice_level || null,
        image_url: image_url || null,
        is_available: is_available !== undefined ? is_available : true,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: menuItem,
    });
  } catch (error: any) {
    console.error('Create menu item error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message || 'Failed to create menu item',
        },
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET all restaurants
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const { data: restaurants, error } = await supabase
      .from('restaurants')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: restaurants || [],
    });
  } catch (error: any) {
    console.error('Fetch restaurants error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message || 'Failed to fetch restaurants',
        },
      },
      { status: 500 }
    );
  }
}

// POST create new restaurant
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      description,
      address,
      phone,
      email,
      cuisine_type,
      image_url,
      opening_time,
      closing_time,
      is_active,
    } = body;

    // Validate required fields
    if (!name || !slug) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Name and slug are required',
          },
        },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check if slug already exists
    const { data: existing } = await supabase
      .from('restaurants')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DUPLICATE_SLUG',
            message: 'A restaurant with this slug already exists',
          },
        },
        { status: 400 }
      );
    }

    // Insert restaurant
    const { data: restaurant, error } = await supabase
      .from('restaurants')
      .insert({
        name,
        slug,
        description: description || null,
        address: address || null,
        phone: phone || null,
        email: email || null,
        cuisine_type: cuisine_type || null,
        image_url: image_url || null,
        opening_time: opening_time || '09:00',
        closing_time: closing_time || '22:00',
        is_active: is_active !== undefined ? is_active : true,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: restaurant,
    });
  } catch (error: any) {
    console.error('Create restaurant error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message || 'Failed to create restaurant',
        },
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const phone = searchParams.get('phone');

    // Validate phone parameter
    if (!phone) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Phone number is required',
          },
        },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = await createClient();

    // Fetch orders for this phone number
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_phone', phone)
      .order('placed_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DATABASE_ERROR',
            message: 'Failed to fetch orders',
            details: error,
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: orders || [],
    });
  } catch (error: any) {
    console.error('Order tracking error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message || 'Failed to track orders',
        },
      },
      { status: 500 }
    );
  }
}

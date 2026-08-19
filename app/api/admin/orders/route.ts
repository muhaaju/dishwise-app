import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .order('placed_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: orders || [],
    });
  } catch (error: any) {
    console.error('Fetch orders error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message || 'Failed to fetch orders',
        },
      },
      { status: 500 }
    );
  }
}

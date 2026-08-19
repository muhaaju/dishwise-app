import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Missing payment details',
          },
        },
        { status: 400 }
      );
    }

    // Verify signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_SIGNATURE',
            message: 'Payment verification failed',
          },
        },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = await createClient();

    // Update order with payment details
    const { data: order, error: updateError } = await supabase
      .from('orders')
      .update({
        payment_status: 'paid',
        payment_method: 'razorpay',
        razorpay_payment_id,
        razorpay_signature,
        status: 'confirmed',
        confirmed_at: new Date().toISOString(),
      })
      .eq('razorpay_order_id', razorpay_order_id)
      .select()
      .single();

    if (updateError) {
      console.error('Database update error:', updateError);
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DATABASE_ERROR',
            message: 'Failed to update order',
            details: updateError,
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        verified: true,
        order,
      },
    });
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message || 'Payment verification failed',
        },
      },
      { status: 500 }
    );
  }
}

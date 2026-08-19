import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateOrderNumber } from '@/lib/utils/calculations';
import Razorpay from 'razorpay';

// Lazy initialize Razorpay to avoid build-time errors
function getRazorpayInstance() {
  return new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customer_name,
      customer_phone,
      customer_email,
      restaurant_id,
      items,
      subtotal,
      total_amount,
      pickup_time,
      savings_amount,
    } = body;

    // Validate required fields
    if (!customer_name || !customer_phone || !restaurant_id || !items || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Missing required fields',
          },
        },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = await createClient();

    // Generate order number
    const orderNumber = generateOrderNumber();

    // Create Razorpay order
    const razorpay = getRazorpayInstance();
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(total_amount * 100), // Convert to paise
      currency: 'INR',
      receipt: orderNumber,
      notes: {
        customer_name,
        customer_phone,
        restaurant_id,
      },
    });

    // Insert order into database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_name,
        customer_phone,
        customer_email: customer_email || null,
        restaurant_id,
        items,
        subtotal,
        total_amount,
        fulfillment_type: 'pickup',
        pickup_time: pickup_time || null,
        aggregator_comparison_total: subtotal + (savings_amount || 0),
        savings_amount: savings_amount || 0,
        payment_status: 'pending',
        razorpay_order_id: razorpayOrder.id,
        status: 'placed',
        placed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (orderError) {
      console.error('Database error:', orderError);
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DATABASE_ERROR',
            message: 'Failed to create order',
            details: orderError,
          },
        },
        { status: 500 }
      );
    }

    // Return order details and Razorpay order ID
    return NextResponse.json({
      success: true,
      data: {
        order,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message || 'Failed to create order',
        },
      },
      { status: 500 }
    );
  }
}

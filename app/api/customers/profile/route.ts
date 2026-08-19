import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET - Fetch customer profile
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch customer profile
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select('*')
      .eq('auth_user_id', user.id)
      .single();

    if (customerError && customerError.code !== 'PGRST116') {
      // PGRST116 is "not found" error, which is ok for new users
      throw customerError;
    }

    return NextResponse.json({
      success: true,
      data: customer || null,
    });
  } catch (error) {
    console.error('Error fetching customer profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customer profile' },
      { status: 500 }
    );
  }
}

// POST - Create or update customer profile
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { full_name, phone, default_address } = body;

    // Check if customer profile exists
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id')
      .eq('auth_user_id', user.id)
      .single();

    let result;

    if (existingCustomer) {
      // Update existing profile
      const { data, error } = await supabase
        .from('customers')
        .update({
          full_name,
          phone,
          default_address,
          updated_at: new Date().toISOString(),
        })
        .eq('auth_user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Create new profile
      const { data, error } = await supabase
        .from('customers')
        .insert({
          auth_user_id: user.id,
          email: user.email,
          full_name,
          phone,
          default_address,
        })
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error saving customer profile:', error);
    return NextResponse.json(
      { error: 'Failed to save customer profile' },
      { status: 500 }
    );
  }
}

// PATCH - Update specific fields
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Only update provided fields
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (body.full_name !== undefined) updateData.full_name = body.full_name;
    if (body.phone !== undefined) updateData.phone = body.phone;
    if (body.default_address !== undefined) updateData.default_address = body.default_address;

    const { data, error } = await supabase
      .from('customers')
      .update(updateData)
      .eq('auth_user_id', user.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Error updating customer profile:', error);
    return NextResponse.json(
      { error: 'Failed to update customer profile' },
      { status: 500 }
    );
  }
}

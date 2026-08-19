import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Email and password are required',
          },
        },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = await createClient();

    // Authenticate with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password',
          },
        },
        { status: 401 }
      );
    }

    // Check if user is an admin
    const { data: admin, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('auth_user_id', authData.user.id)
      .eq('is_active', true)
      .single();

    if (adminError || !admin) {
      // Sign out the user since they're not an admin
      await supabase.auth.signOut();
      
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'You do not have admin access',
          },
        },
        { status: 403 }
      );
    }

    // Update last login
    await supabase
      .from('admin_users')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', admin.id);

    // Return admin session
    return NextResponse.json({
      success: true,
      data: {
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        },
        session: {
          access_token: authData.session?.access_token,
          refresh_token: authData.session?.refresh_token,
        },
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message || 'Login failed',
        },
      },
      { status: 500 }
    );
  }
}
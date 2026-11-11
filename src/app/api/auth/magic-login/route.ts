import { NextResponse } from 'next/server';
import { query } from '@/lib/neondatabase/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Magic link token is required' },
        { status: 400 }
      );
    }

    // Find user with valid magic link token
    const result = await query(
      `SELECT id, email, username, country, currency, user_type, is_admin, is_premium, token_balance, magic_link_expires_at
       FROM premium_users 
       WHERE magic_link_token = $1`,
      [token]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired magic link' },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    // Check if token is expired
    const expiresAt = new Date(user.magic_link_expires_at);
    if (expiresAt < new Date()) {
      return NextResponse.json(
        { success: false, error: 'Magic link has expired. Please request a new one.' },
        { status: 401 }
      );
    }

    // Clear the used magic link
    await query(
      `UPDATE premium_users 
       SET magic_link_token = NULL, magic_link_expires_at = NULL, last_login = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
       WHERE id = $1`,
      [user.id]
    );

    // Log login activity
    await query(
      `INSERT INTO player_activity (user_id, ip_address, action, details, risk_score)
       VALUES ($1, $2, $3, $4, $5)`,
      [user.id, request.headers.get('x-forwarded-for') || 'unknown', 'magic_link_login',
       JSON.stringify({ email: user.email, user_type: user.user_type }), 0]
    );

    // Return success with user data and redirect instruction
    return NextResponse.json({
      success: true,
      message: 'Magic link verified. You are logged in.',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        country: user.country,
        currency: user.currency,
        userType: user.user_type,
        isAdmin: user.is_admin,
        isPremium: user.is_premium,
        tokenBalance: user.token_balance,
      },
      redirectTo: '/',
    });
  } catch (error: any) {
    console.error('Magic login error:', error);
    return NextResponse.json(
      { success: false, error: 'Magic link verification failed. Please try again.' },
      { status: 500 }
    );
  }
}

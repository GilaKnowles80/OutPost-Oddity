import { NextResponse } from 'next/server';
import { query } from '@/lib/neondatabase/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const result = await query(
      'SELECT id, email, password_hash, username, country, currency, user_type, is_admin, is_premium, token_balance, last_login FROM premium_users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    // Verify password
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      // Log failed login attempt
      await query(
        `INSERT INTO player_activity (user_id, ip_address, action, details, risk_score, flagged)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [user.id, request.headers.get('x-forwarded-for') || 'unknown', 'failed_login',
         JSON.stringify({ email }), 30, true]
      );

      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate session token
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const sessionExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    // Update last login
    await query(
      `UPDATE premium_users SET last_login = CURRENT_TIMESTAMP WHERE id = $1`,
      [user.id]
    );

    // Log successful login
    await query(
      `INSERT INTO player_activity (user_id, ip_address, action, details, risk_score)
       VALUES ($1, $2, $3, $4, $5)`,
      [user.id, request.headers.get('x-forwarded-for') || 'unknown', 'login',
       JSON.stringify({ email, username: user.username }), 0]
    );

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
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
      sessionToken,
      sessionExpires,
    });

    // Set secure HTTP-only cookie
    response.cookies.set('session_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Login failed. Please try again.' },
      { status: 500 }
    );
  }
}
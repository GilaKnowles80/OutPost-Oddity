import { NextResponse } from 'next/server';
import { query } from '@/lib/neondatabase/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10);
const ADMIN_REGISTRATION_CODE = process.env.ADMIN_REGISTRATION_CODE || 'OUTPOST_ADMIN_2026';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, username, country = 'US', currency = 'USD', user_type = 'free_with_ads', admin_code } = body;

    // Validate input
    if (!email || !password || !username) {
      return NextResponse.json(
        { success: false, error: 'Email, password, and username are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Password strength validation
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Validate user_type
    const validTypes = ['admin', 'free_with_ads', 'premium'];
    if (!validTypes.includes(user_type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid user type' },
        { status: 400 }
      );
    }

    // Admin registration requires a secret code
    let isAdmin = false;
    let resolvedUserType = user_type;
    if (user_type === 'admin') {
      if (!admin_code || admin_code !== ADMIN_REGISTRATION_CODE) {
        return NextResponse.json(
          { success: false, error: 'Invalid admin registration code' },
          { status: 403 }
        );
      }
      isAdmin = true;
      resolvedUserType = 'admin';
    }

    // Check if user already exists
    const existingUser = await query(
      'SELECT id FROM premium_users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { success: false, error: 'User already exists with this email' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user
    const isPremium = resolvedUserType === 'premium';
    const result = await query(
      `INSERT INTO premium_users (email, password_hash, username, country, currency, user_type, is_admin, is_premium, token_balance)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 0)
       RETURNING id, email, username, country, currency, user_type, is_admin, is_premium, created_at`,
      [email.toLowerCase(), passwordHash, username, country.toUpperCase(), currency.toUpperCase(), resolvedUserType, isAdmin, isPremium]
    );

    const user = result.rows[0];

    // Log registration activity
    await query(
      `INSERT INTO player_activity (user_id, ip_address, action, details, risk_score)
       VALUES ($1, $2, $3, $4, $5)`,
      [user.id, request.headers.get('x-forwarded-for') || 'unknown', 'registration', 
       JSON.stringify({ email, username, country, currency, user_type: resolvedUserType, isAdmin }), 0]
    );

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        country: user.country,
        currency: user.currency,
        userType: user.user_type,
        isAdmin: user.is_admin,
        isPremium: user.is_premium,
      },
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}

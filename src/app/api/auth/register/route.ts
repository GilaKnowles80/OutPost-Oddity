import { NextResponse } from 'next/server';
import { query } from '@/lib/neondatabase/server';
import crypto from 'crypto';

const ADMIN_REGISTRATION_CODE = process.env.ADMIN_REGISTRATION_CODE || 'OUTPOST_ADMIN_2026';
const MAGIC_LINK_EXPIRY_MINUTES = 15;

function generateMagicLinkToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

function generateMagicLinkUrl(token: string): string {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  return `${baseUrl}/api/auth/magic-login?token=${token}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, username, country = 'US', currency = 'USD', user_type = 'free_with_ads', admin_code } = body;

    // Validate input
    if (!email || !username) {
      return NextResponse.json(
        { success: false, error: 'Email and username are required' },
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

    const magicLinkToken = generateMagicLinkToken();
    const magicLinkExpiresAt = new Date(Date.now() + MAGIC_LINK_EXPIRY_MINUTES * 60 * 1000).toISOString();
    const magicLinkUrl = generateMagicLinkUrl(magicLinkToken);

    const isPremium = resolvedUserType === 'premium';

    if (existingUser.rows.length > 0) {
      // User exists — update magic link and return it
      const user = existingUser.rows[0];
      await query(
        `UPDATE premium_users 
         SET magic_link_token = $1, magic_link_expires_at = $2, updated_at = CURRENT_TIMESTAMP
         WHERE id = $3`,
        [magicLinkToken, magicLinkExpiresAt, user.id]
      );
      return NextResponse.json({
        success: true,
        message: 'Magic link generated. Check your email.',
        magicLinkUrl,
        magicLinkToken,
        expiresAt: magicLinkExpiresAt,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          userType: user.user_type,
          isAdmin: user.is_admin,
          isPremium: user.is_premium,
        },
      });
    }

    // Create new user with magic link (no password)
    const result = await query(
      `INSERT INTO premium_users (email, username, country, currency, user_type, is_admin, is_premium, token_balance, magic_link_token, magic_link_expires_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 0, $8, $9)
       RETURNING id, email, username, country, currency, user_type, is_admin, is_premium, created_at`,
      [email.toLowerCase(), username, country.toUpperCase(), currency.toUpperCase(), resolvedUserType, isAdmin, isPremium, magicLinkToken, magicLinkExpiresAt]
    );

    const user = result.rows[0];

    // Log registration activity
    await query(
      `INSERT INTO player_activity (user_id, ip_address, action, details, risk_score)
       VALUES ($1, $2, $3, $4, $5)`,
      [user.id, request.headers.get('x-forwarded-for') || 'unknown', 'registration',
       JSON.stringify({ email, username, country, currency, user_type: resolvedUserType, isAdmin, magicLinkUrl }), 0]
    );

    return NextResponse.json({
      success: true,
      message: 'Account created. Magic link generated. Check your email.',
      magicLinkUrl,
      magicLinkToken,
      expiresAt: magicLinkExpiresAt,
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

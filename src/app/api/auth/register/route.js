import { NextResponse } from 'next/server';
import { query } from '@/lib/neondatabase/server';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;
const ADMIN_REGISTRATION_CODE = process.env.ADMIN_REGISTRATION_CODE || 'OUTPOST_ADMIN_2026';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, username, country = 'US', currency = 'USD', user_type = 'free_with_ads', admin_code } = body;

    if (!email || !password || !username) {
      return NextResponse.json({ success: false, error: 'Email, password, and username are required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email format' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ success: false, error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const validTypes = ['admin', 'free_with_ads', 'premium'];
    if (!validTypes.includes(user_type)) {
      return NextResponse.json({ success: false, error: 'Invalid user type' }, { status: 400 });
    }

    // Safety migration for production DB
    try {
      await query(`DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='premium_users' AND column_name='user_type') THEN ALTER TABLE premium_users ADD COLUMN user_type VARCHAR(20) NOT NULL DEFAULT 'free_with_ads';
          END IF;
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='premium_users' AND column_name='is_admin') THEN ALTER TABLE premium_users ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;
          END IF;
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='premium_users' AND column_name='is_premium') THEN ALTER TABLE premium_users ADD COLUMN is_premium BOOLEAN DEFAULT FALSE;
          END IF;
          IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='premium_users' AND column_name='password_hash') THEN
            ALTER TABLE premium_users ALTER COLUMN password_hash DROP NOT NULL;
          END IF;
        END $$;`);
    } catch (migErr) { console.error('Migration warning:', migErr); }

    const existing = await query('SELECT id FROM premium_users WHERE email = $1', [email.toLowerCase()]);
    if (existing.rows.length > 0) {
      return NextResponse.json({ success: false, error: 'Email already registered' }, { status: 409 });
    }

    let isAdmin = false;
    if (user_type === 'admin') {
      if (!admin_code || admin_code !== ADMIN_REGISTRATION_CODE) {
        return NextResponse.json({ success: false, error: 'Invalid admin staff code' }, { status: 403 });
      }
      isAdmin = true;
    }

    const isPremium = user_type === 'premium';
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await query(
      `INSERT INTO premium_users (email, password_hash, username, country, currency, user_type, is_admin, is_premium, token_balance)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,0)
       RETURNING id,email,username,country,currency,user_type,is_admin,is_premium,created_at`,
      [email.toLowerCase(), passwordHash, username, country.toUpperCase(), currency.toUpperCase(), user_type, isAdmin, isPremium]
    );

    const user = result.rows[0];
    await query(`INSERT INTO player_activity (user_id, ip_address, action, details, risk_score) VALUES ($1,$2,$3,$4,$5)`,
      [user.id, request.headers.get('x-forwarded-for') || 'unknown', 'registration', JSON.stringify({ email, username, user_type, isAdmin }), 0]);

    return NextResponse.json({ success: true, message: 'Account created', user: { id: user.id, email: user.email, username: user.username, userType: user.user_type, isAdmin: user.is_admin, isPremium: user.is_premium } });
  } catch (error: any) {
    console.error('Register error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Registration failed' }, { status: 500 });
  }
}

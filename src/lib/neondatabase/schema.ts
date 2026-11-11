import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

// Premium users table - stores registration credentials and subscription status
export const PREMIUM_USERS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS premium_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) NOT NULL,
    country VARCHAR(2) NOT NULL DEFAULT 'US',
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    user_type VARCHAR(20) NOT NULL DEFAULT 'free_with_ads', -- 'admin', 'free_with_ads', 'premium'
    is_admin BOOLEAN DEFAULT FALSE,
    is_premium BOOLEAN DEFAULT FALSE,
    magic_link_token VARCHAR(255),
    magic_link_expires_at TIMESTAMP WITH TIME ZONE,
    premium_expires_at TIMESTAMP WITH TIME ZONE,
    token_balance INT DEFAULT 0,
    total_tokens_purchased INT DEFAULT 0,
    total_spent DECIMAL(10,2) DEFAULT 0,
    paypal_subscription_id VARCHAR(255),
    subscription_plan_id VARCHAR(255),
    subscription_plan_type VARCHAR(20) DEFAULT 'monthly', -- 'monthly' or 'yearly'
    subscription_status VARCHAR(50) DEFAULT 'inactive', -- 'active', 'cancelled', 'expired', 'suspended'
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;

// Token transactions table - tracks all token purchases and usage
export const TOKEN_TRANSACTIONS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS token_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES premium_users(id) ON DELETE CASCADE,
    transaction_type VARCHAR(50) NOT NULL, -- 'purchase', 'earned', 'spent', 'refund'
    amount INT NOT NULL,
    currency VARCHAR(3) NOT NULL,
    usd_amount DECIMAL(10,2),
    paypal_transaction_id VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;

// Player activity table - monitors player actions for security
export const PLAYER_ACTIVITY_SCHEMA = `
  CREATE TABLE IF NOT EXISTS player_activity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES premium_users(id) ON DELETE SET NULL,
    ip_address INET NOT NULL,
    user_agent TEXT,
    action VARCHAR(100) NOT NULL, -- 'login', 'logout', 'purchase', 'level_complete', 'token_spend'
    details JSONB DEFAULT '{}',
    risk_score INT DEFAULT 0, -- 0-100, higher = more suspicious
    flagged BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;

// Admin audit log - tracks admin actions for accountability
export const ADMIN_AUDIT_LOG_SCHEMA = `
  CREATE TABLE IF NOT EXISTS admin_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES premium_users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    target_user_id UUID REFERENCES premium_users(id) ON DELETE SET NULL,
    details JSONB DEFAULT '{}',
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;

// Indexes for performance and security monitoring
export const SECURITY_INDEXES_SCHEMA = `
  CREATE INDEX IF NOT EXISTS idx_player_activity_user_id ON player_activity(user_id);
  CREATE INDEX IF NOT EXISTS idx_player_activity_created_at ON player_activity(created_at);
  CREATE INDEX IF NOT EXISTS idx_player_activity_flagged ON player_activity(flagged);
  CREATE INDEX IF NOT EXISTS idx_token_transactions_user_id ON token_transactions(user_id);
  CREATE INDEX IF NOT EXISTS idx_token_transactions_status ON token_transactions(status);
  CREATE INDEX IF NOT EXISTS idx_premium_users_email ON premium_users(email);
  CREATE INDEX IF NOT EXISTS idx_premium_users_magic_link_token ON premium_users(magic_link_token);
  CREATE INDEX IF NOT EXISTS idx_premium_users_is_premium ON premium_users(is_premium);
  CREATE INDEX IF NOT EXISTS idx_premium_users_paypal_subscription_id ON premium_users(paypal_subscription_id);
  CREATE INDEX IF NOT EXISTS idx_premium_users_subscription_status ON premium_users(subscription_status);
`;

export async function initializeDatabase(pool: Pool) {
  const client = await pool.connect();
  try {
    await client.query(PREMIUM_USERS_SCHEMA);
    await client.query(TOKEN_TRANSACTIONS_SCHEMA);
    await client.query(PLAYER_ACTIVITY_SCHEMA);
    await client.query(ADMIN_AUDIT_LOG_SCHEMA);
    await client.query(SECURITY_INDEXES_SCHEMA);

    // Migrate existing tables: add magic link columns and make password nullable if they don't exist
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'premium_users' AND column_name = 'magic_link_token') THEN
          ALTER TABLE premium_users ADD COLUMN magic_link_token VARCHAR(255);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'premium_users' AND column_name = 'magic_link_expires_at') THEN
          ALTER TABLE premium_users ADD COLUMN magic_link_expires_at TIMESTAMP WITH TIME ZONE;
        END IF;
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'premium_users' AND column_name = 'password_hash') THEN
          ALTER TABLE premium_users ALTER COLUMN password_hash DROP NOT NULL;
        END IF;
      END $$;
    `);

    console.log('✅ Database schema initialized successfully');
  } catch (error) {
    console.error('❌ Database schema initialization failed:', error);
    throw error;
  } finally {
    client.release();
  }
}
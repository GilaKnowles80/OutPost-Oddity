import { NextResponse } from 'next/server';
import { query } from '@/lib/neondatabase/server';

const PAYPAL_API = process.env.PAYPAL_ENVIRONMENT === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

async function getPayPalAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET_KEY}`
  ).toString('base64');

  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event_type, resource } = body;

    // Verify webhook signature (simplified - in production, verify PayPal headers)
    const webhookId = process.env.PAYPAL_WEBHOOK_ID;

    if (!webhookId) {
      console.error('PayPal webhook ID not configured');
      return NextResponse.json({ success: false }, { status: 500 });
    }

    const subscriptionId = resource.id;

    // Handle different subscription webhook events
    if (event_type === 'BILLING.SUBSCRIPTION.ACTIVATED') {
      // Subscription activated - grant premium status
      await query(
        `UPDATE premium_users 
         SET is_premium = TRUE,
             subscription_status = 'active',
             premium_expires_at = CURRENT_TIMESTAMP + INTERVAL '1 year',
             updated_at = CURRENT_TIMESTAMP
         WHERE paypal_subscription_id = $1`,
        [subscriptionId]
      );

      // Record subscription activation
      await query(
        `INSERT INTO token_transactions (user_id, transaction_type, amount, currency, usd_amount, paypal_transaction_id, status, description)
         SELECT id, 'subscription', 0, currency, 0, $1, 'completed', 'PayPal subscription activated'
         FROM premium_users WHERE paypal_subscription_id = $1`,
        [subscriptionId]
      );
    }

    if (event_type === 'BILLING.SUBSCRIPTION.CANCELLED') {
      // Subscription cancelled
      await query(
        `UPDATE premium_users 
         SET subscription_status = 'cancelled',
             is_premium = FALSE,
             updated_at = CURRENT_TIMESTAMP
         WHERE paypal_subscription_id = $1`,
        [subscriptionId]
      );
    }

    if (event_type === 'BILLING.SUBSCRIPTION.EXPIRED') {
      // Subscription expired
      await query(
        `UPDATE premium_users 
         SET subscription_status = 'expired',
             is_premium = FALSE,
             premium_expires_at = CURRENT_TIMESTAMP,
             updated_at = CURRENT_TIMESTAMP
         WHERE paypal_subscription_id = $1`,
        [subscriptionId]
      );
    }

    if (event_type === 'BILLING.SUBSCRIPTION.SUSPENDED') {
      // Subscription suspended (e.g., payment failure)
      await query(
        `UPDATE premium_users 
         SET subscription_status = 'suspended',
             updated_at = CURRENT_TIMESTAMP
         WHERE paypal_subscription_id = $1`,
        [subscriptionId]
      );
    }

    if (event_type === 'BILLING.SUBSCRIPTION.PAYMENT.FAILED') {
      // Payment failed for a subscription cycle
      await query(
        `UPDATE premium_users 
         SET subscription_status = 'suspended',
             updated_at = CURRENT_TIMESTAMP
         WHERE paypal_subscription_id = $1`,
        [subscriptionId]
      );
    }

    if (event_type === 'BILLING.SUBSCRIPTION.PAYMENT.SUCCESS') {
      // Successful recurring payment - could grant tokens or extend premium
      const customId = resource.custom_id; // userId if set
      const amount = parseFloat(resource.amount?.value || '0');
      const currency = resource.amount?.currency_code || 'USD';
      const tokensPerUnit = currency === 'EUR' ? 10 : 10;
      const tokensEarned = Math.floor(amount * tokensPerUnit);

      if (customId) {
        await query(
          `UPDATE premium_users 
           SET token_balance = token_balance + $1,
               total_tokens_purchased = total_tokens_purchased + $1,
               total_spent = total_spent + $2,
               is_premium = TRUE,
               premium_expires_at = CURRENT_TIMESTAMP + INTERVAL '1 year',
               updated_at = CURRENT_TIMESTAMP
           WHERE id = $3`,
          [tokensEarned, amount, customId]
        );

        await query(
          `INSERT INTO token_transactions (user_id, transaction_type, amount, currency, usd_amount, paypal_transaction_id, status, description)
           VALUES ($1, 'subscription_payment', $2, $3, $4, $5, 'completed', $6)`,
          [customId, tokensEarned, currency, amount, subscriptionId, `Recurring subscription payment: ${tokensEarned} Space Tokens for ${amount} ${currency}`]
        );
      }
    }

    return NextResponse.json({ success: true, received: true });
  } catch (error: any) {
    console.error('Subscription webhook error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
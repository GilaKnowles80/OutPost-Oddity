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

    // Handle different webhook events
    if (event_type === 'PAYMENT.CAPTURE.COMPLETED') {
      const transactionId = resource.id;
      const customId = resource.custom_id; // userId
      const amount = parseFloat(resource.amount?.value || '0');
      const currency = resource.amount?.currency_code || 'USD';

      if (customId) {
        const tokensPerUnit = currency === 'EUR' ? 10 : 10;
        const tokensEarned = Math.floor(amount * tokensPerUnit);

        // Update user
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

        // Record transaction
        await query(
          `INSERT INTO token_transactions (user_id, transaction_type, amount, currency, usd_amount, paypal_transaction_id, status, description)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [customId, 'purchase', tokensEarned, currency, amount, transactionId, 'completed',
           `Webhook: Purchased ${tokensEarned} Space Tokens for ${amount} ${currency}`]
        );
      }
    }

    if (event_type === 'PAYMENT.CAPTURE.DENIED' || event_type === 'PAYMENT.CAPTURE.REFUNDED') {
      const transactionId = resource.id;
      // Mark transaction as failed/refunded
      await query(
        `UPDATE token_transactions SET status = $1 WHERE paypal_transaction_id = $2`,
        [event_type === 'PAYMENT.CAPTURE.DENIED' ? 'failed' : 'refunded', transactionId]
      );
    }

    return NextResponse.json({ success: true, received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
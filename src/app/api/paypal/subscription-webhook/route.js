import { NextResponse } from 'next/server';
import { query } from '@/lib/neondatabase/server';

const PAYPAL_API =
  process.env.PAYPAL_ENVIRONMENT === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

async function getPayPalAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET_KEY}`
  ).toString('base64');

  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error(`PayPal OAuth failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function verifyPayPalWebhook(request, body, webhookId) {
  const transmissionId = request.headers.get('paypal-transmission-id');
  const transmissionTime = request.headers.get('paypal-transmission-time');
  const certUrl = request.headers.get('paypal-cert-url');
  const authAlgo = request.headers.get('paypal-auth-algo');
  const transmissionSig = request.headers.get('paypal-transmission-sig');

  if (!transmissionId || !transmissionTime || !certUrl || !authAlgo || !transmissionSig) {
    return false;
  }

  const accessToken = await getPayPalAccessToken();
  const verifyRes = await fetch(`${PAYPAL_API}/v1/notifications/verify-webhook-signature`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      auth_algo: authAlgo,
      cert_url: certUrl,
      transmission_id: transmissionId,
      transmission_sig: transmissionSig,
      transmission_time: transmissionTime,
      webhook_id: webhookId,
      webhook_event: body,
    }),
  });

  if (!verifyRes.ok) return false;
  const verifyData = await verifyRes.json();
  return verifyData.verification_status === 'SUCCESS';
}

export async function POST(request) {
  try {
    const webhookId = process.env.PAYPAL_WEBHOOK_ID;
    if (!webhookId) {
      console.error('PayPal webhook ID not configured');
      return NextResponse.json({ success: false, error: 'Webhook not configured' }, { status: 500 });
    }

    const body = await request.json();
    const { event_type, resource } = body;

    if (!event_type || !resource) {
      return NextResponse.json({ success: false, error: 'Invalid webhook payload' }, { status: 400 });
    }

    // Verify PayPal webhook signature in production
    if (process.env.PAYPAL_ENVIRONMENT === 'live') {
      const isValid = await verifyPayPalWebhook(request, body, webhookId);
      if (!isValid) {
        console.error('Invalid PayPal webhook signature');
        return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 401 });
      }
    }

    const subscriptionId = resource.billing_agreement_id || resource.id;

    // 1. Subscription activated - grant premium status
    if (event_type === 'BILLING.SUBSCRIPTION.ACTIVATED') {
      await query(
        `UPDATE premium_users 
         SET is_premium = TRUE,
             subscription_status = 'active',
             premium_expires_at = CURRENT_TIMESTAMP + INTERVAL '1 year',
             updated_at = CURRENT_TIMESTAMP
         WHERE paypal_subscription_id = $1`,
        [subscriptionId]
      );

      await query(
        `INSERT INTO token_transactions (user_id, transaction_type, amount, currency, usd_amount, paypal_transaction_id, status, description)
         SELECT id, 'subscription', 0, currency, 0, $1, 'completed', 'PayPal subscription activated'
         FROM premium_users WHERE paypal_subscription_id = $1`,
        [subscriptionId]
      );
    }

    // 2. Subscription cancelled
    if (event_type === 'BILLING.SUBSCRIPTION.CANCELLED') {
      await query(
        `UPDATE premium_users 
         SET subscription_status = 'cancelled',
             is_premium = FALSE,
             updated_at = CURRENT_TIMESTAMP
         WHERE paypal_subscription_id = $1`,
        [subscriptionId]
      );
    }

    // 3. Subscription expired
    if (event_type === 'BILLING.SUBSCRIPTION.EXPIRED') {
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

    // 4. Subscription suspended or payment failed
    if (
      event_type === 'BILLING.SUBSCRIPTION.SUSPENDED' ||
      event_type === 'BILLING.SUBSCRIPTION.PAYMENT.FAILED'
    ) {
      await query(
        `UPDATE premium_users 
         SET subscription_status = 'suspended',
             updated_at = CURRENT_TIMESTAMP
         WHERE paypal_subscription_id = $1`,
        [subscriptionId]
      );
    }

    // 5. Successful recurring subscription payment (PAYMENT.SALE.COMPLETED or BILLING.SUBSCRIPTION.PAYMENT.SUCCESS)
    if (
      event_type === 'BILLING.SUBSCRIPTION.PAYMENT.SUCCESS' ||
      event_type === 'PAYMENT.SALE.COMPLETED'
    ) {
      const customId = resource.custom_id || resource.custom;
      const amount = parseFloat(resource.amount?.total || resource.amount?.value || '0');
      const currency = resource.amount?.currency || resource.amount?.currency_code || 'USD';
      const tokensPerUnit = 10;
      const tokensEarned = Math.floor(amount * tokensPerUnit);
      const transactionId = resource.id || subscriptionId;

      if (customId) {
        await query(
          `UPDATE premium_users 
           SET token_balance = token_balance + $1,
               total_tokens_purchased = total_tokens_purchased + $1,
               total_spent = total_spent + $2,
               is_premium = TRUE,
               subscription_status = 'active',
               premium_expires_at = CURRENT_TIMESTAMP + INTERVAL '1 year',
               updated_at = CURRENT_TIMESTAMP
           WHERE id = $3`,
          [tokensEarned, amount, customId]
        );

        await query(
          `INSERT INTO token_transactions (user_id, transaction_type, amount, currency, usd_amount, paypal_transaction_id, status, description)
           VALUES ($1, 'subscription_payment', $2, $3, $4, $5, 'completed', $6)`,
          [
            customId,
            tokensEarned,
            currency,
            amount,
            transactionId,
            `Recurring subscription payment: ${tokensEarned} Space Tokens for ${amount} ${currency}`,
          ]
        );
      }
    }

    return NextResponse.json({ success: true, received: true });
  } catch (error) {
    console.error('Subscription webhook error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Webhook error' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import { query } from '@/lib/neondatabase/server';

const PAYPAL_API = process.env.PAYPAL_ENVIRONMENT === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

const PLAN_CONFIGS: Record<string, { planId: string; price: string; interval: string }> = {
  monthly: {
    planId: process.env.PAYPAL_SUBSCRIPTION_PLAN_ID_MONTHLY || 'P-9HB32711U44621012NLSC37I',
    price: process.env.SUBSCRIPTION_MONTHLY_PRICE || '8.00',
    interval: 'MONTH',
  },
  yearly: {
    planId: process.env.PAYPAL_SUBSCRIPTION_PLAN_ID_YEARLY || 'P-9HB32711U44621012NLSC37I',
    price: process.env.SUBSCRIPTION_YEARLY_PRICE || '95.00',
    interval: 'YEAR',
  },
};

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
    const { userId, planType = 'monthly', subscriptionId, status, action } = body;

    // Handle subscription approval callback from frontend
    if (action === 'approve' && userId && subscriptionId) {
      const planConfig = PLAN_CONFIGS[planType];
      const expiresAt = planType === 'monthly'
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

      await query(
        `UPDATE premium_users 
         SET subscription_status = $1,
             is_premium = TRUE,
             premium_expires_at = $2,
             subscription_plan_type = $3,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $4`,
        [status || 'active', expiresAt.toISOString(), planType, userId]
      );
      return NextResponse.json({ success: true, message: 'Subscription approved', planType });
    }

    const planConfig = PLAN_CONFIGS[planType];
    if (!planConfig) {
      return NextResponse.json(
        { success: false, error: 'Invalid plan type. Use "monthly" or "yearly".' },
        { status: 400 }
      );
    }

    if (!userId || !planConfig.planId) {
      return NextResponse.json(
        { success: false, error: 'User ID and plan ID are required' },
        { status: 400 }
      );
    }

    const accessToken = await getPayPalAccessToken();

    const subscriptionResponse = await fetch(`${PAYPAL_API}/v1/billing/subscriptions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plan_id: planConfig.planId,
        application_context: {
          brand_name: 'Outpost Oddity',
          locale: 'en-US',
          shipping_preference: 'NO_SHIPPING',
          user_action: 'SUBSCRIBE_NOW',
          return_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard/success`,
          cancel_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard/cancel`,
        },
      }),
    });

    const subscriptionData = await subscriptionResponse.json();

    if (!subscriptionResponse.ok) {
      console.error('PayPal subscription creation failed:', subscriptionData);
      return NextResponse.json(
        { success: false, error: 'Subscription creation failed' },
        { status: 500 }
      );
    }

    const approveLink = subscriptionData.links?.find(
      (link: any) => link.rel === 'approve'
    );

    await query(
      `UPDATE premium_users 
       SET paypal_subscription_id = $1,
           subscription_plan_id = $2,
           subscription_plan_type = $3,
           subscription_status = 'pending',
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $4`,
      [subscriptionData.id, planConfig.planId, planType, userId]
    );

    return NextResponse.json({
      success: true,
      subscriptionId: subscriptionData.id,
      status: subscriptionData.status,
      approveUrl: approveLink?.href,
      planType,
      price: planConfig.price,
    });
  } catch (error: any) {
    console.error('Create subscription error:', error);
    return NextResponse.json(
      { success: false, error: 'Subscription creation failed' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';

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

  if (!response.ok) {
    throw new Error(`PayPal token request failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, currency = 'USD', userId, userEmail } = body;

    if (!amount || !userId || !userEmail) {
      return NextResponse.json(
        { success: false, error: 'Amount, user ID, and email are required' },
        { status: 400 }
      );
    }

    // Validate amount (minimum 1)
    if (amount < 1) {
      return NextResponse.json(
        { success: false, error: 'Minimum purchase amount is 1' },
        { status: 400 }
      );
    }

    const accessToken = await getPayPalAccessToken();
    const tokensPerUnit = 10; // 1 EUR/USD = 10 tokens
    const tokensEarned = Math.floor(amount * tokensPerUnit);
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: currency,
          value: Number(amount).toFixed(2),
        },
        description: `Outpost Oddity - ${tokensEarned} Space Tokens`,
        custom_id: String(userId),
      }],
      application_context: {
        brand_name: 'OutpostOddity',
        locale: currency === 'EUR' ? 'en_IE' : 'en_US',
        landing_page: 'BILLING',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
        return_url: `${baseUrl}/payment/success`,
        cancel_url: `${baseUrl}/payment/cancel`,
      },
    };

    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const order = await response.json();

    if (!response.ok) {
      console.error('PayPal order creation failed:', order);
      return NextResponse.json(
        { success: false, error: 'Failed to create payment order' },
        { status: 500 }
      );
    }

    const approvalLink = order.links?.find((link) => link.rel === 'approve')?.href;

    return NextResponse.json({
      success: true,
      orderId: order.id,
      tokensEarned,
      amount,
      currency,
      approvalUrl: approvalLink,
    });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { success: false, error: 'Payment order creation failed' },
      { status: 500 }
    );
  }
}
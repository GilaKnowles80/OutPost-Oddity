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
    const { orderID, userId } = body;

    if (!orderID || !userId) {
      return NextResponse.json(
        { success: false, error: 'Order ID and user ID are required' },
        { status: 400 }
      );
    }

    const accessToken = await getPayPalAccessToken();

    // Capture the payment from PayPal
    const captureResponse = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const captureData = await captureResponse.json();

    if (!captureResponse.ok) {
      console.error('PayPal capture failed:', captureData);
      return NextResponse.json(
        { success: false, error: 'Payment capture failed' },
        { status: 500 }
      );
    }

    // Verify payment status
    if (captureData.status !== 'COMPLETED') {
      return NextResponse.json(
        { success: false, error: 'Payment not completed' },
        { status: 400 }
      );
    }

    // Extract payment details
    const purchaseUnit = captureData.purchase_units?.[0];
    const amount = parseFloat(purchaseUnit?.amount?.value || '0');
    const currency = purchaseUnit?.amount?.currency_code || 'USD';
    const paypalTransactionId = captureData.id;
    const tokensPerUnit = currency === 'EUR' ? 10 : 10;
    const tokensEarned = Math.floor(amount * tokensPerUnit);

    // Update user token balance and premium status
    await query(
      `UPDATE premium_users 
       SET token_balance = token_balance + $1,
           total_tokens_purchased = total_tokens_purchased + $1,
           total_spent = total_spent + $2,
           is_premium = TRUE,
           premium_expires_at = CURRENT_TIMESTAMP + INTERVAL '1 year',
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $3`,
      [tokensEarned, amount, userId]
    );

    // Record token transaction
    await query(
      `INSERT INTO token_transactions (user_id, transaction_type, amount, currency, usd_amount, paypal_transaction_id, status, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [userId, 'purchase', tokensEarned, currency, amount, paypalTransactionId, 'completed',
       `Purchased ${tokensEarned} Space Tokens for ${amount} ${currency} via PayPal`]
    );

    // Log activity
    await query(
      `INSERT INTO player_activity (user_id, ip_address, action, details, risk_score)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, request.headers.get('x-forwarded-for') || 'unknown', 'token_purchase',
       JSON.stringify({ amount, currency, tokensEarned, paypalTransactionId }), 0]
    );

    return NextResponse.json({
      success: true,
      message: 'Payment captured successfully',
      tokensEarned,
      amount,
      currency,
      transactionId: paypalTransactionId,
    });
  } catch (error: any) {
    console.error('Capture order error:', error);
    return NextResponse.json(
      { success: false, error: 'Payment capture failed' },
      { status: 500 }
    );
  }
}
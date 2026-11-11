import { NextResponse } from 'next/server';
import { query } from '@/lib/neondatabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency = 'USD', userId, userEmail } = body;

    if (!amount || !userId || !userEmail) {
      return NextResponse.json(
        { success: false, error: 'Amount, user ID, and email are required' },
        { status: 400 }
      );
    }

    if (amount < 1) {
      return NextResponse.json(
        { success: false, error: 'Minimum deposit amount is 1' },
        { status: 400 }
      );
    }

    const tokensPerUnit = 10; // 1 USD/EUR = 10 tokens
    const tokensEarned = Math.floor(amount * tokensPerUnit);
    const transactionId = `WT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Record pending bank transfer transaction
    await query(
      `INSERT INTO token_transactions (user_id, transaction_type, amount, currency, usd_amount, status, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [userId, 'purchase', tokensEarned, currency, amount, 'pending',
       `Bank wire transfer: ${tokensEarned} Space Tokens for ${amount} ${currency} via ${process.env.BANK_NAME}`]
    );

    // Log activity
    await query(
      `INSERT INTO player_activity (user_id, ip_address, action, details, risk_score)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, request.headers.get('x-forwarded-for') || 'unknown', 'bank_transfer_initiated',
       JSON.stringify({ amount, currency, tokensEarned, transactionId, bank: process.env.BANK_NAME }), 10]
    );

    return NextResponse.json({
      success: true,
      transactionId,
      tokensEarned,
      amount,
      currency,
      status: 'pending',
      message: 'Bank wire transfer initiated. Please complete the transfer using the details below.',
      bankDetails: {
        bankName: process.env.BANK_NAME || 'SSB Bank',
        accountHolder: process.env.BANK_ACCOUNT_HOLDER || 'Gila Knowles',
        routingNumber: process.env.BANK_ROUTING_NUMBER || '043087080',
        accountNumber: process.env.BANK_ACCOUNT_NUMBER || '500279542605',
        memo: process.env.BANK_MEMO || 'Gila Knowles',
        amount: amount,
        currency: currency,
      },
      instructions: [
        '1. Log into your online banking or visit your bank branch.',
        '2. Initiate a wire transfer to the account details above.',
        '3. Include the memo/reference: ' + (process.env.BANK_MEMO || 'Gila Knowles'),
        '4. Transfer amount: ' + amount + ' ' + currency,
        '5. Once the bank confirms the transfer, your tokens will be credited within 1-3 business days.',
        '6. Contact support at privacy@outpost-oddity.com if you have any issues.',
      ],
    });
  } catch (error: any) {
    console.error('Bank transfer error:', error);
    return NextResponse.json(
      { success: false, error: 'Bank transfer initiation failed' },
      { status: 500 }
    );
  }
}
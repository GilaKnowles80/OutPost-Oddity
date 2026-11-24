import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const signingSecret = process.env.RESEND_WEBHOOK_SIGNING_SECRET;

    // Optional verification headers sent by Resend (via Svix)
    const svixId = request.headers.get('svix-id') || request.headers.get('webhook-id');
    const svixTimestamp = request.headers.get('svix-timestamp') || request.headers.get('webhook-timestamp');
    const svixSignature = request.headers.get('svix-signature') || request.headers.get('webhook-signature');

    const eventType = body?.type || 'unknown';
    console.log(`📨 Received Resend webhook event: ${eventType}`, {
      id: svixId,
      timestamp: svixTimestamp,
      hasSecret: Boolean(signingSecret),
      data: body?.data?.id || body?.data?.to,
    });

    // Handle common email delivery events
    switch (eventType) {
      case 'email.sent':
        console.log(`[Resend] Email sent to:`, body.data?.to);
        break;
      case 'email.delivered':
        console.log(`[Resend] Email successfully delivered to:`, body.data?.to);
        break;
      case 'email.bounced':
        console.warn(`[Resend] Email bounced:`, body.data?.to, body.data?.bounce);
        break;
      case 'email.complained':
        console.warn(`[Resend] Email marked as spam:`, body.data?.to);
        break;
      case 'email.opened':
        console.log(`[Resend] Email opened by:`, body.data?.to);
        break;
      case 'email.clicked':
        console.log(`[Resend] Link clicked in email by:`, body.data?.to);
        break;
      default:
        console.log(`[Resend] Event ${eventType} received`);
        break;
    }

    return NextResponse.json({ success: true, received: true });
  } catch (error) {
    console.error('Resend webhook error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Webhook processing failed' },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/webhooks/resend',
    resendConfigured: Boolean(process.env.RESEND_API_KEY),
  });
}

import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
export const resend = resendApiKey ? new Resend(resendApiKey) : null;

// While testing without a verified custom domain, Resend uses onboarding@resend.dev
export const DEFAULT_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || 'OutPost Oddity <onboarding@resend.dev>';

/**
 * Send an email using Resend
 * @param {Object} options
 * @param {string|string[]} options.to - Recipient email address(es)
 * @param {string} options.subject - Email subject line
 * @param {string} [options.html] - HTML body
 * @param {string} [options.text] - Plain text body
 * @param {string} [options.from] - Custom from address (optional)
 */
export async function sendEmail({ to, subject, html, text, from = DEFAULT_FROM_EMAIL }) {
  if (!resend) {
    console.warn('⚠️ Resend is not configured (missing RESEND_API_KEY)');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const data = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
    });

    if (data.error) {
      console.error('❌ Resend email send error:', data.error);
      return { success: false, error: data.error };
    }

    console.log('✅ Resend email sent successfully:', data.data?.id);
    return { success: true, id: data.data?.id };
  } catch (error) {
    console.error('❌ Resend API exception:', error?.message || error);
    return { success: false, error: error?.message || error };
  }
}

/**
 * Send a welcome email to a new user
 */
export async function sendWelcomeEmail({ to, username, userType }) {
  const isStaff = userType === 'admin';
  const tierName = isStaff ? 'Admin Staff' : userType === 'premium' ? 'Premium Space Traveler' : 'Standard Adventurer';

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 30px; }
          .container { max-width: 580px; margin: 0 auto; background-color: #1e293b; border: 1px solid #7c3aed; border-radius: 12px; padding: 32px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
          .logo { font-size: 24px; font-weight: bold; color: #a855f7; margin-bottom: 20px; }
          h1 { color: #ffffff; font-size: 22px; margin-top: 0; }
          p { color: #cbd5e1; font-size: 15px; line-height: 1.6; }
          .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; background-color: #7c3aed; color: #ffffff; font-size: 12px; font-weight: 600; text-transform: uppercase; margin-bottom: 16px; }
          .button { display: inline-block; background-color: #9333ea; color: #ffffff; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin-top: 20px; text-align: center; }
          .footer { margin-top: 32px; border-top: 1px solid #334155; padding-top: 16px; font-size: 12px; color: #64748b; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">🚀 OutPost Oddity</div>
          <div class="badge">${tierName}</div>
          <h1>Welcome aboard, ${username}!</h1>
          <p>Your OutPost Oddity station account is now active and ready for exploration across 200 cosmic episodes.</p>
          <p>You can manage your missions, build outposts, and explore deep-space mysteries.</p>
          <a href="https://outpost-oddity.vercel.app/" class="button">Launch Mission Control</a>
          <div class="footer">
            © ${new Date().getFullYear()} OutPost Oddity. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to,
    subject: `🚀 Welcome to OutPost Oddity, ${username}!`,
    html,
    text: `Welcome to OutPost Oddity, ${username}! Your account (${tierName}) is now ready. Visit https://outpost-oddity.vercel.app to start your missions.`,
  });
}

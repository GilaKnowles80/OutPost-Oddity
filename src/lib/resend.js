// src/lib/resend.js

export async function sendWelcomeEmail({ email, name }) {
  // Mock implementation for development / pre-domain setup
  console.log(`[Mock Email] Welcome email would have been sent to: ${email} (${name})`);
  
  // Return a mock success response
  return { success: true, mocked: true };
}
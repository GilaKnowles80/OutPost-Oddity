import { NextResponse } from 'next/server';

export async function getOrCreateWalletServer(authToken: string) {
  const res = await fetch('https://tee.express.magiclabs.com/v1/wallet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
      'X-Magic-Secret-Key': process.env.MAGIC_LINK_SECRET_KEY || 'sk_live_00ACBBC524D8B8E8',
      'X-OIDC-Provider-ID': process.env.MAGIC_PROVIDER_ID || '648b7792-3c42-4491-b8a5-440f87f7342a',
      'X-Magic-Chain': 'ETH',
    },
  });

  if (!res.ok) {
    throw new Error(`Wallet creation failed: ${res.statusText}`);
  }

  const data = await res.json();
  return data.public_address || data.address || null;
}

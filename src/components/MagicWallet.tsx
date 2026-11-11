'use client';

import { useState, useEffect } from 'react';

interface MagicWalletConfig {
  apiKey: string;
  providerId: string;
  chain: string;
}

interface MagicWalletState {
  address: string | null;
  loading: boolean;
  error: string | null;
}

export function useMagicWallet() {
  const [wallet, setWallet] = useState<MagicWalletState>({
    address: null,
    loading: false,
    error: null,
  });

  const getOrCreateWallet = async (authToken: string) => {
    setWallet((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const res = await fetch('https://tee.express.magiclabs.com/v1/wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
          'X-Magic-API-Key': process.env.NEXT_PUBLIC_MAGIC_LINK_API_KEY || 'pk_live_8E2C19B597E33952',
          'X-OIDC-Provider-ID': process.env.MAGIC_PROVIDER_ID || '648b7792-3c42-4491-b8a5-440f87f7342a',
          'X-Magic-Chain': 'ETH',
        },
      });

      if (!res.ok) {
        throw new Error(`Wallet creation failed: ${res.statusText}`);
      }

      const data = await res.json();
      const publicAddress = data.public_address || data.address || null;

      setWallet({
        address: publicAddress,
        loading: false,
        error: null,
      });

      return publicAddress;
    } catch (err: any) {
      setWallet({
        address: null,
        loading: false,
        error: err.message || 'Failed to create wallet',
      });
      return null;
    }
  };

  return {
    ...wallet,
    getOrCreateWallet,
  };
}

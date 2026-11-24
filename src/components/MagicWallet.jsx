'use client';

import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'outpostOddity_magic_wallet';

export function useMagicWallet({ chain = 'ETH' } = {}) {
  const [wallet, setWallet] = useState({
    address: null,
    loading: false,
    error: null,
  });

  // Restore saved wallet address from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const savedAddress = localStorage.getItem(STORAGE_KEY);
      if (savedAddress) {
        setWallet((prev) => ({ ...prev, address: savedAddress }));
      }
    } catch {
      // Ignore storage access errors
    }
  }, []);

  const getOrCreateWallet = useCallback(
    async (authToken) => {
      if (!authToken) {
        const message = 'Authentication token is required to create or load a wallet.';
        setWallet((prev) => ({ ...prev, loading: false, error: message }));
        return null;
      }

      setWallet((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const apiKey =
          process.env.NEXT_PUBLIC_MAGIC_LINK_API_KEY || 'pk_live_8E2C19B597E33952';
        const providerId =
          process.env.NEXT_PUBLIC_MAGIC_PROVIDER_ID ||
          '648b7792-3c42-4491-b8a5-440f87f7342a';

        const res = await fetch('https://tee.express.magiclabs.com/v1/wallet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
            'X-Magic-API-Key': apiKey,
            'X-OIDC-Provider-ID': providerId,
            'X-Magic-Chain': chain,
          },
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(
            data?.message || data?.error || `Wallet creation failed (${res.status})`
          );
        }

        const publicAddress = data.public_address || data.address || null;

        if (!publicAddress) {
          throw new Error('Wallet response did not include a public address.');
        }

        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, publicAddress);
        }

        setWallet({
          address: publicAddress,
          loading: false,
          error: null,
        });

        return publicAddress;
      } catch (err) {
        setWallet({
          address: null,
          loading: false,
          error: err?.message || 'Failed to create wallet',
        });
        return null;
      }
    },
    [chain]
  );

  const disconnectWallet = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    setWallet({
      address: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...wallet,
    isConnected: Boolean(wallet.address),
    getOrCreateWallet,
    disconnectWallet,
  };
}

export default useMagicWallet;
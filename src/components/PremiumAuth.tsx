'use client';

import React, { useState, useEffect, useRef } from 'react';
import Script from 'next/script';

interface AuthProps {
  onLogin?: (user: any) => void;
  defaultTier?: 'admin' | 'free_with_ads' | 'premium';
}

interface PlanOption {
  type: 'monthly' | 'yearly';
  price: string;
  label: string;
  description: string;
  popular?: boolean;
}

const PLANS: PlanOption[] = [
  { type: 'monthly', price: '$8', label: 'Monthly', description: 'Cancel anytime. Full access to all 200 episodes, no ads.' },
  { type: 'yearly', price: '$95', label: 'Yearly', description: 'Best value — save $1/year vs monthly. No ads.', popular: true },
];

export default function AuthPortal({ onLogin, defaultTier = 'premium' }: AuthProps) {
  const [mode, setMode] = useState<'login' | 'register' | 'magic-sent'>('login');
  const [tier, setTier] = useState<'admin' | 'free_with_ads' | 'premium'>(defaultTier);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [bankDetails, setBankDetails] = useState<any>(null);
  const [transferLoading, setTransferLoading] = useState(false);
  const paypalButtonRef = useRef<HTMLDivElement>(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);
  const [isScriptReady, setIsScriptReady] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [adminCode, setAdminCode] = useState('');
  const [magicLinkUrl, setMagicLinkUrl] = useState('');

  const requestMagicLink = async (e: React.FormEvent<HTMLFormElement>, isRegister: boolean) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const body: any = { email: formData.get('email'), user_type: tier, isRegister };
    if (isRegister) {
      body.username = formData.get('username');
      body.country = formData.get('country') || 'US';
      body.currency = formData.get('currency') || 'USD';
      if (tier === 'admin') body.admin_code = adminCode;
    }
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        setMagicLinkUrl(data.magicLinkUrl || '');
        setMode('magic-sent');
      } else {
        setError(data.error || 'Failed to send magic link');
        setLoading(false);
      }
    } catch { setError('Network error'); setLoading(false); }
  };

  const verifyMagicLink = async () => {
    if (!magicLinkUrl) return;
    setLoading(true);
    try {
      const token = magicLinkUrl.split('token=')[1];
      const res = await fetch(`/api/auth/magic-login?token=${token}`);
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        onLogin?.(data.user);
      } else {
        setError(data.error || 'Magic link verification failed');
        setLoading(false);
      }
    } catch { setError('Network error'); setLoading(false); }
  };

  const initiateBankTransfer = async (amount: number) => {
    setTransferLoading(true);
    try {
      const res = await fetch('/api/bank-transfer/create-order', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency: user?.currency || 'USD', userId: user?.id, userEmail: user?.email }),
      });
      const data = await res.json();
      if (data.success) setBankDetails(data.bankDetails);
      else setError(data.error || 'Transfer initiation failed');
    } catch { setError('Network error'); } finally { setTransferLoading(false); }
  };

  const createPayPalSubscription = async (planType: 'monthly' | 'yearly') => {
    if (!(window as any).paypal) return;
    setSubscriptionLoading(true);
    setSelectedPlan(planType);
    try {
      const res = await fetch('/api/paypal/create-subscription', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, planType }),
      });
      const data = await res.json();
      if (data.success && data.approveUrl) {
        if (paypalButtonRef.current) paypalButtonRef.current.innerHTML = '';
        (window as any).paypal.Buttons({
          style: { shape: 'rect', color: 'gold', layout: 'vertical', label: 'subscribe' },
          createSubscription: function() {
            return (window as any).paypal.Buttons().createSubscription({
              plan_id: process.env.NEXT_PUBLIC_PAYPAL_SUBSCRIPTION_PLAN_ID_MONTHLY || 'P-9HB32711U44621012NLSC37I',
            });
          },
          onApprove: function() {
            setSubscriptionLoading(false);
          },
          onError: function() {
            setError('Subscription failed');
            setSubscriptionLoading(false);
          },
        }).render(paypalButtonRef.current);
      } else {
        setError(data.error || 'Failed to create subscription');
        setSubscriptionLoading(false);
      }
    } catch { setError('Network error'); setSubscriptionLoading(false); }
  };

  const LoginView = () => (
    <div className="bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-700 w-full max-w-md">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">👋 Welcome Back</h1>
        <p className="text-slate-400 text-sm">Enter your email to receive a magic link</p>
      </div>
      {error && <div className="mb-4 p-2 bg-red-500/20 text-red-400 rounded text-sm text-center">{error}</div>}
      <form onSubmit={(e) => requestMagicLink(e, false)} className="space-y-3">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Email</label>
          <input type="email" name="email" required className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:ring-purple-500" />
        </div>
        <button type="submit" disabled={loading} className={`w-full py-3 font-bold rounded-lg transition-all ${loading ? 'opacity-50' : 'bg-purple-600 hover:bg-purple-500 text-white'}`}>
          {loading ? 'Sending...' : 'Send Magic Link'}
        </button>
      </form>
      <p className="text-center mt-4 text-slate-400 text-sm">
        Don't have an account?{' '}
        <button onClick={() => setMode('register')} className="text-purple-400 underline">Create Account</button>
      </p>
    </div>
  );

  const RegisterView = () => (
    <div className="bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-700 w-full max-w-md">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">🚀 Create Account</h1>
        <p className="text-slate-400 text-sm">Choose your Outpost Oddity membership tier</p>
      </div>
      {error && <div className="mb-4 p-2 bg-red-500/20 text-red-400 rounded text-sm text-center">{error}</div>}

      <div className="mb-6">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Choose Your Tier</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button onClick={() => setTier('admin')} className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${tier === 'admin' ? 'bg-purple-500/20 border-purple-500 text-purple-400' : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-purple-500/50'}`}>
            <div className="text-xs font-bold uppercase mb-1">Admin Staff</div>
            <div className="text-[10px] text-slate-500">Exclusive access</div>
          </button>
          <button onClick={() => setTier('free_with_ads')} className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${tier === 'free_with_ads' ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-blue-500/50'}`}>
            <div className="text-xs font-bold uppercase mb-1">Free + Ads</div>
            <div className="text-[10px] text-slate-500">Ad-supported</div>
          </button>
          <button onClick={() => setTier('premium')} className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${tier === 'premium' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-yellow-500/50'}`}>
            <div className="text-xs font-bold uppercase mb-1">Premium</div>
            <div className="text-[10px] text-slate-500">$8/mo or $95/yr</div>
          </button>
        </div>
      </div>

      <form onSubmit={(e) => requestMagicLink(e, true)} className="space-y-3">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Email</label>
          <input type="email" name="email" required className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:ring-purple-500" />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Username</label>
          <input type="text" name="username" required className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:ring-purple-500" />
        </div>
        {tier === 'admin' && (
          <div>
            <label className="block text-sm text-slate-300 mb-1">Admin Staff Code</label>
            <input type="text" name="admin_code" value={adminCode} onChange={(e) => setAdminCode(e.target.value)} required placeholder="Enter staff code" className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:ring-purple-500" />
            <p className="text-[10px] text-slate-500 mt-1">Staff code required for admin access</p>
          </div>
        )}
        <button type="submit" disabled={loading} className={`w-full py-3 font-bold rounded-lg transition-all ${loading ? 'opacity-50' : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white'}`}>
          {loading ? 'Creating...' : 'Create Account & Send Magic Link'}
        </button>
      </form>
      <p className="text-center mt-4 text-slate-400 text-sm">
        Already have an account?{' '}
        <button onClick={() => setMode('login')} className="text-purple-400 underline">Sign In</button>
      </p>
    </div>
  );

  const MagicSentView = () => (
    <div className="bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-700 w-full max-w-md">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">🔗 Magic Link Sent</h1>
        <p className="text-slate-400 text-sm">Click the magic link in your email</p>
      </div>
      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 mb-6">
        <p className="text-xs text-slate-400 uppercase font-bold mb-2">Magic Link</p>
        <div className="flex gap-2">
          <input type="text" value={magicLinkUrl} readOnly className="flex-1 px-3 py-2 bg-slate-900 border border-slate-600 rounded text-xs text-cyan-400 font-mono break-all" />
          <button onClick={() => { navigator.clipboard.writeText(magicLinkUrl); setError('Copied!'); }} className="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded text-xs font-bold">Copy</button>
        </div>
        <p className="text-[10px] text-slate-500 mt-2 text-center">Link expires in 15 minutes</p>
      </div>
      <button onClick={verifyMagicLink} disabled={loading} className={`w-full py-3 font-bold rounded-lg transition-all ${loading ? 'opacity-50' : 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white'}`}>
        {loading ? 'Verifying...' : 'I Clicked the Magic Link'}
      </button>
      <p className="text-center mt-4 text-slate-400 text-sm">
        <button onClick={() => setMode('login')} className="text-purple-400 underline">Back to Login</button>
      </p>
    </div>
  );

  const DashboardView = () => (
    <div className="bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-700">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">👤 Account Dashboard</h2>
          <p className="text-slate-400 text-sm">Outpost Oddity Membership</p>
        </div>
        <button onClick={() => { fetch('/api/auth/logout', { method: 'POST' }).then(() => setUser(null)); }} className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-sm rounded-lg">Logout</button>
      </div>

      <div className={`flex items-center gap-3 mb-6 ${tierColor(user.userType)}`}>
        <div className={`w-2 h-2 rounded-full ${tierDotColor(user.userType)}`}></div>
        <span className={`font-bold text-sm ${tierTextColor(user.userType)}`}>
          {user.userType === 'admin' ? '🛡️ Admin Staff' : user.userType === 'premium' ? '✨ Premium Member' : '📺 Free + Ads Member'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-bold">Username</span><br/><span className="text-white text-sm">{user.username}</span>
        </div>
        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-bold">Email</span><br/><span className="text-white text-sm">{user.email}</span>
        </div>
        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-bold">Tier</span><br/><span className="text-white text-sm capitalize">{user.userType}</span>
        </div>
        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
          <span className="text-xs text-slate-400 uppercase font-bold">Tokens</span><br/><span className="text-white font-mono text-sm">{user.tokenBalance} 🪙</span>
        </div>
      </div>

      {user.userType !== 'premium' && user.userType !== 'admin' && (
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 mb-6">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2"><span>💎</span> Upgrade to Premium</h3>
          <p className="text-xs text-slate-400 mb-4">Remove ads and unlock all premium features.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PLANS.map((plan) => (
              <div key={plan.type} onClick={() => createPayPalSubscription(plan.type)} className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${selectedPlan === plan.type ? 'bg-purple-500/20 border-purple-500' : 'bg-slate-800/50 border-slate-700/50'}`}>
                <div className="flex justify-between items-start mb-2"><span className="text-xs text-slate-400 uppercase font-bold">{plan.label}</span>{plan.popular && <span className="bg-purple-500 text-white text-[10px] px-2 py-0.5 rounded-full uppercase">Popular</span>}</div>
                <div className="flex items-baseline gap-1 mb-3"><span className="text-3xl font-bold text-white">{plan.price}</span><span className="text-xs text-slate-500">{plan.type === 'monthly' ? '/mo' : '/yr'}</span></div>
                <p className="text-xs text-slate-400 mb-4">{plan.description}</p>
                <button onClick={(e) => { e.stopPropagation(); createPayPalSubscription(plan.type); }} className="w-full py-2 px-3 rounded bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-medium transition-all">Choose {plan.label}</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {user.isAdmin && (
        <div className="bg-slate-800/50 rounded-xl p-5 border border-purple-500/50 mb-6">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2"><span>🛡️</span> Admin Controls</h3>
          <p className="text-xs text-slate-400 mb-3">Exclusive admin staff access</p>
          <button onClick={() => onLogin?.({ ...user, isAdmin: true })} className="w-full py-2 px-3 rounded bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition-all">Open Admin Dashboard</button>
        </div>
      )}

      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 mb-6">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2"><span>🪙</span> Purchase Space Tokens</h3>
        <p className="text-xs text-slate-400 mb-4">1 {user.currency} = 10 Space Tokens</p>
        <div className="space-y-2">
          <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/30">
            <p className="text-xs text-slate-400 mb-2 uppercase font-bold">PayPal Payment Link</p>
            <a href="https://www.paypal.com/ncp/payment/AVJRKFSXJRHE8" target="_blank" rel="noopener noreferrer" className="w-full py-2 px-3 rounded bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium text-center transition-all mb-2 block">💳 Pay via PayPal Link</a>
          </div>
        </div>
      </div>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
    </div>
  );

  if (user) {
    return (
      <>
        <Script strategy="afterInteractive" src={`https://paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'your_paypal_client_id_here'}&vault=true&intent=subscription`} data-sdk-integration-source="button-factory" onLoad={() => setIsScriptReady(true)} />
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 md:p-8">
          <DashboardView />
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 md:p-8">
      {mode === 'login' ? <LoginView /> : mode === 'magic-sent' ? <MagicSentView /> : <RegisterView />}
    </div>
  );
}

function tierColor(type: string): string { return type === 'admin' ? 'text-purple-400' : type === 'premium' ? 'text-yellow-400' : 'text-blue-400'; }
function tierDotColor(type: string): string { return type === 'admin' ? 'bg-purple-400' : type === 'premium' ? 'bg-yellow-400' : 'bg-blue-400'; }
function tierTextColor(type: string): string { return type === 'admin' ? 'text-purple-400' : type === 'premium' ? 'text-yellow-400' : 'text-blue-400'; }

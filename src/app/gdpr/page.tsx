import Link from 'next/link';

export default function GDPRPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-4">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">📋 GDPR Privacy Policy</h1>
          <p className="text-slate-400">Outpost Oddity - Data Protection & Consumer Rights</p>
        </header>

        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-white mb-3">1. Data Controller</h2>
            <p className="text-slate-300 leading-relaxed">
              Outpost Oddity (the "Game") is operated by Gila Knowles. We are committed to protecting your personal data in accordance with the General Data Protection Regulation (GDPR) and other applicable data protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">2. What Data We Collect</h2>
            <ul className="text-slate-300 leading-relaxed list-disc pl-6 space-y-2">
              <li>Email address (for account registration)</li>
              <li>Username (for game identification)</li>
              <li>Country (for currency/tax purposes)</li>
              <li>Token balance and purchase history</li>
              <li>Game progress and episode completion data</li>
              <li>IP address and user agent (for security monitoring)</li>
              <li>PayPal transaction IDs (for payment verification - we never store full payment card details)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">3. How We Use Your Data</h2>
            <ul className="text-slate-300 leading-relaxed list-disc pl-6 space-y-2">
              <li>To create and maintain your premium account</li>
              <li>To process token purchases via PayPal</li>
              <li>To save your game progress across episodes</li>
              <li>To detect and prevent malicious activities, cheating, and fraud</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">4. Your Rights Under GDPR</h2>
            <ul className="text-slate-300 leading-relaxed list-disc pl-6 space-y-2">
              <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
              <li><strong>Right to Rectification:</strong> Correct inaccurate data</li>
              <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request deletion of your data</li>
              <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
              <li><strong>Right to Data Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">5. Data Retention</h2>
            <p className="text-slate-300 leading-relaxed">
              We retain personal data for as long as necessary to provide the game services, up to 365 days after account closure. Security logs are retained for 90 days for fraud prevention.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">6. Data Security</h2>
            <p className="text-slate-300 leading-relaxed">
              We implement industry-standard security measures including bcrypt password hashing, HTTPS encryption, HTTP-only cookies, rate limiting, and SQL injection protection. All data is stored on Neon Serverless PostgreSQL with enterprise-grade security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">7. Contact & Data Requests</h2>
            <p className="text-slate-300 leading-relaxed">
              For GDPR requests, data protection inquiries, or customer service support, contact us at:<br/>
              <span className="font-mono text-purple-400">gilaknowles80@gmail.com</span>
            </p>
          </section>

          <section className="pt-4 border-t border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-3">8. Consumer Protection</h2>
            <p className="text-slate-300 leading-relaxed">
              Outpost Oddity complies with consumer protection laws including:
            </p>
            <ul className="text-slate-300 leading-relaxed list-disc pl-6 space-y-2">
              <li>Transparent pricing: 1 EUR/USD = 10 Space Tokens</li>
              <li>Clear refund policy for failed transactions</li>
              <li>No hidden fees or automatic subscriptions</li>
              <li>Premium features clearly disclosed before purchase</li>
              <li>Right to cancel premium subscription at any time</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-2">
              For any customer service issues, billing questions, or technical support:<br/>
              <span className="font-mono text-purple-400">gilaknowles80@gmail.com</span>
            </p>
          </section>
        </div>

        <footer className="mt-8 text-center text-slate-500 text-sm">
          <p>Outpost Oddity &copy; 2026 Gila Arayan Cain Gul, Arda Tayfun Gul, Catherine Arayan Cain Knowles</p>
          <p className="text-xs text-slate-600 mt-1">Licensed under the MIT License</p>
          <Link href="/" className="text-purple-400 hover:text-purple-300">← Back to Game</Link>
        </footer>
      </div>
    </div>
  );
}
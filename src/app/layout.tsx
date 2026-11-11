import '@/app/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Outpost Oddity: Chronicles of the Shattered Cosmos',
  description: "Dr. Aris Thorne's 200-episode odyssey across the shattered cosmos, building outposts, farming alien flora, and battling Void-Walkers to repair the Bifrost Drive and return home.",
  keywords: ['Outpost Oddity', 'sci-fi game', 'puzzle adventure', 'space game', 'text adventure', 'comedy game'],
  authors: [{ name: 'Gila Knowles', url: 'https://outpost-oddity.com' }],
  openGraph: {
    title: 'Outpost Oddity: Chronicles of the Shattered Cosmos',
    description: "Dr. Aris Thorne's 200-episode odyssey across the shattered cosmos.",
    type: 'website',
    locale: 'en_US',
    siteName: 'Outpost Oddity',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outpost Oddity',
    description: "Dr. Aris Thorne's 200-episode odyssey across the shattered cosmos.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Outpost Oddity" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo.png" sizes="180x180" />
        <link rel="icon" type="image/png" href="/logo.png" sizes="192x192" />
        <link rel="icon" type="image/png" href="/logo.png" sizes="512x512" />
      </head>
      <body className="bg-slate-900 text-slate-100 min-h-screen selection:bg-purple-500 selection:text-slate-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

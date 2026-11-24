import '@/app/globals.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0f172a',
};

export const metadata = {
  title: 'Outpost Oddity: Chronicles of the Shattered Cosmos',
  description:
    "Dr. Aris Thorne's 200-episode odyssey across the shattered cosmos, building outposts, farming alien flora, and battling Void-Walkers to repair the Bifrost Drive and return home.",
  keywords: ['Outpost Oddity', 'sci-fi game', 'puzzle adventure', 'space game', 'text adventure', 'comedy game'],
  authors: [{ name: 'Gila Knowles', url: 'https://outpost-oddity.com' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Outpost Oddity',
  },
  icons: {
    icon: [
      { url: '/logo.png', sizes: '192x192', type: 'image/png' },
      { url: '/logo.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/logo.png', sizes: '180x180', type: 'image/png' }],
  },
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="bg-slate-900 text-slate-100 min-h-screen selection:bg-purple-500 selection:text-slate-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
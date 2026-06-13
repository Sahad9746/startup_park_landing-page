import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Unicorn Night | Startup Park Bengaluru — An Exclusive Evening Where Vision Meets Capital',
  description: 'Unicorn Night by Startup Park Bengaluru — a curated gathering of HNIs, investors, wealth management professionals, and Karnataka\'s next business leaders. 21 June 2026. By invitation only.',
  keywords: 'Unicorn Night, Startup Park Bengaluru, HNI Event, Investor Networking, Exclusive Dinner, iQue, Karnataka Business Leaders',
  openGraph: {
    title: 'Unicorn Night | Startup Park Bengaluru',
    description: 'An exclusive evening where vision meets capital. A curated gathering of HNIs, investors, and changemakers. 21 June 2026, Bengaluru. By invitation only.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      'PinoyCare CH — Babysitting & Housekeeping Jobs in Switzerland',
    template: '%s · PinoyCare CH',
  },
  description:
    'Free job marketplace connecting Filipino caregivers, nannies, and housekeepers with families across Switzerland. 100% free — built by kababayan, for kababayan.',
  keywords: [
    'babysitting',
    'nanny',
    'housekeeping',
    'Filipino',
    'Switzerland',
    'Schweiz',
    'Suisse',
    'kabayan',
    'childminder',
    'maman de jour',
  ],
  authors: [{ name: 'PinoyCare CH' }],
  openGraph: {
    type: 'website',
    locale: 'en_CH',
    url: siteUrl,
    siteName: 'PinoyCare CH',
    title: 'PinoyCare CH — Find trusted help in Switzerland',
    description:
      'Free marketplace for babysitting and housekeeping jobs. Connect Filipino caregivers with Swiss families.',
  },
  twitter: {
    card: 'summary',
    title: 'PinoyCare CH',
    description:
      'Free marketplace for babysitting and housekeeping jobs in Switzerland.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0F7B8A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}

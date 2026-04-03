import './globals.css';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://sparklingstays.com'),
  title: {default: 'Sparkling Stays | Professional Cleaning Services in Montreal', template: '%s | Sparkling Stays'},
  description: 'Professional residential and commercial cleaning services across Greater Montreal, Laval, West Island, and South Shore. Book online or call 438-867-8770.',
  openGraph: {siteName: 'Sparkling Stays', locale: 'en_CA', type: 'website'},
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

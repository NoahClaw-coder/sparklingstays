import './globals.css';
import type {Metadata} from 'next';
import {siteConfig} from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Sparkling Stays | Cleaning Services in Montreal',
    template: '%s | Sparkling Stays Montreal'
  },
  description: siteConfig.description,
  alternates: {
    languages: {
      'en-CA': `${siteConfig.url}/en`,
      'fr-CA': `${siteConfig.url}/fr`
    }
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

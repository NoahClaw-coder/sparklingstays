import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://sparklingstays.com'),
  title: 'Sparkling Stays',
  description: 'Professional residential and commercial cleaning services in Montreal.'
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

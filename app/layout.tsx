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
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5X3PXR4B');`
          }}
        />
      </head>
      <body>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5X3PXR4B"
            height="0"
            width="0"
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}

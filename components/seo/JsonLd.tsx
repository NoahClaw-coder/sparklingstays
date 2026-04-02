import {siteConfig} from '@/lib/seo';

export function LocalBusinessJsonLd({locale}: {locale: string}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    description:
      locale === 'fr'
        ? 'Services d’entretien résidentiel et commercial à Montréal.'
        : 'Professional residential and commercial cleaning services in Montreal.',
    url: `${siteConfig.url}/${locale}`,
    telephone: '+1-438-867-8770',
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Montreal',
      addressRegion: 'QC',
      addressCountry: 'CA'
    },
    areaServed: ['Montreal', 'Laval', 'Longueuil', 'West Island', 'South Shore'],
    priceRange: '$$'
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(data)}} />;
}

import type {Metadata} from 'next';

const BASE = 'https://sparklingstays.com';

export function makeMeta({
  title, titleFr, desc, descFr, path, locale
}: {
  title: string; titleFr: string; desc: string; descFr: string; path: string; locale: string;
}): Metadata {
  const isFr = locale === 'fr';
  const alt = isFr ? 'en' : 'fr';
  const canonical = `${BASE}/${locale}${path}`;
  const alternate = `${BASE}/${alt}${path}`;
  return {
    title: isFr ? titleFr : title,
    description: isFr ? descFr : desc,
    alternates: {
      canonical,
      languages: {en: `${BASE}/en${path}`, fr: `${BASE}/fr${path}`}
    },
    openGraph: {
      title: isFr ? titleFr : title,
      description: isFr ? descFr : desc,
      url: canonical,
      siteName: 'Sparkling Stays',
      locale: isFr ? 'fr_CA' : 'en_CA',
      type: 'website'
    }
  };
}

export function localBusinessSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE}/#business`,
    name: 'Sparkling Stays',
    url: BASE,
    telephone: '+1-438-867-8770',
    email: 'info@sparklingstays.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Montreal',
      addressRegion: 'QC',
      addressCountry: 'CA'
    },
    areaServed: [
      {'@type': 'City', name: 'Montreal'},
      {'@type': 'City', name: 'Laval'},
      {name: 'West Island'},
      {name: 'South Shore'}
    ],
    priceRange: '$$'
  };
}

export function serviceSchema(name: string, desc: string, slug: string, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description: desc,
    provider: {'@id': `${BASE}/#business`},
    url: `${BASE}/${locale}/services/${slug}`,
    areaServed: {
      '@type': 'Place',
      name: 'Greater Montreal, QC, Canada'
    }
  };
}

export function faqSchema(items: {q: string; a: string}[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(i => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: {'@type': 'Answer', text: i.a}
    }))
  };
}

export function breadcrumbSchema(items: {name: string; url: string}[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function JsonLd({data}: {data: object | object[]}) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(d)}} />
      ))}
    </>
  );
}

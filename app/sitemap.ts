import type {MetadataRoute} from 'next';
import services from '@/content/services.json';
import neighborhoods from '@/content/neighborhoods.json';

const BASE = 'https://sparklingstays.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const entries: MetadataRoute.Sitemap = [];

  const locales = ['en', 'fr'];
  const corePages = ['', '/about', '/contact', '/faq', '/book-now', '/pricing', '/services', '/areas'];
  const hubs = ['montreal', 'laval', 'west-island', 'south-shore'];

  for (const locale of locales) {
    for (const page of corePages) {
      entries.push({url: `${BASE}/${locale}${page}`, lastModified: now, changeFrequency: 'weekly', priority: page === '' ? 1 : 0.8});
    }
    for (const svc of services) {
      entries.push({url: `${BASE}/${locale}/services/${svc.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.7});
    }
    for (const hub of hubs) {
      entries.push({url: `${BASE}/${locale}/areas/${hub}`, lastModified: now, changeFrequency: 'monthly', priority: 0.7});
    }
    for (const n of neighborhoods) {
      entries.push({url: `${BASE}/${locale}/areas/${n.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6});
    }
  }

  return entries;
}

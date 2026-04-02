import type {MetadataRoute} from 'next';
import {routing} from '@/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: `https://sparklingstays.com/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1
  }));
}

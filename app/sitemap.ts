import type {MetadataRoute} from 'next';
import {siteConfig} from '@/lib/seo';

const routes = ['', '/services', '/areas', '/pricing', '/book-now', '/about', '/contact', '/faq'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ['en', 'fr'].flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteConfig.url}/${locale}${route}`,
      lastModified: now,
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1 : 0.8,
      alternates: {
        languages: {
          'en-CA': `${siteConfig.url}/en${route}`,
          'fr-CA': `${siteConfig.url}/fr${route}`
        }
      }
    }))
  );
}

export const siteConfig = {
  name: 'Sparkling Stays',
  url: 'https://sparklingstays.com',
  phone: '438-867-8770',
  phoneHref: 'tel:+14388678770',
  email: 'info@sparklingstays.com',
  description:
    'Professional residential and commercial cleaning services across Montreal, Laval, West Island, and the South Shore.',
  defaultLocale: 'en',
  locales: ['en', 'fr'] as const
};

export function getCanonical(locale: string, pathname = '') {
  return `${siteConfig.url}/${locale}${pathname}`.replace(/\/$/, '') || siteConfig.url;
}

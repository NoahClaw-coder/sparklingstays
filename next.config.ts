import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./lib/request.ts');

const config: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // ===== PRIORITY REDIRECTS (GSC data: 5+ clicks) =====

      // 219 clicks, 13,811 impressions — top traffic page
      { source: '/prix-femme-de-menage-montreal-2-heures-par-semaine', destination: '/fr/pricing', permanent: true },
      { source: '/prix-femme-de-menage-montreal-2-heures-par-semaine/', destination: '/fr/pricing', permanent: true },

      // 35 clicks, 3,053 impressions — FR blog post → services hub
      { source: '/fr/comment-nettoyer-une-baignoire-sans-frotter', destination: '/fr/services', permanent: true },
      { source: '/fr/comment-nettoyer-une-baignoire-sans-frotter/', destination: '/fr/services', permanent: true },

      // 26 clicks, 6,099 impressions — EN blog post → services hub
      { source: '/bathtub-cleaning-without-scrubbing', destination: '/en/services', permanent: true },
      { source: '/bathtub-cleaning-without-scrubbing/', destination: '/en/services', permanent: true },

      // 13 clicks, 2,676 impressions — DDO neighborhood page
      { source: '/house-cleaning-services-in-dollard-des-ormeaux-ddo', destination: '/en/areas/dollard-des-ormeaux', permanent: true },
      { source: '/house-cleaning-services-in-dollard-des-ormeaux-ddo/', destination: '/en/areas/dollard-des-ormeaux', permanent: true },

      // ===== SERVICE PAGE REDIRECTS =====
      { source: '/cleaning-services-montreal', destination: '/en/services', permanent: true },
      { source: '/cleaning-services-montreal/', destination: '/en/services', permanent: true },
      { source: '/deep-cleaning-montreal', destination: '/en/services/deep-cleaning', permanent: true },
      { source: '/deep-cleaning-montreal/', destination: '/en/services/deep-cleaning', permanent: true },
      { source: '/move-in-out-cleaning-montreal', destination: '/en/services/move-in-out-cleaning', permanent: true },
      { source: '/move-in-out-cleaning-montreal/', destination: '/en/services/move-in-out-cleaning', permanent: true },
      { source: '/airbnb-cleaning-montreal', destination: '/en/services/airbnb-cleaning', permanent: true },
      { source: '/airbnb-cleaning-montreal/', destination: '/en/services/airbnb-cleaning', permanent: true },
      { source: '/post-renovation-cleaning', destination: '/en/services/post-renovation-cleaning', permanent: true },
      { source: '/post-renovation-cleaning/', destination: '/en/services/post-renovation-cleaning', permanent: true },
      { source: '/post-renovation-cleaning-montreal', destination: '/en/services/post-renovation-cleaning', permanent: true },
      { source: '/post-renovation-cleaning-montreal/', destination: '/en/services/post-renovation-cleaning', permanent: true },
      { source: '/recurring-cleaning', destination: '/en/services/recurring-cleaning', permanent: true },
      { source: '/recurring-cleaning/', destination: '/en/services/recurring-cleaning', permanent: true },
      { source: '/recurring-cleaning-montreal', destination: '/en/services/recurring-cleaning', permanent: true },
      { source: '/recurring-cleaning-montreal/', destination: '/en/services/recurring-cleaning', permanent: true },

      // ===== AREA PAGE REDIRECTS =====
      { source: '/ndg-cleaning-services', destination: '/en/areas/ndg', permanent: true },
      { source: '/ndg-cleaning-services/', destination: '/en/areas/ndg', permanent: true },
      { source: '/plateau-cleaning-services', destination: '/en/areas/plateau-mont-royal', permanent: true },
      { source: '/plateau-cleaning-services/', destination: '/en/areas/plateau-mont-royal', permanent: true },
      { source: '/westmount-cleaning-services', destination: '/en/areas/westmount', permanent: true },
      { source: '/westmount-cleaning-services/', destination: '/en/areas/westmount', permanent: true },
      { source: '/laval-cleaning-services', destination: '/en/areas/laval', permanent: true },
      { source: '/laval-cleaning-services/', destination: '/en/areas/laval', permanent: true },
      { source: '/brossard-cleaning-services', destination: '/en/areas/brossard', permanent: true },
      { source: '/brossard-cleaning-services/', destination: '/en/areas/brossard', permanent: true },
      { source: '/west-island-cleaning-services', destination: '/en/areas/west-island', permanent: true },
      { source: '/west-island-cleaning-services/', destination: '/en/areas/west-island', permanent: true },

      // ===== PRICING / QUOTE REDIRECTS =====
      { source: '/prix-nettoyage-montreal', destination: '/fr/pricing', permanent: true },
      { source: '/prix-nettoyage-montreal/', destination: '/fr/pricing', permanent: true },
      { source: '/quote', destination: '/en/book-now', permanent: true },
      { source: '/quote/', destination: '/en/book-now', permanent: true },

      // ===== OLD NAV / STRUCTURAL REDIRECTS =====
      { source: '/book-now', destination: '/en/book-now', permanent: true },
      { source: '/book-now/', destination: '/en/book-now', permanent: true },
      { source: '/contact', destination: '/en/contact', permanent: true },
      { source: '/contact/', destination: '/en/contact', permanent: true },
      { source: '/services', destination: '/en/services', permanent: true },
      { source: '/services/', destination: '/en/services', permanent: true },
      { source: '/blog', destination: '/en/blog', permanent: true },
      { source: '/blog/', destination: '/en/blog', permanent: true },

      // ===== OLD LOCALE PREFIX REDIRECTS =====
      { source: '/en', destination: '/en', permanent: true },
      { source: '/en/', destination: '/en', permanent: true },
      { source: '/fr', destination: '/fr', permanent: true },
      { source: '/fr/', destination: '/fr', permanent: true },
    ];
  },
};

export default withNextIntl(config);

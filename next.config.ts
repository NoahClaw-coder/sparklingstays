import createNextIntlPlugin from 'next-intl/plugin';
import redirects from './content/data/redirects.json';

const withNextIntl = createNextIntlPlugin('./lib/request.ts');

export default withNextIntl({
  images: {
    remotePatterns: []
  },
  reactStrictMode: true,
  trailingSlash: false,
  async redirects() {
    return redirects.map((item) => ({...item, permanent: true}));
  }
});

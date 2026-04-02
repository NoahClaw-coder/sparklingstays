import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/request.ts');

export default withNextIntl({
  reactStrictMode: true
});

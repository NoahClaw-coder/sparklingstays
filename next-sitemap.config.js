/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://sparklingstays.com',
  generateRobotsTxt: false,
  alternateRefs: [
    {href: 'https://sparklingstays.com/en', hreflang: 'en-CA'},
    {href: 'https://sparklingstays.com/fr', hreflang: 'fr-CA'}
  ]
};

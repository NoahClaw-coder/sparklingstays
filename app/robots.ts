import type {MetadataRoute} from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {userAgent: '*', allow: '/'},
      {userAgent: 'GPTBot', allow: '/'},
      {userAgent: 'ChatGPT-User', allow: '/'},
      {userAgent: 'Google-Extended', allow: '/'},
      {userAgent: 'ClaudeBot', allow: '/'},
      {userAgent: 'PerplexityBot', allow: '/'},
      {userAgent: 'Amazonbot', allow: '/'},
      {userAgent: 'anthropic-ai', allow: '/'},
      {userAgent: 'Bytespider', allow: '/'},
      {userAgent: 'cohere-ai', allow: '/'}
    ],
    sitemap: 'https://sparklingstays.com/sitemap.xml'
  };
}

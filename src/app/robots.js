import { MetadataRoute } from 'next';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Disallow keeps bots out of internal folders if you add them later
      disallow: ['/api/', '/admin/'], 
    },
    sitemap: 'https://acadpack.fastwebcm.org/sitemap.xml',
  };
}

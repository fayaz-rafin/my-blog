import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/resume/'],
    },
    sitemap: 'https://fayazrafin.xyz/sitemap.xml',
  }
}

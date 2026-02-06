import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/auth/', '/profile/edit', '/posts/new', '/posts/*/edit'],
      },
      {
        userAgent: ['Googlebot', 'Yeti'],
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

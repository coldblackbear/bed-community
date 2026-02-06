import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'
import { ALL_CATEGORIES } from '@/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const supabase = await createClient()

  // Static pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  // Category pages
  ALL_CATEGORIES.forEach((category) => {
    routes.push({
      url: `${baseUrl}/posts?category=${category.value}`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8,
    })
  })

  // Dynamic post pages
  const { data: posts } = await supabase
    .from('posts')
    .select('id, updated_at')
    .order('created_at', { ascending: false })

  if (posts) {
    posts.forEach((post: { id: string; updated_at: string }) => {
      routes.push({
        url: `${baseUrl}/posts/${post.id}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: 'daily',
        priority: 0.7,
      })
    })
  }

  return routes
}

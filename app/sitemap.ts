import { MetadataRoute } from 'next'

import { getBlogPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fayazrafin.xyz'

  // Static routes with their priorities and change frequencies
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/now`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Dynamic blog post routes
  const blogRoutes: MetadataRoute.Sitemap = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.dateIso),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes]
}

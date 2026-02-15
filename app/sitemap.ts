import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ers-pcte.vercel.app'
  
  // Query events and achievements
  // We fetch only the fields we need to keep the payload small
  const query = `*[_type in ["event", "achievement"] && defined(slug.current)] {
    _type,
    "slug": slug.current,
    "lastModified": _updatedAt
  }`

  const items = await client.fetch(query)

  const events = items
    .filter((item: any) => item._type === 'event')
    .map((item: any) => ({
      url: `${baseUrl}/events/${item.slug}`,
      lastModified: new Date(item.lastModified),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  const achievements = items
    .filter((item: any) => item._type === 'achievement')
    .map((item: any) => ({
      url: `${baseUrl}/achievements/${item.slug}`,
      lastModified: new Date(item.lastModified),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...events,
    ...achievements,
  ]
}

import { createClient } from '@/lib/supabase/server'
import { Post } from '@/types'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, content, category, created_at, updated_at')
    .order('created_at', { ascending: false })
    .limit(50)

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>침대 커뮤니티</title>
    <link>${baseUrl}</link>
    <description>침대, 매트리스, 침구류 정보 공유 커뮤니티</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${
      posts
        ?.map(
          (post: Post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/posts/${post.id}</link>
      <description><![CDATA[${post.content.substring(0, 200)}...]]></description>
      <category>${post.category}</category>
      <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
      <guid isPermaLink="true">${baseUrl}/posts/${post.id}</guid>
    </item>`
        )
        .join('') || ''
    }
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  })
}

import { notFound } from 'next/navigation'
import { getPost } from '@/lib/actions/posts'
import { getComments } from '@/lib/actions/comments'
import { createClient } from '@/lib/supabase/server'
import { getCategoryLabel } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Eye, Calendar } from 'lucide-react'
import MarkdownRenderer from '@/components/post/markdown-renderer'
import PostActions from '@/components/post/post-actions'
import { CommentSection } from '@/components/comment/comment-section'
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('posts')
    .select('title, content, created_at, updated_at, author:profiles(nickname)')
    .eq('id', id)
    .single()

  if (!post) {
    return {
      title: '게시글을 찾을 수 없습니다',
    }
  }

  const description = post.content.substring(0, 160).replace(/[#*\n]/g, ' ').trim()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return {
    title: post.title,
    description,
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      publishedTime: post.created_at,
      modifiedTime: post.updated_at || post.created_at,
      authors: [post.author?.nickname || 'Anonymous'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
    },
    alternates: {
      canonical: `${siteUrl}/posts/${id}`,
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPost(id)

  if (!post) {
    notFound()
  }

  const comments = await getComments(id)
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Check if current user liked this post
  let isLiked = false
  if (user) {
    const { data: like } = await supabase
      .from('likes')
      .select()
      .eq('post_id', id)
      .eq('user_id', user.id)
      .single()

    isLiked = !!like
  }

  const isAuthor = user?.id === post.author_id

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const postUrl = `${siteUrl}/posts/${id}`
  const categoryLabel = getCategoryLabel(post.category)

  return (
    <>
      <ArticleJsonLd
        headline={post.title}
        datePublished={post.created_at}
        dateModified={post.updated_at || post.created_at}
        author={{
          name: post.author?.nickname || 'Anonymous',
        }}
        description={post.content.slice(0, 200)}
        url={postUrl}
      />
      <BreadcrumbJsonLd
        items={[
          { name: '홈', url: siteUrl },
          { name: categoryLabel, url: `${siteUrl}?category=${post.category}` },
          { name: post.title, url: postUrl },
        ]}
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Post header */}
      <div className="mb-8">
        <Badge className="mb-4">{categoryLabel}</Badge>
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

        {/* Author info */}
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={post.author?.avatar_url || undefined}
              alt={post.author?.nickname || 'User'}
            />
            <AvatarFallback>
              {post.author?.nickname?.charAt(0)?.toUpperCase() ?? '?'}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{post.author?.nickname}</div>
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.created_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>조회 {post.view_count}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Post content */}
      <div className="mb-8">
        <MarkdownRenderer content={post.content} />
      </div>

      <Separator className="mb-8" />

      {/* Actions */}
      <div className="mb-8">
        <PostActions
          postId={post.id}
          initialLikeCount={post.like_count || 0}
          initialLiked={isLiked}
          isAuthor={isAuthor}
        />
      </div>

      <Separator className="mb-8" />

      {/* Comments */}
      <div id="comments" className="mb-8">
        <h2 className="text-2xl font-bold mb-6">
          댓글 {comments.length}개
        </h2>
        <CommentSection
          postId={id}
          initialComments={comments}
          currentUserId={user?.id}
          showForm={!!user}
        />
      </div>
    </div>
    </>
  )
}

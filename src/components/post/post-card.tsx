'use client'

import Link from 'next/link'
import { Post } from '@/types'
import { getCategoryLabel } from '@/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Eye, Heart, MessageCircle } from 'lucide-react'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (minutes < 1) return '방금 전'
    if (minutes < 60) return `${minutes}분 전`
    if (hours < 24) return `${hours}시간 전`
    if (days < 7) return `${days}일 전`
    return date.toLocaleDateString('ko-KR')
  }

  return (
    <Link href={`/posts/${post.id}`}>
      <Card className="p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full">
        <div className="flex flex-col gap-3">
          {/* Category badge */}
          <Badge variant="secondary" className="w-fit">
            {getCategoryLabel(post.category)}
          </Badge>

          {/* Title */}
          <h3 className="text-lg font-semibold line-clamp-2 hover:text-blue-600 transition-colors">
            {post.title}
          </h3>

          {/* Author info */}
          <div className="flex items-center gap-2">
            <Link
              href={`/profile/${post.author_id}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <Avatar className="w-6 h-6">
                <AvatarImage
                  src={post.author?.avatar_url || undefined}
                  alt={post.author?.nickname || 'User'}
                />
                <AvatarFallback>
                  {post.author?.nickname?.charAt(0)?.toUpperCase() ?? '?'}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {post.author?.nickname}
              </span>
            </Link>
            <span className="text-sm text-gray-400 dark:text-gray-500">·</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(post.created_at)}
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{post.view_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{post.like_count || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comment_count || 0}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

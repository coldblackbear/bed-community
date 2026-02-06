'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { CommentForm } from './comment-form'
import { deleteComment } from '@/lib/actions/comments'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Comment } from '@/types'
import { useRouter } from 'next/navigation'

interface CommentListProps {
  postId: string
  initialComments: Comment[]
  currentUserId?: string | null
}

export function CommentList({ postId, initialComments, currentUserId }: CommentListProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const router = useRouter()

  const handleDelete = async (commentId: string) => {
    if (!confirm('정말 이 댓글을 삭제하시겠습니까?')) {
      return
    }

    const result = await deleteComment(commentId)
    if (result.success) {
      router.refresh()
    } else {
      alert(result.error || '댓글 삭제에 실패했습니다.')
    }
  }

  const handleReplySubmit = () => {
    setReplyingTo(null)
    router.refresh()
  }

  // Organize comments into parent-child structure
  const rootComments = initialComments.filter((c) => !c.parent_id)
  const getReplies = (parentId: string) =>
    initialComments.filter((c) => c.parent_id === parentId)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return '방금 전'
    if (minutes < 60) return `${minutes}분 전`
    if (hours < 24) return `${hours}시간 전`
    if (days < 7) return `${days}일 전`
    return date.toLocaleDateString('ko-KR')
  }

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => {
    const initials = comment.author?.nickname
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || '?'

    const isAuthor = currentUserId === comment.author_id

    return (
      <div className={`${isReply ? 'ml-12 mt-4' : ''}`}>
        <div className="flex gap-3">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={comment.author?.avatar_url || undefined} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm">{comment.author?.nickname || '알 수 없음'}</span>
              <span className="text-xs text-gray-500">{formatDate(comment.created_at)}</span>
            </div>

            <div className="prose prose-sm max-w-none mb-2">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {comment.content}
              </ReactMarkdown>
            </div>

            <div className="flex gap-2">
              {!isReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                >
                  답글
                </Button>
              )}
              {isAuthor && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(comment.id)}
                >
                  삭제
                </Button>
              )}
            </div>

            {replyingTo === comment.id && (
              <div className="mt-3">
                <CommentForm
                  postId={postId}
                  parentId={comment.id}
                  onSubmit={handleReplySubmit}
                  onCancel={() => setReplyingTo(null)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Render replies */}
        {!isReply && getReplies(comment.id).map((reply) => (
          <div key={reply.id} className="mt-4">
            <CommentItem comment={reply} isReply />
          </div>
        ))}
      </div>
    )
  }

  if (initialComments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        첫 댓글을 작성해보세요!
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {rootComments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

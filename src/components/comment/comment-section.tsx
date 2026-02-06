'use client'

import { useRouter } from 'next/navigation'
import { CommentForm } from './comment-form'
import { CommentList } from './comment-list'
import { Comment } from '@/types'

interface CommentSectionProps {
  postId: string
  initialComments: Comment[]
  currentUserId?: string
  showForm: boolean
}

export function CommentSection({
  postId,
  initialComments,
  currentUserId,
  showForm,
}: CommentSectionProps) {
  const router = useRouter()

  const handleCommentSubmit = () => {
    router.refresh()
  }

  return (
    <>
      {showForm && (
        <div className="mb-6">
          <CommentForm postId={postId} onSubmit={handleCommentSubmit} />
        </div>
      )}
      <CommentList
        postId={postId}
        initialComments={initialComments}
        currentUserId={currentUserId}
      />
    </>
  )
}

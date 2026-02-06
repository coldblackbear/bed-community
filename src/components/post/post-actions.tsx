'use client'

import { useState, useTransition } from 'react'
import { toggleLike, deletePost } from '@/lib/actions/posts'
import { Button } from '@/components/ui/button'
import { Heart, Edit, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface PostActionsProps {
  postId: string
  initialLikeCount: number
  initialLiked: boolean
  isAuthor: boolean
}

export default function PostActions({
  postId,
  initialLikeCount,
  initialLiked,
  isAuthor,
}: PostActionsProps) {
  const [liked, setLiked] = useState(initialLiked)
  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const [isPending, startTransition] = useTransition()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const router = useRouter()

  const handleLike = () => {
    startTransition(async () => {
      try {
        const result = await toggleLike(postId)
        setLiked(result.liked)
        setLikeCount(result.likeCount)
      } catch (error) {
        console.error('Failed to toggle like:', error)
        alert(error instanceof Error ? error.message : '좋아요 처리에 실패했습니다')
      }
    })
  }

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const result = await deletePost(postId)
        if (result.success) {
          router.push('/posts')
        }
      } catch (error) {
        console.error('Failed to delete post:', error)
        alert(error instanceof Error ? error.message : '삭제에 실패했습니다')
      }
    })
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        variant={liked ? 'default' : 'outline'}
        size="lg"
        onClick={handleLike}
        disabled={isPending}
        className="flex items-center gap-2"
      >
        <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
        좋아요 {likeCount}
      </Button>

      {isAuthor && (
        <>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push(`/posts/${postId}/edit`)}
            className="flex items-center gap-2"
          >
            <Edit className="w-5 h-5" />
            수정
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowDeleteDialog(true)}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-5 h-5" />
            삭제
          </Button>

          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>게시글 삭제</DialogTitle>
                <DialogDescription>
                  정말로 이 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수
                  없습니다.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteDialog(false)}
                >
                  취소
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isPending}
                >
                  삭제
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  )
}

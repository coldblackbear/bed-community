'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { createComment } from '@/lib/actions/comments'

interface CommentFormProps {
  postId: string
  parentId?: string | null
  onSubmit?: () => void
  onCancel?: () => void
}

export function CommentForm({ postId, parentId = null, onSubmit, onCancel }: CommentFormProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) {
      setError('내용을 입력해주세요.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const result = await createComment({
        postId,
        content: content.trim(),
        parentId,
      })

      if (result.success) {
        setContent('')
        onSubmit?.()
      } else {
        setError(result.error || '댓글 작성에 실패했습니다.')
      }
    } catch (err) {
      setError('댓글 작성 중 오류가 발생했습니다.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
          {error}
        </div>
      )}

      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={parentId ? '답글을 입력하세요...' : '댓글을 입력하세요... (마크다운 지원)'}
        className="min-h-24 resize-none"
        disabled={isSubmitting}
      />

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            취소
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting || !content.trim()}>
          {isSubmitting ? '작성 중...' : parentId ? '답글 작성' : '댓글 작성'}
        </Button>
      </div>
    </form>
  )
}

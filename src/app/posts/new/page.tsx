'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createPost } from '@/lib/actions/posts'
import { createClient } from '@/lib/supabase/client'
import { ALL_CATEGORIES, Category } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import dynamic from 'next/dynamic'
import MarkdownRenderer from '@/components/post/markdown-renderer'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export default function NewPostPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState<Category>('free')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)

      if (!user) {
        setError('로그인이 필요합니다')
      }
    }

    checkAuth()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      setError('제목을 입력해주세요')
      return
    }

    if (!content.trim()) {
      setError('내용을 입력해주세요')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const post = await createPost({
        title: title.trim(),
        content: content.trim(),
        category,
      })

      router.push(`/posts/${post.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : '게시글 작성에 실패했습니다')
      setIsSubmitting(false)
    }
  }

  if (isAuthenticated === null) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center py-12">로딩 중...</div>
      </div>
    )
  }

  if (isAuthenticated === false) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">로그인이 필요합니다</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            게시글을 작성하려면 먼저 로그인해주세요.
          </p>
          <Button asChild>
            <Link href="/auth/login">로그인하러 가기</Link>
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/posts">
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">새 게시글 작성</h1>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Category select */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">카테고리</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          >
            {ALL_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Title input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">제목</label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            disabled={isSubmitting}
            className="text-lg"
          />
        </div>

        {/* Content editor with preview */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">내용</label>
          <Tabs defaultValue="edit" className="w-full">
            <TabsList>
              <TabsTrigger value="edit">편집</TabsTrigger>
              <TabsTrigger value="preview">미리보기</TabsTrigger>
            </TabsList>

            <TabsContent value="edit" className="mt-4">
              <div data-color-mode="light" className="dark:hidden">
                <MDEditor
                  value={content}
                  onChange={(val) => setContent(val || '')}
                  height={400}
                  preview="edit"
                  hideToolbar={false}
                  enableScroll={true}
                  textareaProps={{
                    placeholder: '마크다운 형식으로 작성하세요...',
                  }}
                />
              </div>
              <div data-color-mode="dark" className="hidden dark:block">
                <MDEditor
                  value={content}
                  onChange={(val) => setContent(val || '')}
                  height={400}
                  preview="edit"
                  hideToolbar={false}
                  enableScroll={true}
                  textareaProps={{
                    placeholder: '마크다운 형식으로 작성하세요...',
                  }}
                />
              </div>
            </TabsContent>

            <TabsContent value="preview" className="mt-4">
              <Card className="p-6 min-h-[400px]">
                {content ? (
                  <MarkdownRenderer content={content} />
                ) : (
                  <div className="text-gray-400 dark:text-gray-500 text-center py-12">
                    미리보기할 내용이 없습니다
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Submit button */}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" disabled={isSubmitting} asChild>
            <Link href="/posts">취소</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '작성 중...' : '작성 완료'}
          </Button>
        </div>
      </form>
    </div>
  )
}

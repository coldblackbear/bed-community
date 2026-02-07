import { getPosts } from '@/lib/actions/posts'
import { ALL_CATEGORIES, Category, getCategoryLabel } from '@/types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, PlusCircle, Eye, Heart, MessageCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

interface SearchParams {
  category?: Category
  q?: string
  page?: string
  sort?: 'latest' | 'popular'
  author?: string
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}): Promise<Metadata> {
  const params = await searchParams
  const category = params.category
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  if (category) {
    const categoryLabel = getCategoryLabel(category)
    return {
      title: categoryLabel,
      description: `${categoryLabel} 관련 게시글 모음`,
      openGraph: {
        title: `${categoryLabel} - 침대 커뮤니티`,
        description: `${categoryLabel} 관련 게시글 모음`,
      },
      alternates: { canonical: `${siteUrl}/posts?category=${category}` },
    }
  }

  return {
    title: '게시글 목록',
    description: '침대 커뮤니티의 모든 게시글을 확인하세요',
    alternates: { canonical: `${siteUrl}/posts` },
  }
}

function formatDate(dateString: string) {
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

  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  if (date.getFullYear() === now.getFullYear()) return `${m}.${d}`
  return `${date.getFullYear()}.${m}.${d}`
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const category = params.category
  const search = params.q
  const page = parseInt(params.page || '1')
  const sort = params.sort || 'latest'
  const author = params.author

  let authorId: string | undefined
  if (author === 'me') {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    authorId = user?.id
  }

  const pageSize = 20
  const { posts, totalCount } = await getPosts({
    category,
    search,
    page,
    pageSize,
    sort,
    authorId,
  })

  const totalPages = Math.ceil(totalCount / pageSize)

  const buildUrl = (newParams: Partial<SearchParams>) => {
    const query = new URLSearchParams()
    const finalParams = { ...params, ...newParams }
    if (finalParams.category) query.set('category', finalParams.category)
    if (finalParams.q) query.set('q', finalParams.q)
    if (finalParams.page && finalParams.page !== '1') query.set('page', finalParams.page)
    if (finalParams.sort && finalParams.sort !== 'latest') query.set('sort', finalParams.sort)
    if (finalParams.author) query.set('author', finalParams.author)
    return `/posts${query.toString() ? `?${query.toString()}` : ''}`
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {author === 'me' ? '내 글' : '커뮤니티'}
        </h1>
        <Button size="sm" asChild>
          <Link href="/posts/new">
            <PlusCircle className="w-4 h-4 mr-1" />
            글쓰기
          </Link>
        </Button>
      </div>

      {search && (
        <div className="text-sm text-muted-foreground">
          &quot;{search}&quot; 검색 결과: {totalCount}개
        </div>
      )}

      {/* Category tabs */}
      <div className="overflow-x-auto">
        <div className="inline-flex h-9 items-center rounded-lg bg-muted p-[3px] text-muted-foreground">
          <Link
            href={buildUrl({ category: undefined, page: '1' })}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all ${
              !category
                ? 'bg-background text-foreground shadow-sm'
                : 'hover:bg-accent/50 hover:text-foreground'
            }`}
          >
            전체
          </Link>
          {ALL_CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={buildUrl({ category: cat.value, page: '1' })}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all ${
                category === cat.value
                  ? 'bg-background text-foreground shadow-sm'
                  : 'hover:bg-accent/50 hover:text-foreground'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="flex justify-end gap-2">
        <Button variant={sort === 'latest' ? 'default' : 'outline'} size="sm" asChild>
          <Link href={buildUrl({ sort: 'latest', page: '1' })}>최신순</Link>
        </Button>
        <Button variant={sort === 'popular' ? 'default' : 'outline'} size="sm" asChild>
          <Link href={buildUrl({ sort: 'popular', page: '1' })}>인기순</Link>
        </Button>
      </div>

      {/* Post table */}
      {posts.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">게시글이 없습니다</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b">
                  <th className="py-2.5 px-3 text-left font-medium text-muted-foreground w-20">카테고리</th>
                  <th className="py-2.5 px-3 text-left font-medium text-muted-foreground">제목</th>
                  <th className="py-2.5 px-3 text-left font-medium text-muted-foreground w-24">글쓴이</th>
                  <th className="py-2.5 px-3 text-center font-medium text-muted-foreground w-20">날짜</th>
                  <th className="py-2.5 px-3 text-center font-medium text-muted-foreground w-16">조회</th>
                  <th className="py-2.5 px-3 text-center font-medium text-muted-foreground w-14">추천</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-2.5 px-3">
                      <span className="text-xs text-muted-foreground">
                        {getCategoryLabel(post.category)}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <Link
                        href={`/posts/${post.id}`}
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-1"
                      >
                        {post.title}
                        {(post.comment_count ?? 0) > 0 && (
                          <span className="ml-1.5 text-xs text-blue-500 font-medium">
                            [{post.comment_count}]
                          </span>
                        )}
                      </Link>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="text-xs text-muted-foreground truncate block max-w-[90px]">
                        {post.author?.nickname ?? '익명'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="text-xs text-muted-foreground">
                        {formatDate(post.created_at)}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="text-xs text-muted-foreground">{post.view_count}</span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`text-xs ${(post.like_count ?? 0) > 0 ? 'text-red-500 font-medium' : 'text-muted-foreground'}`}>
                        {post.like_count ?? 0}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile list */}
          <div className="md:hidden divide-y border rounded-lg overflow-hidden">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="block px-4 py-3 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                    {getCategoryLabel(post.category)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {post.author?.nickname ?? '익명'}
                  </span>
                </div>
                <p className="text-sm font-medium line-clamp-1">
                  {post.title}
                  {(post.comment_count ?? 0) > 0 && (
                    <span className="ml-1 text-xs text-blue-500 font-medium">
                      [{post.comment_count}]
                    </span>
                  )}
                </p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                  <span>{formatDate(post.created_at)}</span>
                  <span className="flex items-center gap-0.5">
                    <Eye className="w-3 h-3" /> {post.view_count}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Heart className="w-3 h-3" /> {post.like_count ?? 0}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <MessageCircle className="w-3 h-3" /> {post.comment_count ?? 0}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            className={page === 1 ? 'pointer-events-none opacity-50' : ''}
            asChild={page !== 1}
          >
            {page === 1 ? (
              <span><ChevronLeft className="w-4 h-4" /></span>
            ) : (
              <Link href={buildUrl({ page: String(page - 1) })}>
                <ChevronLeft className="w-4 h-4" />
              </Link>
            )}
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              if (p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1)) {
                return (
                  <Button key={p} variant={p === page ? 'default' : 'outline'} size="sm" className="w-10" asChild>
                    <Link href={buildUrl({ page: String(p) })}>{p}</Link>
                  </Button>
                )
              } else if (p === page - 2 || p === page + 2) {
                return <span key={p} className="px-2 flex items-center">...</span>
              }
              return null
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
            asChild={page !== totalPages}
          >
            {page === totalPages ? (
              <span><ChevronRight className="w-4 h-4" /></span>
            ) : (
              <Link href={buildUrl({ page: String(page + 1) })}>
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}

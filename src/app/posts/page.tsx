import { getPosts } from '@/lib/actions/posts'
import { ALL_CATEGORIES, Category, getCategoryLabel } from '@/types'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import PostCard from '@/components/post/post-card'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react'
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
      twitter: {
        card: 'summary_large_image',
        title: `${categoryLabel} - 침대 커뮤니티`,
        description: `${categoryLabel} 관련 게시글 모음`,
      },
      alternates: {
        canonical: `${siteUrl}/posts?category=${category}`,
      },
    }
  }

  return {
    title: '게시글 목록',
    description: '침대 커뮤니티의 모든 게시글을 확인하세요',
    openGraph: {
      title: '게시글 목록 - 침대 커뮤니티',
      description: '침대 커뮤니티의 모든 게시글을 확인하세요',
    },
    twitter: {
      card: 'summary_large_image',
      title: '게시글 목록 - 침대 커뮤니티',
      description: '침대 커뮤니티의 모든 게시글을 확인하세요',
    },
    alternates: {
      canonical: `${siteUrl}/posts`,
    },
  }
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

  // Get current user if author filter is "me"
  let authorId: string | undefined
  if (author === 'me') {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    authorId = user?.id
  }

  const { posts, totalCount } = await getPosts({
    category,
    search,
    page,
    pageSize: 12,
    sort,
    authorId,
  })

  const totalPages = Math.ceil(totalCount / 12)

  const buildUrl = (newParams: Partial<SearchParams>) => {
    const query = new URLSearchParams()
    const finalParams = { ...params, ...newParams }

    if (finalParams.category) query.set('category', finalParams.category)
    if (finalParams.q) query.set('q', finalParams.q)
    if (finalParams.page && finalParams.page !== '1')
      query.set('page', finalParams.page)
    if (finalParams.sort && finalParams.sort !== 'latest')
      query.set('sort', finalParams.sort)

    return `/posts${query.toString() ? `?${query.toString()}` : ''}`
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {author === 'me' ? '내 글' : '커뮤니티'}
        </h1>
        <Button asChild>
          <Link href="/posts/new">
            <PlusCircle className="w-4 h-4 mr-2" />
            글쓰기
          </Link>
        </Button>
      </div>

      {/* Search query display */}
      {search && (
        <div className="mb-4 text-gray-600 dark:text-gray-400">
          &quot;{search}&quot; 검색 결과: {totalCount}개
        </div>
      )}

      {/* Category tabs */}
      <div className="mb-6">
        <div className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-[3px] text-muted-foreground">
          <Link
            href={buildUrl({ category: undefined, page: '1' })}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
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
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
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

      {/* Sort toggle */}
      <div className="flex justify-end mb-6 gap-2">
        <Button variant={sort === 'latest' ? 'default' : 'outline'} size="sm" asChild>
          <Link href={buildUrl({ sort: 'latest', page: '1' })}>
            최신순
          </Link>
        </Button>
        <Button
          variant={sort === 'popular' ? 'default' : 'outline'}
          size="sm"
          asChild
        >
          <Link href={buildUrl({ sort: 'popular', page: '1' })}>
            인기순
          </Link>
        </Button>
      </div>

      {/* Posts grid */}
      {posts.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          <p className="text-lg">게시글이 없습니다</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            className={page === 1 ? 'pointer-events-none opacity-50' : ''}
            asChild={page !== 1}
          >
            {page === 1 ? (
              <span>
                <ChevronLeft className="w-4 h-4" />
              </span>
            ) : (
              <Link href={buildUrl({ page: String(Math.max(1, page - 1)) })}>
                <ChevronLeft className="w-4 h-4" />
              </Link>
            )}
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              // Show first, last, current, and adjacent pages
              if (
                p === 1 ||
                p === totalPages ||
                (p >= page - 1 && p <= page + 1)
              ) {
                return (
                  <Button
                    key={p}
                    variant={p === page ? 'default' : 'outline'}
                    size="sm"
                    className="w-10"
                    asChild
                  >
                    <Link href={buildUrl({ page: String(p) })}>{p}</Link>
                  </Button>
                )
              } else if (p === page - 2 || p === page + 2) {
                return (
                  <span key={p} className="px-2 flex items-center">
                    ...
                  </span>
                )
              }
              return null
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            className={
              page === totalPages ? 'pointer-events-none opacity-50' : ''
            }
            asChild={page !== totalPages}
          >
            {page === totalPages ? (
              <span>
                <ChevronRight className="w-4 h-4" />
              </span>
            ) : (
              <Link
                href={buildUrl({ page: String(Math.min(totalPages, page + 1)) })}
              >
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}

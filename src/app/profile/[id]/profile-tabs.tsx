'use client'

import { Post } from '@/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PostCard from '@/components/post/post-card'
import { useRouter, useSearchParams } from 'next/navigation'

interface ProfileTabsProps {
  authoredPosts: Post[]
  authoredCount: number
  likedPosts: Post[]
  likedCount: number
  currentTab: string
}

export default function ProfileTabs({
  authoredPosts,
  authoredCount,
  likedPosts,
  likedCount,
  currentTab,
}: ProfileTabsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value === 'posts') {
      params.delete('tab')
    } else {
      params.set('tab', value)
    }
    const query = params.toString()
    router.push(`?${query}`)
  }

  return (
    <Tabs value={currentTab} onValueChange={handleTabChange}>
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="posts">
          작성한 글 ({authoredCount})
        </TabsTrigger>
        <TabsTrigger value="likes">
          좋아요한 글 ({likedCount})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="posts" className="mt-6">
        {authoredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {authoredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            작성한 글이 없습니다
          </div>
        )}
      </TabsContent>

      <TabsContent value="likes" className="mt-6">
        {likedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {likedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            좋아요한 글이 없습니다
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}

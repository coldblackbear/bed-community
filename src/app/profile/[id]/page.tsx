import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getProfile, getLikedPosts } from '@/lib/actions/profile'
import { getPosts } from '@/lib/actions/posts'
import { createClient } from '@/lib/supabase/server'
import ProfileTabs from './profile-tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ProfilePageProps {
  params: {
    id: string
  }
  searchParams: {
    tab?: string
  }
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const profile = await getProfile(params.id)

  if (!profile) {
    return {
      title: '프로필을 찾을 수 없습니다',
    }
  }

  return {
    title: `${profile.nickname}님의 프로필`,
    description: `${profile.nickname}님의 커뮤니티 활동`,
  }
}

export default async function ProfilePage({
  params,
  searchParams,
}: ProfilePageProps) {
  const profile = await getProfile(params.id)

  if (!profile) {
    notFound()
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isOwnProfile = user?.id === params.id
  const currentTab = searchParams.tab || 'posts'

  // Fetch data based on tab
  const { posts: authoredPosts, totalCount: authoredCount } = await getPosts({
    authorId: params.id,
    page: 1,
    pageSize: 20,
  })

  const { posts: likedPosts, totalCount: likedCount } = await getLikedPosts(
    params.id,
    1,
    20
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <Avatar className="w-24 h-24">
          <AvatarImage
            src={profile.avatar_url || undefined}
            alt={profile.nickname}
          />
          <AvatarFallback className="text-3xl">
            {profile.nickname.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">{profile.nickname}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            가입일: {formatDate(profile.created_at)}
          </p>

          {isOwnProfile && (
            <Button asChild>
              <Link href="/profile/edit">프로필 수정</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <ProfileTabs
        authoredPosts={authoredPosts}
        authoredCount={authoredCount}
        likedPosts={likedPosts}
        likedCount={likedCount}
        currentTab={currentTab}
      />
    </div>
  )
}

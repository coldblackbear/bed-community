'use server'

import { createClient } from '@/lib/supabase/server'
import { Profile, Post } from '@/types'
import { revalidatePath } from 'next/cache'

export async function getProfile(id: string): Promise<Profile | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return null
  }

  return data as Profile
}

export async function updateProfile({
  nickname,
}: {
  nickname: string
}): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: '로그인이 필요합니다' }
  }

  const { error } = await supabase
    .from('profiles')
    .update({ nickname })
    .eq('id', user.id)

  if (error) {
    console.error('Error updating profile:', error)
    return { success: false, error: '프로필 수정에 실패했습니다' }
  }

  revalidatePath(`/profile/${user.id}`)
  revalidatePath('/profile/edit')

  return { success: true }
}

export async function getLikedPosts(
  userId: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{ posts: Post[]; totalCount: number }> {
  const supabase = await createClient()

  const from = (page - 1) * pageSize

  const { data, error, count } = await supabase
    .from('likes')
    .select(`
      post_id,
      posts!inner(
        *,
        author:profiles!posts_author_id_fkey(id, nickname, avatar_url, created_at),
        likes:likes(count),
        comments:comments(count)
      )
    `, { count: 'exact' })
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(from, from + pageSize - 1)

  if (error) {
    console.error('Error fetching liked posts:', error)
    return { posts: [], totalCount: 0 }
  }

  const posts: Post[] = (data || []).map((item: any) => ({
    ...item.posts,
    like_count: item.posts.likes?.[0]?.count || 0,
    comment_count: item.posts.comments?.[0]?.count || 0,
  }))

  return { posts, totalCount: count || 0 }
}

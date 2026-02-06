'use server'

import { createClient } from '@/lib/supabase/server'
import { Post, Category } from '@/types'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

interface GetPostsParams {
  category?: Category
  search?: string
  page?: number
  pageSize?: number
  sort?: 'latest' | 'popular'
  authorId?: string
}

export async function getPosts({
  category,
  search,
  page = 1,
  pageSize = 10,
  sort = 'latest',
  authorId,
}: GetPostsParams = {}) {
  const supabase = await createClient()

  let query = supabase
    .from('posts')
    .select(`
      *,
      author:profiles!posts_author_id_fkey(id, nickname, avatar_url, created_at),
      likes:likes(count),
      comments:comments(count)
    `, { count: 'exact' })

  if (category) {
    query = query.eq('category', category)
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`)
  }

  if (authorId) {
    query = query.eq('author_id', authorId)
  }

  if (sort === 'popular') {
    query = query.order('view_count', { ascending: false })
  } else {
    query = query.order('created_at', { ascending: false })
  }

  const from = (page - 1) * pageSize
  query = query.range(from, from + pageSize - 1)

  const { data, error, count } = await query

  if (error) {
    console.error('Error fetching posts:', error)
    return { posts: [], totalCount: 0 }
  }

  const posts: Post[] = (data || []).map((post: any) => ({
    ...post,
    like_count: post.likes?.[0]?.count || 0,
    comment_count: post.comments?.[0]?.count || 0,
  }))

  return { posts, totalCount: count || 0 }
}

export async function getPost(id: string) {
  const supabase = await createClient()

  const { data: post, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:profiles!posts_author_id_fkey(id, nickname, avatar_url, created_at),
      likes:likes(count),
      comments:comments(count)
    `)
    .eq('id', id)
    .single()

  if (error || !post) {
    return null
  }

  // Increment view count
  await supabase
    .from('posts')
    .update({ view_count: post.view_count + 1 })
    .eq('id', id)

  return {
    ...post,
    like_count: post.likes?.[0]?.count || 0,
    comment_count: post.comments?.[0]?.count || 0,
    view_count: post.view_count + 1,
  } as Post
}

export async function getPopularPosts(limit = 5) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:profiles!posts_author_id_fkey(id, nickname, avatar_url, created_at),
      likes:likes(count),
      comments:comments(count)
    `)
    .order('view_count', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching popular posts:', error)
    return []
  }

  return (data || []).map((post: any) => ({
    ...post,
    like_count: post.likes?.[0]?.count || 0,
    comment_count: post.comments?.[0]?.count || 0,
  })) as Post[]
}

export async function createPost({
  title,
  content,
  category,
}: {
  title: string
  content: string
  category: Category
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('로그인이 필요합니다')
  }

  const { data: post, error } = await supabase
    .from('posts')
    .insert({
      title,
      content,
      category,
      author_id: user.id,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating post:', error)
    throw new Error('게시글 작성에 실패했습니다')
  }

  revalidatePath('/posts')
  return post
}

export async function updatePost(
  id: string,
  {
    title,
    content,
    category,
  }: {
    title?: string
    content?: string
    category?: Category
  }
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('로그인이 필요합니다')
  }

  // Check ownership
  const { data: post } = await supabase
    .from('posts')
    .select('author_id')
    .eq('id', id)
    .single()

  if (!post || post.author_id !== user.id) {
    throw new Error('권한이 없습니다')
  }

  const updates: any = { updated_at: new Date().toISOString() }
  if (title !== undefined) updates.title = title
  if (content !== undefined) updates.content = content
  if (category !== undefined) updates.category = category

  const { data: updatedPost, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating post:', error)
    throw new Error('게시글 수정에 실패했습니다')
  }

  revalidatePath(`/posts/${id}`)
  revalidatePath('/posts')
  return updatedPost
}

export async function deletePost(id: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('로그인이 필요합니다')
  }

  // Check ownership
  const { data: post } = await supabase
    .from('posts')
    .select('author_id')
    .eq('id', id)
    .single()

  if (!post || post.author_id !== user.id) {
    throw new Error('권한이 없습니다')
  }

  const { error } = await supabase.from('posts').delete().eq('id', id)

  if (error) {
    console.error('Error deleting post:', error)
    throw new Error('게시글 삭제에 실패했습니다')
  }

  revalidatePath('/posts')
  return { success: true }
}

export async function toggleLike(postId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('로그인이 필요합니다')
  }

  // Check if already liked
  const { data: existingLike } = await supabase
    .from('likes')
    .select()
    .eq('post_id', postId)
    .eq('user_id', user.id)
    .single()

  if (existingLike) {
    // Unlike
    await supabase
      .from('likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', user.id)
  } else {
    // Like
    await supabase.from('likes').insert({
      post_id: postId,
      user_id: user.id,
    })
  }

  // Get updated like count
  const { count } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', postId)

  revalidatePath(`/posts/${postId}`)

  return {
    liked: !existingLike,
    likeCount: count || 0,
  }
}

'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Comment } from '@/types'

export async function getComments(postId: string): Promise<Comment[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('comments')
    .select(`
      id,
      post_id,
      author_id,
      content,
      parent_id,
      created_at,
      author:profiles!comments_author_id_fkey (
        id,
        nickname,
        avatar_url,
        created_at
      )
    `)
    .eq('post_id', postId)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Failed to fetch comments:', error)
    return []
  }

  // Transform data to match Comment type (author is returned as array by Supabase)
  return (data || []).map((comment: any) => ({
    ...comment,
    author: Array.isArray(comment.author) ? comment.author[0] : comment.author,
  })) as Comment[]
}

export async function createComment({
  postId,
  content,
  parentId = null,
}: {
  postId: string
  content: string
  parentId?: string | null
}): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: '로그인이 필요합니다.' }
  }

  const { error } = await supabase.from('comments').insert({
    post_id: postId,
    author_id: user.id,
    content,
    parent_id: parentId,
  })

  if (error) {
    console.error('Failed to create comment:', error)
    return { success: false, error: '댓글 작성에 실패했습니다.' }
  }

  revalidatePath(`/posts/${postId}`)
  return { success: true }
}

export async function deleteComment(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: '로그인이 필요합니다.' }
  }

  // Check ownership
  const { data: comment } = await supabase
    .from('comments')
    .select('author_id, post_id')
    .eq('id', id)
    .single()

  if (!comment || comment.author_id !== user.id) {
    return { success: false, error: '권한이 없습니다.' }
  }

  const { error } = await supabase.from('comments').delete().eq('id', id)

  if (error) {
    console.error('Failed to delete comment:', error)
    return { success: false, error: '댓글 삭제에 실패했습니다.' }
  }

  revalidatePath(`/posts/${comment.post_id}`)
  return { success: true }
}

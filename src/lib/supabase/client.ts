import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signOut: async () => ({ error: null }),
        signInWithOAuth: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: null }),
          }),
        }),
        insert: async () => ({ data: null, error: null }),
        delete: () => ({
          eq: async () => ({ error: null }),
        }),
      }),
    } as any
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // Ignore errors
            }
          },
        },
      }
    )

    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      if (!error && data.user) {
        // Detect first-time user by checking if account was just created
        const createdAt = new Date(data.user.created_at)
        const now = new Date()
        const isNewUser = (now.getTime() - createdAt.getTime()) < 30000

        if (isNewUser) {
          return NextResponse.redirect(`${origin}/profile/edit?setup=true`)
        }
        return NextResponse.redirect(`${origin}/`)
      }
      if (error) {
        console.error('Auth exchange error:', JSON.stringify(error))
      }
    } catch (error) {
      console.error('Auth callback exception:', error)
    }
  }

  // Return to login with error
  return NextResponse.redirect(`${origin}/auth/login?error=true`)
}

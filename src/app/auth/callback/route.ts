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
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      console.log('Auth callback - code:', code?.slice(0, 10) + '...', 'error:', error)
      if (!error) {
        return NextResponse.redirect(`${origin}/`)
      }
      console.error('Auth exchange error:', JSON.stringify(error))
    } catch (error) {
      console.error('Auth callback exception:', error)
    }
  }

  // Return to login with error
  return NextResponse.redirect(`${origin}/auth/login?error=true`)
}

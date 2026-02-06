'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { updateProfile } from '@/lib/actions/profile'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { Profile } from '@/types'

export default function ProfileEditPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [nickname, setNickname] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const isSetup = searchParams.get('setup') === 'true'
  const supabase = createClient()

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
        return
      }

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (data) {
        setProfile(data as Profile)
        setNickname(isSetup ? '' : data.nickname)
      }

      setLoading(false)
    }

    loadProfile()
  }, [router, supabase, isSetup])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (nickname.trim().length < 2) {
      setError('닉네임은 2자 이상이어야 합니다')
      return
    }

    setSaving(true)

    const result = await updateProfile({ nickname: nickname.trim() })

    if (result.success) {
      if (isSetup) {
        router.push('/')
      } else {
        router.push(`/profile/${profile?.id}`)
      }
    } else {
      setError(result.error || '프로필 수정에 실패했습니다')
    }

    setSaving(false)
  }

  if (loading) {
    return (
      <div className="container max-w-2xl mx-auto py-8 px-4">
        <div className="text-center">로딩 중...</div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container max-w-2xl mx-auto py-8 px-4">
        <div className="text-center">프로필을 찾을 수 없습니다</div>
      </div>
    )
  }

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>
            {isSetup ? '커뮤니티에 오신 것을 환영합니다!' : '프로필 수정'}
          </CardTitle>
          {isSetup && (
            <CardDescription>
              커뮤니티에서 사용할 닉네임을 설정해주세요.
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Preview */}
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={profile.avatar_url || undefined}
                  alt={profile.nickname}
                />
                <AvatarFallback className="text-3xl">
                  {(nickname || profile.nickname).charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {!isSetup && (
                <p className="text-sm text-gray-500">
                  프로필 이미지는 아직 변경할 수 없습니다
                </p>
              )}
            </div>

            {/* Nickname Input */}
            <div className="space-y-2">
              <label htmlFor="nickname" className="text-sm font-medium">
                닉네임
              </label>
              <Input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
                minLength={2}
                maxLength={20}
                placeholder={isSetup ? '사용할 닉네임을 입력하세요 (2~20자)' : '닉네임을 입력하세요'}
                autoFocus={isSetup}
              />
              <p className="text-xs text-muted-foreground">
                다른 사용자에게 표시되는 이름입니다. 나중에 언제든 변경할 수 있습니다.
              </p>
            </div>

            {error && (
              <div className="text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <Button type="submit" disabled={saving} className="flex-1 sm:flex-none">
                {saving ? '저장 중...' : isSetup ? '시작하기' : '저장'}
              </Button>
              {isSetup ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => router.push('/')}
                >
                  나중에 설정
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  취소
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

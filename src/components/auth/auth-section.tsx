'use client'

import dynamic from 'next/dynamic'
import type { Profile } from '@/types'

const UserMenu = dynamic(
  () => import('./user-menu').then((m) => ({ default: m.UserMenu })),
  { ssr: false }
)

interface AuthSectionProps {
  user: Profile | null
}

export function AuthSection({ user }: AuthSectionProps) {
  return <UserMenu user={user} />
}

'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="h-6 w-6 text-destructive" />
            <CardTitle>오류가 발생했습니다</CardTitle>
          </div>
          <CardDescription>
            페이지를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error.message && (
            <div className="p-3 rounded-lg bg-muted text-sm font-mono">
              {error.message}
            </div>
          )}
          <div className="flex gap-3">
            <Button onClick={reset}>다시 시도</Button>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              홈으로 이동
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

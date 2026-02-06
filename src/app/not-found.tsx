import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <FileQuestion className="h-6 w-6 text-muted-foreground" />
            <CardTitle>페이지를 찾을 수 없습니다</CardTitle>
          </div>
          <CardDescription>
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/">
            <Button>홈으로 돌아가기</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ALL_CATEGORIES } from "@/types"
import { TrendingUp, Hash } from "lucide-react"
import { getPopularPosts } from "@/lib/actions/posts"

export async function Sidebar() {
  // Fetch real popular posts from Supabase
  const popularPosts = await getPopularPosts(5)

  return (
    <aside className="w-full space-y-4">
      {/* Quiz Banner */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-900">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <h3 className="font-bold text-lg">나에게 맞는 매트리스는?</h3>
            <p className="text-sm text-muted-foreground">
              수면 자세와 체형을 기반으로 최적의 매트리스를 추천해드립니다
            </p>
            <Button className="w-full" size="sm" asChild>
              <Link href="/quiz">추천 퀴즈 시작하기 →</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Hash className="h-4 w-4" />
            카테고리
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <Link
            href="/posts"
            className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors"
          >
            <span>전체글</span>
          </Link>
          <Separator className="my-2" />
          {ALL_CATEGORIES.map((category) => (
            <Link
              key={category.value}
              href={`/posts?category=${category.value}`}
              className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors"
            >
              <span>{category.label}</span>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Popular Posts Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4" />
            인기글
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {popularPosts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              인기글이 없습니다
            </p>
          ) : (
            popularPosts.map((post, index) => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="block group"
              >
                <div className="flex gap-2">
                  <Badge
                    variant="outline"
                    className="h-6 w-6 shrink-0 flex items-center justify-center p-0 text-xs font-bold"
                  >
                    {index + 1}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      조회 {post.view_count.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </CardContent>
      </Card>
    </aside>
  )
}

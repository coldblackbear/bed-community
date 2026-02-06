import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ALL_CATEGORIES } from "@/types"
import { ArrowRight } from "lucide-react"
import { getPosts } from "@/lib/actions/posts"
import PostCard from "@/components/post/post-card"

export default async function HomePage() {
  // Fetch real posts from Supabase
  const { posts: latestPosts } = await getPosts({ pageSize: 6, sort: 'latest' })

  // Category icons/emojis
  const categoryIcons: Record<string, string> = {
    mattress: "🛏️",
    frame: "🪟",
    bedding: "🧺",
    pillow: "🪶",
    topper: "📦",
    free: "💬",
    qna: "❓",
    review: "⭐",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-muted/50 to-background">
        <div className="container px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              침대 커뮤니티에 오신 것을 환영합니다
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl">
              매트리스부터 침구류까지, 숙면을 위한 모든 정보를 공유하세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/posts">
                  글 둘러보기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                <Link href="/posts/new">
                  글 작성하기
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="container px-4 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">최신 글</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/posts">
              전체보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {latestPosts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">아직 게시글이 없습니다. 첫 글을 작성해보세요!</p>
            <Button className="mt-4" asChild>
              <Link href="/posts/new">글 작성하기</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="border-t bg-muted/30">
        <div className="container px-4 py-12 md:py-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight">카테고리</h2>
            <p className="text-muted-foreground mt-2">
              관심있는 주제를 선택해보세요
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ALL_CATEGORIES.map((category) => (
              <Link key={category.value} href={`/posts?category=${category.value}`}>
                <Card className="hover:border-primary hover:shadow-md transition-all cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">
                        {categoryIcons[category.value] || "📌"}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.label}</CardTitle>
                        <CardDescription className="text-xs">
                          {category.value === "mattress" && "매트리스 정보"}
                          {category.value === "frame" && "침대 프레임"}
                          {category.value === "bedding" && "이불, 시트 등"}
                          {category.value === "pillow" && "베개 정보"}
                          {category.value === "topper" && "토퍼 정보"}
                          {category.value === "free" && "자유로운 토론"}
                          {category.value === "qna" && "궁금한 점 질문"}
                          {category.value === "review" && "제품 리뷰"}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

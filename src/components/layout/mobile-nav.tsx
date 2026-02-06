"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ALL_CATEGORIES, type Profile } from "@/types"
import { Menu, Home, FileText, Hash, PenSquare, User, LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface MobileNavProps {
  user?: Profile | null
}

export function MobileNav({ user }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLinkClick = () => {
    setOpen(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setOpen(false)
    router.refresh()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">메뉴 열기</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[320px]">
        <SheetHeader>
          <SheetTitle>침대 커뮤니티</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Main Navigation */}
          <nav className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              size="sm"
              asChild
            >
              <Link href="/" onClick={handleLinkClick}>
                <Home className="h-4 w-4" />
                홈
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              size="sm"
              asChild
            >
              <Link href="/posts" onClick={handleLinkClick}>
                <FileText className="h-4 w-4" />
                전체글
              </Link>
            </Button>
          </nav>

          <Separator />

          {/* Categories */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 px-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold">카테고리</h3>
            </div>
            <nav className="space-y-1">
              {ALL_CATEGORIES.map((category) => (
                <Button
                  key={category.value}
                  variant="ghost"
                  className="w-full justify-start"
                  size="sm"
                  asChild
                >
                  <Link
                    href={`/posts?category=${category.value}`}
                    onClick={handleLinkClick}
                  >
                    {category.label}
                  </Link>
                </Button>
              ))}
            </nav>
          </div>

          <Separator />

          {/* Auth Section */}
          {user ? (
            <div className="space-y-2">
              <Button variant="default" className="w-full gap-2" size="sm" asChild>
                <Link href="/posts/new" onClick={handleLinkClick}>
                  <PenSquare className="h-4 w-4" />
                  글쓰기
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2" size="sm" asChild>
                <Link href="/posts?author=me" onClick={handleLinkClick}>
                  <User className="h-4 w-4" />
                  내 글 보기
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                로그아웃
              </Button>
            </div>
          ) : (
            <div className="space-y-1">
              <Button variant="outline" className="w-full" size="sm" asChild>
                <Link href="/auth/login" onClick={handleLinkClick}>
                  로그인
                </Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

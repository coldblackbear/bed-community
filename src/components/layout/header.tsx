"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ALL_CATEGORIES, type Profile } from "@/types"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
const MobileNav = dynamic(
  () => import("./mobile-nav").then((m) => ({ default: m.MobileNav })),
  { ssr: false }
)
import { ThemeToggle } from "@/components/theme-toggle"

interface HeaderProps {
  children?: React.ReactNode
  user?: Profile | null
}

export function Header({ children, user }: HeaderProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/posts?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">침대 커뮤니티</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/posts">전체글</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/quiz">추천 퀴즈</Link>
            </Button>
            {ALL_CATEGORIES.slice(0, 3).map((category) => (
              <Button key={category.value} variant="ghost" size="sm" asChild>
                <Link href={`/posts?category=${category.value}`}>
                  {category.label}
                </Link>
              </Button>
            ))}
          </nav>
        </div>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 flex-1 max-w-sm mx-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="검색..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {/* Right Side - Auth Menu or Login Button */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {children || (
            <Button variant="outline" size="sm" className="hidden md:flex" asChild>
              <Link href="/auth/login">로그인</Link>
            </Button>
          )}

          {/* Mobile Menu Button */}
          <MobileNav user={user} />
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden border-t px-4 py-3">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="검색..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>
    </header>
  )
}

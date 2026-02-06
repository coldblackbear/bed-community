"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ALL_CATEGORIES, type Profile } from "@/types"
import { useRouter } from "next/navigation"
import { MobileNav } from "./mobile-nav"
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
            <Link href="/posts">
              <Button variant="ghost" size="sm">
                전체글
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="ghost" size="sm">
                매트리스 DB
              </Button>
            </Link>
            <Link href="/quiz">
              <Button variant="ghost" size="sm">
                추천 퀴즈
              </Button>
            </Link>
            {ALL_CATEGORIES.slice(0, 3).map((category) => (
              <Link key={category.value} href={`/posts?category=${category.value}`}>
                <Button variant="ghost" size="sm">
                  {category.label}
                </Button>
              </Link>
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
            <Link href="/auth/login" className="hidden md:block">
              <Button variant="outline" size="sm">
                로그인
              </Button>
            </Link>
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

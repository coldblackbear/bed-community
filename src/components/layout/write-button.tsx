"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PenSquare } from "lucide-react"

export function WriteButton() {
  return (
    <Button variant="default" size="sm" className="gap-2 hidden md:inline-flex" asChild>
      <Link href="/posts/new">
        <PenSquare className="h-4 w-4" />
        글쓰기
      </Link>
    </Button>
  )
}

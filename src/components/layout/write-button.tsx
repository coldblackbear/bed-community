"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PenSquare } from "lucide-react"

export function WriteButton() {
  return (
    <Link href="/posts/new" className="hidden md:inline-flex">
      <Button variant="default" size="sm" className="gap-2">
        <PenSquare className="h-4 w-4" />
        글쓰기
      </Button>
    </Link>
  )
}

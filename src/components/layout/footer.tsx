import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center gap-4 py-8 px-4 md:flex-row md:justify-between">
        <div className="text-center text-sm text-muted-foreground md:text-left">
          <p>&copy; {new Date().getFullYear()} 침대 커뮤니티. All rights reserved.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          <Link
            href="/terms"
            className="hover:text-foreground transition-colors"
          >
            이용약관
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <Link
            href="/privacy"
            className="hover:text-foreground transition-colors"
          >
            개인정보처리방침
          </Link>
        </div>
      </div>
    </footer>
  )
}

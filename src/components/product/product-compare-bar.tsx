'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X } from 'lucide-react'

export function ProductCompareBar() {
  const router = useRouter()
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  useEffect(() => {
    // Listen for compare selection changes
    const handleCompareChange = (e: CustomEvent) => {
      setSelectedIds(e.detail.selectedIds)
    }

    window.addEventListener('compare-selection-changed', handleCompareChange as EventListener)

    return () => {
      window.removeEventListener('compare-selection-changed', handleCompareChange as EventListener)
    }
  }, [])

  const handleRemove = (id: string) => {
    const newIds = selectedIds.filter((sid) => sid !== id)
    window.dispatchEvent(
      new CustomEvent('compare-selection-changed', {
        detail: { selectedIds: newIds },
      })
    )
  }

  const handleCompare = () => {
    router.push(`/products/compare?ids=${selectedIds.join(',')}`)
  }

  if (selectedIds.length === 0) return null

  return (
    <Card className="fixed bottom-4 left-1/2 -translate-x-1/2 p-4 shadow-lg z-50 max-w-2xl w-full mx-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <span className="text-sm font-medium">
            {selectedIds.length}개 선택됨
          </span>
          <div className="flex gap-2 overflow-x-auto">
            {selectedIds.map((id) => (
              <Button
                key={id}
                variant="secondary"
                size="sm"
                onClick={() => handleRemove(id)}
              >
                제품 <X className="ml-1 h-3 w-3" />
              </Button>
            ))}
          </div>
        </div>
        <Button onClick={handleCompare} disabled={selectedIds.length === 0}>
          비교하기
        </Button>
      </div>
    </Card>
  )
}

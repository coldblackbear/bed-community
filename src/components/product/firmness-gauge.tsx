import { cn } from '@/lib/utils'

interface FirmnessGaugeProps {
  firmness: number // 1-10
  showLabel?: boolean
  className?: string
}

export function FirmnessGauge({ firmness, showLabel = true, className }: FirmnessGaugeProps) {
  // Determine color based on firmness level
  const getColor = (level: number) => {
    if (level <= 3) return 'bg-blue-500' // Soft
    if (level <= 6) return 'bg-green-500' // Medium
    return 'bg-orange-500' // Firm/Hard
  }

  const getLabel = () => {
    if (firmness <= 3) return '소프트'
    if (firmness <= 6) return '미디엄'
    return '하드'
  }

  return (
    <div className={cn('space-y-1', className)}>
      <div className="flex items-center gap-1">
        {Array.from({ length: 10 }).map((_, i) => {
          const level = i + 1
          const isActive = level <= firmness
          return (
            <div
              key={level}
              className={cn(
                'h-4 flex-1 rounded-sm transition-colors',
                isActive ? getColor(firmness) : 'bg-gray-200'
              )}
            />
          )
        })}
      </div>
      {showLabel && (
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>{getLabel()}</span>
          <span className="font-medium">{firmness}/10</span>
        </div>
      )}
    </div>
  )
}

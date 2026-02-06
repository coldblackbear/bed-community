'use client'

import Link from 'next/link'
import { MattressProduct, MATTRESS_TYPES } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Star } from 'lucide-react'
import { FirmnessGauge } from './firmness-gauge'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: MattressProduct
  showCompareCheckbox?: boolean
  isSelected?: boolean
  onToggleCompare?: (productId: string, checked: boolean) => void
}

export function ProductCard({
  product,
  showCompareCheckbox = false,
  isSelected = false,
  onToggleCompare,
}: ProductCardProps) {
  const mattressTypeLabel = MATTRESS_TYPES.find((t) => t.value === product.mattress_type)?.label || product.mattress_type

  // Get color based on mattress type
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'innerspring':
        return 'bg-blue-100 text-blue-800'
      case 'memory_foam':
        return 'bg-purple-100 text-purple-800'
      case 'latex':
        return 'bg-green-100 text-green-800'
      case 'hybrid':
        return 'bg-orange-100 text-orange-800'
      case 'airbed':
        return 'bg-cyan-100 text-cyan-800'
      case 'waterbed':
        return 'bg-teal-100 text-teal-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price) + '원'
  }

  const handleCheckboxChange = (checked: boolean) => {
    if (onToggleCompare) {
      onToggleCompare(product.id, checked)
    }
  }

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-shadow">
      {showCompareCheckbox && (
        <div className="absolute top-3 left-3 z-10">
          <Checkbox
            checked={isSelected}
            onCheckedChange={handleCheckboxChange}
            className="bg-white shadow-sm"
          />
        </div>
      )}

      <Link href={`/products/${product.id}`}>
        <CardHeader className="space-y-2">
          {/* Brand and Type */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              {product.brand?.name_ko || product.brand?.name}
            </span>
            <Badge className={cn('text-xs', getTypeColor(product.mattress_type))} variant="outline">
              {mattressTypeLabel}
            </Badge>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Firmness Gauge */}
          <div>
            <p className="text-xs text-gray-500 mb-1">단단함</p>
            <FirmnessGauge firmness={product.firmness} showLabel={false} />
          </div>

          {/* Price */}
          <div className="space-y-1">
            {product.price_street && (
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-gray-500 line-through">
                  {formatPrice(product.price_msrp)}
                </span>
                <span className="text-lg font-bold text-primary">
                  {formatPrice(product.price_street)}
                </span>
              </div>
            )}
            {!product.price_street && (
              <span className="text-lg font-bold">
                {formatPrice(product.price_msrp)}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between text-sm text-gray-600">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">
              {product.rating_avg ? product.rating_avg.toFixed(1) : '-'}
            </span>
            <span className="text-gray-400">
              ({product.review_count})
            </span>
          </div>

          {/* View Count or other info could go here */}
        </CardFooter>
      </Link>
    </Card>
  )
}

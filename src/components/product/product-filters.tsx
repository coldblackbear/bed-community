'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Brand, MATTRESS_TYPES } from '@/types'
import { Button } from '@/components/ui/button'

interface ProductFiltersProps {
  brands: Brand[]
}

export function ProductFilters({ brands }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page') // Reset page on filter change
    router.push(`/products?${params.toString()}`)
  }

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const priceKey = type === 'min' ? 'priceMin' : 'priceMax'
    
    if (value) {
      // Convert to won (multiply by 10000)
      params.set(priceKey, (Number(value) * 10000).toString())
    } else {
      params.delete(priceKey)
    }
    params.delete('page')
    router.push(`/products?${params.toString()}`)
  }

  const handleFirmnessChange = (type: 'min' | 'max', value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const firmnessKey = type === 'min' ? 'firmnessMin' : 'firmnessMax'
    
    if (value) {
      params.set(firmnessKey, value)
    } else {
      params.delete(firmnessKey)
    }
    params.delete('page')
    router.push(`/products?${params.toString()}`)
  }

  const resetFilters = () => {
    router.push('/products')
  }

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Brand Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">브랜드</label>
          <select
            className="w-full px-3 py-2 border rounded-md"
            value={searchParams.get('brandId') || ''}
            onChange={(e) => handleFilterChange('brandId', e.target.value)}
          >
            <option value="">전체</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name_ko}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">타입</label>
          <select
            className="w-full px-3 py-2 border rounded-md"
            value={searchParams.get('type') || ''}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="">전체</option>
            {MATTRESS_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Firmness Range */}
        <div>
          <label className="block text-sm font-medium mb-2">단단함</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max="10"
              placeholder="최소"
              className="w-full px-3 py-2 border rounded-md"
              value={searchParams.get('firmnessMin') || ''}
              onChange={(e) => handleFirmnessChange('min', e.target.value)}
            />
            <span>-</span>
            <input
              type="number"
              min="1"
              max="10"
              placeholder="최대"
              className="w-full px-3 py-2 border rounded-md"
              value={searchParams.get('firmnessMax') || ''}
              onChange={(e) => handleFirmnessChange('max', e.target.value)}
            />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium mb-2">가격대 (만원)</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="최소"
              className="w-full px-3 py-2 border rounded-md"
              value={searchParams.get('priceMin') ? Number(searchParams.get('priceMin')) / 10000 : ''}
              onChange={(e) => handlePriceChange('min', e.target.value)}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="최대"
              className="w-full px-3 py-2 border rounded-md"
              value={searchParams.get('priceMax') ? Number(searchParams.get('priceMax')) / 10000 : ''}
              onChange={(e) => handlePriceChange('max', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Sort & Reset */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">정렬</label>
          <select
            className="px-3 py-2 border rounded-md"
            value={searchParams.get('sortBy') || 'newest'}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          >
            <option value="newest">최신순</option>
            <option value="price_asc">가격 낮은순</option>
            <option value="price_desc">가격 높은순</option>
            <option value="rating">평점순</option>
          </select>
        </div>
        <Button variant="outline" onClick={resetFilters}>
          필터 초기화
        </Button>
      </div>
    </div>
  )
}

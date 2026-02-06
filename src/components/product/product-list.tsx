'use client'

import { useState } from 'react'
import { MattressProduct } from '@/types'
import { ProductCard } from './product-card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface ProductListProps {
  products: MattressProduct[]
  totalCount: number
  currentPage: number
  pageSize: number
}

export function ProductList({ products, totalCount, currentPage, pageSize }: ProductListProps) {
  const router = useRouter()
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const totalPages = Math.ceil(totalCount / pageSize)

  const handleToggleCompare = (productId: string, checked: boolean) => {
    if (checked) {
      if (selectedProducts.length >= 3) {
        alert('최대 3개까지만 비교할 수 있습니다.')
        return
      }
      setSelectedProducts([...selectedProducts, productId])
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    }
  }

  const handleCompare = () => {
    if (selectedProducts.length < 2) {
      alert('비교하려면 최소 2개 이상의 제품을 선택해주세요.')
      return
    }
    const ids = selectedProducts.join(',')
    router.push(`/products/compare?ids=${ids}`)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search)
    params.set('page', page.toString())
    router.push(`/products?${params.toString()}`)
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        조건에 맞는 제품이 없습니다.
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showCompareCheckbox={true}
            isSelected={selectedProducts.includes(product.id)}
            onToggleCompare={handleToggleCompare}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mb-8">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? 'default' : 'outline'}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </Button>
            )
          })}
        </div>
      )}

      {/* Compare Floating Button */}
      {selectedProducts.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            size="lg"
            className="shadow-lg"
            onClick={handleCompare}
          >
            비교하기 ({selectedProducts.length}/3)
          </Button>
        </div>
      )}
    </>
  )
}

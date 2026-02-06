import { Metadata } from 'next'
import { getProducts, getBrands } from '@/lib/actions/products'
import { ProductFilters } from '@/components/product/product-filters'
import { ProductList } from '@/components/product/product-list'

export const metadata: Metadata = {
  title: '매트리스 비교 DB',
  description: '매트리스 브랜드별 스펙, 가격, 리뷰를 한눈에 비교하세요',
}

interface SearchParams {
  brandId?: string
  type?: string
  firmnessMin?: string
  firmnessMax?: string
  priceMin?: string
  priceMax?: string
  sortBy?: string
  page?: string
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const brands = await getBrands()

  const page = Number(searchParams.page) || 1
  const { products, totalCount } = await getProducts({
    brandId: searchParams.brandId,
    mattressType: searchParams.type as any,
    firmnessMin: searchParams.firmnessMin ? Number(searchParams.firmnessMin) as any : undefined,
    firmnessMax: searchParams.firmnessMax ? Number(searchParams.firmnessMax) as any : undefined,
    priceMin: searchParams.priceMin ? Number(searchParams.priceMin) : undefined,
    priceMax: searchParams.priceMax ? Number(searchParams.priceMax) : undefined,
    sortBy: (searchParams.sortBy as any) || 'newest',
    page,
    pageSize: 12,
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">매트리스 비교 DB</h1>
        <p className="text-gray-600">
          매트리스 브랜드별 스펙, 가격, 리뷰를 한눈에 비교하세요
        </p>
      </div>

      <ProductFilters brands={brands} />
      <ProductList
        products={products}
        totalCount={totalCount}
        currentPage={page}
        pageSize={12}
      />
    </div>
  )
}

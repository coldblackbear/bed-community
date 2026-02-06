import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getProductsForCompare } from '@/lib/actions/products'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FirmnessGauge } from '@/components/product/firmness-gauge'
import { MATTRESS_TYPES, SLEEP_POSITIONS, BODY_WEIGHTS } from '@/types'
import { Star } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '매트리스 비교',
  description: '매트리스 스펙을 비교하세요',
}

interface SearchParams {
  ids?: string
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  if (!searchParams.ids) {
    redirect('/products')
  }

  const ids = searchParams.ids.split(',')
  if (ids.length < 2 || ids.length > 3) {
    redirect('/products')
  }

  const products = await getProductsForCompare(ids)

  if (products.length < 2) {
    redirect('/products')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price) + '원'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/products"
          className="text-primary hover:underline mb-2 inline-block"
        >
          ← 목록으로 돌아가기
        </Link>
        <h1 className="text-3xl font-bold mb-2">매트리스 비교</h1>
        <p className="text-gray-600">
          선택한 매트리스의 스펙을 비교해보세요
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2">
              <th className="p-4 text-left bg-gray-50 sticky left-0">항목</th>
              {products.map((product) => (
                <th key={product.id} className="p-4 min-w-[280px]">
                  <Link
                    href={`/products/${product.id}`}
                    className="hover:text-primary transition-colors"
                  >
                    <div className="text-sm text-gray-600 mb-1">
                      {product.brand?.name_ko || product.brand?.name}
                    </div>
                    <div className="text-lg font-bold">{product.name}</div>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Type */}
            <tr className="border-b">
              <td className="p-4 font-medium bg-gray-50 sticky left-0">타입</td>
              {products.map((product) => {
                const typeLabel = MATTRESS_TYPES.find((t) => t.value === product.mattress_type)?.label
                return (
                  <td key={product.id} className="p-4 text-center">
                    <Badge variant="outline">{typeLabel}</Badge>
                  </td>
                )
              })}
            </tr>

            {/* Firmness */}
            <tr className="border-b">
              <td className="p-4 font-medium bg-gray-50 sticky left-0">단단함</td>
              {products.map((product) => (
                <td key={product.id} className="p-4">
                  <FirmnessGauge firmness={product.firmness} />
                </td>
              ))}
            </tr>

            {/* Price */}
            <tr className="border-b bg-blue-50/50">
              <td className="p-4 font-medium bg-gray-50 sticky left-0">정가</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  <div className="text-lg font-bold">
                    {formatPrice(product.price_msrp)}
                  </div>
                </td>
              ))}
            </tr>

            {/* Street Price */}
            <tr className="border-b bg-blue-50/50">
              <td className="p-4 font-medium bg-gray-50 sticky left-0">실거래가</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  <div className="text-lg font-bold text-primary">
                    {product.price_street ? formatPrice(product.price_street) : '-'}
                  </div>
                </td>
              ))}
            </tr>

            {/* Rating */}
            <tr className="border-b">
              <td className="p-4 font-medium bg-gray-50 sticky left-0">평점</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">
                      {product.rating_avg ? product.rating_avg.toFixed(1) : '-'}
                    </span>
                    <span className="text-gray-400">
                      ({product.review_count})
                    </span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Height */}
            <tr className="border-b">
              <td className="p-4 font-medium bg-gray-50 sticky left-0">높이</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  {product.height_cm ? `${product.height_cm}cm` : '-'}
                </td>
              ))}
            </tr>

            {/* Coil Count */}
            <tr className="border-b">
              <td className="p-4 font-medium bg-gray-50 sticky left-0">코일 수</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  {product.coil_count ? `${product.coil_count}개` : '-'}
                </td>
              ))}
            </tr>

            {/* Foam Density */}
            <tr className="border-b">
              <td className="p-4 font-medium bg-gray-50 sticky left-0">폼 밀도</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  {product.foam_density || '-'}
                </td>
              ))}
            </tr>

            {/* Cover Material */}
            <tr className="border-b">
              <td className="p-4 font-medium bg-gray-50 sticky left-0">커버 소재</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  {product.cover_material || '-'}
                </td>
              ))}
            </tr>

            {/* Warranty */}
            <tr className="border-b">
              <td className="p-4 font-medium bg-gray-50 sticky left-0">보증 기간</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  {product.warranty_years ? `${product.warranty_years}년` : '-'}
                </td>
              ))}
            </tr>

            {/* Trial Days */}
            <tr className="border-b">
              <td className="p-4 font-medium bg-gray-50 sticky left-0">체험 기간</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  {product.trial_days ? `${product.trial_days}일` : '-'}
                </td>
              ))}
            </tr>

            {/* Sizes */}
            <tr className="border-b">
              <td className="p-4 font-medium bg-gray-50 sticky left-0">사이즈</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  <div className="text-sm">
                    {product.sizes_available.join(', ')}
                  </div>
                </td>
              ))}
            </tr>

            {/* Sleep Positions */}
            <tr className="border-b">
              <td className="p-4 font-medium bg-gray-50 sticky left-0">추천 수면 자세</td>
              {products.map((product) => (
                <td key={product.id} className="p-4">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {product.best_for_positions.map((pos) => {
                      const label = SLEEP_POSITIONS.find((p) => p.value === pos)?.label
                      return (
                        <Badge key={pos} variant="secondary" className="text-xs">
                          {label}
                        </Badge>
                      )
                    })}
                  </div>
                </td>
              ))}
            </tr>

            {/* Body Weights */}
            <tr className="border-b">
              <td className="p-4 font-medium bg-gray-50 sticky left-0">추천 체중대</td>
              {products.map((product) => (
                <td key={product.id} className="p-4">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {product.best_for_weights.map((weight) => {
                      const weightInfo = BODY_WEIGHTS.find((w) => w.value === weight)
                      return (
                        <Badge key={weight} variant="secondary" className="text-xs">
                          {weightInfo?.label}
                        </Badge>
                      )
                    })}
                  </div>
                </td>
              ))}
            </tr>

            {/* Pros */}
            <tr className="border-b">
              <td className="p-4 font-medium bg-gray-50 sticky left-0">장점</td>
              {products.map((product) => (
                <td key={product.id} className="p-4">
                  <ul className="space-y-1 text-sm text-left">
                    {product.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Cons */}
            <tr className="border-b">
              <td className="p-4 font-medium bg-gray-50 sticky left-0">단점</td>
              {products.map((product) => (
                <td key={product.id} className="p-4">
                  <ul className="space-y-1 text-sm text-left">
                    {product.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-500 mt-0.5">✗</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <button className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
              {product.name} 상세보기
            </button>
          </Link>
        ))}
      </div>
    </div>
  )
}

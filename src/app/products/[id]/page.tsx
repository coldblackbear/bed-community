import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/actions/products'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FirmnessGauge } from '@/components/product/firmness-gauge'
import { MATTRESS_TYPES, SLEEP_POSITIONS, BODY_WEIGHTS } from '@/types'
import { Star, Calendar, MapPin, ShoppingCart } from 'lucide-react'

interface PageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProduct(params.id)

  if (!product) {
    return {
      title: '제품을 찾을 수 없습니다',
    }
  }

  return {
    title: `${product.name} - ${product.brand?.name_ko || product.brand?.name}`,
    description: `${product.name}의 스펙, 가격, 리뷰를 확인하세요`,
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  const mattressTypeLabel = MATTRESS_TYPES.find((t) => t.value === product.mattress_type)?.label || product.mattress_type

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price) + '원'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR')
  }

  // Calculate average price from reports
  const avgReportPrice = product.price_reports && product.price_reports.length > 0
    ? Math.round(product.price_reports.reduce((sum, r) => sum + r.purchase_price, 0) / product.price_reports.length)
    : null

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-6">
          {/* Product Image Placeholder */}
          <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover rounded-lg" />
            ) : (
              <span className="text-gray-400">이미지 없음</span>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 space-y-4">
            <div>
              <p className="text-gray-600 mb-2">
                {product.brand?.name_ko || product.brand?.name}
              </p>
              <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{mattressTypeLabel}</Badge>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-xl font-semibold">
                  {product.rating_avg ? product.rating_avg.toFixed(1) : '-'}
                </span>
              </div>
              <span className="text-gray-500">
                ({product.review_count}개 리뷰)
              </span>
            </div>

            {/* Firmness */}
            <div>
              <p className="text-sm text-gray-600 mb-2">단단함</p>
              <FirmnessGauge firmness={product.firmness} className="max-w-md" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Specs Table */}
          <Card>
            <CardHeader>
              <CardTitle>제품 사양</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">단단함</p>
                  <p className="font-medium">{product.firmness}/10</p>
                </div>
                {product.height_cm && (
                  <div>
                    <p className="text-sm text-gray-500">높이</p>
                    <p className="font-medium">{product.height_cm}cm</p>
                  </div>
                )}
                {product.coil_count && (
                  <div>
                    <p className="text-sm text-gray-500">코일 수</p>
                    <p className="font-medium">{product.coil_count}개</p>
                  </div>
                )}
                {product.foam_density && (
                  <div>
                    <p className="text-sm text-gray-500">폼 밀도</p>
                    <p className="font-medium">{product.foam_density}</p>
                  </div>
                )}
                {product.cover_material && (
                  <div>
                    <p className="text-sm text-gray-500">커버 소재</p>
                    <p className="font-medium">{product.cover_material}</p>
                  </div>
                )}
                {product.warranty_years && (
                  <div>
                    <p className="text-sm text-gray-500">보증 기간</p>
                    <p className="font-medium">{product.warranty_years}년</p>
                  </div>
                )}
                {product.trial_days && (
                  <div>
                    <p className="text-sm text-gray-500">체험 기간</p>
                    <p className="font-medium">{product.trial_days}일</p>
                  </div>
                )}
                {product.sizes_available && product.sizes_available.length > 0 && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">사이즈</p>
                    <p className="font-medium">{product.sizes_available.join(', ')}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recommended For */}
          <Card>
            <CardHeader>
              <CardTitle>추천 체형</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">수면 자세</p>
                <div className="flex flex-wrap gap-2">
                  {product.best_for_positions.map((pos) => {
                    const label = SLEEP_POSITIONS.find((p) => p.value === pos)?.label
                    return (
                      <Badge key={pos} variant="secondary">
                        {label}
                      </Badge>
                    )
                  })}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">체중대</p>
                <div className="flex flex-wrap gap-2">
                  {product.best_for_weights.map((weight) => {
                    const weightInfo = BODY_WEIGHTS.find((w) => w.value === weight)
                    return (
                      <Badge key={weight} variant="secondary">
                        {weightInfo?.label} ({weightInfo?.range})
                      </Badge>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pros & Cons */}
          {(product.pros.length > 0 || product.cons.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle>장점 & 단점</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.pros.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-green-600 mb-2">장점</h3>
                    <ul className="space-y-1">
                      {product.pros.map((pro, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.cons.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-red-600 mb-2">단점</h3>
                    <ul className="space-y-1">
                      {product.cons.map((con, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-red-500 mt-1">✗</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price Card */}
          <Card>
            <CardHeader>
              <CardTitle>가격 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">정가</p>
                <p className="text-2xl font-bold text-gray-400 line-through">
                  {formatPrice(product.price_msrp)}
                </p>
              </div>
              {avgReportPrice && (
                <div>
                  <p className="text-sm text-gray-500">평균 실거래가</p>
                  <p className="text-3xl font-bold text-primary">
                    {formatPrice(avgReportPrice)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {product.price_reports?.length}건의 제보 기준
                  </p>
                </div>
              )}
              <button className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                실거래가 제보하기
              </button>
            </CardContent>
          </Card>

          {/* Recent Price Reports */}
          {product.price_reports && product.price_reports.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>최근 실거래가 제보</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {product.price_reports.slice(0, 5).map((report) => (
                    <div key={report.id} className="pb-3 border-b last:border-0 last:pb-0">
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-semibold text-primary">
                          {formatPrice(report.purchase_price)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(report.created_at)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>{report.purchase_location}</span>
                        {report.is_online && (
                          <Badge variant="outline" className="text-xs">온라인</Badge>
                        )}
                      </div>
                      {report.discount_info && (
                        <p className="text-xs text-gray-500 mt-1">
                          {report.discount_info}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

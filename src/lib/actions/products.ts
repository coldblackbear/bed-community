'use server'

import { createClient } from '@/lib/supabase/server'
import { Brand, MattressProduct, PriceReport, MattressType, FirmnessLevel } from '@/types'
import { revalidatePath } from 'next/cache'

interface GetProductsParams {
  brandId?: string
  mattressType?: MattressType
  firmnessMin?: FirmnessLevel
  firmnessMax?: FirmnessLevel
  priceMin?: number
  priceMax?: number
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest'
  page?: number
  pageSize?: number
}

export async function getBrands() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .order('name_ko', { ascending: true })

  if (error) {
    console.error('Error fetching brands:', error)
    return []
  }

  return (data || []) as Brand[]
}

export async function getProducts({
  brandId,
  mattressType,
  firmnessMin,
  firmnessMax,
  priceMin,
  priceMax,
  sortBy = 'newest',
  page = 1,
  pageSize = 12,
}: GetProductsParams = {}) {
  const supabase = await createClient()

  let query = supabase
    .from('mattress_products')
    .select(`
      *,
      brand:brands!mattress_products_brand_id_fkey(*)
    `, { count: 'exact' })

  if (brandId) {
    query = query.eq('brand_id', brandId)
  }

  if (mattressType) {
    query = query.eq('mattress_type', mattressType)
  }

  if (firmnessMin !== undefined) {
    query = query.gte('firmness', firmnessMin)
  }

  if (firmnessMax !== undefined) {
    query = query.lte('firmness', firmnessMax)
  }

  if (priceMin !== undefined) {
    query = query.gte('price_msrp', priceMin)
  }

  if (priceMax !== undefined) {
    query = query.lte('price_msrp', priceMax)
  }

  // Apply sorting
  switch (sortBy) {
    case 'price_asc':
      query = query.order('price_msrp', { ascending: true })
      break
    case 'price_desc':
      query = query.order('price_msrp', { ascending: false })
      break
    case 'rating':
      query = query.order('rating_avg', { ascending: false, nullsLast: true })
      break
    case 'newest':
    default:
      query = query.order('created_at', { ascending: false })
      break
  }

  const from = (page - 1) * pageSize
  query = query.range(from, from + pageSize - 1)

  const { data, error, count } = await query

  if (error) {
    console.error('Error fetching products:', error)
    return { products: [], totalCount: 0 }
  }

  return {
    products: (data || []) as MattressProduct[],
    totalCount: count || 0,
  }
}

export async function getProduct(id: string) {
  const supabase = await createClient()

  const { data: product, error } = await supabase
    .from('mattress_products')
    .select(`
      *,
      brand:brands!mattress_products_brand_id_fkey(*)
    `)
    .eq('id', id)
    .single()

  if (error || !product) {
    return null
  }

  // Fetch recent price reports with reporter info
  const { data: priceReports } = await supabase
    .from('price_reports')
    .select(`
      *,
      reporter:profiles!price_reports_reporter_id_fkey(id, nickname, avatar_url, created_at)
    `)
    .eq('product_id', id)
    .order('created_at', { ascending: false })
    .limit(10)

  return {
    ...product,
    price_reports: priceReports || [],
  } as MattressProduct & { price_reports: PriceReport[] }
}

export async function getProductsForCompare(ids: string[]) {
  if (ids.length === 0) {
    return []
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('mattress_products')
    .select(`
      *,
      brand:brands!mattress_products_brand_id_fkey(*)
    `)
    .in('id', ids)

  if (error) {
    console.error('Error fetching products for comparison:', error)
    return []
  }

  return (data || []) as MattressProduct[]
}

export async function submitPriceReport(data: {
  product_id: string
  purchase_price: number
  purchase_date: string
  purchase_location: string
  is_online: boolean
  discount_info?: string
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('로그인이 필요합니다')
  }

  const { data: report, error } = await supabase
    .from('price_reports')
    .insert({
      product_id: data.product_id,
      reporter_id: user.id,
      purchase_price: data.purchase_price,
      purchase_date: data.purchase_date,
      purchase_location: data.purchase_location,
      is_online: data.is_online,
      discount_info: data.discount_info || null,
    })
    .select()
    .single()

  if (error) {
    console.error('Error submitting price report:', error)
    throw new Error('실거래가 제보에 실패했습니다')
  }

  // Update average street price for the product
  const avgPrice = await getAveragePrice(data.product_id)
  if (avgPrice !== null) {
    await supabase
      .from('mattress_products')
      .update({ price_street: avgPrice })
      .eq('id', data.product_id)
  }

  revalidatePath(`/products/${data.product_id}`)
  revalidatePath('/products')

  return report as PriceReport
}

export async function getAveragePrice(productId: string): Promise<number | null> {
  const supabase = await createClient()

  const { data: reports, error } = await supabase
    .from('price_reports')
    .select('purchase_price')
    .eq('product_id', productId)

  if (error || !reports || reports.length === 0) {
    return null
  }

  const sum = reports.reduce((acc: number, report: { purchase_price: number }) => acc + report.purchase_price, 0)
  return Math.round(sum / reports.length)
}

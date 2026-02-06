export type ProductCategory = 'mattress' | 'frame' | 'bedding' | 'pillow' | 'topper'
export type CommunityCategory = 'free' | 'qna' | 'review' | 'price_share'
export type Category = ProductCategory | CommunityCategory

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'mattress', label: '매트리스' },
  { value: 'frame', label: '프레임' },
  { value: 'bedding', label: '침구류' },
  { value: 'pillow', label: '베개' },
  { value: 'topper', label: '토퍼' },
]

export const COMMUNITY_CATEGORIES: { value: CommunityCategory; label: string }[] = [
  { value: 'free', label: '자유토론' },
  { value: 'qna', label: '질문/답변' },
  { value: 'review', label: '리뷰' },
  { value: 'price_share', label: '실거래가 공유' },
]

export const ALL_CATEGORIES = [...PRODUCT_CATEGORIES, ...COMMUNITY_CATEGORIES]

export function getCategoryLabel(value: Category): string {
  return ALL_CATEGORIES.find((c) => c.value === value)?.label ?? value
}

export interface Profile {
  id: string
  nickname: string
  avatar_url: string | null
  created_at: string
}

export interface Post {
  id: string
  title: string
  content: string
  category: Category
  author_id: string
  view_count: number
  created_at: string
  updated_at: string
  author?: Profile
  like_count?: number
  comment_count?: number
}

export interface Comment {
  id: string
  post_id: string
  author_id: string
  content: string
  parent_id: string | null
  created_at: string
  author?: Profile
}

export interface Like {
  user_id: string
  post_id: string
}

// Mattress product types
export type MattressType = 'innerspring' | 'memory_foam' | 'latex' | 'hybrid' | 'airbed' | 'waterbed'
export type FirmnessLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export type SleepPosition = 'back' | 'side' | 'stomach' | 'combination'
export type BodyWeight = 'light' | 'average' | 'heavy' // <60kg, 60-90kg, >90kg

export const MATTRESS_TYPES: { value: MattressType; label: string }[] = [
  { value: 'innerspring', label: '스프링' },
  { value: 'memory_foam', label: '메모리폼' },
  { value: 'latex', label: '라텍스' },
  { value: 'hybrid', label: '하이브리드' },
  { value: 'airbed', label: '에어베드' },
  { value: 'waterbed', label: '워터베드' },
]

export const SLEEP_POSITIONS: { value: SleepPosition; label: string }[] = [
  { value: 'back', label: '바로 누워서' },
  { value: 'side', label: '옆으로 누워서' },
  { value: 'stomach', label: '엎드려서' },
  { value: 'combination', label: '이리저리 뒤척이며' },
]

export const BODY_WEIGHTS: { value: BodyWeight; label: string; range: string }[] = [
  { value: 'light', label: '가벼운 편', range: '60kg 미만' },
  { value: 'average', label: '보통', range: '60~90kg' },
  { value: 'heavy', label: '무거운 편', range: '90kg 초과' },
]

export interface Brand {
  id: string
  name: string
  name_ko: string
  country: string
  logo_url: string | null
  website_url: string | null
  description: string | null
  created_at: string
}

export interface MattressProduct {
  id: string
  brand_id: string
  name: string
  mattress_type: MattressType
  firmness: FirmnessLevel
  height_cm: number | null
  price_msrp: number // suggested retail price
  price_street: number | null // average street price
  coil_count: number | null
  foam_density: string | null
  cover_material: string | null
  warranty_years: number | null
  trial_days: number | null
  sizes_available: string[] // 'single','super_single','double','queen','king'
  best_for_positions: SleepPosition[]
  best_for_weights: BodyWeight[]
  pros: string[]
  cons: string[]
  rating_avg: number | null
  review_count: number
  image_url: string | null
  created_at: string
  updated_at: string
  brand?: Brand
}

export interface PriceReport {
  id: string
  product_id: string
  reporter_id: string
  purchase_price: number
  purchase_date: string
  purchase_location: string // online/offline store name
  is_online: boolean
  discount_info: string | null
  created_at: string
  reporter?: Profile
  product?: MattressProduct
}

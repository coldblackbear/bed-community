export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-9 w-64 bg-muted animate-pulse rounded mb-2"></div>
        <div className="h-5 w-96 bg-muted animate-pulse rounded"></div>
      </div>

      {/* Filters skeleton */}
      <div className="mb-6 border rounded-lg p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-20 bg-muted animate-pulse rounded"></div>
              <div className="h-10 w-full bg-muted animate-pulse rounded"></div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
              <div className="h-10 w-full bg-muted animate-pulse rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Sort and results count skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-5 w-32 bg-muted animate-pulse rounded"></div>
        <div className="h-10 w-32 bg-muted animate-pulse rounded"></div>
      </div>

      {/* Products grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <div key={i} className="border rounded-lg p-6 space-y-4">
            {/* Product image placeholder */}
            <div className="aspect-video bg-muted animate-pulse rounded"></div>

            {/* Brand */}
            <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>

            {/* Product name */}
            <div className="h-6 w-full bg-muted animate-pulse rounded"></div>

            {/* Specs */}
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-28 bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-36 bg-muted animate-pulse rounded"></div>
            </div>

            {/* Price */}
            <div className="h-7 w-40 bg-muted animate-pulse rounded"></div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="h-4 w-20 bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-16 bg-muted animate-pulse rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-center gap-2 mt-8">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-10 w-10 bg-muted animate-pulse rounded"></div>
        ))}
      </div>
    </div>
  )
}

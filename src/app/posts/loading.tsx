export default function PostsLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header skeleton */}
      <div className="flex justify-between items-center mb-8">
        <div className="h-9 w-32 bg-muted animate-pulse rounded"></div>
        <div className="h-10 w-24 bg-muted animate-pulse rounded"></div>
      </div>

      {/* Tabs skeleton */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-9 w-20 bg-muted animate-pulse rounded"></div>
        ))}
      </div>

      {/* Sort buttons skeleton */}
      <div className="flex justify-end mb-6 gap-2">
        <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
        <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
      </div>

      {/* Posts grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div key={i} className="border rounded-lg p-6 space-y-4">
            <div className="h-6 w-16 bg-muted animate-pulse rounded"></div>
            <div className="h-7 w-full bg-muted animate-pulse rounded"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-3/4 bg-muted animate-pulse rounded"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 bg-muted animate-pulse rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
                <div className="h-3 w-32 bg-muted animate-pulse rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

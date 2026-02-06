export default function PostLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Badge skeleton */}
      <div className="h-6 w-20 bg-muted animate-pulse rounded mb-4"></div>

      {/* Title skeleton */}
      <div className="h-10 w-3/4 bg-muted animate-pulse rounded mb-6"></div>

      {/* Author info skeleton */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-muted animate-pulse rounded-full"></div>
        <div className="space-y-2 flex-1">
          <div className="h-5 w-32 bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-48 bg-muted animate-pulse rounded"></div>
        </div>
      </div>

      <div className="h-px bg-border mb-8"></div>

      {/* Content skeleton */}
      <div className="mb-8 space-y-3">
        <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
        <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
        <div className="h-4 w-5/6 bg-muted animate-pulse rounded"></div>
        <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
        <div className="h-4 w-4/5 bg-muted animate-pulse rounded"></div>
        <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
        <div className="h-4 w-3/4 bg-muted animate-pulse rounded"></div>
      </div>

      <div className="h-px bg-border mb-8"></div>

      {/* Actions skeleton */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-10 w-24 bg-muted animate-pulse rounded"></div>
        <div className="h-10 w-24 bg-muted animate-pulse rounded"></div>
      </div>

      <div className="h-px bg-border mb-8"></div>

      {/* Comments section skeleton */}
      <div>
        <div className="h-8 w-32 bg-muted animate-pulse rounded mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted animate-pulse rounded-full"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
                  <div className="h-3 w-32 bg-muted animate-pulse rounded"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
                <div className="h-4 w-4/5 bg-muted animate-pulse rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

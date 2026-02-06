export default function ProfileLoading() {
  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      {/* Profile Header skeleton */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        {/* Avatar skeleton */}
        <div className="w-24 h-24 bg-muted animate-pulse rounded-full"></div>

        <div className="flex-1 text-center md:text-left space-y-4">
          {/* Nickname skeleton */}
          <div className="h-9 w-48 bg-muted animate-pulse rounded mx-auto md:mx-0"></div>

          {/* Join date skeleton */}
          <div className="h-5 w-32 bg-muted animate-pulse rounded mx-auto md:mx-0"></div>

          {/* Edit button skeleton */}
          <div className="h-10 w-28 bg-muted animate-pulse rounded mx-auto md:mx-0"></div>
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="border-b mb-6">
        <div className="flex gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="h-10 w-24 bg-muted animate-pulse rounded-t"></div>
          ))}
        </div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="border rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-3">
                {/* Category badge */}
                <div className="h-6 w-16 bg-muted animate-pulse rounded"></div>

                {/* Title */}
                <div className="h-6 w-3/4 bg-muted animate-pulse rounded"></div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
                  <div className="h-4 w-2/3 bg-muted animate-pulse rounded"></div>
                </div>

                {/* Meta info */}
                <div className="flex items-center gap-4">
                  <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
                  <div className="h-4 w-20 bg-muted animate-pulse rounded"></div>
                  <div className="h-4 w-20 bg-muted animate-pulse rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

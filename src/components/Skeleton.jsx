// Shimmer skeleton placeholder. The shimmer keyframe is defined in tailwind.config.js
// and is automatically disabled under prefers-reduced-motion (see index.css).
export function Skeleton({ className = '' }) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-brand-100/60 ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  )
}

// A full card-shaped skeleton matching the LandCard layout.
export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-card">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="h-7 w-1/3" />
      </div>
    </div>
  )
}

const shimmer = "animate-shimmer bg-gradient-to-r from-bg-elevated via-bg-elevated/60 to-bg-elevated bg-[length:600px_100%] rounded-sm"

export function SkeletonCard() {
  return (
    <div className="bg-bg-surface border border-border-custom rounded-lg p-5" aria-hidden="true">
      <div className="flex justify-between mb-3.5 gap-3">
        <div className="flex-1 min-w-0">
          <div className={`${shimmer} h-4 w-2/3 mb-2`} />
          <div className={`${shimmer} h-3 w-1/2`} />
        </div>
        <div className={`${shimmer} h-6 w-16 rounded-full shrink-0`} />
      </div>

      <div className={`${shimmer} h-3 w-5/12 mb-2.5`} />
      <div className={`${shimmer} h-3 w-1/3 mb-3.5`} />

      <div className="flex gap-1.5 mb-4">
        {["w-20", "w-24", "w-16"].map((w) => (
          <div key={w} className={`${shimmer} h-6 rounded-full ${w}`} />
        ))}
      </div>

      <div className="flex justify-between pt-3.5 border-t border-border-custom">
        <div className={`${shimmer} h-4 w-20`} />
        <div className={`${shimmer} h-3.5 w-24`} />
      </div>
    </div>
  )
}

const shimmer = "animate-shimmer bg-gradient-to-r from-elevated via-background/50 to-elevated bg-[length:1000px_100%] rounded-sm"

export function SkeletonCard() {
  return (
    <div className="bg-surface border border-border/50 rounded-lg p-6" aria-hidden="true">
      <div className="flex justify-between mb-4 gap-4">
        <div className="flex-1 min-w-0">
          <div className={`${shimmer} h-5 w-2/3 mb-2`} />
          <div className={`${shimmer} h-3 w-1/3`} />
        </div>
        <div className={`${shimmer} h-5 w-12 shrink-0`} />
      </div>

      <div className={`${shimmer} h-3.5 w-full mb-2`} />
      <div className={`${shimmer} h-3.5 w-4/5 mb-4`} />

      <div className="flex gap-4 mb-6">
        <div className={`${shimmer} h-4 w-12`} />
        <div className={`${shimmer} h-4 w-16`} />
      </div>

      <div className="flex gap-2 mb-6">
        {["w-16", "w-20"].map((w) => (
          <div key={w} className={`${shimmer} h-6 ${w}`} />
        ))}
      </div>

      <div className="flex justify-between pt-5 border-t border-border/30">
        <div className="flex flex-col gap-1">
          <div className={`${shimmer} h-2.5 w-16`} />
          <div className={`${shimmer} h-5 w-24`} />
        </div>
        <div className={`${shimmer} h-8 w-8 rounded-full`} />
      </div>
    </div>
  )
}

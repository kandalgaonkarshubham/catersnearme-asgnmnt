import { fetchCaterers } from "@/lib/api"
import { CatererListClient } from "@/components/CatererListClient"
import { SearchBar } from "@/components/SearchBar"
import { PriceFilter } from "@/components/PriceFilter"
import { SortFilter } from "@/components/SortFilter"
import { SkeletonCard } from "@/components/SkeletonCard"
import { Suspense } from "react"

/**
 * ISR — revalidate the cached HTML every 60 seconds.
 */
export const revalidate = 60

export default async function CaterersPage() {
  const caterers = await fetchCaterers()

  return (
    <main>
      <div className="px-6 pt-12 pb-6 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-extrabold tracking-tight mb-1.5">Find a Caterer</h1>
        <p className="text-text-secondary text-sm m-0">
          {caterers.length > 0
            ? `${caterers.length} caterers across India — search and filter below`
            : "Browse verified caterers across India"}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16 w-full">
        <Suspense
          fallback={
            <>
              {/* Skeleton filter bar */}
              <div className="sticky top-0 z-20 -mx-6 px-6 py-4 mb-8 bg-bg-base/80 backdrop-blur-md border-b border-border-custom">
                <div className="relative w-full">
                  <input
                    className="w-full pl-10 pr-10 py-2.5 bg-bg-surface border border-border-custom rounded-md text-text-primary text-sm outline-none placeholder:text-text-muted"
                    placeholder="Search by name…"
                    disabled
                  />
                </div>
                <div className="flex gap-1.5 flex-wrap mt-3">
                  <span className="text-xs font-semibold text-text-muted uppercase tracking-wider self-center whitespace-nowrap">
                    Price:
                  </span>
                  <button
                    className="px-3.5 py-2 text-xs font-semibold rounded-sm border border-accent-custom/35 bg-accent-dim text-accent-custom cursor-pointer transition-all duration-150 whitespace-nowrap"
                    disabled
                  >
                    All prices
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(18.75rem,1fr))] gap-5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </>
          }
        >
          {/* ── Filter bar ── */}
          <div className="sticky top-0 z-20 -mx-6 px-6 py-4 mb-8 bg-bg-base/80 backdrop-blur-md border-b border-border-custom">
            {/* Row 1 — Search (full width) */}
            <SearchBar />

            {/* Row 2 — Filter pill groups */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
              <PriceFilter />
              <span className="hidden sm:block h-5 w-px bg-border-custom shrink-0" aria-hidden="true" />
              <SortFilter />
            </div>
          </div>

          <CatererListClient caterers={caterers} />
        </Suspense>
      </div>
    </main>
  )
}

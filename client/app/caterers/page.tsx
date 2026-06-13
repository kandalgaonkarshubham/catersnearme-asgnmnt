import { fetchCaterers } from "@/lib/api"
import { CatererListClient } from "@/components/CatererListClient"
import { SearchBar } from "@/components/SearchBar"
import { PriceFilter } from "@/components/PriceFilter"
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
              <div className="flex flex-wrap gap-3 items-center mb-8">
                <div className="relative flex-1 min-w-60 max-w-sm">
                  <input
                    className="w-full pl-10 pr-10 py-2.5 bg-bg-surface border border-border-custom rounded-md text-text-primary text-sm transition-all duration-200 outline-none placeholder:text-text-muted"
                    placeholder="Search by name…"
                    disabled
                  />
                </div>
                <div className="flex gap-1.5 flex-wrap">
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
          <div className="flex flex-wrap gap-3 items-center mb-8">
            <SearchBar />
            <PriceFilter />
          </div>

          <CatererListClient caterers={caterers} />
        </Suspense>
      </div>
    </main>
  )
}

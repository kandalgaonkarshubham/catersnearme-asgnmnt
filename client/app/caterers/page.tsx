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
    <main className="bg-background min-h-screen">
      <div className="px-6 pt-16 pb-12 max-w-7xl mx-auto w-full">
        <div className="inline-block mb-4 px-3 py-1 bg-primary-dim border border-primary/10 rounded-full">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
            Discovery
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-serif font-black tracking-tight text-foreground mb-4">
          The Collection
        </h1>
        <p className="text-secondary text-lg max-w-2xl font-medium leading-relaxed">
          {caterers.length > 0
            ? `Explore our curated selection of ${caterers.length} distinguished caterers across India.`
            : "Browse verified caterers across India"}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24 w-full">
        <Suspense
          fallback={
            <div className="grid grid-cols-[repeat(auto-fill,minmax(18.75rem,1fr))] gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          }
        >
          {/* ── Filter Section ── */}
          <div className="mb-12">
            <div className="flex flex-col gap-6">
              <SearchBar />
              <div className="flex flex-wrap items-center gap-4">
                <div className="text-[10px] font-black uppercase tracking-widest text-muted mr-2">Refine by:</div>
                <PriceFilter />
                <div className="h-4 w-px bg-border shrink-0" aria-hidden="true" />
                <SortFilter />
              </div>
            </div>
          </div>

          <CatererListClient caterers={caterers} />
        </Suspense>
      </div>
    </main>
  )
}

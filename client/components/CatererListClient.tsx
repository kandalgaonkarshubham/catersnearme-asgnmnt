"use client"

import { useQueryState, parseAsString, parseAsInteger } from "nuqs"
import { useMemo } from "react"
import { SORT_PARAM } from "./SortFilter"
import { CatererCard } from "./CatererCard"
import { SkeletonCard } from "./SkeletonCard"
import { EmptyState } from "./EmptyState"
import type { Caterer } from "@/types/caterer"

interface Props {
  caterers: Caterer[]
  isLoading?: boolean
}

export function CatererListClient({ caterers, isLoading = false }: Props) {
  const [name]       = useQueryState("name",                   parseAsString.withDefault(""))
  const [maxPrice]   = useQueryState("maxPrice",               parseAsInteger)
  const [sortPrice]  = useQueryState(SORT_PARAM.price,  parseAsString.withDefault(""))
  const [sortVeg]    = useQueryState(SORT_PARAM.veg,    parseAsString.withDefault(""))
  const [sortRating] = useQueryState(SORT_PARAM.rating, parseAsString.withDefault(""))

  const filtered = useMemo(() => {
    const base = caterers.filter((c) => {
      const matchesName  = name     ? c.name.toLowerCase().includes(name.toLowerCase()) : true
      const matchesPrice = maxPrice ? c.pricePerPlate <= maxPrice : true
      return matchesName && matchesPrice
    })

    // Apply each active sort independently and chain them.
    // If multiple sorts are active the order of priority is: price → veg → rating.
    const hasSort = sortPrice || sortVeg || sortRating
    if (!hasSort) return base

    return [...base].sort((a, b) => {
      if (sortPrice) {
        const asc = sortPrice === "asc"
        const diff = asc ? a.pricePerPlate - b.pricePerPlate : b.pricePerPlate - a.pricePerPlate
        if (diff !== 0) return diff
      }
      if (sortVeg) {
        const asc = sortVeg === "asc"
        const av = a.isVeg ? 1 : 0
        const bv = b.isVeg ? 1 : 0
        const diff = asc ? bv - av : av - bv
        if (diff !== 0) return diff
      }
      if (sortRating) {
        const asc = sortRating === "asc"
        const diff = asc ? a.rating - b.rating : b.rating - a.rating
        if (diff !== 0) return diff
      }
      return 0
    })
  }, [caterers, name, maxPrice, sortPrice, sortVeg, sortRating])

  if (isLoading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(18.75rem,1fr))] gap-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (caterers.length === 0) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(18.75rem,1fr))] gap-8">
        <EmptyState
          type="error"
          title="Couldn't load caterers"
          subtitle="The API might be down or unreachable. Make sure the backend is running on port 5000."
        />
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center gap-2 mb-8">
        <div className="h-px flex-1 bg-border/50" />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted whitespace-nowrap">
          Displaying {filtered.length} of {caterers.length} results
        </p>
        <div className="h-px flex-1 bg-border/50" />
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(18.75rem,1fr))] gap-8">
        {filtered.length > 0 ? (
          filtered.map((caterer) => (
            <CatererCard key={caterer._id} caterer={caterer} />
          ))
        ) : (
          <div className="col-span-full py-20">
            <EmptyState
              type="empty"
              title="No caterers found"
              subtitle={
                name || maxPrice
                  ? "Try adjusting your search or removing the price filter."
                  : "No caterers are available right now."
              }
            />
          </div>
        )}
      </div>
    </>
  )
}

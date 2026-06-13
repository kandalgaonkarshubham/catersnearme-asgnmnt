"use client"

import { useQueryState, parseAsString, parseAsInteger } from "nuqs"
import { useMemo } from "react"
import { CatererCard } from "./CatererCard"
import { SkeletonCard } from "./SkeletonCard"
import { EmptyState } from "./EmptyState"
import type { Caterer } from "@/types/caterer"

interface Props {
  caterers: Caterer[]
  isLoading?: boolean
}

export function CatererListClient({ caterers, isLoading = false }: Props) {
  const [name] = useQueryState("name", parseAsString.withDefault(""))
  const [maxPrice] = useQueryState("maxPrice", parseAsInteger)

  const filtered = useMemo(() => {
    return caterers.filter((c) => {
      const matchesName = name ? c.name.toLowerCase().includes(name.toLowerCase()) : true
      const matchesPrice = maxPrice ? c.pricePerPlate <= maxPrice : true
      return matchesName && matchesPrice
    })
  }, [caterers, name, maxPrice])

  if (isLoading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(18.75rem,1fr))] gap-5">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (caterers.length === 0) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(18.75rem,1fr))] gap-5">
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
      <p className="text-xs text-text-muted mb-5">
        Showing{" "}
        <strong className="text-text-secondary font-semibold">{filtered.length}</strong>
        {" "}of {caterers.length} caterers
        {name && (
          <> for <strong className="text-text-secondary font-semibold">&ldquo;{name}&rdquo;</strong></>
        )}
        {maxPrice && (
          <> under <strong className="text-text-secondary font-semibold">₹{maxPrice.toLocaleString()}/plate</strong></>
        )}
      </p>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(18.75rem,1fr))] gap-5">
        {filtered.length > 0 ? (
          filtered.map((caterer) => (
            <CatererCard key={caterer._id} caterer={caterer} />
          ))
        ) : (
          <EmptyState
            type="empty"
            title="No caterers found"
            subtitle={
              name || maxPrice
                ? "Try adjusting your search or removing the price filter."
                : "No caterers are available right now."
            }
          />
        )}
      </div>
    </>
  )
}

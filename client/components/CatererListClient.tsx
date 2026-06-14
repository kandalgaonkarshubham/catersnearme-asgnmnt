"use client"

import { useQueryState, parseAsString, parseAsInteger } from "nuqs"
import { useMemo } from "react"
import type { SortValue } from "./SortFilter"
import { CatererCard } from "./CatererCard"
import { SkeletonCard } from "./SkeletonCard"
import { EmptyState } from "./EmptyState"
import { IndianRupee } from "lucide-react"
import type { Caterer } from "@/types/caterer"

interface Props {
  caterers: Caterer[]
  isLoading?: boolean
}

export function CatererListClient({ caterers, isLoading = false }: Props) {
  const [name] = useQueryState("name", parseAsString.withDefault(""))
  const [maxPrice] = useQueryState("maxPrice", parseAsInteger)
  const [sort] = useQueryState("sort", parseAsString.withDefault(""))

  const filtered = useMemo(() => {
    const base = caterers.filter((c) => {
      const matchesName = name ? c.name.toLowerCase().includes(name.toLowerCase()) : true
      const matchesPrice = maxPrice ? c.pricePerPlate <= maxPrice : true
      return matchesName && matchesPrice
    })

    if (!sort) return base

    const [key, dir] = (sort as SortValue).split("_") as [string, "asc" | "desc"]
    const asc = dir === "asc"

    return [...base].sort((a, b) => {
      if (key === "price") return asc ? a.pricePerPlate - b.pricePerPlate : b.pricePerPlate - a.pricePerPlate
      if (key === "veg") {
        const av = a.isVeg ? 1 : 0
        const bv = b.isVeg ? 1 : 0
        return asc ? bv - av : av - bv
      }
      if (key === "rating") return asc ? a.rating - b.rating : b.rating - a.rating
      return 0
    })
  }, [caterers, name, maxPrice, sort])

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
          <> under <strong className="inline-flex items-center text-text-secondary font-semibold"><IndianRupee size={10} className="mr-0.5" />{maxPrice.toLocaleString()}/plate</strong></>
        )}
        {sort && (
          <> · sorted by <strong className="text-text-secondary font-semibold">{sort.replace("_", " ")}</strong></>
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

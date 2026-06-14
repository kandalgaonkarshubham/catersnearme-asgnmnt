"use client"

import type React from "react"
import { useQueryState, parseAsString } from "nuqs"
import { IndianRupee, Leaf, Star } from "lucide-react"

export type SortDir = "asc" | "desc"
export type SortKey = "price" | "veg" | "rating"

export const SORT_PARAM: Record<SortKey, string> = {
  price: "sortPrice",
  veg: "sortVeg",
  rating: "sortRating",
}

const SORT_OPTIONS: { label: string; dir: SortDir; group: SortKey }[] = [
  { label: "Price: Low to High",  dir: "asc",  group: "price" },
  { label: "Price: High to Low",  dir: "desc", group: "price" },
  { label: "Veg first",           dir: "asc",  group: "veg"   },
  { label: "Non-veg first",       dir: "desc", group: "veg"   },
  { label: "Rating: Low to High", dir: "asc",  group: "rating" },
  { label: "Rating: High to Low", dir: "desc", group: "rating" },
]

const GROUP_ICONS: Record<SortKey, React.ElementType> = {
  price:  IndianRupee,
  veg:    Leaf,
  rating: Star,
}

function useGroupSort(param: string) {
  return useQueryState(param, parseAsString.withDefault(""))
}

export function SortFilter() {
  const [sortPrice,  setSortPrice]  = useGroupSort(SORT_PARAM.price)
  const [sortVeg,    setSortVeg]    = useGroupSort(SORT_PARAM.veg)
  const [sortRating, setSortRating] = useGroupSort(SORT_PARAM.rating)

  const stateMap: Record<SortKey, [string, (v: string | null) => void]> = {
    price:  [sortPrice,  setSortPrice],
    veg:    [sortVeg,    setSortVeg],
    rating: [sortRating, setSortRating],
  }

  const toggle = (group: SortKey, dir: SortDir) => {
    const [current, setter] = stateMap[group]
    setter(current === dir ? null : dir)
  }

  return (
    <div className="flex gap-2 flex-wrap items-center">
      {SORT_OPTIONS.map((opt) => {
        const [current] = stateMap[opt.group]
        const isActive = current === opt.dir
        const CategoryIcon = GROUP_ICONS[opt.group]

        return (
          <button
            key={`${opt.group}_${opt.dir}`}
            id={`sort-filter-${opt.group}-${opt.dir}`}
            type="button"
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm border transition-all duration-300 whitespace-nowrap ${
              isActive
                ? "bg-foreground border-foreground text-background"
                : "border-border bg-surface text-secondary hover:border-foreground hover:text-foreground"
            }`}
            onClick={() => toggle(opt.group, opt.dir)}
            aria-pressed={isActive}
          >
            <CategoryIcon size={10} strokeWidth={3} />
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

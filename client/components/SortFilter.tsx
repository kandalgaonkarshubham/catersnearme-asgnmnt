"use client"

import { useQueryState, parseAsString } from "nuqs"
import { 
  ArrowUpDown, 
  IndianRupee, 
  Leaf, 
  Star 
} from "lucide-react"

export type SortKey = "price" | "veg" | "rating"
export type SortDir = "asc" | "desc"
export type SortValue = `${SortKey}_${SortDir}` | ""

const SORT_OPTIONS: { label: string; value: SortValue; group: SortKey }[] = [
  { label: "Price: Low to High", value: "price_asc", group: "price" },
  { label: "Price: High to Low", value: "price_desc", group: "price" },
  { label: "Veg first", value: "veg_asc", group: "veg" },
  { label: "Non-veg first", value: "veg_desc", group: "veg" },
  { label: "Rating: Low to High", value: "rating_asc", group: "rating" },
  { label: "Rating: High to Low", value: "rating_desc", group: "rating" },
]

const GROUP_ICONS: Record<SortKey, React.ElementType> = {
  price: IndianRupee,
  veg: Leaf,
  rating: Star,
}

export function SortFilter() {
  const [sort, setSort] = useQueryState("sort", parseAsString.withDefault(""))

  const toggle = (value: SortValue) => {
    setSort(sort === value ? "" : value)
  }

  return (
    <div className="flex gap-1.5 flex-wrap items-center">
      <span className="flex items-center gap-1 text-xs font-semibold text-text-muted uppercase tracking-wider whitespace-nowrap">
        <ArrowUpDown size={12} />
        Sort:
      </span>
      {SORT_OPTIONS.map((opt) => {
        const isActive = sort === opt.value
        const CategoryIcon = GROUP_ICONS[opt.group]

        return (
          <button
            key={opt.value}
            id={`sort-filter-${opt.value}`}
            type="button"
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-sm border transition-all duration-150 whitespace-nowrap hover:border-border-hover-custom hover:text-text-primary ${
              isActive
                ? "bg-accent-dim border-accent-custom/35 text-accent-custom font-semibold"
                : "border-border-custom bg-bg-surface text-text-secondary"
            }`}
            onClick={() => toggle(opt.value)}
            aria-pressed={isActive}
          >
            <CategoryIcon size={11} strokeWidth={2.5} />
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

"use client"

import { useQueryState, parseAsInteger } from "nuqs"
import { IndianRupee, Filter } from "lucide-react"

const PRICE_OPTIONS = [
  { label: "All prices", value: null },
  { label: "500", value: 500 },
  { label: "1000", value: 1000 },
  { label: "1500", value: 1500 },
  { label: "2000", value: 2000 },
] as const

export function PriceFilter() {
  const [maxPrice, setMaxPrice] = useQueryState("maxPrice", parseAsInteger)

  return (
    <div className="flex gap-2 flex-wrap">
      {PRICE_OPTIONS.map((opt) => {
        const isActive = opt.value === maxPrice
        return (
          <button
            key={opt.label}
            id={`price-filter-${opt.value ?? "all"}`}
            type="button"
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm border transition-all duration-300 whitespace-nowrap ${
              isActive
                ? "bg-primary border-primary text-white shadow-sm"
                : "border-border bg-surface text-secondary hover:border-primary/50 hover:text-primary"
            }`}
            onClick={() => setMaxPrice(opt.value)}
            aria-pressed={isActive}
          >
            {opt.value && <IndianRupee size={10} strokeWidth={3} />}
            {opt.value ? `${opt.value.toLocaleString()} max` : opt.label}
          </button>
        )
      })}
    </div>
  )
}

"use client"

import { useQueryState, parseAsInteger } from "nuqs"

const PRICE_OPTIONS = [
  { label: "All prices", value: null },
  { label: "≤ ₹500", value: 500 },
  { label: "≤ ₹1,000", value: 1000 },
  { label: "≤ ₹1,500", value: 1500 },
  { label: "≤ ₹2,000", value: 2000 },
] as const

export function PriceFilter() {
  const [maxPrice, setMaxPrice] = useQueryState("maxPrice", parseAsInteger)

  return (
    <div className="flex gap-1.5 flex-wrap">
      <span className="text-xs font-semibold text-text-muted uppercase tracking-wider self-center whitespace-nowrap">
        Price:
      </span>
      {PRICE_OPTIONS.map((opt) => {
        const isActive = opt.value === maxPrice
        return (
          <button
            key={opt.label}
            id={`price-filter-${opt.value ?? "all"}`}
            type="button"
            className={`px-3.5 py-2 text-xs font-medium rounded-sm border transition-all duration-150 whitespace-nowrap hover:border-border-hover-custom hover:text-text-primary ${
              isActive
                ? "bg-accent-dim border-accent-custom/35 text-accent-custom font-semibold"
                : "border-border-custom bg-bg-surface text-text-secondary"
            }`}
            onClick={() => setMaxPrice(opt.value)}
            aria-pressed={isActive}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

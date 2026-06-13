"use client"

import { useQueryState, parseAsString, parseAsInteger } from "nuqs"
import { SearchX, WifiOff } from "lucide-react"

interface EmptyStateProps {
  type: "empty" | "error"
  title: string
  subtitle: string
}

export function EmptyState({ type, title, subtitle }: EmptyStateProps) {
  const [, setName] = useQueryState("name", parseAsString.withDefault(""))
  const [, setMaxPrice] = useQueryState("maxPrice", parseAsInteger)

  const handleReset = () => {
    setName(null)
    setMaxPrice(null)
  }

  const Icon = type === "error" ? WifiOff : SearchX

  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 px-8 text-center gap-4">
      <div className="size-18 rounded-full bg-bg-elevated border border-border-custom flex items-center justify-center text-text-muted mb-2">
        <Icon size={28} />
      </div>
      <h3 className="text-lg font-bold text-text-primary m-0">{title}</h3>
      <p className="text-sm text-text-secondary max-w-xs m-0 leading-relaxed">{subtitle}</p>
      {type === "empty" && (
        <button
          className="px-5 py-2 bg-bg-elevated border border-border-custom rounded-md text-text-secondary text-xs font-medium cursor-pointer transition-all duration-150 mt-2 hover:border-border-hover-custom hover:text-text-primary"
          onClick={handleReset}
          type="button"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}

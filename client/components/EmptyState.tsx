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
    <div className="col-span-full flex flex-col items-center justify-center py-24 px-8 text-center gap-6 bg-surface border border-dashed border-border rounded-lg">
      <div className="size-16 rounded-full bg-primary-dim flex items-center justify-center text-primary mb-2">
        <Icon size={24} strokeWidth={2.5} />
      </div>
      <div className="max-w-md">
        <h3 className="text-3xl font-serif font-black text-foreground mb-3">{title}</h3>
        <p className="text-secondary font-medium leading-relaxed">{subtitle}</p>
      </div>
      {type === "empty" && (
        <button
          className="px-8 py-3 bg-foreground text-background text-[10px] font-black uppercase tracking-widest rounded-sm transition-all duration-300 mt-2 hover:bg-primary hover:text-white shadow-md hover:-translate-y-1"
          onClick={handleReset}
          type="button"
        >
          Reset all filters
        </button>
      )}
    </div>
  )
}

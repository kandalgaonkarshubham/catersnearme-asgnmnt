"use client"

import { useCallback } from "react"
import { useQueryState, parseAsString } from "nuqs"
import { Search, X } from "lucide-react"

export function SearchBar() {
  const [name, setName] = useQueryState("name", parseAsString.withDefault(""))

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setName(val || null)
    },
    [setName]
  )

  const handleClear = useCallback(() => {
    setName(null)
  }, [setName])

  return (
    <div className="relative w-full max-w-2xl">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none flex items-center" aria-hidden="true">
        <Search size={16} strokeWidth={2.5} />
      </span>
      <input
        id="caterer-search"
        type="search"
        className="w-full pl-12 pr-12 py-4 bg-surface border border-border rounded-sm text-foreground text-sm transition-all duration-300 outline-none placeholder:text-muted placeholder:font-medium focus:border-primary focus:ring-4 focus:ring-primary-glow"
        placeholder="Which caterer are you looking for?"
        value={name}
        onChange={handleChange}
        aria-label="Search caterers by name"
      />
      {name && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-elevated text-muted cursor-pointer flex items-center p-1 rounded-full transition-all duration-200 hover:text-primary hover:bg-primary-dim"
          onClick={handleClear}
          aria-label="Clear search"
          type="button"
        >
          <X size={16} strokeWidth={2.5} />
        </button>
      )}
    </div>
  )
}

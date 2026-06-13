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
    <div className="relative w-full">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none flex items-center" aria-hidden="true">
        <Search size={15} />
      </span>
      <input
        id="caterer-search"
        type="search"
        className="w-full pl-10 pr-10 py-2.5 bg-bg-surface border border-border-custom rounded-md text-text-primary text-sm transition-all duration-200 outline-none placeholder:text-text-muted focus:border-accent-custom focus:ring focus:ring-accent-dim"
        placeholder="Search by name…"
        value={name}
        onChange={handleChange}
        aria-label="Search caterers by name"
      />
      {name && (
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none text-text-muted cursor-pointer flex items-center p-0.5 rounded transition-colors duration-150 hover:text-text-primary"
          onClick={handleClear}
          aria-label="Clear search"
          type="button"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}

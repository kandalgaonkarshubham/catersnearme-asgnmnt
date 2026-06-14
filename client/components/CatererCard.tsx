import Link from "next/link"
import { MapPin, Star, Users, IndianRupee } from "lucide-react"
import type { Caterer } from "@/types/caterer"

export function CatererCard({ caterer }: { caterer: Caterer }) {
  const vegClass = caterer.isVeg
    ? "bg-veg-bg text-veg border-veg/25"
    : "bg-nonveg-bg text-nonveg border-nonveg/25"

  return (
    <Link
      href={`/caterers/${caterer._id}`}
      className="block bg-bg-surface border border-border-custom rounded-lg p-5 no-underline text-inherit transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:shadow-card-hover hover:border-border-hover-custom shadow-card cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3 mb-3.5">
        <div className="min-w-0">
          <h3 className="text-base font-bold text-text-primary leading-snug m-0 tracking-tight">
            {caterer.name}
          </h3>
          {caterer.tagline && (
            <p className="text-xs text-text-muted mt-1 mb-0 leading-snug line-clamp-1">
              {caterer.tagline}
            </p>
          )}
        </div>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 border ${vegClass}`}>
          {caterer.isVeg ? "🌿 Veg" : "🍖 Non-Veg"}
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-text-secondary text-xs mb-2.5">
        <MapPin size={13} />
        <span>{caterer.location.area}, {caterer.location.city}</span>
      </div>

      <div className="flex items-center gap-1.5 mb-3.5">
        <Star size={13} className="text-star" fill="currentColor" />
        <span className="text-sm font-bold text-text-primary">{caterer.rating.toFixed(1)}</span>
        <span className="text-xs text-text-muted">({caterer.reviewCount.toLocaleString()} reviews)</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {caterer.cuisines.slice(0, 3).map((c) => (
          <span key={c} className="px-2.5 py-1 bg-bg-elevated border border-border-custom rounded-full text-xs font-medium text-text-secondary">
            {c}
          </span>
        ))}
        {caterer.cuisines.length > 3 && (
          <span className="px-2.5 py-1 bg-accent-dim border border-accent-custom/20 rounded-full text-xs font-semibold text-accent-custom">
            +{caterer.cuisines.length - 3}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-3.5 border-t border-border-custom gap-2">
        <div className="flex items-baseline gap-0.5 text-accent-custom font-bold text-base">
          <IndianRupee size={15} strokeWidth={2.5} className="mr-[-2px] self-center" />
          <span>{caterer.pricePerPlate.toLocaleString()}</span>
          <span className="text-xs font-medium text-text-muted ml-0.5">/plate</span>
        </div>
        {caterer.minGuests && caterer.maxGuests && (
          <div className="flex items-center gap-1 text-xs text-text-muted">
            <Users size={11} />
            <span>{caterer.minGuests}–{caterer.maxGuests.toLocaleString()} guests</span>
          </div>
        )}
      </div>
    </Link>
  )
}

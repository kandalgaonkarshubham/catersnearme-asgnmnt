import Link from "next/link"
import { MapPin, Star, Users, IndianRupee, ArrowRight } from "lucide-react"
import type { Caterer } from "@/types/caterer"

export function CatererCard({ caterer }: { caterer: Caterer }) {
  const vegClass = caterer.isVeg
    ? "text-veg bg-veg-bg border-veg/10"
    : "text-nonveg bg-nonveg-bg border-nonveg/10"

  return (
    <Link
      href={`/caterers/${caterer._id}`}
      className="group block bg-surface border border-border/50 rounded-lg overflow-hidden no-underline text-inherit transition-all duration-300 hover:shadow-card-hover hover:border-primary/20"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-serif font-bold text-foreground leading-tight mb-1 group-hover:text-primary transition-colors duration-200">
              {caterer.name}
            </h3>
            <div className="flex items-center gap-1.5 text-muted text-[10px] font-bold uppercase tracking-widest">
              <MapPin size={10} />
              <span>{caterer.location.area}, {caterer.location.city}</span>
            </div>
          </div>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-black uppercase tracking-wider border ${vegClass}`}>
            {caterer.isVeg ? "Veg" : "Non-Veg"}
          </span>
        </div>

        {caterer.tagline && (
          <p className="text-sm text-secondary line-clamp-2 mb-4 leading-relaxed italic opacity-80">
            &ldquo;{caterer.tagline}&rdquo;
          </p>
        )}

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-star" fill="currentColor" />
            <span className="text-sm font-bold text-foreground">{caterer.rating.toFixed(1)}</span>
            <span className="text-[10px] text-muted font-medium">({caterer.reviewCount})</span>
          </div>
          {caterer.minGuests != null && caterer.maxGuests != null && (
            <>
              <div className="h-4 w-px bg-border/50" />
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted">
                <Users size={12} />
                <span>{caterer.minGuests.toLocaleString()}–{caterer.maxGuests.toLocaleString()}</span>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {caterer.cuisines.slice(0, 2).map((c) => (
            <span key={c} className="px-2.5 py-1 bg-elevated text-[10px] font-bold uppercase tracking-wider text-secondary rounded-sm border border-border/50">
              {c}
            </span>
          ))}
          {caterer.cuisines.length > 2 && (
            <span className="px-2.5 py-1 bg-primary-dim text-[10px] font-black uppercase tracking-wider text-primary rounded-sm">
              +{caterer.cuisines.length - 2} More
            </span>
          )}
        </div>

        <div className="pt-5 border-t border-border/30 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted mb-0.5">Price starting from</div>
            <div className="flex items-baseline gap-0.5 text-primary font-serif font-black text-xl">
              <IndianRupee size={16} strokeWidth={3} className="mr-[-1px] self-center" />
              <span>{caterer.pricePerPlate.toLocaleString()}</span>
              <span className="text-[10px] font-bold text-muted ml-1 uppercase tracking-widest">/ plate</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </Link>
  )
}

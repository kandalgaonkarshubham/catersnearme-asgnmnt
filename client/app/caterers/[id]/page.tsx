import { fetchCaterers, fetchCatererById } from "@/lib/api"
import { notFound } from "next/navigation"
import Link from "next/link"
import { MapPin, Star, ChefHat, Users, IndianRupee, ArrowLeft, Clock } from "lucide-react"

interface Props {
  params: Promise<{ id: string }>
}

// SSG — static page per caterer at build time
export async function generateStaticParams() {
  const caterers = await fetchCaterers()
  return caterers.map((c) => ({ id: c._id }))
}

export default async function CatererDetailPage({ params }: Props) {
  const { id } = await params
  const caterer = await fetchCatererById(id)

  if (!caterer) notFound()

  const vegClass = caterer.isVeg
    ? "bg-veg-bg text-veg border-veg/25"
    : "bg-nonveg-bg text-nonveg border-nonveg/25"

  return (
    <main>
      <div className="max-w-7xl mx-auto px-6 pb-16 w-full pt-8">
        <Link
          href="/caterers"
          className="inline-flex items-center gap-1.5 text-xs text-text-secondary no-underline py-1.5 transition-colors duration-150 mb-8 hover:text-text-primary"
        >
          <ArrowLeft size={15} />
          Back to caterers
        </Link>

        <div className="py-10 border-b border-border-custom mb-8">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
            <div>
              <h1 className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold tracking-tighter leading-none mb-2">
                {caterer.name}
              </h1>
              {caterer.tagline && (
                <p className="text-base text-text-secondary m-0 leading-relaxed">{caterer.tagline}</p>
              )}
            </div>

            <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap shrink-0 border ${vegClass}`}>
              {caterer.isVeg ? "🌿 Pure Veg" : "🍖 Non-Veg"}
            </span>
          </div>

          <div className="flex gap-2 flex-wrap items-center mt-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-elevated border border-border-custom rounded-sm text-sm">
              <Star size={14} className="text-star" fill="currentColor" />
              <span className="font-bold text-text-primary">{caterer.rating.toFixed(1)}</span>
              <span className="text-text-muted text-xs">· {caterer.reviewCount.toLocaleString()} reviews</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-elevated border border-border-custom rounded-sm text-sm text-text-secondary">
              <MapPin size={13} />
              <span>{caterer.location.area}, {caterer.location.city}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(12.5rem,1fr))] gap-4 mb-8">
          <StatCard label="Price per Plate" icon={<IndianRupee size={10} className="inline mr-0.5" />}>
            <span className="text-lg font-bold text-accent-custom">₹{caterer.pricePerPlate.toLocaleString()}</span>
          </StatCard>

          {caterer.experience && (
            <StatCard label="Experience" icon={<Clock size={10} className="inline mr-0.5" />}>
              <span className="text-lg font-bold text-text-primary">
                {caterer.experience} {caterer.experience === 1 ? "year" : "years"}
              </span>
            </StatCard>
          )}

          {caterer.minGuests && caterer.maxGuests && (
            <StatCard label="Guest Capacity" icon={<Users size={10} className="inline mr-0.5" />}>
              <span className="text-lg font-bold text-text-primary">
                {caterer.minGuests.toLocaleString()}–{caterer.maxGuests.toLocaleString()}
              </span>
            </StatCard>
          )}

          <StatCard label="Location" icon={<MapPin size={10} className="inline mr-0.5" />}>
            <div className="text-lg font-bold text-text-primary">
              {caterer.location.area}
              <span className="block text-xs text-text-secondary font-medium">{caterer.location.city}</span>
            </div>
          </StatCard>
        </div>

        <section className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3.5">
            <ChefHat size={11} className="inline mr-1.5" />
            Cuisines offered
          </h2>
          <div className="flex flex-wrap gap-2">
            {caterer.cuisines.map((c) => (
              <span key={c} className="px-3.5 py-1.5 bg-bg-elevated border border-border-custom rounded-full text-sm font-medium text-text-secondary">
                {c}
              </span>
            ))}
          </div>
        </section>

        <div className="bg-bg-surface border border-border-custom rounded-lg p-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="font-bold text-base mb-1">Interested in {caterer.name}?</div>
            <div className="text-text-secondary text-sm">
              Starting at ₹{caterer.pricePerPlate.toLocaleString()} per plate
            </div>
          </div>
          <Link
            href="/caterers"
            className="px-5 py-2.5 bg-accent-dim border border-accent-custom/25 rounded-md text-accent-custom font-semibold text-sm no-underline transition-colors duration-150 hover:bg-accent-custom/20"
          >
            ← Browse more caterers
          </Link>
        </div>
      </div>
    </main>
  )
}

function StatCard({
  label,
  icon,
  children,
}: {
  label: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="bg-bg-surface border border-border-custom rounded-md p-4 flex flex-col gap-1.5">
      <div className="text-xs font-semibold uppercase tracking-widest text-text-muted">
        {icon}
        {label}
      </div>
      {children}
    </div>
  )
}

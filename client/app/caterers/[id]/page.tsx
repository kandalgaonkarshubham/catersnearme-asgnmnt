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
    ? "text-veg bg-veg-bg border-veg/10"
    : "text-nonveg bg-nonveg-bg border-nonveg/10"

  return (
    <main className="bg-background min-h-screen">
      <div className="max-w-6xl mx-auto px-6 pb-32 w-full pt-12">
        <Link
          href="/caterers"
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted no-underline transition-colors duration-300 mb-12 hover:text-primary"
        >
          <ArrowLeft size={14} />
          Back to Collection
        </Link>

        <div className="mb-20">
          <div className="flex items-start justify-between gap-8 flex-wrap mb-8">
            <div className="max-w-3xl">
              <div className="inline-block mb-4 px-3 py-1 bg-primary-dim border border-primary/10 rounded-full">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  Caterer Profile
                </span>
              </div>
              <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-serif font-black tracking-tight leading-[0.9] text-foreground mb-6">
                {caterer.name}
              </h1>
              {caterer.tagline && (
                <p className="text-xl text-secondary font-medium italic opacity-90 leading-relaxed border-l-4 border-primary/20 pl-6 py-2">
                  &ldquo;{caterer.tagline}&rdquo;
                </p>
              )}
            </div>

            <div className={`inline-flex items-center px-4 py-1.5 rounded-sm text-xs font-black uppercase tracking-widest border ${vegClass}`}>
              {caterer.isVeg ? "Pure Veg" : "Non-Veg"}
            </div>
          </div>

          <div className="flex gap-4 flex-wrap items-center">
            <div className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-sm">
              <Star size={14} className="text-star" fill="currentColor" />
              <span className="font-bold text-foreground">{caterer.rating.toFixed(1)}</span>
              <span className="text-muted text-[10px] font-bold uppercase tracking-widest ml-1">
                {caterer.reviewCount.toLocaleString()} Reviews
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-sm text-secondary">
              <MapPin size={14} className="text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest">{caterer.location.area}, {caterer.location.city}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-20">
          <StatCard label="Price / Plate">
            <div className="flex items-baseline gap-1 text-primary font-serif font-black text-3xl">
              <IndianRupee size={24} strokeWidth={3} className="mr-[-2px] self-center" />
              <span>{caterer.pricePerPlate.toLocaleString()}</span>
            </div>
          </StatCard>

          {caterer.experience && (
            <StatCard label="Industry Exp.">
              <div className="text-3xl font-serif font-black text-foreground">
                {caterer.experience}+ <span className="text-sm font-bold uppercase tracking-widest text-muted ml-1">Yrs</span>
              </div>
            </StatCard>
          )}

          {caterer.minGuests && caterer.maxGuests && (
            <StatCard label="Guest Range">
              <div className="text-2xl font-serif font-black text-foreground">
                {caterer.minGuests.toLocaleString()}–{caterer.maxGuests.toLocaleString()}
              </div>
            </StatCard>
          )}

          <StatCard label="Base Location">
            <div className="text-xl font-serif font-black text-foreground leading-tight">
              {caterer.location.area}
              <span className="block text-[10px] font-bold uppercase tracking-widest text-muted mt-1">{caterer.location.city}</span>
            </div>
          </StatCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <section className="md:col-span-2">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-muted mb-8 flex items-center gap-3">
              <div className="h-px w-8 bg-primary" />
              Cuisine Portfolio
            </h2>
            <div className="flex flex-wrap gap-3">
              {caterer.cuisines.map((c) => (
                <span key={c} className="px-5 py-2.5 bg-surface border border-border rounded-sm text-xs font-bold uppercase tracking-widest text-secondary hover:border-primary hover:text-primary transition-all duration-300">
                  {c}
                </span>
              ))}
            </div>
          </section>

          <section>
            <div className="sticky top-28 bg-surface border border-border rounded-lg p-8 shadow-card">
              <h3 className="text-2xl font-serif font-black text-foreground mb-4">Request Quote</h3>
              <p className="text-sm text-secondary mb-8 leading-relaxed">
                Experience {caterer.name}&apos;s culinary expertise for your next event.
              </p>
              
              <div className="flex items-baseline gap-1 text-primary font-serif font-black text-4xl mb-8">
                <IndianRupee size={28} strokeWidth={3} className="mr-[-2px]" />
                <span>{caterer.pricePerPlate.toLocaleString()}</span>
                <span className="text-xs font-bold text-muted ml-2 uppercase tracking-[0.2em]">/ plate</span>
              </div>

              <button className="w-full py-4 bg-foreground text-background font-black text-xs uppercase tracking-[0.2em] rounded-sm transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-1 shadow-lg">
                Check Availability
              </button>
              
              <p className="text-[10px] font-bold text-muted text-center mt-6 uppercase tracking-widest">
                Trusted by 2,000+ event hosts
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

function StatCard({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-surface border border-border/50 rounded-lg p-8 flex flex-col gap-4 transition-all duration-300 hover:shadow-card-hover">
      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted border-b border-border/30 pb-4">
        {label}
      </div>
      <div className="pt-2">{children}</div>
    </div>
  )
}

import Link from "next/link"
import { ArrowRight, UtensilsCrossed, MapPin, Star } from "lucide-react"

const features = [
  {
    icon: <MapPin size={20} />,
    label: "10 Cities",
    desc: "Mumbai, Delhi, Bengaluru & more",
  },
  {
    icon: <UtensilsCrossed size={20} />,
    label: "25+ Cuisines",
    desc: "From North Indian to Japanese",
  },
  {
    icon: <Star size={20} />,
    label: "Verified Ratings",
    desc: "Real reviews, transparent scores",
  },
]

export default function HomePage() {
  return (
    <main>
      <section className="relative flex flex-col items-center justify-center min-h-[calc(100dvh-4rem)] px-6 py-16 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,hsla(32,95%,55%,0.12)_0%,transparent_70%),radial-gradient(ellipse_60%_50%_at_80%_120%,hsla(200,80%,55%,0.06)_0%,transparent_70%)]" />

        <div className="relative z-10 inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-accent-custom bg-accent-dim border border-accent-custom/20 px-4 py-1.5 rounded-full mb-6">
          <UtensilsCrossed size={12} />
          India&apos;s Catering Search Platform
        </div>

        <h1 className="relative z-10 text-[clamp(2.5rem,6vw,5rem)] font-extrabold tracking-tighter leading-[1.05] mb-5 max-w-3xl">
          Find the perfect caterer for{" "}
          <span className="bg-gradient-to-br from-accent-custom to-[hsl(42,95%,65%)] bg-clip-text text-transparent">
            every celebration
          </span>
        </h1>

        <p className="relative z-10 text-lg text-text-secondary max-w-lg leading-relaxed mb-10">
          Browse hundreds of verified caterers across India. Filter by cuisine,
          location, and price — and find the right fit in seconds.
        </p>

        <Link
          href="/caterers"
          className="relative z-10 inline-flex items-center gap-2 px-8 py-3.5 bg-accent-custom text-bg-base font-bold text-sm rounded-md no-underline transition-all duration-200 shadow-accent hover:bg-accent-hover-custom hover:-translate-y-0.5 hover:shadow-[0_12px_40px_var(--color-accent-glow)]"
        >
          Browse Caterers
          <ArrowRight size={16} />
        </Link>

        <div className="relative z-10 flex gap-12 mt-16">
          {[
            { value: "100+", label: "Verified Caterers" },
            { value: "10", label: "Cities" },
            { value: "25+", label: "Cuisines" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-extrabold text-text-primary tracking-tight">{value}</div>
              <div className="text-xs text-text-muted font-medium mt-1 uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border-custom py-12 px-6 flex gap-8 flex-wrap justify-center max-w-4xl mx-auto">
        {features.map(({ icon, label, desc }) => (
          <div key={label} className="flex flex-col items-center gap-2 text-center flex-[1_1_12.5rem]">
            <div className="w-11 h-11 rounded-md bg-accent-dim border border-accent-custom/20 flex items-center justify-center text-accent-custom">
              {icon}
            </div>
            <div className="font-bold text-sm text-text-primary">{label}</div>
            <div className="text-xs text-text-secondary">{desc}</div>
          </div>
        ))}
      </section>
    </main>
  )
}

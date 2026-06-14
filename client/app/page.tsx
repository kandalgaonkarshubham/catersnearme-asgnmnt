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
    <main className="bg-background">
      <section className="relative px-6 pt-20 pb-32 md:px-12 md:pt-32 md:pb-48 overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-glow blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary-glow blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 opacity-30" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-block mb-6 px-4 py-1.5 bg-primary-dim border border-primary/10 rounded-full">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              Premium Catering Discovery
            </span>
          </div>
          
          <h1 className="text-[clamp(3rem,8vw,6rem)] font-serif font-black leading-[0.95] tracking-tight text-foreground mb-8">
            Exceptional food for <br />
            <span className="text-primary italic">memorable</span> events.
          </h1>

          <p className="text-lg md:text-xl text-secondary max-w-2xl leading-relaxed mb-12 font-medium">
            From intimate gatherings to grand celebrations, discover India&apos;s 
            most distinguished caterers curated for your specific needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/caterers"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-primary text-white font-bold text-sm uppercase tracking-widest rounded-sm transition-all duration-300 shadow-accent hover:bg-primary-hover hover:-translate-y-1"
            >
              Start Searching
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/caterers"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-transparent border border-foreground text-foreground font-bold text-sm uppercase tracking-widest rounded-sm transition-all duration-300 hover:bg-foreground hover:text-background"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface border-y border-border/50 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {features.map(({ icon, label, desc }) => (
              <div key={label} className="group flex flex-col items-start">
                <div className="w-14 h-14 rounded-full bg-elevated flex items-center justify-center text-primary mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                  {icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-3">{label}</h3>
                <p className="text-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif font-black text-foreground mb-6">
              Our impact in numbers
            </h2>
            <p className="text-secondary text-lg">
              We&apos;ve helped thousands of hosts find the perfect culinary match for their events across the country.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {[
            { value: "100+", label: "Verified Partners" },
            { value: "10", label: "Major Cities" },
            { value: "25+", label: "Cuisine Types" },
          ].map(({ value, label }) => (
            <div key={label} className="p-8 bg-surface border border-border/50 rounded-lg transition-all duration-300 hover:shadow-card-hover">
              <div className="text-5xl font-serif font-black text-primary mb-2">{value}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted">{label}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

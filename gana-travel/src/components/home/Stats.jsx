import { Users, Globe2, Bed, Smile } from 'lucide-react'

const stats = [
  { icon: Users, value: '50K+', label: 'Travelers' },
  { icon: Globe2, value: '2', label: 'Continents' },
  { icon: Bed, value: '300+', label: 'Hotels' },
  { icon: Smile, value: '98%', label: 'Satisfaction' },
]

export default function Stats() {
  return (
    <section className="container-page -mt-12 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 rounded-2xl bg-white shadow-card p-3 sm:p-5">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div
              key={s.label}
              className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-cream/50 transition"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-mint/15 text-teal">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-navy">{s.value}</p>
                <p className="text-xs sm:text-sm text-muted">{s.label}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, MapPin, CheckCircle2, Plane } from 'lucide-react'
import { tours as allTours } from '../data/tours.js'
import TourCard from '../components/tours/TourCard.jsx'
import TourFilters from '../components/tours/TourFilters.jsx'
import Modal from '../components/ui/Modal.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'

const SAVED_KEY = 'gana_saved_tours'

const matchDuration = (days, opt) => {
  if (opt === '3-5') return days >= 3 && days <= 5
  if (opt === '6-9') return days >= 6 && days <= 9
  if (opt === '10+') return days >= 10
  return true
}

export default function Tours() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({ duration: [], region: [], theme: [] })
  const [active, setActive] = useState(null)
  const [saved, setSaved] = useState(() => {
    try {
      const raw = localStorage.getItem(SAVED_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  const toggleSave = (tour) => {
    setSaved((prev) => {
      const exists = prev.some((t) => t.id === tour.id)
      const next = exists ? prev.filter((t) => t.id !== tour.id) : [...prev, { ...tour, type: 'tour' }]
      localStorage.setItem(SAVED_KEY, JSON.stringify(next))
      return next
    })
  }

  const filtered = useMemo(() => {
    return allTours.filter((t) => {
      if (filters.duration.length && !filters.duration.some((d) => matchDuration(t.duration, d)))
        return false
      if (filters.region.length && !filters.region.includes(t.region)) return false
      if (filters.theme.length && !filters.theme.includes(t.theme)) return false
      return true
    })
  }, [filters])

  const book = (tour) => {
    setActive(null)
    navigate('/checkout', { state: { type: 'tour', item: tour } })
  }

  return (
    <section className="container-page py-10">
      <div className="mb-8">
        <h1 className="heading-lg text-navy">Curated tour packages</h1>
        <p className="text-muted mt-1">
          Bundles include flight, hotel, transfers, and guided experiences — one price, one booking.
        </p>
      </div>

      <TourFilters filters={filters} setFilters={setFilters} />

      <div className="mt-6">
        {filtered.length === 0 ? (
          <div className="card">
            <EmptyState
              title="No tours match those filters"
              message="Try removing one of the filter chips above."
              actionLabel="Clear filters"
              onAction={() => setFilters({ duration: [], region: [], theme: [] })}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t) => (
              <TourCard
                key={t.id}
                tour={t}
                onView={setActive}
                isSaved={saved.some((s) => s.id === t.id)}
                onToggleSave={toggleSave}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.title || ''}
        size="lg"
        footer={
          active && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs text-muted">Total package price</p>
                <p className="text-2xl font-extrabold text-orange">${active.price}</p>
              </div>
              <Button onClick={() => book(active)}>Book Package</Button>
            </div>
          )
        }
      >
        {active && <TourDetail tour={active} />}
      </Modal>
    </section>
  )
}

function TourDetail({ tour }) {
  return (
    <div className="space-y-6">
      <div className="relative h-64 rounded-2xl overflow-hidden">
        <img src={tour.image} alt={tour.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
          <Badge tone="orange" className="bg-orange text-white" icon={Plane}>
            Flight + Hotel
          </Badge>
          <Badge tone="navy" className="bg-white text-navy" icon={Clock}>
            {tour.duration} days
          </Badge>
          <Badge tone="navy" className="bg-white text-navy" icon={MapPin}>
            {tour.cities.join(' • ')}
          </Badge>
        </div>
      </div>

      <div>
        <h4 className="font-bold text-navy mb-3">Trip highlights</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {tour.highlights.map((h) => (
            <div key={h} className="flex items-start gap-2 text-sm text-navy/80">
              <CheckCircle2 className="h-4 w-4 text-teal mt-0.5 shrink-0" /> {h}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-bold text-navy mb-3">Day-by-day itinerary</h4>
        <ol className="space-y-3">
          {tour.itinerary.map((d) => (
            <li key={d.day} className="flex gap-4 rounded-xl bg-cream p-3 sm:p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal text-white text-sm font-bold">
                {d.day}
              </div>
              <div>
                <p className="font-semibold text-navy text-sm">{d.title}</p>
                <p className="text-sm text-muted mt-0.5">{d.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

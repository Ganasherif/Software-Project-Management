import { useState } from 'react'
import { Clock, MapPin, CheckCircle2, Plane, Heart } from 'lucide-react'
import Badge from '../ui/Badge.jsx'

export default function TourCard({ tour, onView, isSaved = false, onToggleSave }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      className="card-hover overflow-hidden flex flex-col h-full"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          className={`h-full w-full object-cover transition-transform duration-500 ${hover ? 'scale-110' : ''}`}
        />
        <div className="absolute top-3 left-3">
          <Badge tone="orange" className="bg-orange text-white" icon={Plane}>
            Includes flight + hotel
          </Badge>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            onToggleSave?.(tour)
          }}
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow hover:bg-white transition"
          aria-label="Save tour"
        >
          <Heart
            className={`h-4 w-4 transition ${isSaved ? 'fill-orange text-orange animate-pop' : 'text-navy/60'}`}
          />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-muted">
          <Clock className="h-3.5 w-3.5" /> {tour.duration} days
          <span className="text-navy/20">•</span>
          <span className="font-semibold text-teal">{tour.theme}</span>
        </div>
        <h3 className="mt-2 text-lg font-bold text-navy leading-snug">{tour.title}</h3>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {tour.cities.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-1 rounded-full bg-mint/15 px-2.5 py-0.5 text-[11px] font-semibold text-teal"
            >
              <MapPin className="h-3 w-3" /> {c}
            </span>
          ))}
        </div>

        <ul className="mt-4 space-y-1.5 text-sm">
          {tour.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-start gap-2 text-navy/80">
              <CheckCircle2 className="h-4 w-4 text-teal mt-0.5 shrink-0" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5 flex items-end justify-between gap-3 border-t border-navy/5">
          <div>
            <p className="text-xs text-muted">From</p>
            <p className="text-2xl font-extrabold text-orange">${tour.price}</p>
          </div>
          <button onClick={() => onView(tour)} className="btn-secondary text-sm">
            View details
          </button>
        </div>
      </div>
    </div>
  )
}

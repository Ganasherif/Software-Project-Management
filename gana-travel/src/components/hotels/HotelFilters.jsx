import { Star } from 'lucide-react'
import { hotelAmenities } from '../../data/hotels.js'

export default function HotelFilters({ filters, setFilters, onReset }) {
  const toggleArr = (key, value) => {
    const arr = filters[key] || []
    setFilters({
      ...filters,
      [key]: arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value],
    })
  }

  return (
    <aside className="card p-5 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-navy">Filters</h3>
        <button onClick={onReset} className="text-xs font-semibold text-teal hover:underline">
          Reset
        </button>
      </div>

      <Section title="Max price / night">
        <input
          type="range"
          min="50"
          max="600"
          step="10"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
        />
        <div className="flex justify-between text-xs text-muted mt-1">
          <span>$50</span>
          <span className="font-bold text-navy">${filters.maxPrice}</span>
          <span>$600</span>
        </div>
      </Section>

      <Section title="Star rating">
        <div className="flex flex-wrap gap-2">
          {[5, 4, 3].map((s) => {
            const active = filters.stars.includes(s)
            return (
              <button
                key={s}
                onClick={() => toggleArr('stars', s)}
                className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold border transition ${
                  active
                    ? 'border-teal bg-teal/10 text-teal'
                    : 'border-navy/10 text-navy/70 hover:border-teal/50'
                }`}
              >
                {s} <Star className={`h-3 w-3 ${active ? 'fill-orange text-orange' : ''}`} />
              </button>
            )
          })}
        </div>
      </Section>

      <Section title="Amenities" last>
        <div className="space-y-2">
          {hotelAmenities.map((a) => (
            <label key={a} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={filters.amenities.includes(a)}
                onChange={() => toggleArr('amenities', a)}
                className="h-4 w-4 rounded accent-teal"
              />
              <span className="text-navy/80">{a}</span>
            </label>
          ))}
        </div>
      </Section>
    </aside>
  )
}

function Section({ title, children, last }) {
  return (
    <div className={`pb-4 mb-4 ${last ? '' : 'border-b border-navy/5'}`}>
      <p className="text-xs font-bold uppercase tracking-wider text-navy/50 mb-3">{title}</p>
      {children}
    </div>
  )
}

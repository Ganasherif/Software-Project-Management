import { airlines } from '../../data/flights.js'

const stopsOptions = [
  { value: 'any', label: 'Any' },
  { value: '0', label: 'Direct' },
  { value: '1', label: '1 stop' },
  { value: '2+', label: '2+ stops' },
]

const timeBuckets = [
  { value: 'early', label: 'Early (00:00 – 06:00)' },
  { value: 'morning', label: 'Morning (06:00 – 12:00)' },
  { value: 'afternoon', label: 'Afternoon (12:00 – 18:00)' },
  { value: 'evening', label: 'Evening (18:00 – 24:00)' },
]

export default function FlightFilters({ filters, setFilters, onReset }) {
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

      <Section title="Max price">
        <input
          type="range"
          min="100"
          max="1500"
          step="10"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
        />
        <div className="flex justify-between text-xs text-muted mt-1">
          <span>$100</span>
          <span className="font-bold text-navy">${filters.maxPrice}</span>
          <span>$1500</span>
        </div>
      </Section>

      <Section title="Stops">
        <div className="grid grid-cols-2 gap-2">
          {stopsOptions.map((s) => (
            <button
              key={s.value}
              onClick={() => setFilters({ ...filters, stops: s.value })}
              className={`rounded-lg px-3 py-2 text-xs font-semibold border transition ${
                filters.stops === s.value
                  ? 'border-teal bg-teal/10 text-teal'
                  : 'border-navy/10 text-navy/70 hover:border-teal/50'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Airlines">
        <div className="space-y-2">
          {airlines.map((a) => (
            <label key={a} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={filters.airlines.includes(a)}
                onChange={() => toggleArr('airlines', a)}
                className="h-4 w-4 rounded accent-teal"
              />
              <span className="text-navy/80">{a}</span>
            </label>
          ))}
        </div>
      </Section>

      <Section title="Departure time" last>
        <div className="space-y-2">
          {timeBuckets.map((b) => (
            <label key={b.value} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={filters.times.includes(b.value)}
                onChange={() => toggleArr('times', b.value)}
                className="h-4 w-4 rounded accent-teal"
              />
              <span className="text-navy/80">{b.label}</span>
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

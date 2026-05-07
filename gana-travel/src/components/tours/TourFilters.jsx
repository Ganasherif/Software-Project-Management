import { tourThemes, tourRegions } from '../../data/tours.js'

const durations = [
  { value: '3-5', label: '3 – 5 days' },
  { value: '6-9', label: '6 – 9 days' },
  { value: '10+', label: '10+ days' },
]

export default function TourFilters({ filters, setFilters }) {
  const toggle = (key, value) => {
    const arr = filters[key]
    setFilters({
      ...filters,
      [key]: arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value],
    })
  }

  return (
    <div className="card p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <Group label="Duration">
          {durations.map((d) => (
            <Chip key={d.value} active={filters.duration.includes(d.value)} onClick={() => toggle('duration', d.value)}>
              {d.label}
            </Chip>
          ))}
        </Group>
        <Group label="Region">
          {tourRegions.map((r) => (
            <Chip key={r} active={filters.region.includes(r)} onClick={() => toggle('region', r)}>
              {r}
            </Chip>
          ))}
        </Group>
        <Group label="Theme">
          {tourThemes.map((t) => (
            <Chip key={t} active={filters.theme.includes(t)} onClick={() => toggle('theme', t)}>
              {t}
            </Chip>
          ))}
        </Group>
      </div>
    </div>
  )
}

function Group({ label, children }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <p className="text-xs font-bold uppercase tracking-wider text-navy/50 mr-1">{label}</p>
      {children}
    </div>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold border transition ${
        active
          ? 'border-teal bg-teal text-white'
          : 'border-navy/15 bg-white text-navy/70 hover:border-teal/50 hover:text-teal'
      }`}
    >
      {children}
    </button>
  )
}

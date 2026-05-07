import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpDown } from 'lucide-react'
import { flights as allFlights } from '../data/flights.js'
import FlightSearchForm from '../components/flights/FlightSearchForm.jsx'
import FlightFilters from '../components/flights/FlightFilters.jsx'
import FlightCard from '../components/flights/FlightCard.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { Select } from '../components/ui/Input.jsx'

const defaultSearch = {
  from: 'Cairo',
  to: '',
  depart: '',
  ret: '',
  pax: '1',
  cls: 'Any',
}

const defaultFilters = {
  maxPrice: 1500,
  stops: 'any',
  airlines: [],
  times: [],
}

const timeBucket = (t) => {
  const h = Number(t.split(':')[0])
  if (h < 6) return 'early'
  if (h < 12) return 'morning'
  if (h < 18) return 'afternoon'
  return 'evening'
}

export default function Flights() {
  const navigate = useNavigate()
  const [search, setSearch] = useState(defaultSearch)
  const [filters, setFilters] = useState(defaultFilters)
  const [sort, setSort] = useState('cheapest')

  const filtered = useMemo(() => {
    let list = allFlights.filter((f) => {
      if (search.from && !`${f.fromCity} ${f.from}`.toLowerCase().includes(search.from.toLowerCase()))
        return false
      if (search.to && !`${f.toCity} ${f.to}`.toLowerCase().includes(search.to.toLowerCase()))
        return false
      if (search.cls !== 'Any' && f.class !== search.cls) return false
      if (f.price > filters.maxPrice) return false
      if (filters.stops !== 'any') {
        if (filters.stops === '2+' ? f.stops < 2 : f.stops !== Number(filters.stops)) return false
      }
      if (filters.airlines.length && !filters.airlines.includes(f.airline)) return false
      if (filters.times.length && !filters.times.includes(timeBucket(f.departTime))) return false
      return true
    })

    if (sort === 'cheapest') list = [...list].sort((a, b) => a.price - b.price)
    else if (sort === 'fastest') {
      const m = (s) => {
        const [h, mn] = s.match(/\d+/g).map(Number)
        return h * 60 + (mn || 0)
      }
      list = [...list].sort((a, b) => m(a.duration) - m(b.duration))
    } else if (sort === 'earliest') {
      list = [...list].sort((a, b) => a.departTime.localeCompare(b.departTime))
    }
    return list
  }, [search, filters, sort])

  const onSelect = (flight) => {
    navigate('/checkout', { state: { type: 'flight', item: flight } })
  }

  const onSubmit = (e) => e.preventDefault()
  const reset = () => setFilters(defaultFilters)

  return (
    <section className="container-page py-10">
      <div className="mb-8">
        <h1 className="heading-lg text-navy">Find your flight</h1>
        <p className="text-muted mt-1">Compare fares from top airlines, then book in seconds.</p>
      </div>

      <FlightSearchForm values={search} onChange={setSearch} onSubmit={onSubmit} />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <FlightFilters filters={filters} setFilters={setFilters} onReset={reset} />
        </div>

        <div className="lg:col-span-9">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted">
              <span className="font-bold text-navy">{filtered.length}</span> flight
              {filtered.length === 1 ? '' : 's'} found
            </p>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-navy/50" />
              <Select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort by">
                <option value="cheapest">Cheapest</option>
                <option value="fastest">Fastest</option>
                <option value="earliest">Earliest</option>
              </Select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="card">
              <EmptyState
                title="No flights match those filters"
                message="Try widening your price range or removing airline filters."
                actionLabel="Clear filters"
                onAction={reset}
              />
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((f) => (
                <FlightCard key={f.id} flight={f} onSelect={onSelect} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpDown } from 'lucide-react'
import toast from 'react-hot-toast'
import { hotels as allHotels } from '../data/hotels.js'
import HotelSearchForm from '../components/hotels/HotelSearchForm.jsx'
import HotelFilters from '../components/hotels/HotelFilters.jsx'
import HotelCard from '../components/hotels/HotelCard.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { Select } from '../components/ui/Input.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getDiscountForTier } from '../data/plans.js'

const SAVED_KEY = 'roame_saved_hotels'

const defaultSearch = {
  destination: '',
  checkIn: '',
  checkOut: '',
  guests: '2',
  rooms: '1',
}

const defaultFilters = {
  maxPrice: 600,
  stars: [],
  amenities: [],
}

export default function Hotels() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const memberDiscount = getDiscountForTier(user?.tier)

  const [search, setSearch] = useState(defaultSearch)
  const [filters, setFilters] = useState(defaultFilters)
  const [sort, setSort] = useState('recommended')
  const [saved, setSaved] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVED_KEY)
      if (raw) setSaved(JSON.parse(raw))
    } catch {}
  }, [])

  const toggleSave = (hotel) => {
    setSaved((prev) => {
      const exists = prev.some((h) => h.id === hotel.id)
      const next = exists ? prev.filter((h) => h.id !== hotel.id) : [...prev, { ...hotel, type: 'hotel' }]
      localStorage.setItem(SAVED_KEY, JSON.stringify(next))
      toast.success(exists ? 'Removed from saved' : 'Saved for later')
      return next
    })
  }

  const filtered = useMemo(() => {
    let list = allHotels.filter((h) => {
      if (search.destination && !`${h.city} ${h.country}`.toLowerCase().includes(search.destination.toLowerCase()))
        return false
      if (h.pricePerNight > filters.maxPrice) return false
      if (filters.stars.length && !filters.stars.includes(h.stars)) return false
      if (filters.amenities.length && !filters.amenities.every((a) => h.amenities.includes(a)))
        return false
      return true
    })

    if (sort === 'price-asc') list = [...list].sort((a, b) => a.pricePerNight - b.pricePerNight)
    else if (sort === 'price-desc') list = [...list].sort((a, b) => b.pricePerNight - a.pricePerNight)
    else if (sort === 'rating') list = [...list].sort((a, b) => b.reviewScore - a.reviewScore)
    return list
  }, [search, filters, sort])

  const onSelect = (hotel) => {
    navigate('/checkout', { state: { type: 'hotel', item: hotel } })
  }

  const reset = () => setFilters(defaultFilters)

  return (
    <section className="container-page py-10">
      <div className="mb-8">
        <h1 className="heading-lg text-navy">Find your stay</h1>
        <p className="text-muted mt-1">
          Handpicked hotels in cities across two continents — curated for value and comfort.
        </p>
      </div>

      <HotelSearchForm values={search} onChange={setSearch} onSubmit={(e) => e.preventDefault()} />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <HotelFilters filters={filters} setFilters={setFilters} onReset={reset} />
        </div>

        <div className="lg:col-span-9">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted">
              <span className="font-bold text-navy">{filtered.length}</span> hotel
              {filtered.length === 1 ? '' : 's'} found
            </p>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-navy/50" />
              <Select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort by">
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="rating">Highest rated</option>
              </Select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="card">
              <EmptyState
                title="No hotels match those filters"
                message="Loosen the price slider, or remove some amenities."
                actionLabel="Clear filters"
                onAction={reset}
              />
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((h) => (
                <HotelCard
                  key={h.id}
                  hotel={h}
                  onSelect={onSelect}
                  memberDiscount={memberDiscount}
                  isSaved={saved.some((s) => s.id === h.id)}
                  onToggleSave={toggleSave}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

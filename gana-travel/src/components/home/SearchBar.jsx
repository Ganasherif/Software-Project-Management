import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plane, Bed, Map, Search, Calendar, Users, MapPin } from 'lucide-react'

const tabs = [
  { id: 'flights', label: 'Flights', icon: Plane },
  { id: 'hotels', label: 'Hotels', icon: Bed },
  { id: 'tours', label: 'Tours', icon: Map },
]

export default function SearchBar() {
  const [active, setActive] = useState('flights')
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    if (active === 'flights') navigate('/flights')
    else if (active === 'hotels') navigate('/hotels')
    else navigate('/tours')
  }

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl bg-white shadow-card p-2 sm:p-3">
      <div className="flex gap-1 mb-3">
        {tabs.map((t) => {
          const Icon = t.icon
          const isActive = active === t.id
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                isActive ? 'bg-navy text-white shadow-soft' : 'text-navy/70 hover:bg-navy/5'
              }`}
            >
              <Icon className="h-4 w-4" />
              {t.label}
            </button>
          )
        })}
      </div>

      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-2">
        {active === 'flights' && (
          <>
            <Field icon={MapPin} placeholder="From" defaultValue="Cairo (CAI)" className="md:col-span-3" />
            <Field icon={MapPin} placeholder="To" defaultValue="Dubai (DXB)" className="md:col-span-3" />
            <Field icon={Calendar} type="date" className="md:col-span-2" />
            <Field icon={Calendar} type="date" className="md:col-span-2" />
            <Field icon={Users} placeholder="1 Adult" defaultValue="1 Adult" className="md:col-span-2" />
          </>
        )}
        {active === 'hotels' && (
          <>
            <Field icon={MapPin} placeholder="Destination" defaultValue="Istanbul" className="md:col-span-4" />
            <Field icon={Calendar} type="date" className="md:col-span-3" />
            <Field icon={Calendar} type="date" className="md:col-span-3" />
            <Field icon={Users} placeholder="2 Guests" defaultValue="2 Guests" className="md:col-span-2" />
          </>
        )}
        {active === 'tours' && (
          <>
            <Field icon={MapPin} placeholder="Where to?" defaultValue="Anywhere" className="md:col-span-4" />
            <Field icon={Calendar} type="date" className="md:col-span-3" />
            <Field icon={Users} placeholder="2 Travelers" defaultValue="2 Travelers" className="md:col-span-3" />
            <button type="submit" className="md:col-span-2 btn-primary">
              <Search className="h-4 w-4" /> Search
            </button>
          </>
        )}
        {active !== 'tours' && (
          <button type="submit" className="md:col-span-12 mt-1 btn-primary">
            <Search className="h-4 w-4" /> Search {active}
          </button>
        )}
      </form>
    </div>
  )
}

function Field({ icon: Icon, className = '', ...rest }) {
  return (
    <div className={`relative ${className}`}>
      <Icon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/40" />
      <input
        className="input-base pl-9"
        {...rest}
      />
    </div>
  )
}

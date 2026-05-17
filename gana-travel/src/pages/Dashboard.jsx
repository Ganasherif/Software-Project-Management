import { useEffect, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { Heart, Plane, Bed, Map, ArrowRight, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext.jsx'
import MembershipBadge from '../components/dashboard/MembershipBadge.jsx'
import BookingsList from '../components/dashboard/BookingsList.jsx'
import ProfileCard from '../components/dashboard/ProfileCard.jsx'
import { plans, getPlanById } from '../data/plans.js'
import Badge from '../components/ui/Badge.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'

const BOOKINGS_KEY = 'roame_bookings'
const SAVED_HOTELS_KEY = 'roame_saved_hotels'
const SAVED_TOURS_KEY = 'roame_saved_tours'

const TABS = [
  { id: 'bookings', label: 'My Bookings' },
  { id: 'profile', label: 'Profile' },
  { id: 'membership', label: 'Membership' },
  { id: 'saved', label: 'Saved' },
]

export default function Dashboard() {
  const { user, isLoggedIn, hydrated, setTier } = useAuth()
  const [tab, setTab] = useState('bookings')
  const [bookings, setBookings] = useState([])
  const [savedHotels, setSavedHotels] = useState([])
  const [savedTours, setSavedTours] = useState([])

  useEffect(() => {
    try {
      setBookings(JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]'))
      setSavedHotels(JSON.parse(localStorage.getItem(SAVED_HOTELS_KEY) || '[]'))
      setSavedTours(JSON.parse(localStorage.getItem(SAVED_TOURS_KEY) || '[]'))
    } catch {}
  }, [])

  if (hydrated && !isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  if (!hydrated) return null

  const currentPlan = getPlanById(user?.tier) || plans[0]

  const removeSaved = (item, listKey, setter) => {
    setter((prev) => {
      const next = prev.filter((x) => x.id !== item.id)
      localStorage.setItem(listKey, JSON.stringify(next))
      return next
    })
    toast.success('Removed from saved')
  }

  return (
    <section className="container-page py-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm text-muted">Welcome back,</p>
          <h1 className="heading-lg text-navy">{user?.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <MembershipBadge tier={user?.tier} />
            <span className="text-xs text-muted">{user?.email}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to="/tours" className="btn-secondary text-sm">
            Browse tours
          </Link>
          <Link to="/membership" className="btn-primary text-sm">
            Upgrade plan
          </Link>
        </div>
      </div>

      <div className="card p-1.5 mb-6 inline-flex flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              tab === t.id ? 'bg-navy text-white' : 'text-navy/70 hover:bg-navy/5'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'bookings' && <BookingsList bookings={bookings} />}

      {tab === 'profile' && <ProfileCard />}

      {tab === 'membership' && (
        <div className="card p-6 max-w-3xl">
          <p className="text-sm text-muted">Your current plan</p>
          <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-navy">{currentPlan.name}</h3>
              <p className="text-muted mt-1">{currentPlan.tagline}</p>
            </div>
            <p className="text-3xl font-extrabold text-orange">
              ${currentPlan.price.toFixed(2)}
              <span className="text-sm font-medium text-muted ml-1">/ {currentPlan.period}</span>
            </p>
          </div>
          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {currentPlan.features
              .filter((f) => f.included)
              .map((f) => (
                <li key={f.label} className="flex items-start gap-2 text-sm text-navy/80">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-teal" /> {f.label}
                </li>
              ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {plans
              .filter((p) => p.id !== currentPlan.id)
              .map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setTier(p.name)
                    toast.success(`You're now on the ${p.name} plan.`)
                  }}
                  className="btn-outline text-sm"
                >
                  Switch to {p.name} <ArrowRight className="h-4 w-4" />
                </button>
              ))}
          </div>
        </div>
      )}

      {tab === 'saved' && (
        <div className="space-y-8">
          <div>
            <h3 className="font-bold text-navy mb-3 flex items-center gap-2">
              <Bed className="h-4 w-4" /> Saved hotels
            </h3>
            {savedHotels.length === 0 ? (
              <div className="card">
                <EmptyState
                  icon={Heart}
                  title="No saved hotels yet"
                  message="Tap the heart icon on any hotel to save it here for later."
                  actionLabel="Browse hotels"
                  onAction={() => (window.location.href = '/hotels')}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedHotels.map((h) => (
                  <SavedItem
                    key={h.id}
                    item={h}
                    icon={Bed}
                    subtitle={`${h.city}, ${h.country}`}
                    price={`$${h.pricePerNight}/night`}
                    onRemove={() => removeSaved(h, SAVED_HOTELS_KEY, setSavedHotels)}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="font-bold text-navy mb-3 flex items-center gap-2">
              <Map className="h-4 w-4" /> Saved tours
            </h3>
            {savedTours.length === 0 ? (
              <div className="card">
                <EmptyState
                  icon={Heart}
                  title="No saved tours yet"
                  message="Heart a tour package and you'll find it here."
                  actionLabel="Browse tours"
                  onAction={() => (window.location.href = '/tours')}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedTours.map((t) => (
                  <SavedItem
                    key={t.id}
                    item={t}
                    icon={Map}
                    subtitle={`${t.duration} days • ${t.cities.join(', ')}`}
                    price={`$${t.price}`}
                    onRemove={() => removeSaved(t, SAVED_TOURS_KEY, setSavedTours)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

function SavedItem({ item, icon: Icon, subtitle, price, onRemove }) {
  return (
    <div className="card-hover p-4 flex items-center gap-3">
      <img src={item.image} alt="" className="h-16 w-16 rounded-xl object-cover shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-bold text-navy truncate flex items-center gap-1.5">
          <Icon className="h-3.5 w-3.5 text-teal" /> {item.name || item.title}
        </p>
        <p className="text-xs text-muted truncate">{subtitle}</p>
        <p className="text-sm font-semibold text-orange mt-1">{price}</p>
      </div>
      <button
        onClick={onRemove}
        className="p-2 rounded-lg text-navy/50 hover:bg-red-50 hover:text-red-600 transition"
        aria-label="Remove"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}

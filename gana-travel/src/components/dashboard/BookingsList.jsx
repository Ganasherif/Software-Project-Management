import { Plane, Bed, Map, Calendar, ArrowRight } from 'lucide-react'
import Badge from '../ui/Badge.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import { Link } from 'react-router-dom'

const typeIcon = { flight: Plane, hotel: Bed, tour: Map }
const statusTone = { Confirmed: 'green', Upcoming: 'teal', Completed: 'navy' }

export default function BookingsList({ bookings }) {
  if (!bookings.length) {
    return (
      <div className="card">
        <EmptyState
          icon={Calendar}
          title="No bookings yet"
          message="Search a flight, hotel, or tour to make your first booking."
          actionLabel="Explore tours"
          onAction={() => (window.location.href = '/tours')}
        />
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {bookings.map((b) => {
        const Icon = typeIcon[b.type] || Map
        return (
          <div key={b.id} className="card-hover p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal shrink-0">
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-bold text-navy truncate">{b.title}</h4>
                <Badge tone={statusTone[b.status] || 'teal'}>{b.status}</Badge>
              </div>
              <p className="text-xs text-muted mt-1 flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {b.dates}
              </p>
              <p className="text-xs text-muted mt-0.5">Confirmation #{b.confirmationNumber}</p>
            </div>
            <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-end w-full sm:w-auto">
              <p className="text-xl font-extrabold text-orange">${b.total}</p>
              <Link to="/dashboard" className="btn-outline text-sm">
                Details <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}

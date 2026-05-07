import { Plane, Clock, ArrowRight } from 'lucide-react'

const airlineColors = {
  EgyptAir: 'bg-amber-500',
  Emirates: 'bg-red-600',
  'Turkish Airlines': 'bg-rose-600',
  'Qatar Airways': 'bg-purple-700',
  Lufthansa: 'bg-yellow-500',
  'Air France': 'bg-blue-600',
}

export default function FlightCard({ flight, onSelect }) {
  const initials = flight.airline
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="card-hover p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center gap-5">
      <div className="flex items-center gap-3 lg:w-48">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl text-white text-sm font-bold ${
            airlineColors[flight.airline] || 'bg-teal'
          }`}
        >
          {initials}
        </div>
        <div>
          <p className="font-bold text-navy text-sm">{flight.airline}</p>
          <p className="text-xs text-muted">{flight.code}</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-3 items-center gap-3">
        <div className="text-left">
          <p className="text-2xl font-extrabold text-navy">{flight.departTime}</p>
          <p className="text-xs text-muted">{flight.from} • {flight.fromCity}</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <p className="text-xs text-muted flex items-center gap-1">
            <Clock className="h-3 w-3" /> {flight.duration}
          </p>
          <div className="flex items-center w-full my-1">
            <span className="h-px flex-1 bg-navy/20" />
            <Plane className="h-3.5 w-3.5 text-teal mx-1" />
            <span className="h-px flex-1 bg-navy/20" />
          </div>
          <p className="text-xs font-semibold text-teal">
            {flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-extrabold text-navy">{flight.arriveTime}</p>
          <p className="text-xs text-muted">{flight.to} • {flight.toCity}</p>
        </div>
      </div>

      <div className="flex items-center justify-between lg:flex-col lg:items-end gap-3 lg:w-40 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l lg:pl-5 border-navy/5">
        <div className="text-left lg:text-right">
          <p className="text-xs text-muted">{flight.class}</p>
          <p className="text-2xl font-extrabold text-orange">${flight.price}</p>
        </div>
        <button onClick={() => onSelect(flight)} className="btn-primary text-sm whitespace-nowrap">
          Select <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

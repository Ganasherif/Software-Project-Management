import { useState } from 'react'
import { MapPin, Wifi, Waves, Dumbbell, Coffee, Car, Dog, Heart } from 'lucide-react'
import Rating from '../ui/Rating.jsx'
import Badge from '../ui/Badge.jsx'

const amenityIcon = {
  WiFi: Wifi,
  Pool: Waves,
  Gym: Dumbbell,
  Breakfast: Coffee,
  Parking: Car,
  'Pet-friendly': Dog,
}

export default function HotelCard({ hotel, onSelect, memberDiscount = 0, isSaved = false, onToggleSave }) {
  const [hover, setHover] = useState(false)
  const discounted = memberDiscount > 0
  const finalPrice = discounted
    ? Math.round(hotel.pricePerNight * (1 - memberDiscount))
    : hotel.pricePerNight

  return (
    <div
      className="card-hover overflow-hidden flex flex-col sm:flex-row"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative sm:w-72 h-56 sm:h-auto overflow-hidden shrink-0">
        <img
          src={hotel.image}
          alt={hotel.name}
          className={`h-full w-full object-cover transition-transform duration-500 ${hover ? 'scale-110' : ''}`}
        />
        <button
          onClick={(e) => {
            e.preventDefault()
            onToggleSave?.(hotel)
          }}
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow hover:bg-white transition"
          aria-label="Save hotel"
        >
          <Heart
            className={`h-4 w-4 transition ${isSaved ? 'fill-orange text-orange animate-pop' : 'text-navy/60'}`}
          />
        </button>
        {discounted && (
          <div className="absolute top-3 left-3">
            <Badge tone="orange" className="bg-orange text-white">
              Members save {Math.round(memberDiscount * 100)}%
            </Badge>
          </div>
        )}
      </div>

      <div className="flex-1 p-5 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Rating value={hotel.stars} size="sm" />
            <h3 className="mt-1 text-lg font-bold text-navy">{hotel.name}</h3>
            <p className="text-xs text-muted flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" /> {hotel.city}, {hotel.country}
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="inline-block rounded-lg bg-teal text-white text-sm font-bold px-2.5 py-1">
              {hotel.reviewScore}
            </span>
            <p className="text-xs text-muted mt-1">{hotel.reviews.toLocaleString()} reviews</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {hotel.amenities.map((a) => {
            const Icon = amenityIcon[a]
            return (
              <span
                key={a}
                className="inline-flex items-center gap-1 rounded-md bg-cream px-2 py-1 text-[11px] font-semibold text-navy/70"
              >
                {Icon && <Icon className="h-3 w-3" />}
                {a}
              </span>
            )
          })}
        </div>

        <div className="mt-auto pt-5 flex items-end justify-between gap-3 border-t border-navy/5">
          <div>
            {discounted && (
              <p className="text-xs text-muted line-through">${hotel.pricePerNight}</p>
            )}
            <p className="text-2xl font-extrabold text-orange">
              ${finalPrice}
              <span className="text-xs font-medium text-muted ml-1">/ night</span>
            </p>
          </div>
          <button onClick={() => onSelect(hotel)} className="btn-primary text-sm">
            View Deal
          </button>
        </div>
      </div>
    </div>
  )
}

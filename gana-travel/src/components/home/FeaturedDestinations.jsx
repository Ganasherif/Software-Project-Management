import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { destinations } from '../../data/destinations.js'
import Badge from '../ui/Badge.jsx'

export default function FeaturedDestinations() {
  return (
    <section className="section">
      <div className="container-page">
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-sm font-semibold text-teal mb-2">Top picks</p>
            <h2 className="heading-lg text-navy">Featured Destinations</h2>
            <p className="text-muted mt-2 max-w-xl">
              Discover the world's most loved cities — handpicked by Roame experts.
            </p>
          </div>
          <Link
            to="/tours"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-teal hover:text-mint transition"
          >
            Explore all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d) => (
            <Link
              key={d.id}
              to="/hotels"
              className="group card-hover overflow-hidden block"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={d.image}
                  alt={d.city}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                <div className="absolute top-3 right-3">
                  <Badge tone="orange" className="bg-orange text-white">
                    from ${d.fromPrice}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold">{d.city}</h3>
                  <p className="text-xs text-white/80">{d.country}</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-muted">{d.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

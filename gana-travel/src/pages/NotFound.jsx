import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="container-page py-24 text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-mint/15 text-teal">
        <Compass className="h-12 w-12" />
      </div>
      <h1 className="heading-lg text-navy mt-6">Page not found</h1>
      <p className="text-muted mt-3 max-w-md mx-auto">
        The page you're looking for has wandered off the map. Let's get you back on track.
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <Link to="/" className="btn-primary">
          Back to home
        </Link>
        <Link to="/tours" className="btn-outline">
          Browse tours
        </Link>
      </div>
    </section>
  )
}

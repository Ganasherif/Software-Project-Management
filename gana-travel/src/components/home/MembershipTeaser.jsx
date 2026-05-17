import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function MembershipTeaser() {
  return (
    <section className="container-page section">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal via-teal to-navy text-white p-8 sm:p-14 shadow-card">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-orange/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-mint/30 blur-3xl" />
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-orange" /> Roame Membership
            </span>
            <h2 className="heading-lg mt-4">Travel more. Save more. Stress less.</h2>
            <p className="mt-3 text-white/85 max-w-xl">
              Become a Silver or Gold member and unlock up to 20% off every booking, free
              cancellations, and worldwide airport lounge access.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link to="/membership" className="btn-primary">
              See plans <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

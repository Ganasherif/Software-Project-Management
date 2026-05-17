import { Link } from 'react-router-dom'
import { Plane } from 'lucide-react'

const SIDE_IMG = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80'

export default function AuthShell({ title, subtitle, side = 'left', children }) {
  const Image = (
    <div className="relative hidden lg:block lg:w-1/2 overflow-hidden">
      <img src={SIDE_IMG} alt="Travel" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-navy/80 via-navy/50 to-teal/70" />
      <div className="relative h-full flex flex-col justify-between p-12 text-white">
        <Link to="/" className="flex items-center gap-2 font-heading font-extrabold text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-navy">
            <Plane className="h-5 w-5 -rotate-45" />
          </span>
          <span className="text-xl">Roame</span>
        </Link>
        <div>
          <p className="text-3xl font-heading font-bold leading-tight max-w-md">
            "Travel is the only thing you buy that makes you richer."
          </p>
          <p className="mt-4 text-white/70 text-sm">— Anonymous</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-[calc(100vh-4rem)] flex bg-cream">
      {side === 'left' && Image}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 font-heading font-extrabold text-navy mb-8">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-orange">
              <Plane className="h-5 w-5 -rotate-45" />
            </span>
            <span className="text-xl">Roame</span>
          </Link>
          <h1 className="text-3xl font-bold text-navy">{title}</h1>
          <p className="mt-2 text-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
      {side === 'right' && Image}
    </div>
  )
}

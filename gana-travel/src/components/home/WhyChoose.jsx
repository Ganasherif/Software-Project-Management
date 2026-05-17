import { Layers, Wallet, ShieldCheck, Headphones } from 'lucide-react'

const features = [
  {
    icon: Layers,
    title: 'Unified Booking',
    desc: 'Flights, hotels, and tours in a single, simple flow — no more juggling sites.',
  },
  {
    icon: Wallet,
    title: 'Affordable Packages',
    desc: 'Member-only discounts and bundled deals that let you travel more for less.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payment',
    desc: 'Encrypted checkout, transparent pricing, and zero hidden fees.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    desc: 'Real travel experts on standby — by phone, chat, and email anytime.',
  },
]

export default function WhyChoose() {
  return (
    <section className="section bg-white">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold text-teal mb-2">Why Roame</p>
          <h2 className="heading-lg text-navy">Built for the modern traveler</h2>
          <p className="text-muted mt-3">
            Everything you need to plan, book, and enjoy your trip — without the stress.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="card-hover p-6 text-center sm:text-left"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-teal/10 text-teal">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-navy">{f.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

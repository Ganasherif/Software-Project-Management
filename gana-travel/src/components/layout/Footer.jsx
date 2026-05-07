import { Link } from 'react-router-dom'
import { Plane, Facebook, Instagram, Twitter, Youtube, Send, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'

const cols = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/' },
      { label: 'Careers', href: '/' },
      { label: 'Press', href: '/' },
      { label: 'Partners', href: '/' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/' },
      { label: 'Contact Us', href: '/' },
      { label: 'Cancellation Policy', href: '/' },
      { label: 'Refunds', href: '/' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/' },
      { label: 'Privacy Policy', href: '/' },
      { label: 'Cookie Policy', href: '/' },
      { label: 'Accessibility', href: '/' },
    ],
  },
]

export default function Footer() {
  const onSubscribe = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    if (!email) return
    toast.success('Subscribed! Welcome to the Gana Travel insider list.')
    e.target.reset()
  }

  return (
    <footer className="bg-navy text-cream mt-20">
      <div className="container-page py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2 font-heading font-extrabold text-cream">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cream text-navy">
              <Plane className="h-5 w-5 -rotate-45" />
            </span>
            <span className="text-xl">Gana Travel</span>
          </Link>
          <p className="mt-4 text-sm text-cream/70 max-w-sm leading-relaxed">
            Your journey, unified. Book flights, hotels, and unforgettable tour packages from a single,
            trusted platform built for modern travelers.
          </p>
          <form onSubmit={onSubscribe} className="mt-6 flex max-w-sm">
            <input
              name="email"
              type="email"
              required
              placeholder="Your email"
              className="flex-1 rounded-l-xl border-0 bg-cream/10 px-4 py-2.5 text-sm text-cream placeholder:text-cream/50 focus:outline-none focus:ring-2 focus:ring-orange"
            />
            <button
              type="submit"
              className="rounded-r-xl bg-orange px-4 text-white hover:bg-orange/90 transition flex items-center gap-1 text-sm font-semibold"
            >
              <Send className="h-4 w-4" /> Subscribe
            </button>
          </form>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="font-heading font-semibold text-cream mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-sm text-cream/70 hover:text-orange transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="font-heading font-semibold text-cream mb-4">Connect</h4>
          <div className="flex gap-2">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-cream/10 hover:bg-orange transition"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs text-cream/60">
            Email: <a href="mailto:hello@ganatravel.example" className="hover:text-orange">hello@ganatravel.example</a>
          </p>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-page py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/60">
          <p>© {new Date().getFullYear()} Gana Travel. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-mint" />
            Licensed by Ministry of Tourism
          </p>
        </div>
      </div>
    </footer>
  )
}

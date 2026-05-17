import { useMemo, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { User, Mail, Phone } from 'lucide-react'
import toast from 'react-hot-toast'
import Input from '../components/ui/Input.jsx'
import Button from '../components/ui/Button.jsx'
import CheckoutSummary from '../components/checkout/CheckoutSummary.jsx'
import PaymentForm from '../components/checkout/PaymentForm.jsx'
import BookingConfirmation from '../components/checkout/BookingConfirmation.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getDiscountForTier } from '../data/plans.js'

const BOOKINGS_KEY = 'roame_bookings'

const fallbackTour = {
  type: 'tour',
  item: {
    id: 'demo',
    title: 'Sample Mediterranean Escape',
    duration: 7,
    theme: 'Beach',
    cities: ['Rome', 'Athens', 'Santorini'],
    price: 1850,
    image:
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
  },
}

const randomConfirmation = () =>
  Array.from({ length: 8 })
    .map(() => 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 31)])
    .join('')

const itemPrice = (type, item) => {
  if (type === 'flight') return item.price
  if (type === 'hotel') return item.pricePerNight * 2
  return item.price
}

const itemTitle = (type, item) => {
  if (type === 'flight') return `${item.fromCity} → ${item.toCity} (${item.airline})`
  if (type === 'hotel') return item.name
  return item.title
}

const itemDates = (type, item) => {
  if (type === 'flight') return item.departDate
  if (type === 'hotel') return '2 nights'
  return `${item.duration} days`
}

export default function Checkout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const memberDiscount = getDiscountForTier(user?.tier)

  const incoming = location.state || fallbackTour
  const { type, item } = incoming

  const [traveler, setTraveler] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
  })
  const [payment, setPayment] = useState({
    card: '',
    cardName: '',
    expiry: '',
    cvv: '',
    billing: '',
  })
  const [confirmation, setConfirmation] = useState(null)

  const totals = useMemo(() => {
    const subtotal = itemPrice(type, item)
    const taxes = subtotal * 0.10
    const discount = (subtotal + taxes) * memberDiscount
    const total = subtotal + taxes - discount
    return { subtotal, taxes, discount, total }
  }, [type, item, memberDiscount])

  const onSubmit = (e) => {
    e.preventDefault()
    if (!traveler.fullName || !traveler.email) {
      toast.error('Please fill in your contact details.')
      return
    }
    if (!payment.card || !payment.cvv || !payment.expiry) {
      toast.error('Please fill in your payment details.')
      return
    }
    const confirmationNumber = randomConfirmation()
    const booking = {
      id: confirmationNumber,
      type,
      title: itemTitle(type, item),
      dates: itemDates(type, item),
      total: Number(totals.total.toFixed(2)),
      status: 'Confirmed',
      confirmationNumber,
      createdAt: new Date().toISOString(),
    }
    try {
      const list = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]')
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify([booking, ...list]))
    } catch {}
    setConfirmation({ confirmationNumber, total: totals.total })
    toast.success('Booking confirmed!')
  }

  return (
    <section className="container-page py-10">
      <div className="mb-6">
        <Link to="/" className="text-sm text-teal hover:underline">
          ← Back to browse
        </Link>
        <h1 className="heading-lg text-navy mt-2">Secure checkout</h1>
        <p className="text-muted mt-1">Review your trip and complete your booking.</p>
      </div>

      <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="card p-6">
            <h3 className="font-bold text-navy text-lg">Traveler details</h3>
            <p className="text-muted text-sm mt-1">We'll send your confirmation here.</p>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full name"
                icon={User}
                placeholder="Jane Traveler"
                value={traveler.fullName}
                onChange={(e) => setTraveler({ ...traveler, fullName: e.target.value })}
              />
              <Input
                label="Email"
                icon={Mail}
                type="email"
                placeholder="you@example.com"
                value={traveler.email}
                onChange={(e) => setTraveler({ ...traveler, email: e.target.value })}
              />
              <Input
                label="Phone"
                icon={Phone}
                placeholder="+20 100 000 0000"
                value={traveler.phone}
                onChange={(e) => setTraveler({ ...traveler, phone: e.target.value })}
                className="sm:col-span-2"
              />
            </div>
          </div>

          <PaymentForm form={payment} setForm={setPayment} />

          <Button type="submit" className="w-full sm:w-auto">
            Confirm Booking · ${totals.total.toFixed(2)}
          </Button>
        </div>

        <div className="lg:col-span-4">
          <CheckoutSummary
            type={type}
            item={item}
            subtotal={totals.subtotal}
            taxes={totals.taxes}
            discount={totals.discount}
            total={totals.total}
            discountPct={memberDiscount}
          />
        </div>
      </form>

      <BookingConfirmation
        open={!!confirmation}
        onClose={() => setConfirmation(null)}
        confirmationNumber={confirmation?.confirmationNumber || ''}
        total={confirmation?.total || 0}
        onGoDashboard={() => {
          setConfirmation(null)
          navigate('/dashboard')
        }}
      />
    </section>
  )
}

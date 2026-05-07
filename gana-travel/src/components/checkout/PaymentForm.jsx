import { CreditCard, User, Calendar, Lock, MapPin } from 'lucide-react'
import Input from '../ui/Input.jsx'

const formatCard = (v) =>
  v
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ')

const formatExpiry = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 4)
  if (d.length < 3) return d
  return d.slice(0, 2) + '/' + d.slice(2)
}

export default function PaymentForm({ form, setForm }) {
  return (
    <div className="card p-6">
      <h3 className="font-bold text-navy text-lg flex items-center gap-2">
        <CreditCard className="h-5 w-5 text-teal" /> Payment details
      </h3>
      <p className="text-muted text-sm mt-1">Test mode — no real card needed.</p>

      <div className="mt-5 space-y-4">
        <Input
          label="Card number"
          icon={CreditCard}
          inputMode="numeric"
          placeholder="1234 5678 9012 3456"
          value={form.card}
          onChange={(e) => setForm({ ...form, card: formatCard(e.target.value) })}
        />
        <Input
          label="Name on card"
          icon={User}
          placeholder="As shown on card"
          value={form.cardName}
          onChange={(e) => setForm({ ...form, cardName: e.target.value })}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Expiry (MM/YY)"
            icon={Calendar}
            inputMode="numeric"
            placeholder="08/27"
            value={form.expiry}
            onChange={(e) => setForm({ ...form, expiry: formatExpiry(e.target.value) })}
          />
          <Input
            label="CVV"
            icon={Lock}
            inputMode="numeric"
            placeholder="123"
            maxLength={4}
            value={form.cvv}
            onChange={(e) => setForm({ ...form, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
          />
        </div>
        <Input
          label="Billing address"
          icon={MapPin}
          placeholder="Street, City, Country"
          value={form.billing}
          onChange={(e) => setForm({ ...form, billing: e.target.value })}
        />
      </div>
    </div>
  )
}

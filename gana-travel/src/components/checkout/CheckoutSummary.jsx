import { Plane, Bed, Map } from 'lucide-react'
import Badge from '../ui/Badge.jsx'

const typeMeta = {
  flight: { icon: Plane, label: 'Flight' },
  hotel: { icon: Bed, label: 'Hotel' },
  tour: { icon: Map, label: 'Tour Package' },
}

export default function CheckoutSummary({ type, item, subtotal, taxes, discount, total, discountPct }) {
  const meta = typeMeta[type] || typeMeta.tour
  const Icon = meta.icon

  return (
    <div className="card p-6 sticky top-20">
      <div className="flex items-center gap-2 mb-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal/10 text-teal">
          <Icon className="h-5 w-5" />
        </span>
        <p className="font-bold text-navy">{meta.label}</p>
      </div>

      {item.image && (
        <img src={item.image} alt="" className="w-full h-36 object-cover rounded-xl mb-4" />
      )}

      <h3 className="font-bold text-navy">
        {item.title || item.name || `${item.fromCity} → ${item.toCity}`}
      </h3>

      <div className="text-sm text-muted mt-2 space-y-1">
        {type === 'flight' && (
          <>
            <p>
              {item.airline} • {item.code}
            </p>
            <p>
              {item.departTime} → {item.arriveTime} • {item.duration}
            </p>
            <p>{item.stops === 0 ? 'Direct' : `${item.stops} stop(s)`} • {item.class}</p>
          </>
        )}
        {type === 'hotel' && (
          <>
            <p>
              {item.city}, {item.country} • {item.stars}★
            </p>
            <p>Review score {item.reviewScore}/10</p>
          </>
        )}
        {type === 'tour' && (
          <>
            <p>{item.duration} days • {item.theme}</p>
            <p>{item.cities.join(' • ')}</p>
          </>
        )}
      </div>

      <div className="mt-5 pt-5 border-t border-navy/5 space-y-2 text-sm">
        <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
        <Row label="Taxes (10%)" value={`$${taxes.toFixed(2)}`} />
        {discount > 0 && (
          <Row
            label={
              <span className="inline-flex items-center gap-1.5">
                Member discount
                <Badge tone="orange">−{Math.round(discountPct * 100)}%</Badge>
              </span>
            }
            value={`−$${discount.toFixed(2)}`}
            valueClass="text-emerald-600 font-semibold"
          />
        )}
      </div>

      <div className="mt-5 pt-5 border-t border-navy/5 flex items-end justify-between">
        <p className="text-sm font-bold text-navy">Total</p>
        <p className="text-3xl font-extrabold text-orange">${total.toFixed(2)}</p>
      </div>
    </div>
  )
}

function Row({ label, value, valueClass = 'text-navy/80' }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted">{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  )
}

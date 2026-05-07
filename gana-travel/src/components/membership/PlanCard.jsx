import { Check, X, Sparkles } from 'lucide-react'
import Button from '../ui/Button.jsx'

export default function PlanCard({ plan, currentTier, onChoose }) {
  const isCurrent = currentTier && currentTier.toLowerCase() === plan.id
  return (
    <div
      className={`relative card p-7 flex flex-col h-full ${
        plan.popular ? 'ring-2 ring-orange shadow-card scale-[1.02]' : ''
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-orange text-white text-xs font-bold px-3 py-1 shadow-cta">
          <Sparkles className="h-3 w-3" /> Most Popular
        </div>
      )}
      <h3 className="text-xl font-bold text-navy">{plan.name}</h3>
      <p className="text-sm text-muted mt-1 min-h-[2.5rem]">{plan.tagline}</p>

      <div className="mt-5">
        <span className="text-4xl font-extrabold text-navy">${plan.price.toFixed(2)}</span>
        <span className="text-sm text-muted ml-1">/ {plan.period}</span>
      </div>

      <ul className="mt-6 space-y-2.5 flex-1">
        {plan.features.map((f) => (
          <li key={f.label} className="flex items-start gap-2 text-sm">
            {f.included ? (
              <Check className="h-4 w-4 text-teal mt-0.5 shrink-0" />
            ) : (
              <X className="h-4 w-4 text-navy/30 mt-0.5 shrink-0" />
            )}
            <span className={f.included ? 'text-navy/80' : 'text-navy/40 line-through'}>{f.label}</span>
          </li>
        ))}
      </ul>

      <Button
        className="mt-7 w-full"
        variant={plan.popular ? 'primary' : 'secondary'}
        onClick={() => onChoose(plan)}
        disabled={isCurrent}
      >
        {isCurrent ? 'Current plan' : plan.cta}
      </Button>
    </div>
  )
}

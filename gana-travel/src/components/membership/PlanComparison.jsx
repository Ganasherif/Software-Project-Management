import { Check, X } from 'lucide-react'
import { plans } from '../../data/plans.js'

const allFeatures = Array.from(
  new Set(plans.flatMap((p) => p.features.map((f) => f.label)))
)

const isIncluded = (plan, label) => {
  const f = plan.features.find((x) => x.label === label)
  return f ? f.included : false
}

export default function PlanComparison() {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-cream text-navy">
              <th className="text-left p-4 font-bold">Feature</th>
              {plans.map((p) => (
                <th key={p.id} className="text-center p-4 font-bold">
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allFeatures.map((label, i) => (
              <tr key={label} className={i % 2 === 0 ? 'bg-white' : 'bg-cream/40'}>
                <td className="p-4 text-navy/80">{label}</td>
                {plans.map((p) => (
                  <td key={p.id} className="p-4 text-center">
                    {isIncluded(p, label) ? (
                      <Check className="inline h-5 w-5 text-teal" />
                    ) : (
                      <X className="inline h-5 w-5 text-navy/20" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

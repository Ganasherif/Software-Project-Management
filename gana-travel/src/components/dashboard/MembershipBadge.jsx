import { Crown, Award, Star } from 'lucide-react'

const meta = {
  Basic: { tone: 'bg-navy/10 text-navy', icon: Star, label: 'Basic Member' },
  Silver: { tone: 'bg-gradient-to-r from-slate-300 to-slate-500 text-white', icon: Award, label: 'Silver Member' },
  Gold: { tone: 'bg-gradient-to-r from-amber-300 to-orange text-white', icon: Crown, label: 'Gold Member' },
}

export default function MembershipBadge({ tier = 'Basic' }) {
  const m = meta[tier] || meta.Basic
  const Icon = m.icon
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${m.tone}`}>
      <Icon className="h-3.5 w-3.5" /> {m.label}
    </span>
  )
}

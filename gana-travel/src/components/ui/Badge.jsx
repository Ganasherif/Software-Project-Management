const TONES = {
  orange: 'bg-orange/15 text-orange',
  teal: 'bg-teal/15 text-teal',
  mint: 'bg-mint/20 text-teal',
  navy: 'bg-navy/10 text-navy',
  green: 'bg-emerald-100 text-emerald-700',
  red: 'bg-red-100 text-red-700',
  amber: 'bg-amber-100 text-amber-700',
}

export default function Badge({ tone = 'teal', children, className = '', icon: Icon }) {
  return (
    <span className={`pill ${TONES[tone] || TONES.teal} ${className}`.trim()}>
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </span>
  )
}

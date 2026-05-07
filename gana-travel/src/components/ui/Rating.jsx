import { Star } from 'lucide-react'

export default function Rating({ value = 0, max = 5, size = 'sm', showNumber = false }) {
  const px = size === 'lg' ? 'h-5 w-5' : size === 'md' ? 'h-4 w-4' : 'h-3.5 w-3.5'
  return (
    <div className="inline-flex items-center gap-0.5" aria-label={`${value} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.round(value)
        return (
          <Star
            key={i}
            className={`${px} ${filled ? 'fill-orange text-orange animate-pop' : 'text-navy/20'}`}
          />
        )
      })}
      {showNumber && <span className="ml-1.5 text-xs font-semibold text-navy/70">{value.toFixed(1)}</span>}
    </div>
  )
}

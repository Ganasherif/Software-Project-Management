import { SearchX } from 'lucide-react'
import Button from './Button.jsx'

export default function EmptyState({
  icon: Icon = SearchX,
  title = 'No results found',
  message = 'Try adjusting your filters or search again.',
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-mint/15 text-teal">
        <Icon className="h-10 w-10" />
      </div>
      <h3 className="text-xl font-bold text-navy">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted">{message}</p>
      {actionLabel && (
        <Button variant="outline" className="mt-5" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

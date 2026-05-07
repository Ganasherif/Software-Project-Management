import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, size = 'md', footer }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm animate-fadeUp"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${sizes[size]} max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-card animate-fadeUp`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-navy/10 bg-white px-6 py-4">
          <h3 className="text-xl font-bold text-navy">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-navy/60 hover:bg-navy/5 hover:text-navy transition"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
        {footer && (
          <div className="sticky bottom-0 border-t border-navy/10 bg-white px-6 py-4">{footer}</div>
        )}
      </div>
    </div>
  )
}

import { CheckCircle2, ArrowRight } from 'lucide-react'
import Modal from '../ui/Modal.jsx'
import Button from '../ui/Button.jsx'

export default function BookingConfirmation({ open, onClose, confirmationNumber, total, onGoDashboard }) {
  return (
    <Modal open={open} onClose={onClose} title="Booking confirmed" size="sm">
      <div className="text-center py-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-pop">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h3 className="mt-5 text-xl font-bold text-navy">You're all set!</h3>
        <p className="mt-2 text-sm text-muted">
          Booking saved to your dashboard. We've emailed you a confirmation.
        </p>
        <div className="mt-5 mx-auto inline-block rounded-xl bg-cream px-4 py-3">
          <p className="text-xs text-muted">Confirmation number</p>
          <p className="font-mono font-bold text-navy tracking-widest">{confirmationNumber}</p>
        </div>
        <p className="mt-3 text-sm font-semibold text-orange">Total charged: ${total.toFixed(2)}</p>
        <Button onClick={onGoDashboard} className="mt-6 w-full">
          Go to dashboard <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Modal>
  )
}

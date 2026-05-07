import { MapPin, Calendar, Users, Search, BedDouble } from 'lucide-react'

export default function HotelSearchForm({ values, onChange, onSubmit }) {
  const set = (k) => (e) => onChange({ ...values, [k]: e.target.value })
  return (
    <form onSubmit={onSubmit} className="card p-4 sm:p-5">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <Field icon={MapPin} label="Destination" value={values.destination} onChange={set('destination')} className="md:col-span-4" />
        <Field icon={Calendar} type="date" label="Check-in" value={values.checkIn} onChange={set('checkIn')} className="md:col-span-2" />
        <Field icon={Calendar} type="date" label="Check-out" value={values.checkOut} onChange={set('checkOut')} className="md:col-span-2" />
        <Field icon={Users} label="Guests" value={values.guests} onChange={set('guests')} className="md:col-span-2" />
        <Field icon={BedDouble} label="Rooms" value={values.rooms} onChange={set('rooms')} className="md:col-span-2" />
        <div className="md:col-span-12">
          <button type="submit" className="btn-primary w-full sm:w-auto">
            <Search className="h-4 w-4" /> Search Hotels
          </button>
        </div>
      </div>
    </form>
  )
}

function Field({ icon: Icon, label, className = '', ...rest }) {
  return (
    <div className={className}>
      <label className="label-base">{label}</label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/40" />
        <input className="input-base pl-9" {...rest} />
      </div>
    </div>
  )
}

import { MapPin, Calendar, Users, Search } from 'lucide-react'

export default function FlightSearchForm({ values, onChange, onSubmit }) {
  const set = (k) => (e) => onChange({ ...values, [k]: e.target.value })

  return (
    <form onSubmit={onSubmit} className="card p-4 sm:p-5">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <Field icon={MapPin} label="From" value={values.from} onChange={set('from')} className="md:col-span-3" />
        <Field icon={MapPin} label="To" value={values.to} onChange={set('to')} className="md:col-span-3" />
        <Field icon={Calendar} type="date" label="Depart" value={values.depart} onChange={set('depart')} className="md:col-span-2" />
        <Field icon={Calendar} type="date" label="Return" value={values.ret} onChange={set('ret')} className="md:col-span-2" />
        <Field icon={Users} label="Passengers" value={values.pax} onChange={set('pax')} className="md:col-span-1" />
        <div className="md:col-span-1 flex flex-col">
          <label className="label-base">Class</label>
          <select className="input-base" value={values.cls} onChange={set('cls')}>
            <option>Any</option>
            <option>Economy</option>
            <option>Business</option>
          </select>
        </div>
        <div className="md:col-span-12">
          <button type="submit" className="btn-primary w-full sm:w-auto">
            <Search className="h-4 w-4" /> Search Flights
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

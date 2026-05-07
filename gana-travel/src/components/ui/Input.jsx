import { forwardRef } from 'react'

const Input = forwardRef(function Input(
  { label, id, icon: Icon, error, className = '', ...rest },
  ref
) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="label-base">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/40" />
        )}
        <input
          ref={ref}
          id={id}
          className={`input-base ${Icon ? 'pl-9' : ''} ${error ? 'ring-2 ring-red-500/40' : ''}`}
          {...rest}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
})

export default Input

export function Select({ label, id, children, className = '', ...rest }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="label-base">
          {label}
        </label>
      )}
      <select id={id} className="input-base appearance-none pr-9 bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2312212E'%3E%3Cpath d='M5 8l5 5 5-5z'/%3E%3C/svg%3E\")" }} {...rest}>
        {children}
      </select>
    </div>
  )
}

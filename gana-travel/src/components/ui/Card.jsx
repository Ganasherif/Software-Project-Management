export default function Card({ className = '', hover = false, children, ...rest }) {
  const base = hover ? 'card-hover' : 'card'
  return (
    <div className={`${base} ${className}`.trim()} {...rest}>
      {children}
    </div>
  )
}

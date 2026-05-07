const VARIANTS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  outline: 'btn-outline',
}

export default function Button({
  variant = 'primary',
  className = '',
  children,
  type = 'button',
  ...rest
}) {
  const cls = `${VARIANTS[variant] || VARIANTS.primary} ${className}`.trim()
  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  )
}

export const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    period: 'forever',
    tagline: 'Get started with full booking access.',
    discount: 0,
    features: [
      { label: 'Standard prices on all bookings', included: true },
      { label: 'Email support', included: true },
      { label: 'Booking history & e-tickets', included: true },
      { label: 'Member-only hotel discounts', included: false },
      { label: 'Free cancellations', included: false },
      { label: 'Airport lounge access', included: false },
      { label: 'Priority customer support', included: false },
    ],
    cta: 'Continue Free',
    popular: false,
  },
  {
    id: 'silver',
    name: 'Silver',
    price: 9.99,
    period: 'month',
    tagline: 'Best for casual travelers — save on every trip.',
    discount: 0.10,
    features: [
      { label: 'Standard prices on all bookings', included: true },
      { label: 'Email & chat support', included: true },
      { label: 'Booking history & e-tickets', included: true },
      { label: '10% off on all hotels', included: true },
      { label: '1 free cancellation per year', included: true },
      { label: 'Airport lounge access', included: false },
      { label: 'Priority customer support', included: true },
    ],
    cta: 'Choose Silver',
    popular: true,
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 19.99,
    period: 'month',
    tagline: 'Maximum savings and premium perks worldwide.',
    discount: 0.20,
    features: [
      { label: 'Standard prices on all bookings', included: true },
      { label: 'Email & chat support', included: true },
      { label: 'Booking history & e-tickets', included: true },
      { label: '20% off on all bookings', included: true },
      { label: 'Unlimited free cancellations', included: true },
      { label: 'Airport lounge access (worldwide)', included: true },
      { label: 'Priority customer support 24/7', included: true },
      { label: 'Free seat selection', included: true },
    ],
    cta: 'Choose Gold',
    popular: false,
  },
]

export const getPlanById = (id) => plans.find((p) => p.id?.toLowerCase() === (id || '').toLowerCase())

export const getDiscountForTier = (tier) => {
  const plan = getPlanById(tier)
  return plan ? plan.discount : 0
}

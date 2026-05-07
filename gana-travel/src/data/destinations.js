const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`

export const destinations = [
  {
    id: 'cairo',
    city: 'Cairo',
    country: 'Egypt',
    fromPrice: 240,
    image: img('photo-1572252009286-268acec5ca0a'),
    description: 'Pyramids, the Nile, and timeless culture.',
  },
  {
    id: 'dubai',
    city: 'Dubai',
    country: 'UAE',
    fromPrice: 320,
    image: img('photo-1512453979798-5ea266f8880c'),
    description: 'Skyscrapers, deserts, and luxury beaches.',
  },
  {
    id: 'istanbul',
    city: 'Istanbul',
    country: 'Turkey',
    fromPrice: 210,
    image: img('photo-1524231757912-21f4fe3a7200'),
    description: 'Where Europe meets Asia in a city of bazaars.',
  },
  {
    id: 'paris',
    city: 'Paris',
    country: 'France',
    fromPrice: 380,
    image: img('photo-1502602898657-3e91760cbb34'),
    description: 'Romance, art, and unforgettable cuisine.',
  },
  {
    id: 'tokyo',
    city: 'Tokyo',
    country: 'Japan',
    fromPrice: 690,
    image: img('photo-1540959733332-eab4deabeeaf'),
    description: 'Neon nights, ancient shrines, and sushi.',
  },
  {
    id: 'bangkok',
    city: 'Bangkok',
    country: 'Thailand',
    fromPrice: 540,
    image: img('photo-1508009603885-50cf7c579365'),
    description: 'Temples, street food, and tropical escapes.',
  },
]

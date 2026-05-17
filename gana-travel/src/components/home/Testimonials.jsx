import Rating from '../ui/Rating.jsx'

const testimonials = [
  {
    name: 'Sarah Mahmoud',
    role: 'Marketing Lead, Cairo',
    avatar: 'https://i.pravatar.cc/120?img=47',
    rating: 5,
    quote:
      'Booked our honeymoon flight + hotel + Cappadocia balloon ride in one go. Saved hours and about 15% with Silver. Truly unified booking.',
  },
  {
    name: 'Ahmed Khaled',
    role: 'Software Engineer, Dubai',
    avatar: 'https://i.pravatar.cc/120?img=12',
    rating: 5,
    quote:
      "I've used five travel sites — Roame is the cleanest. Pricing is transparent and the dashboard makes managing past trips effortless.",
  },
  {
    name: 'Layla Hassan',
    role: 'Frequent Traveler',
    avatar: 'https://i.pravatar.cc/120?img=32',
    rating: 4,
    quote:
      'Gold membership paid for itself on a single Tokyo trip. Lounge access at three airports made the long layovers actually enjoyable.',
  },
]

export default function Testimonials() {
  return (
    <section className="section bg-white">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold text-teal mb-2">Loved by travelers</p>
          <h2 className="heading-lg text-navy">What our members say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card-hover p-6 flex flex-col">
              <Rating value={t.rating} size="md" />
              <p className="mt-4 text-navy/80 leading-relaxed flex-1">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-navy/5">
                <img src={t.avatar} alt={t.name} className="h-11 w-11 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-bold text-navy">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

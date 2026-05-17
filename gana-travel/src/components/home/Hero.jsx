import SearchBar from './SearchBar.jsx'

const HERO_BG = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80'

export default function Hero() {
  return (
    <section className="relative">
      <div className="relative h-[640px] sm:h-[700px] w-full overflow-hidden">
        <img
          src={HERO_BG}
          alt="Scenic destination"
          className="absolute inset-0 h-full w-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy/80" />
        <div className="relative container-page h-full flex flex-col justify-center pt-16">
          <div className="max-w-3xl text-white animate-fadeUp">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-wide mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" /> Welcome to Roame
            </p>
            <h1 className="heading-xl">
              Your Journey, <span className="text-orange">Unified</span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-white/85 max-w-2xl">
              Book flights, hotels, and complete tour packages across two continents — all from one
              affordable, trustworthy platform.
            </p>
          </div>
          <div className="mt-10 sm:mt-14">
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  )
}

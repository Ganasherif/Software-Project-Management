import Hero from '../components/home/Hero.jsx'
import Stats from '../components/home/Stats.jsx'
import FeaturedDestinations from '../components/home/FeaturedDestinations.jsx'
import WhyChoose from '../components/home/WhyChoose.jsx'
import MembershipTeaser from '../components/home/MembershipTeaser.jsx'
import Testimonials from '../components/home/Testimonials.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedDestinations />
      <WhyChoose />
      <MembershipTeaser />
      <Testimonials />
    </>
  )
}

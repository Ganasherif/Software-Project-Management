import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { plans } from '../data/plans.js'
import { useAuth } from '../context/AuthContext.jsx'
import PlanCard from '../components/membership/PlanCard.jsx'
import PlanComparison from '../components/membership/PlanComparison.jsx'
import { Sparkles } from 'lucide-react'

export default function Membership() {
  const { user, isLoggedIn, setTier } = useAuth()
  const navigate = useNavigate()

  const choose = (plan) => {
    if (!isLoggedIn) {
      toast('Log in to activate your plan.', { icon: '🔒' })
      navigate('/login')
      return
    }
    setTier(plan.name)
    toast.success(`Plan updated — welcome to ${plan.name}!`)
  }

  return (
    <section>
      <div className="bg-gradient-to-br from-navy via-teal to-mint text-white">
        <div className="container-page py-16 sm:py-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-orange" /> Gana Membership
          </span>
          <h1 className="heading-xl mt-4">Travel More, Save More</h1>
          <p className="mt-5 text-lg text-white/85 max-w-2xl mx-auto">
            Unlock member-only pricing, free cancellations, and priority support across every booking
            you make on Gana Travel.
          </p>
        </div>
      </div>

      <div className="container-page -mt-12 relative z-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p) => (
            <PlanCard key={p.id} plan={p} currentTier={user?.tier} onChoose={choose} />
          ))}
        </div>

        <div className="mt-16">
          <h2 className="heading-md text-navy text-center mb-2">Compare every benefit</h2>
          <p className="text-muted text-center max-w-xl mx-auto mb-8">
            See exactly what's included with each membership tier — no fine print.
          </p>
          <PlanComparison />
        </div>
      </div>
    </section>
  )
}

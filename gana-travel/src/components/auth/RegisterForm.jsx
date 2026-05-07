import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, User } from 'lucide-react'
import toast from 'react-hot-toast'
import Input from '../ui/Input.jsx'
import Button from '../ui/Button.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

export default function RegisterForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    terms: false,
  })

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) {
      toast.error('All fields are required.')
      return
    }
    if (form.password !== form.confirm) {
      toast.error("Passwords don't match.")
      return
    }
    if (!form.terms) {
      toast.error('Please accept the Terms to continue.')
      return
    }
    const profile = login({ email: form.email, name: form.name })
    toast.success(`Welcome aboard, ${profile.name}!`)
    navigate('/dashboard')
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        label="Full name"
        id="name"
        icon={User}
        placeholder="Jane Traveler"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <Input
        label="Email"
        id="email"
        type="email"
        icon={Mail}
        placeholder="you@example.com"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Password"
          id="password"
          type="password"
          icon={Lock}
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Input
          label="Confirm"
          id="confirm"
          type="password"
          icon={Lock}
          placeholder="••••••••"
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
        />
      </div>
      <label className="flex items-start gap-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={form.terms}
          onChange={(e) => setForm({ ...form, terms: e.target.checked })}
          className="h-4 w-4 mt-1 rounded accent-teal"
        />
        <span className="text-navy/80">
          I agree to the{' '}
          <a href="#" onClick={(e) => e.preventDefault()} className="text-teal font-semibold hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" onClick={(e) => e.preventDefault()} className="text-teal font-semibold hover:underline">
            Privacy Policy
          </a>
          .
        </span>
      </label>
      <Button type="submit" className="w-full">
        Create account
      </Button>
      <p className="text-center text-sm text-muted">
        Already have an account?{' '}
        <Link to="/login" className="text-teal font-semibold hover:underline">
          Log in
        </Link>
      </p>
    </form>
  )
}

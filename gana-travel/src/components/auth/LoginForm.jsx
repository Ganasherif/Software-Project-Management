import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import Input from '../ui/Input.jsx'
import Button from '../ui/Button.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

export default function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', remember: true })

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      toast.error('Please enter your email and password.')
      return
    }
    const profile = login({ email: form.email })
    toast.success(`Welcome back, ${profile.name}!`)
    navigate('/dashboard')
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        label="Email"
        id="email"
        type="email"
        icon={Mail}
        placeholder="you@example.com"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <Input
        label="Password"
        id="password"
        type="password"
        icon={Lock}
        placeholder="••••••••"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.remember}
            onChange={(e) => setForm({ ...form, remember: e.target.checked })}
            className="h-4 w-4 rounded accent-teal"
          />
          <span className="text-navy/80">Remember me</span>
        </label>
        <a href="#" onClick={(e) => e.preventDefault()} className="text-teal font-semibold hover:underline">
          Forgot password?
        </a>
      </div>
      <Button type="submit" className="w-full">
        Log in
      </Button>
      <p className="text-center text-sm text-muted">
        Don't have an account?{' '}
        <Link to="/register" className="text-teal font-semibold hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  )
}

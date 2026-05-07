import { useState } from 'react'
import toast from 'react-hot-toast'
import Input from '../ui/Input.jsx'
import Button from '../ui/Button.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { Mail, User, Phone, MapPin } from 'lucide-react'

export default function ProfileCard() {
  const { user, updateProfile } = useAuth()
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    country: user?.country || '',
  })

  const onSave = (e) => {
    e.preventDefault()
    updateProfile(form)
    toast.success('Profile saved.')
  }

  return (
    <form onSubmit={onSave} className="card p-6 max-w-2xl">
      <h3 className="font-bold text-navy text-lg">Personal information</h3>
      <p className="text-muted text-sm mt-1">Update the details we use for your bookings.</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full name"
          icon={User}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          label="Email"
          icon={Mail}
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          label="Phone"
          icon={Phone}
          placeholder="+20 100 000 0000"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <Input
          label="Country"
          icon={MapPin}
          placeholder="Egypt"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
        />
      </div>

      <div className="mt-6 flex justify-end">
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  )
}

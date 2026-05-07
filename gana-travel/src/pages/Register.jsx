import AuthShell from '../components/auth/AuthShell.jsx'
import RegisterForm from '../components/auth/RegisterForm.jsx'

export default function Register() {
  return (
    <AuthShell title="Create your account" subtitle="Join thousands of travelers booking smarter." side="right">
      <RegisterForm />
    </AuthShell>
  )
}

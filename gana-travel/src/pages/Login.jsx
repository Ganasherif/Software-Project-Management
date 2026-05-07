import AuthShell from '../components/auth/AuthShell.jsx'
import LoginForm from '../components/auth/LoginForm.jsx'

export default function Login() {
  return (
    <AuthShell title="Welcome back" subtitle="Log in to continue your journey." side="left">
      <LoginForm />
    </AuthShell>
  )
}

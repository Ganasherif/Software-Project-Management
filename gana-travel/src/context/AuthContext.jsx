import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'gana_auth_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true)
  }, [])

  const login = ({ email, name }) => {
    const profile = {
      name: name || (email ? email.split('@')[0] : 'Demo User'),
      email: email || 'demo@gana.travel',
      tier: 'Basic',
      joined: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    setUser(profile)
    return profile
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  const updateProfile = (patch) => {
    setUser((prev) => {
      if (!prev) return prev
      const next = { ...prev, ...patch }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const setTier = (tier) => updateProfile({ tier })

  const value = useMemo(
    () => ({ user, isLoggedIn: !!user, login, logout, updateProfile, setTier, hydrated }),
    [user, hydrated]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

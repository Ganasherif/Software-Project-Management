import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { Plane, Menu, X, ChevronDown, LayoutDashboard, LogOut, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'

const links = [
  { to: '/flights', label: 'Flights' },
  { to: '/hotels', label: 'Hotels' },
  { to: '/tours', label: 'Tours' },
  { to: '/membership', label: 'Membership' },
]

export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur shadow-soft">
      <nav className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-heading font-extrabold text-navy">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-orange">
            <Plane className="h-5 w-5 -rotate-45" />
          </span>
          <span className="text-xl">Gana Travel</span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    isActive ? 'text-teal bg-teal/10' : 'text-navy/80 hover:text-teal hover:bg-navy/5'
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="btn-ghost text-sm">
                Login
              </Link>
              <Link to="/register" className="btn-primary text-sm">
                Register
              </Link>
            </>
          ) : (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-xl border border-navy/10 bg-white px-3 py-1.5 hover:border-teal transition"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal text-white font-semibold text-sm">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </span>
                <span className="text-sm font-semibold text-navy max-w-[120px] truncate">
                  {user?.name}
                </span>
                <ChevronDown className="h-4 w-4 text-navy/60" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-navy/10 bg-white shadow-card overflow-hidden animate-fadeUp">
                  <div className="px-4 py-3 border-b border-navy/5">
                    <p className="text-sm font-semibold text-navy truncate">{user?.name}</p>
                    <p className="text-xs text-muted truncate">{user?.email}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-navy hover:bg-navy/5"
                  >
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-navy hover:bg-navy/5"
                  >
                    <User className="h-4 w-4" /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-lg text-navy hover:bg-navy/5"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-navy/10 bg-white animate-fadeUp">
          <div className="container-page py-3 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-sm font-semibold ${
                    isActive ? 'text-teal bg-teal/10' : 'text-navy/80 hover:bg-navy/5'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 pt-3 border-t border-navy/5 flex gap-2">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-outline flex-1 text-sm">
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary flex-1 text-sm">
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="btn-secondary flex-1 text-sm">
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="btn-outline flex-1 text-sm">
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

import { useNavigate, useLocation } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const links = [
    { label: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { label: 'Transactions', path: '/transactions', icon: '💳' },
    { label: 'Profile', path: '/profile', icon: '👤' },
  ]

  return (
    <aside className="bg-brand-dark text-white w-16 sm:w-64 min-h-screen p-3 sm:p-6">
      <h2 className="text-sm sm:text-xl font-bold mb-8 hidden sm:block">PhantomShield</h2>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            className={`text-left px-3 py-2 rounded-lg transition text-xs sm:text-base ${
              location.pathname === link.path
                ? 'bg-brand text-white'
                : 'hover:bg-white/10'
            }`}
          >
            <span className="sm:hidden">{link.icon}</span>
            <span className="hidden sm:inline">{link.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
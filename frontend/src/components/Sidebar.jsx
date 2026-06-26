import { useNavigate } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className="bg-brand-dark text-white w-16 sm:w-64 min-h-screen p-3 sm:p-6">
      <h2 className="text-sm sm:text-xl font-bold mb-8 hidden sm:block">PhantomShield</h2>
      <nav className="flex flex-col gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-left hover:text-brand transition text-xs sm:text-base"
        >
          <span className="sm:hidden">🏠</span>
          <span className="hidden sm:inline">Dashboard</span>
        </button>
        <button
          onClick={() => navigate('/transactions')}
          className="text-left hover:text-brand transition text-xs sm:text-base"
        >
          <span className="sm:hidden">💳</span>
          <span className="hidden sm:inline">Transactions</span>
        </button>
        <button
          onClick={() => navigate('/profile')}
          className="text-left hover:text-brand transition text-xs sm:text-base"
        >
          <span className="sm:hidden">👤</span>
          <span className="hidden sm:inline">Profile</span>
        </button>
      </nav>
    </aside>
  )
}

export default Sidebar
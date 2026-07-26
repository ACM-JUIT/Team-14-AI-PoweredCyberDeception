import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function DashboardNavbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600 text-sm">{user}</span>
        <button
          onClick={handleLogout}
          className="bg-brand text-white px-4 py-2 rounded-lg hover:opacity-90 transition text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default DashboardNavbar
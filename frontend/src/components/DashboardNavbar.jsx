import { useNavigate } from 'react-router-dom'

function DashboardNavbar() {
  const navigate = useNavigate()

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Welcome, User</span>
        <button
          onClick={() => navigate('/login')}
          className="bg-brand text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default DashboardNavbar
import Sidebar from '../components/Sidebar'
import DashboardNavbar from '../components/DashboardNavbar'

function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <DashboardNavbar />
        <main className="p-6">
          <p className="text-gray-600">Dashboard content goes here.</p>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
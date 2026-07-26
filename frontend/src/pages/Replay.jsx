import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import DashboardNavbar from '../components/DashboardNavbar'
import ReplayViewer from '../components/ReplayViewer'

function Replay() {
  const { sessionId } = useParams()

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardNavbar />
        <main className="p-4 sm:p-6 bg-gray-50 flex-1">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Session Replay — {sessionId}
          </h2>
          <ReplayViewer sessionId={sessionId} />
        </main>
      </div>
    </div>
  )
}

export default Replay
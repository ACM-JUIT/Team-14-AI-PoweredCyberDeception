import { useNavigate } from 'react-router-dom'

function LiveSessionsTable({ sessions }) {
  const navigate = useNavigate()

  const getScoreColor = (score) => {
    if (score >= 71) return 'bg-red-100 text-red-700'
    if (score >= 31) return 'bg-yellow-100 text-yellow-700'
    return 'bg-green-100 text-green-700'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Flagged': return 'bg-red-100 text-red-700'
      case 'Redirected': return 'bg-purple-100 text-purple-700'
      default: return 'bg-green-100 text-green-700'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-brand-dark text-white">
          <tr>
            <th className="text-left px-4 py-3">IP Address</th>
            <th className="text-left px-4 py-3">Session Start</th>
            <th className="text-left px-4 py-3">Pages Visited</th>
            <th className="text-left px-4 py-3">Suspicion Score</th>
            <th className="text-left px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {sessions.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-8 text-gray-400">
                No active sessions
              </td>
            </tr>
          ) : (
            sessions.map((session, index) => (
              <tr
                key={session.id || index}
                className={`cursor-pointer hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                onClick={() => navigate(`/replay/${session.id}`)}
              >
                <td className="px-4 py-3 text-gray-700">{session.ip_address}</td>
                <td className="px-4 py-3 text-gray-600">
                  {new Date(session.start_time).toLocaleString('en-IN')}
                </td>
                <td className="px-4 py-3 text-gray-600">{session.pages_visited}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(session.suspicion_score)}`}>
                    {session.suspicion_score}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                    {session.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default LiveSessionsTable
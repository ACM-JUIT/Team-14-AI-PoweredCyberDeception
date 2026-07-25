import { useState, useEffect } from 'react'
import { getStats } from '../services/api'

function Analytics() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats()
        setStats(data)
      } catch (err) {
        setError('Could not load analytics data.')
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col bg-gray-50">
        <header className="bg-white shadow px-6 py-4">
          <h1 className="text-lg font-semibold text-gray-800">Security Analytics</h1>
        </header>

        <main className="p-4 sm:p-6 flex flex-col gap-6">
          <section>
            <h2 className="text-gray-700 font-semibold mb-3">Overview</h2>
            {loading && (
              <div className="flex items-center justify-center py-10">
                <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {error && (
              <div className="bg-red-100 text-red-600 rounded-lg px-4 py-3 text-sm">{error}</div>
            )}
            {!loading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow p-5">
                  <p className="text-sm text-gray-500">Total Attacks</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">
                    {stats?.total_attacks ?? '--'}
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow p-5">
                  <p className="text-sm text-gray-500">Active Sessions</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">
                    {stats?.active_sessions ?? '--'}
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow p-5">
                  <p className="text-sm text-gray-500">Attacks Today</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">
                    {stats?.attacks_today ?? '--'}
                  </p>
                </div>
              </div>
            )}
          </section>

          <section>
            <h2 className="text-gray-700 font-semibold mb-3">Attack Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow p-5">
                <p className="text-sm text-gray-500 mb-4">Attacks by Type</p>
                <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
                  Bar chart coming soon
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-5">
                <p className="text-sm text-gray-500 mb-4">Attacks Timeline</p>
                <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
                  Line chart coming soon
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-gray-700 font-semibold mb-3">Active Sessions</h2>
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
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-400">
                      Sessions data coming soon
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Analytics
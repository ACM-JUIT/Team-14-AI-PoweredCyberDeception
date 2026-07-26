import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardNavbar from '../components/DashboardNavbar'
import AttacksBarChart from '../components/AttacksBarChart'
import AttacksTimelineChart from '../components/AttacksTimelineChart'
import AttacksDoughnutChart from '../components/AttacksDoughnutChart'
import LiveSessionsTable from '../components/LiveSessionsTable'
import { getStats, getAttackTypes, getTimeline, getActiveSessions } from '../services/api'

function Analytics() {
  const [stats, setStats] = useState(null)
  const [attackTypes, setAttackTypes] = useState([])
  const [timeline, setTimeline] = useState([])
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchStats = async () => {
    try {
      const data = await getStats()
      setStats(data)
      const attackData = await getAttackTypes()
      setAttackTypes(attackData)
      const timelineData = await getTimeline()
      setTimeline(timelineData)
      const sessionsData = await getActiveSessions()
      setSessions(sessionsData)
    } catch (err) {
      setError('Could not load analytics data.')
    } finally {
      setLoading(false)
      setLastUpdated(new Date().toLocaleTimeString('en-IN'))
    }
  }

  useEffect(() => {
    fetchStats()
    const interval = setInterval(() => {
      fetchStats()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const dummyAttackTypes = [
    { attack_type: 'SQL Injection', count: 12 },
    { attack_type: 'Brute Force', count: 8 },
    { attack_type: 'XSS', count: 5 },
    { attack_type: 'URL Scanning', count: 15 },
    { attack_type: 'Suspicious Agent', count: 3 },
  ]

  const dummyTimeline = [
    { date: 'Jul 19', count: 4 },
    { date: 'Jul 20', count: 7 },
    { date: 'Jul 21', count: 3 },
    { date: 'Jul 22', count: 10 },
    { date: 'Jul 23', count: 6 },
    { date: 'Jul 24', count: 9 },
    { date: 'Jul 25', count: 5 },
  ]

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardNavbar />
        <main className="p-4 sm:p-6 bg-gray-50 flex-1 flex flex-col gap-6">

          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">Security Analytics</h1>
            {lastUpdated && (
              <p className="text-xs text-gray-400">Last updated: {lastUpdated}</p>
            )}
          </div>

          {/* Stats Cards */}
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
            {!loading && (
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

          {/* Charts */}
          <section>
            <h2 className="text-gray-700 font-semibold mb-3">Attack Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow p-5">
                <p className="text-sm text-gray-500 mb-4">Attacks by Type</p>
                <AttacksBarChart data={attackTypes.length > 0 ? attackTypes : dummyAttackTypes} />
              </div>
              <div className="bg-white rounded-lg shadow p-5">
                <p className="text-sm text-gray-500 mb-4">Attacks Timeline</p>
                <AttacksTimelineChart data={timeline.length > 0 ? timeline : dummyTimeline} />
              </div>
            </div>
          </section>

          {/* Doughnut Chart */}
          <section>
            <h2 className="text-gray-700 font-semibold mb-3">Attack Type Breakdown</h2>
            <div className="bg-white rounded-lg shadow p-5 max-w-md mx-auto">
              <p className="text-sm text-gray-500 mb-4 text-center">Attack Distribution</p>
              <AttacksDoughnutChart data={attackTypes.length > 0 ? attackTypes : dummyAttackTypes} />
            </div>
          </section>

          {/* Sessions Table */}
          <section>
            <h2 className="text-gray-700 font-semibold mb-3">Active Sessions</h2>
            <LiveSessionsTable sessions={sessions} />
          </section>

        </main>
      </div>
    </div>
  )
}

export default Analytics
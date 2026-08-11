import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardNavbar from '../components/DashboardNavbar'
import { getUserProfile, getTransactions } from '../services/api'
import { useAuth } from '../context/AuthContext'

function Dashboard() {
  const [profile, setProfile] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const profileData = await getUserProfile(user)
        setProfile(profileData)
        const txData = await getTransactions(user)
        setTransactions(txData.transactions)
      } catch (err) {
        setError('Could not load dashboard data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    if (user) fetchDashboard()
  }, [])

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardNavbar />
        <main className="p-4 sm:p-6 flex-1 bg-gray-50">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          {error && (
            <div className="bg-red-100 text-red-600 rounded-lg px-4 py-3">
              {error}
            </div>
          )}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-500 text-sm mb-2">Account Balance</p>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  ₹{profile?.balance?.toLocaleString('en-IN', { minimumFractionDigits: 2 }) ?? '--'}
                </h2>
                <p className="text-gray-500 text-sm">Account: {profile?.account_number}</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-500 text-sm mb-4">Recent Transactions</p>
                <div className="flex flex-col gap-3">
                  {transactions.slice(0, 5).map((tx, index) => (
                    <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <div>
                        <p className="text-gray-800 text-sm font-medium">{tx.description}</p>
                        <p className="text-gray-400 text-xs">
                          {new Date(tx.timestamp).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                      <p className={`text-sm font-semibold ${tx.type === 'debit' ? 'text-red-500' : 'text-green-600'}`}>
                        {tx.type === 'debit' ? '-' : '+'}₹{tx.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Dashboard
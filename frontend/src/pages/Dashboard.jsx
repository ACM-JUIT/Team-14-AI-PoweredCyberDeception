import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardNavbar from '../components/DashboardNavbar'
import AccountBalanceCard from '../components/AccountBalanceCard'
import TransactionsCard from '../components/TransactionsCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { getDashboardData } from '../services/api'

function Dashboard() {
  const [accountData, setAccountData] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboardData()
        setAccountData(data.account)
        setTransactions(data.transactions)
      } catch (err) {
        setError('Could not load dashboard data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardNavbar />
        <main className="p-4 sm:p-6 flex-1 bg-gray-50">
          {loading && <LoadingSpinner />}
          {error && (
            <div className="bg-red-100 text-red-600 rounded-lg px-4 py-3">
              {error}
            </div>
          )}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AccountBalanceCard data={accountData} />
              <TransactionsCard data={transactions} />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Dashboard
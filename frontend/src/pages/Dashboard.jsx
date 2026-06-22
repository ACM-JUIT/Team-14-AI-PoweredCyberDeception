import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardNavbar from '../components/DashboardNavbar'
import AccountBalanceCard from '../components/AccountBalanceCard'
import TransactionsCard from '../components/TransactionsCard'
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
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <DashboardNavbar />
        <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading && <p className="text-gray-500">Loading dashboard...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <>
              <AccountBalanceCard data={accountData} />
              <TransactionsCard data={transactions} />
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default Dashboard
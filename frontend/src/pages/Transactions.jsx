import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardNavbar from '../components/DashboardNavbar'
import { getTransactions } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { transactions as mockTransactions } from '../data/mockData'

function Transactions() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions(user)
        setTransactions(data.transactions)
      } catch (err) {
        setTransactions(mockTransactions)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardNavbar />
        <main className="p-4 sm:p-6 bg-gray-50 flex-1">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Transaction History</h2>

          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {!loading && (
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-brand-dark text-white">
                  <tr>
                    <th className="text-left px-4 py-3">Date</th>
                    <th className="text-left px-4 py-3">Description</th>
                    <th className="text-left px-4 py-3">Type</th>
                    <th className="text-left px-4 py-3">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="px-4 py-3 text-gray-600">
                        {new Date(tx.timestamp).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-4 py-3 text-gray-800 font-medium">{tx.description}</td>
                      <td className="px-4 py-3 text-gray-600 capitalize">{tx.type}</td>
                      <td className={`px-4 py-3 font-semibold ${tx.type === 'debit' ? 'text-red-500' : 'text-green-600'}`}>
                        {tx.type === 'debit' ? '-' : '+'}₹{tx.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Transactions
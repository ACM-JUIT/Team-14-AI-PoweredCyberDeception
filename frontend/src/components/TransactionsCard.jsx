function TransactionsCard({ data }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-500 text-sm mb-4">Recent Transactions</p>
      <div className="flex flex-col gap-3">
        {data.map((tx) => (
          <div key={tx.id} className="flex justify-between items-center border-b border-gray-100 pb-2">
            <div>
              <p className="text-gray-800 text-sm font-medium">{tx.description}</p>
              <p className="text-gray-400 text-xs">{tx.date}</p>
            </div>
            <p className={`text-sm font-semibold ${tx.amount < 0 ? 'text-red-500' : 'text-green-600'}`} >
              {tx.amount < 0 ? '-' : '+'}₹{Math.abs(tx.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TransactionsCard
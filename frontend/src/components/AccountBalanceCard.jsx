function AccountBalanceCard({ data }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-500 text-sm mb-2">Account Balance</p>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        ₹{data.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
      </h2>
      <p className="text-gray-500 text-sm">{data.accountType}</p>
      <p className="text-gray-400 text-sm">{data.accountNumber}</p>
    </div>
  )
}

export default AccountBalanceCard
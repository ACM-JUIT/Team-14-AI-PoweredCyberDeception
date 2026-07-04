import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { logAction } from "../utils/logger";
import { trackAction } from "../utils/behaviorTracker";

const allTransactions = [
  { id: "TXN001", user: "admin@securebank.com", type: "Transfer", amount: "+$50,000", date: "24 Jun 2026", status: "Success", from: "SB-00001", to: "SB-00042" },
  { id: "TXN002", user: "john.doe@email.com", type: "Withdrawal", amount: "-$12,000", date: "23 Jun 2026", status: "Success", from: "SB-00023", to: "External" },
  { id: "TXN003", user: "jane.smith@email.com", type: "Deposit", amount: "+$99,999", date: "23 Jun 2026", status: "Pending", from: "External", to: "SB-00045" },
  { id: "TXN004", user: "robert.brown@email.com", type: "Transfer", amount: "+$5,000", date: "22 Jun 2026", status: "Success", from: "SB-00012", to: "SB-00034" },
  { id: "TXN005", user: "emily.clark@email.com", type: "Withdrawal", amount: "-$3,500", date: "22 Jun 2026", status: "Failed", from: "SB-00067", to: "External" },
  { id: "TXN006", user: "admin@securebank.com", type: "Transfer", amount: "+$200,000", date: "21 Jun 2026", status: "Success", from: "SB-00001", to: "SB-00089" },
  { id: "TXN007", user: "michael.james@email.com", type: "Deposit", amount: "+$15,000", date: "21 Jun 2026", status: "Success", from: "External", to: "SB-00056" },
  { id: "TXN008", user: "john.doe@email.com", type: "Transfer", amount: "+$8,500", date: "20 Jun 2026", status: "Success", from: "SB-00023", to: "SB-00078" },
  { id: "TXN009", user: "jane.smith@email.com", type: "Withdrawal", amount: "-$25,000", date: "20 Jun 2026", status: "Failed", from: "SB-00045", to: "External" },
  { id: "TXN010", user: "admin@securebank.com", type: "Deposit", amount: "+$500,000", date: "19 Jun 2026", status: "Success", from: "External", to: "SB-00001" },
];

function Transactions() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    logAction("VISITED_TRANSACTIONS");
    trackAction("page_visit", { page: "transactions" });
  }, []);

  const filtered = allTransactions.filter((txn) => {
    const matchFilter = filter === "All" || txn.status === filter;
    const matchSearch = txn.user.toLowerCase().includes(search.toLowerCase()) || txn.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold text-blue-900">Transaction History</h1>
        <p className="text-gray-500 mt-1">All registered transactions</p>

        <div className="mt-6 bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
            <div className="flex gap-2">
              {["All", "Success", "Pending", "Failed"].map((f) => (
                <button
                  key={f}
                  onClick={() => { setFilter(f); trackAction("filter_transactions", { filter: f }); }}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${filter === f ? "bg-blue-800 text-white" : "bg-gray-100 text-gray-600"}`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); trackAction("search_transactions", { query: e.target.value }); }}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => trackAction("clicked_export_transactions")}
                className="bg-blue-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
              >
                Export CSV
              </button>
            </div>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b">
                <th className="pb-2">Transaction ID</th>
                <th className="pb-2">User</th>
                <th className="pb-2">Type</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Date</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((txn) => (
                <tr
                  key={txn.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => { setSelected(txn); trackAction("clicked_transaction", { id: txn.id }); }}
                >
                  <td className="py-2 text-blue-600">{txn.id}</td>
                  <td>{txn.user}</td>
                  <td>{txn.type}</td>
                  <td className={txn.amount.startsWith("+") ? "text-green-600" : "text-red-600"}>{txn.amount}</td>
                  <td>{txn.date}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${txn.status === "Success" ? "bg-green-100 text-green-700" : txn.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selected && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 w-96 shadow-2xl">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Transaction Details</h2>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Transaction ID</span>
                  <span className="font-medium text-blue-600">{selected.id}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">User</span>
                  <span className="font-medium">{selected.user}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Type</span>
                  <span className="font-medium">{selected.type}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Amount</span>
                  <span className={`font-medium ${selected.amount.startsWith("+") ? "text-green-600" : "text-red-600"}`}>{selected.amount}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">From</span>
                  <span className="font-medium">{selected.from}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">To</span>
                  <span className="font-medium">{selected.to}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium">{selected.date}</span>
                </div>
              </div>
              <button
                onClick={() => { setSelected(null); trackAction("closed_transaction_modal", { id: selected.id }); }}
                className="mt-6 w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Transactions;
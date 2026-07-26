import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { logAction } from "../utils/logger";
import { trackAction } from "../utils/behaviorTracker";

function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    logAction("VISITED_DASHBOARD");
    trackAction("page_visit", { page: "dashboard" });
    setTimeout(() => setLoading(false), 800);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, Admin</h1>
            <p className="text-gray-500 text-sm">Last login: Today at 09:42 AM</p>
          </div>
          <span className="ml-auto bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            SUPER ADMIN
          </span>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading account data...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm">Total Balance</p>
                <p className="text-3xl font-bold text-green-600 mt-1">$9,999,999.00</p>
                <p className="text-gray-400 text-xs mt-2">↑ 12.5% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm">Total Transactions</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">12,847</p>
                <p className="text-gray-400 text-xs mt-2">↑ 324 this week</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm">Active Users</p>
                <p className="text-3xl font-bold text-purple-600 mt-1">348</p>
                <p className="text-gray-400 text-xs mt-2">↑ 42 online now</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-700 mb-4">Recent Transactions</h2>
                {[
                  { name: "Admin Transfer", amount: "+$50,000", type: "Transfer", color: "text-green-600" },
                  { name: "John Doe", amount: "-$12,000", type: "Withdrawal", color: "text-red-600" },
                  { name: "Jane Smith", amount: "+$99,999", type: "Deposit", color: "text-green-600" },
                ].map((t, i) => (
                  <div key={i} className="flex justify-between items-center border-b py-3 cursor-pointer hover:bg-gray-50"
                    onClick={() => trackAction("clicked_recent_transaction", { name: t.name })}>
                    <div>
                      <p className="font-medium text-sm">{t.name}</p>
                      <p className="text-gray-400 text-xs">{t.type}</p>
                    </div>
                    <p className={`font-bold ${t.color}`}>{t.amount}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-700 mb-4">Quick Actions</h2>
                <div className="flex flex-col gap-3">
                  <button onClick={() => trackAction("clicked_admin_button", { action: "view_passwords" })}
                    className="bg-red-600 text-white px-4 py-3 rounded-xl hover:bg-red-700 text-left text-sm">
                    🔑 View All Passwords
                  </button>
                  <button onClick={() => trackAction("clicked_admin_button", { action: "export_data" })}
                    className="bg-orange-500 text-white px-4 py-3 rounded-xl hover:bg-orange-600 text-left text-sm">
                    📤 Export User Data
                  </button>
                  <button onClick={() => trackAction("clicked_admin_button", { action: "view_transactions" })}
                    className="bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 text-left text-sm">
                    💳 View All Transactions
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
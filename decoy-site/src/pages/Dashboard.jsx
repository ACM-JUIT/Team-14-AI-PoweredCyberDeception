import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { logAction } from "../utils/logger";
import { trackAction } from "../utils/behaviorTracker";
import { getFakeBalance, getFakeTransactions } from "../utils/fakeApi";

function Dashboard() {
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    logAction("VISITED_DASHBOARD");
    trackAction("page_visit", { page: "dashboard" });

    // Fake API calls — looks like real backend is responding
    getFakeBalance().then((res) => {
      setBalance(res.data.balance);
    });

    getFakeTransactions().then((res) => {
      setTransactions(res.data.slice(0, 3));
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              SUPER ADMIN
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500 text-sm mb-2">Account Balance</p>
              <p className="text-4xl font-bold text-green-600">
  {loading ? "Loading..." : `$${balance?.toLocaleString()}.00`}
</p>
              <p className="text-gray-400 text-xs mt-2">Account ID: SB-2026-00001</p>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => trackAction("clicked_send_money")}
                  className="bg-brand text-white px-4 py-2 rounded-lg text-sm hover:opacity-90"
                >
                  Send Money
                </button>
                <button
                  onClick={() => trackAction("clicked_add_money")}
                  className="border border-brand text-brand px-4 py-2 rounded-lg text-sm hover:bg-gray-50"
                >
                  Add Money
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500 text-sm mb-4">Recent Transactions</p>
              <div className="flex flex-col gap-3">
                {[
                  { name: "John Doe", amount: "-$12,000", type: "Withdrawal" },
                  { name: "Jane Smith", amount: "+$99,999", type: "Deposit" },
                  { name: "Admin Transfer", amount: "+$50,000", type: "Transfer" },
                ].map((t, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border-b pb-2 cursor-pointer hover:bg-gray-50"
                    onClick={() => trackAction("clicked_recent_transaction", { name: t.name })}
                  >
                    <div>
                      <p className="font-medium text-sm">{t.name}</p>
                      <p className="text-gray-400 text-xs">{t.type}</p>
                    </div>
                    <p className={t.amount.startsWith("+") ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                      {t.amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow md:col-span-2">
              <p className="text-gray-500 text-sm mb-4">Admin Quick Actions</p>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => trackAction("clicked_admin_button", { action: "view_passwords" })}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm"
                >
                  🔑 View All Passwords
                </button>
                <button
                  onClick={() => trackAction("clicked_admin_button", { action: "export_data" })}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 text-sm"
                >
                  📤 Export User Data
                </button>
                <button
                  onClick={() => trackAction("clicked_admin_button", { action: "view_transactions" })}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                >
                  💳 View Transactions
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
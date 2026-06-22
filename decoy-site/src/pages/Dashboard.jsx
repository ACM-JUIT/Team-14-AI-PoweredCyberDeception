import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { logAction } from "../utils/logger";
import { trackAction } from "../utils/behaviorTracker";

function Dashboard() {
  useEffect(() => {
    logAction("VISITED_DASHBOARD");
    trackAction("page_visit", { page: "dashboard" });
  }, []);

  return (
    <div className="flex">
      <div className="flex-1">
        <Navbar />
        <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Balance Card */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-lg font-bold text-gray-700">
                Account Balance
              </h2>
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                SUPER ADMIN
              </span>
            </div>
            <p className="text-3xl font-bold text-green-600">$9,999,999.00</p>
            <p className="text-gray-400 text-sm mt-1">Account ID: SB-2026-00001</p>
          </div>

          {/* Transactions Card */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Recent Transactions
            </h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b">
                  <th className="pb-2">User</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">admin@securebank.com</td>
                  <td className="text-green-600">+$50,000</td>
                  <td className="text-green-500">Success</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">john.doe@email.com</td>
                  <td className="text-red-600">-$12,000</td>
                  <td className="text-green-500">Success</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">jane.smith@email.com</td>
                  <td className="text-green-600">+$99,999</td>
                  <td className="text-yellow-500">Pending</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white p-6 rounded-xl shadow md:col-span-2">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Quick Actions
            </h2>
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
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
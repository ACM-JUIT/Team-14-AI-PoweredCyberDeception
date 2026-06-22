import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { logAction } from "../utils/logger";
import { trackAction } from "../utils/behaviorTracker";

function AdminPanel() {
  useEffect(() => {
    logAction("VISITED_ADMIN_PANEL");
    trackAction("page_visit", { page: "admin" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold text-red-700">
          ⚠ Admin Control Panel
        </h1>
        <p className="text-gray-500 mt-1">SUPER ADMIN ACCESS ONLY</p>

        <div className="mt-6 grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Sensitive Actions
            </h2>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  logAction("CLICKED_VIEW_ALL_PASSWORDS");
                  trackAction("clicked_admin_button", { action: "view_passwords" });
                }}
                className="bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 text-left"
              >
                🔑 View All Passwords
              </button>
              <button
                onClick={() => {
                  logAction("CLICKED_EXPORT_USER_DATA");
                  trackAction("clicked_admin_button", { action: "export_data" });
                }}
                className="bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 text-left"
              >
                📤 Export User Data
              </button>
              <button
                onClick={() => {
                  logAction("CLICKED_VIEW_TRANSACTIONS");
                  trackAction("clicked_admin_button", { action: "view_transactions" });
                }}
                className="bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 text-left"
              >
                💳 View All Transactions
              </button>
              <button
                onClick={() => {
                  logAction("CLICKED_BACKUP_DATABASE");
                  trackAction("clicked_admin_button", { action: "backup_database" });
                }}
                className="bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 text-left"
              >
                🗄️ Backup Database
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              System Info
            </h2>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Server</span>
                <span className="font-medium">securebank-prod-01</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Database</span>
                <span className="font-medium text-green-600">Connected</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Total Users</span>
                <span className="font-medium">12,483</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Admin Password</span>
                <span className="font-medium text-red-500">admin@1234</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">API Key</span>
                <span className="font-medium text-red-500">sk-prod-9x8y7z6w</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Last Backup</span>
                <span className="font-medium">12 Jun 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { logAction } from "../utils/logger";
import { trackAction } from "../utils/behaviorTracker";

const users = [
  { id: 1, name: "John Doe", email: "john.doe@email.com", password: "john@1234", balance: "$45,230", role: "User", phone: "+1-555-0101", lastLogin: "24 Jun 2026" },
  { id: 2, name: "Jane Smith", email: "jane.smith@email.com", password: "jane#5678", balance: "$99,999", role: "User", phone: "+1-555-0102", lastLogin: "23 Jun 2026" },
  { id: 3, name: "Robert Brown", email: "robert.brown@email.com", password: "rob@9999", balance: "$12,500", role: "User", phone: "+1-555-0103", lastLogin: "22 Jun 2026" },
  { id: 4, name: "Emily Clark", email: "emily.clark@email.com", password: "emily@333", balance: "$78,000", role: "Manager", phone: "+1-555-0104", lastLogin: "24 Jun 2026" },
  { id: 5, name: "Michael James", email: "michael.james@email.com", password: "mike#2024", balance: "$200,000", role: "Manager", phone: "+1-555-0105", lastLogin: "21 Jun 2026" },
  { id: 6, name: "Super Admin", email: "admin@securebank.com", password: "admin@1234", balance: "$9,999,999", role: "Admin", phone: "+1-555-0001", lastLogin: "24 Jun 2026" },
];

function UserList() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    logAction("VISITED_USER_LIST");
    trackAction("page_visit", { page: "users" });
  }, []);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold text-blue-900">User List</h1>
        <p className="text-gray-500 mt-1">All registered users and credentials</p>

        <div className="mt-6 bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); trackAction("search_users", { query: e.target.value }); }}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => { logAction("CLICKED_EXPORT_USERS"); trackAction("clicked_admin_button", { action: "export_users" }); }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
            >
              Export All Data
            </button>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b">
                <th className="pb-2">ID</th>
                <th className="pb-2">Name</th>
                <th className="pb-2">Email</th>
                <th className="pb-2">Password</th>
                <th className="pb-2">Balance</th>
                <th className="pb-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => { setSelected(user); trackAction("clicked_user_row", { email: user.email }); }}
                >
                  <td className="py-2">{user.id}</td>
                  <td>{user.name}</td>
                  <td className="text-blue-600">{user.email}</td>
                  <td className="text-red-500 font-mono">{user.password}</td>
                  <td className="text-green-600">{user.balance}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === "Admin" ? "bg-red-100 text-red-700" :
                      user.role === "Manager" ? "bg-orange-100 text-orange-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {user.role}
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
              <h2 className="text-xl font-bold text-gray-800 mb-4">User Details</h2>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium">{selected.name}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Email</span>
                  <span className="text-blue-600">{selected.email}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Password</span>
                  <span className="text-red-500 font-mono">{selected.password}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Balance</span>
                  <span className="text-green-600 font-bold">{selected.balance}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Phone</span>
                  <span className="font-medium">{selected.phone}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Role</span>
                  <span className="font-medium">{selected.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Login</span>
                  <span className="font-medium">{selected.lastLogin}</span>
                </div>
              </div>
              <button
                onClick={() => { setSelected(null); trackAction("closed_user_modal", { email: selected.email }); }}
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

export default UserList;
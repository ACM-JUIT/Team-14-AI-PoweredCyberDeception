import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { logAction } from "../utils/logger";
import { trackAction } from "../utils/behaviorTracker";

const users = [
  { id: 1, name: "John Doe", email: "john.doe@email.com", password: "john@1234", balance: "$45,230", role: "User" },
  { id: 2, name: "Jane Smith", email: "jane.smith@email.com", password: "jane#5678", balance: "$99,999", role: "User" },
  { id: 3, name: "Robert Brown", email: "robert.brown@email.com", password: "rob@9999", balance: "$12,500", role: "User" },
  { id: 4, name: "Emily Clark", email: "emily.clark@email.com", password: "emily@333", balance: "$78,000", role: "Manager" },
  { id: 5, name: "Michael James", email: "michael.james@email.com", password: "mike#2024", balance: "$200,000", role: "Manager" },
  { id: 6, name: "Super Admin", email: "admin@securebank.com", password: "admin@1234", balance: "$9,999,999", role: "Admin" },
];

function UserList() {
  useEffect(() => {
    logAction("VISITED_USER_LIST");
    trackAction("page_visit", { page: "users" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold text-blue-900">User List</h1>
        <p className="text-gray-500 mt-1">All registered users and credentials</p>

        <div className="mt-6 bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-700">All Users</h2>
            <button
              onClick={() => {
                logAction("CLICKED_EXPORT_USERS");
                trackAction("clicked_admin_button", { action: "export_users" });
              }}
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
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => trackAction("clicked_user_row", { email: user.email })}
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
      </div>
    </div>
  );
}

export default UserList;
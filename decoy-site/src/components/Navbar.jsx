import React from "react";
import { Link } from "react-router-dom";
import { trackAction } from "../utils/behaviorTracker";

function Navbar() {
  return (
    <nav className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <div className="text-xl font-bold">🏦 SecureBank</div>
      <div className="flex gap-6 text-sm">
        <Link
          to="/dashboard"
          onClick={() => trackAction("nav_click", { page: "dashboard" })}
          className="hover:text-yellow-300"
        >
          Dashboard
        </Link>
        <Link
          to="/transactions"
          onClick={() => trackAction("nav_click", { page: "transactions" })}
          className="hover:text-yellow-300"
        >
          Transactions
        </Link>
        <Link
          to="/admin"
          onClick={() => trackAction("nav_click", { page: "admin" })}
          className="hover:text-yellow-300 text-red-300"
        >
          ⚠ Admin
        </Link>
        <Link
          to="/users"
          onClick={() => trackAction("nav_click", { page: "users" })}
          className="hover:text-yellow-300"
        >
          Users
        </Link>
        <Link
          to="/"
          onClick={() => trackAction("logout_click")}
          className="hover:text-yellow-300 text-red-400"
        >
          Logout
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
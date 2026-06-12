import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logAction } from "../utils/logger";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    logAction("LOGIN_ATTEMPT", { email, password });
    if (email === "" || password === "") {
      setError("Please fill all fields");
      return;
    }
    logAction("LOGIN_SUCCESS", { email });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🏦</div>
          <h2 className="text-2xl font-bold text-blue-900">SecureBank</h2>
          <p className="text-gray-500 text-sm">Online Banking Portal</p>
        </div>
        {error && (
          <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@securebank.com"
          />
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          <div className="text-right mb-6">
            <span className="text-blue-600 text-sm cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-700 font-medium"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-gray-400 text-xs mt-6">
          🔒 256-bit SSL Secured Connection
        </p>
      </div>
    </div>
  );
}

export default Login;
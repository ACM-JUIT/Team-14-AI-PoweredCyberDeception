import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logAction } from "../utils/logger";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    logAction("LOGIN_ATTEMPT", { email, password });
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      logAction("LOGIN_SUCCESS", { email });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="w-1/2 bg-blue-900 flex flex-col justify-center items-center text-white p-12">
        <div className="text-6xl mb-6">🏦</div>
        <h1 className="text-4xl font-bold mb-4">SecureBank</h1>
        <p className="text-blue-200 text-center text-lg">
          Your trusted banking partner since 1995
        </p>
        <div className="mt-12 space-y-4 w-full max-w-xs">
          <div className="flex items-center gap-3 bg-blue-800 p-4 rounded-lg">
            <span className="text-2xl">🔒</span>
            <div>
              <p className="font-medium">256-bit Encryption</p>
              <p className="text-blue-300 text-sm">Bank-grade security</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-blue-800 p-4 rounded-lg">
            <span className="text-2xl">💳</span>
            <div>
              <p className="font-medium">Instant Transfers</p>
              <p className="text-blue-300 text-sm">Send money worldwide</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-blue-800 p-4 rounded-lg">
            <span className="text-2xl">📊</span>
            <div>
              <p className="font-medium">Smart Analytics</p>
              <p className="text-blue-300 text-sm">Track your spending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-gray-50 flex flex-col justify-center items-center p-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 mb-8">
            Sign in to your account to continue
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  logAction("TYPED_EMAIL", { email: e.target.value });
                }}
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  logAction("TYPED_PASSWORD");
                }}
                placeholder="Enter your password"
              />
            </div>

            <div className="flex justify-between items-center mb-6">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <span
                onClick={() => logAction("CLICKED_FORGOT_PASSWORD")}
                className="text-blue-600 text-sm cursor-pointer hover:underline"
              >
                Forgot Password?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-700 font-medium text-lg transition-all"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account?{" "}
              <span
                onClick={() => logAction("CLICKED_REGISTER")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Register here
              </span>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-400 text-xs">
              🔒 Protected by SecureBank Security System v3.2
            </p>
            <p className="text-center text-gray-400 text-xs mt-1">
              © 2026 SecureBank. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
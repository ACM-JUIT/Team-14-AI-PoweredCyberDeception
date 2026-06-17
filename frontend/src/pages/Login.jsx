import { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="flex items-center justify-center py-20 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to PhantomShield Banking
        </h2>

        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="bg-brand text-white py-2 rounded-lg hover:opacity-90 transition mt-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
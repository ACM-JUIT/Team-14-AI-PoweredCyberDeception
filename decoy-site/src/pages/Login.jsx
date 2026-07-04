import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logAction } from '../utils/logger'
import { trackAction } from '../utils/behaviorTracker'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    logAction('LOGIN_ATTEMPT', { email, password })
    trackAction('login_attempt', { email })

    if (!email || !password) {
      setError('Please fill in both email and password.')
      return
    }
    setError('')
    setLoading(true)

    // Decoy: no real authentication — always succeeds to keep attacker engaged
    setTimeout(() => {
      logAction('LOGIN_SUCCESS', { email })
      trackAction('login_success', { email })
      setLoading(false)
      navigate('/dashboard')
    }, 1000)
  }

  return (
    <div className="flex items-center justify-center py-20 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to PhantomShield Banking
        </h2>
        {error && (
          <div className="bg-red-100 text-red-700 text-sm rounded-lg px-4 py-2 mb-4">
            {error}
          </div>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
            disabled={loading}
            className="bg-brand text-white py-2 rounded-lg hover:opacity-90 transition mt-2 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
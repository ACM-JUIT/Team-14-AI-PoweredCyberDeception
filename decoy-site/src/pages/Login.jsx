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
    setTimeout(() => {
      logAction('LOGIN_SUCCESS', { email })
      trackAction('login_success', { email })
      setLoading(false)
      navigate('/dashboard')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🏦</div>
          <h2 className="text-2xl font-bold text-gray-800">
            Login to PhantomShield Banking
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Secure Online Banking Portal
          </p>
        </div>
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
              onChange={(e) => {
                setEmail(e.target.value)
                trackAction('typed_email', { email: e.target.value })
              }}
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
              onChange={(e) => {
                setPassword(e.target.value)
                trackAction('typed_password')
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
              placeholder="••••••••"
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" className="rounded" />
              Remember me
            </label>
            <span
              onClick={() => trackAction('clicked_forgot_password')}
              className="text-brand text-sm cursor-pointer hover:underline"
            >
              Forgot Password?
            </span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-brand text-white py-2 rounded-lg hover:opacity-90 transition mt-2 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center text-gray-400 text-xs mt-6">
          🔒 256-bit SSL Secured Connection
        </p>
      </div>
    </div>
  )
}

export default Login
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
      setError('Please fill in both fields.')
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🏦</div>
          <h2 className="text-2xl font-bold text-gray-800">PhantomShield Banking</h2>
          <p className="text-gray-500 text-sm mt-1">Secure Online Banking Portal</p>
        </div>
        {error && (
          <div className="bg-red-100 text-red-700 text-sm rounded-lg px-4 py-2 mb-4">
            ⚠️ {error}
          </div>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); trackAction('typed_email', { email: e.target.value }) }}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); trackAction('typed_password') }}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" className="rounded" />
              Remember me
            </label>
            <span onClick={() => trackAction('clicked_forgot_password')} className="text-blue-600 text-sm cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-800 text-white py-3 rounded-xl hover:bg-blue-700 transition font-medium text-lg disabled:opacity-50"
          >
            {loading ? '🔄 Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <p className="text-gray-400 text-xs">🔒 256-bit SSL Secured Connection</p>
          <p className="text-gray-400 text-xs mt-1">© 2026 PhantomShield Bank. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Login
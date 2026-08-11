import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8000',
})

// Request interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    if (error.response?.status === 500) {
      error.message = 'Server error. Please try again later.'
    }
    if (!error.response) {
      error.message = 'Network error. Please check your connection.'
    }
    return Promise.reject(error)
  }
)

// ── Auth ──────────────────────────────────────────
export const loginUser = async (email, password) => {
  const response = await API.post('/auth/login', { email, password })
  return response.data
}

// ── Transactions ──────────────────────────────────
export const getTransactions = async (email) => {
  const response = await API.get(`/transactions?email=${email}`)
  return response.data
}

// ── User Profile ──────────────────────────────────
export const getUserProfile = async (email) => {
  const response = await API.get(`/users/profile?email=${email}`)
  return response.data
}

export const updateUserProfile = async (email, name, newEmail) => {
  const response = await API.put(`/users/update?email=${email}`, {
    name,
    email: newEmail,
  })
  return response.data
}

// ── Analytics  ─────────
export const getStats = async () => {
  const response = await API.get('/stats')
  return response.data
}

export const getAttackTypes = async () => {
  const response = await API.get('/stats/attack-types')
  return response.data
}

export const getTimeline = async () => {
  const response = await API.get('/stats/timeline')
  return response.data
}

export const getActiveSessions = async () => {
  const response = await API.get('/sessions')
  return response.data
}

export const getDecoyReplay = async (sessionId) => {
  const response = await API.get(`/decoy-replay/${sessionId}`)
  return response.data
}

export default API
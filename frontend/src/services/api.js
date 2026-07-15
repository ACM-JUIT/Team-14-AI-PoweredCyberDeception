import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8000',
})

// Request interceptor - attach user email to every request header
API.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user')
    if (user) {
      config.headers['X-User-Email'] = user
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - handle errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
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

// ── Dashboard ─────────────────────────────────────
export const getDashboardData = async () => {
  const response = await API.get('/dashboard')
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

export default API 


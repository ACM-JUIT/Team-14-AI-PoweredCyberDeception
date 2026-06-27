import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8000',
})

export const loginUser = async (email, password) => {
  const response = await API.post('/api/auth/login', { email, password })
  return response.data
}

export const getDashboardData = async () => {
  const response = await API.get('/api/dashboard')
  return response.data
}

export default API
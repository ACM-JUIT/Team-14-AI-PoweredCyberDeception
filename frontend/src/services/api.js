import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8000',
})

export const loginUser = async (email, password) => {
  const response = await API.post('/auth/login', { email, password })
  return response.data
}

export const getDashboardData = async () => {
  const response = await API.get('/dashboard')
  return response.data
}

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

export const getTransactions = async () => {
  const response = await API.get('/transactions')
  return response.data
}

export default API
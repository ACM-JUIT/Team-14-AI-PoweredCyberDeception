import { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem('user') || null
  )

  const login = (email) => {
    localStorage.setItem('user', email)
    setUser(email)
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const isAuthenticated = () => {
    return user !== null
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export default AuthContext
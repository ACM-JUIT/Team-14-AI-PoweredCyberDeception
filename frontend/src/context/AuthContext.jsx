import { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(savedUser)
    }
    setLoading(false)
  }, [])

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
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export default AuthContext
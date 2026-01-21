import { useState, createContext, useContext, useEffect } from 'react'
import { authApi } from '../services/api'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérifier si un utilisateur est stocké au chargement
    const storedUser = authApi.getStoredUser()
    if (storedUser) {
      setUser(storedUser)
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await authApi.login(email, password)
      const userData = {
        id: response.id,
        email: response.email,
        prenom: response.prenom,
        nom: response.nom,
        role: response.role
      }
      setUser(userData)
      return { success: true, user: userData }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (userData) => {
    try {
      const response = await authApi.register(userData)
      const user = {
        id: response.id,
        email: response.email,
        prenom: response.prenom,
        nom: response.nom,
        role: response.role
      }
      setUser(user)
      return { success: true, user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    authApi.logout()
    setUser(null)
  }

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

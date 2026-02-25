import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Au montage, vérifier si un token existe et récupérer l'utilisateur
  useEffect(() => {
    const initAuth = async () => {
      const token = api.getToken();
      if (token) {
        try {
          const userData = await api.getMe();
          setUser(userData);
        } catch {
          api.removeToken();
          setUser(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await api.login(email, password);
    setUser({
      id: data.id,
      email: data.email,
      prenom: data.prenom,
      nom: data.nom,
      role: data.role,
    });
    return data;
  }, []);

  const register = useCallback(async (userData) => {
    const data = await api.register(userData);
    setUser({
      id: data.id,
      email: data.email,
      prenom: data.prenom,
      nom: data.nom,
      role: data.role,
    });
    return data;
  }, []);

  const logout = useCallback(() => {
    api.logout();
    setUser(null);
  }, []);

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

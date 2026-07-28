import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {
      email: 'admin@retailai.com',
      full_name: 'Eleanor Vance (Admin)',
      role: 'Admin'
    };
  });
  const [token, setToken] = useState(() => localStorage.getItem('access_token'));
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await authAPI.login(email, password);
      const { access_token, user: loggedUser } = res.data;
      setToken(access_token);
      setUser(loggedUser);
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(loggedUser));
      return { success: true };
    } catch (err) {
      console.warn("API login failed, using fallback demo session", err);
      // Fallback for seamless demo testing
      const demoUser = { email, full_name: 'Marcus Sterling', role: 'Store Manager' };
      setUser(demoUser);
      setToken('demo_jwt_token');
      localStorage.setItem('user', JSON.stringify(demoUser));
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const switchRole = (newRole) => {
    const roleNames = {
      'Admin': 'Eleanor Vance (Admin)',
      'Store Manager': 'Marcus Sterling (Store Manager)',
      'Retail Analyst': 'Sophia Chen (Retail Analyst)',
      'Marketing Manager': 'David Rossi (Marketing Manager)'
    };
    const updatedUser = {
      ...user,
      role: newRole,
      full_name: roleNames[newRole] || `${newRole} User`
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, switchRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

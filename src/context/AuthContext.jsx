import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

// Create Authentication Context
const AuthContext = createContext(null);

/**
 * Custom hook to use authentication context
 * @returns {Object} Authentication context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Authentication Provider Component
 * Wraps the app and provides authentication state and methods
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Check if user is authenticated by fetching current user
   */
  const checkAuth = async () => {
    try {
      const userData = await api.getCurrentUser();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.log('Not authenticated');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login user
   * @param {string} email - User's email
   * @param {string} password - User's password
   */
  const login = async (email, password) => {
    const response = await api.login(email, password);
    await checkAuth(); // Refresh user data
    return response;
  };

  /**
   * Register new user
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {string} fullName - User's full name
   */
  const register = async (email, password, fullName) => {
    const response = await api.register(email, password, fullName);
    // Automatically login after registration
    await login(email, password);
    return response;
  };

  /**
   * Logout user
   */
  const logout = async () => {
    await api.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

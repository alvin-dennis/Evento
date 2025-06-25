import React, { createContext, useContext, useState, useEffect } from 'react';
import { dummyUsers } from '../data/dummyUsers';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    const userId = localStorage.getItem('user-id');
    
    if (token && userId) {
      const foundUser = dummyUsers.find(u => u.id === parseInt(userId));
      if (foundUser) {
        setUser(foundUser);
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const foundUser = dummyUsers.find(
      u => u.email === email && u.password === password
    );
    
    if (foundUser) {
      const fakeToken = 'my-fake-jwt-' + foundUser.id;
      localStorage.setItem('auth-token', fakeToken);
      localStorage.setItem('user-id', foundUser.id.toString());
      setUser(foundUser);
      return { success: true };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = (name, email, password) => {
    const existingUser = dummyUsers.find(u => u.email === email);
    if (existingUser) {
      return { success: false, error: 'Email already exists' };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password
    };
    
    dummyUsers.push(newUser);
    const fakeToken = 'my-fake-jwt-' + newUser.id;
    localStorage.setItem('auth-token', fakeToken);
    localStorage.setItem('user-id', newUser.id.toString());
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-id');
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
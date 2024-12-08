import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, name: string) => void;
  logout: () => void;
  resetPassword: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // Simulate login - replace with actual authentication
    setUser({
      id: '1',
      email,
      name: 'Demo User',
    });
  };

  const signup = (email: string, password: string, name: string) => {
    // Simulate signup - replace with actual authentication
    setUser({
      id: '1',
      email,
      name,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const resetPassword = (email: string) => {
    // Simulate password reset - replace with actual implementation
    console.log('Password reset email sent to:', email);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
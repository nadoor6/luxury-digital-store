'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: boolean;
  provider: 'email' | 'google' | 'phone';
}

const STORAGE_KEYS = {
  USERS: 'luxury-store-users',
  CURRENT_USER: 'luxury-store-current-user'
};

export class AuthStorage {
  static getUsers(): User[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USERS);
      if (stored) {
        const users = JSON.parse(stored);
        return users.map((user: any) => ({
          ...user,
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt)
        }));
      }
      
      // No default users in production
      return [];
    } catch (error) {
      console.error('Error loading users:', error);
      return [];
    }
  }

  static saveUsers(users: User[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  static createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    const users = this.getUsers();
    const newUser: User = {
      ...userData,
      id: 'user-' + Date.now() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const updatedUsers = [...users, newUser];
    this.saveUsers(updatedUsers);
    return newUser;
  }

  static findUserByEmail(email: string): User | null {
    const users = this.getUsers();
    return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
  }

  static findUserByPhone(phone: string): User | null {
    const users = this.getUsers();
    return users.find(user => user.phone === phone) || null;
  }

  static getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error loading current user:', error);
      return null;
    }
  }

  static setCurrentUser(user: User | null): void {
    if (typeof window === 'undefined') return;
    
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }

  static isAdmin(user: User | null): boolean {
    return user?.role === 'admin';
  }

  // Method to create first admin user (call this manually if needed)
  static createFirstAdmin(email: string, name: string): User {
    const adminUser: User = {
      id: 'admin-' + Date.now(),
      email: email,
      name: name,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      emailVerified: true,
      provider: 'email'
    };

    const users = this.getUsers();
    const updatedUsers = [...users, adminUser];
    this.saveUsers(updatedUsers);
    return adminUser;
  }
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  loginWithPhone: (phone: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, rememberMe?: boolean) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = AuthStorage.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<boolean> => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = AuthStorage.findUserByEmail(email);
      
      if (foundUser) {
        // In production, you would verify against hashed passwords
        // For now, we'll check if any user exists with this email
        setUser(foundUser);
        AuthStorage.setCurrentUser(foundUser);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const googleUser: User = {
        id: 'google-' + Date.now() + Math.random().toString(36).substr(2, 9),
        email: 'user@gmail.com',
        name: 'Google User',
        role: 'user',
        avatar: '/images/avatar-google.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        emailVerified: true,
        provider: 'google'
      };
      
      setUser(googleUser);
      AuthStorage.setCurrentUser(googleUser);
      return true;
    } catch (error) {
      console.error('Google login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithPhone = async (phone: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const phoneUser: User = {
        id: 'phone-' + Date.now() + Math.random().toString(36).substr(2, 9),
        email: `${phone}@phone.com`,
        phone: phone,
        name: 'Phone User',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
        emailVerified: false,
        provider: 'phone'
      };
      
      setUser(phoneUser);
      AuthStorage.setCurrentUser(phoneUser);
      return true;
    } catch (error) {
      console.error('Phone login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, rememberMe: boolean = false): Promise<boolean> => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (AuthStorage.findUserByEmail(email)) {
        return false;
      }
      
      // First user becomes admin
      const users = AuthStorage.getUsers();
      const isFirstUser = users.length === 0;
      
      const newUser = AuthStorage.createUser({
        email,
        name,
        role: isFirstUser ? 'admin' : 'user',
        emailVerified: false,
        provider: 'email'
      });
      
      setUser(newUser);
      AuthStorage.setCurrentUser(newUser);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    AuthStorage.setCurrentUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    loginWithGoogle,
    loginWithPhone,
    register,
    logout,
    isLoading,
    isAdmin: AuthStorage.isAdmin(user)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
'use client';

import { v4 as uuidv4 } from 'uuid';

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

export interface AuthSession {
  user: User;
  expires: Date;
  rememberMe: boolean;
}

const STORAGE_KEYS = {
  USERS: 'luxury-store-users',
  SESSIONS: 'luxury-store-sessions',
  CURRENT_USER: 'luxury-store-current-user'
};

export class AuthStorage {
  // User Management
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
      
      // Create default admin user
      const defaultUsers = this.createDefaultUsers();
      this.saveUsers(defaultUsers);
      return defaultUsers;
    } catch (error) {
      console.error('Error loading users:', error);
      return this.createDefaultUsers();
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
      id: uuidv4(),
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

  // Session Management
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

  // Default users
  private static createDefaultUsers(): User[] {
    const adminUser: User = {
      id: 'admin-001',
      email: 'admin@luxurystore.nd',
      name: 'Store Administrator',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      emailVerified: true,
      provider: 'email'
    };

    return [adminUser];
  }
}
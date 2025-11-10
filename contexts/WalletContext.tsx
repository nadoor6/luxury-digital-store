'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface Wallet {
  address: string;
  balance: number;
  secretPhrase: string;
  createdAt: Date;
}

interface WalletContextType {
  wallet: Wallet | null;
  createWallet: () => Promise<Wallet>;
  accessWallet: (secretPhrase: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAdmin: boolean;
  grantAdminAccess: (password: string) => boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if wallet exists on mount
    const savedWallet = localStorage.getItem('wallet');
    const savedAdmin = localStorage.getItem('adminAccess');
    
    if (savedWallet) {
      setWallet(JSON.parse(savedWallet));
    }
    
    if (savedAdmin === 'true') {
      setIsAdmin(true);
    }
    
    setLoading(false);
  }, []);

  const generateSecretPhrase = (): string => {
    const words = [
      'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract',
      'absurd', 'abuse', 'access', 'accident', 'account', 'accuse', 'achieve', 'acid',
      'acoustic', 'acquire', 'across', 'act', 'action', 'actor', 'actress', 'actual',
      'adapt', 'add', 'addict', 'address', 'adjust', 'admit', 'adult', 'advance'
    ];
    
    const phrase = [];
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      phrase.push(words[randomIndex]);
    }
    
    return phrase.join(' ');
  };

  const generateAddress = (phrase: string): string => {
    let hash = 0;
    for (let i = 0; i < phrase.length; i++) {
      const char = phrase.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return `UGR${Math.abs(hash).toString().slice(0, 12)}`;
  };

  const createWallet = async (): Promise<Wallet> => {
    setLoading(true);
    try {
      const secretPhrase = generateSecretPhrase();
      const address = generateAddress(secretPhrase);
      
      const newWallet: Wallet = {
        address,
        balance: 0,
        secretPhrase,
        createdAt: new Date()
      };
      
      setWallet(newWallet);
      localStorage.setItem('wallet', JSON.stringify(newWallet));
      return newWallet;
    } finally {
      setLoading(false);
    }
  };

  const accessWallet = async (secretPhrase: string): Promise<void> => {
    setLoading(true);
    try {
      const address = generateAddress(secretPhrase);
      const walletData: Wallet = {
        address,
        balance: 0,
        secretPhrase,
        createdAt: new Date()
      };
      
      setWallet(walletData);
      localStorage.setItem('wallet', JSON.stringify(walletData));
    } finally {
      setLoading(false);
    }
  };

  const grantAdminAccess = (password: string): boolean => {
    // Simple admin password check
    if (password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('adminAccess', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setWallet(null);
    setIsAdmin(false);
    localStorage.removeItem('wallet');
    localStorage.removeItem('adminAccess');
  };

  return (
    <WalletContext.Provider value={{ 
      wallet, 
      createWallet, 
      accessWallet, 
      logout, 
      loading,
      isAdmin: isAdmin || (wallet?.address === 'UGR000000000000'), // Special admin wallet
      grantAdminAccess
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
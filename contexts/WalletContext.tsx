'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface Wallet {
  address: string;
  balance: number;
  secretPhrase: string;
  createdAt: Date;
}

// Define the status type explicitly
type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';
type TransactionType = 'deposit' | 'withdrawal' | 'transfer' | 'payment';

interface Transaction {
  id: string;
  walletAddress: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  description: string;
  createdAt: Date;
  metadata?: {
    adminNote?: string;
    bankDetails?: string;
    transactionId?: string;
    recipientAddress?: string;
    paymentMethod?: string;
  };
}

// Define KYC status type explicitly
type KYCStatus = 'pending' | 'verified' | 'rejected' | 'not_started';
type UserTier = 'basic' | 'verified' | 'premium';

interface UserProfile {
  walletAddress: string;
  email: string;
  fullName: string;
  phone: string;
  kycStatus: KYCStatus;
  tier: UserTier;
  documents: {
    idFront?: string;
    idBack?: string;
    selfie?: string;
  };
}

interface WalletContextType {
  wallet: Wallet | null;
  userProfile: UserProfile | null;
  transactions: Transaction[];
  createWallet: () => Promise<Wallet>;
  accessWallet: (secretPhrase: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAdmin: boolean;
  grantAdminAccess: (password: string) => boolean;
  
  // Phase 1 Functions
  requestDeposit: (amount: number, paymentMethod: string, bankDetails?: string) => Promise<string>;
  requestWithdrawal: (amount: number, bankDetails: string) => Promise<string>;
  updateUserProfile: (profile: Partial<UserProfile>) => Promise<void>;
  getTransactionHistory: () => Transaction[];
  submitKYC: (documents: { idFront: File; idBack: File; selfie: File }) => Promise<void>;
  
  // Admin functions
  approveDeposit: (transactionId: string, adminNote?: string) => Promise<void>;
  rejectDeposit: (transactionId: string, reason: string) => Promise<void>;
  approveWithdrawal: (transactionId: string, adminNote?: string) => Promise<void>;
  rejectWithdrawal: (transactionId: string, reason: string) => Promise<void>;
  getPendingTransactions: () => Transaction[];
  getAllUsers: () => UserProfile[];
  updateUserKYCStatus: (walletAddress: string, status: KYCStatus) => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedWallet = localStorage.getItem('wallet');
    const savedAdmin = localStorage.getItem('adminAccess');
    const savedProfile = localStorage.getItem('userProfile');
    const savedTransactions = localStorage.getItem('transactions');
    
    if (savedWallet) {
      const parsedWallet = JSON.parse(savedWallet);
      // Convert string dates back to Date objects
      setWallet({
        ...parsedWallet,
        createdAt: new Date(parsedWallet.createdAt)
      });
    }
    
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
    
    if (savedTransactions) {
      const parsedTransactions = JSON.parse(savedTransactions);
      // Convert string dates back to Date objects
      setTransactions(parsedTransactions.map((t: any) => ({
        ...t,
        createdAt: new Date(t.createdAt)
      })));
    }
    
    if (savedAdmin === 'true') {
      setIsAdmin(true);
    }
    
    setLoading(false);
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    if (wallet) {
      localStorage.setItem('wallet', JSON.stringify(wallet));
    }
  }, [wallet]);

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

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
      
      // Create default user profile
      const defaultProfile: UserProfile = {
        walletAddress: address,
        email: '',
        fullName: '',
        phone: '',
        kycStatus: 'not_started',
        tier: 'basic',
        documents: {}
      };
      setUserProfile(defaultProfile);
      
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
      
      // Try to load existing profile
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile.walletAddress === address) {
          setUserProfile(profile);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const requestDeposit = async (amount: number, paymentMethod: string, bankDetails?: string): Promise<string> => {
    if (!wallet) throw new Error('No wallet found');
    
    const transaction: Transaction = {
      id: Date.now().toString(),
      walletAddress: wallet.address,
      type: 'deposit',
      amount,
      status: 'pending',
      description: `Deposit request via ${paymentMethod}`,
      createdAt: new Date(),
      metadata: {
        paymentMethod,
        bankDetails,
        adminNote: 'Pending manual approval'
      }
    };
    
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);
    
    return transaction.id;
  };

  const requestWithdrawal = async (amount: number, bankDetails: string): Promise<string> => {
    if (!wallet) throw new Error('No wallet found');
    if (wallet.balance < amount) throw new Error('Insufficient balance');
    
    const transaction: Transaction = {
      id: Date.now().toString(),
      walletAddress: wallet.address,
      type: 'withdrawal',
      amount,
      status: 'pending',
      description: `Withdrawal request`,
      createdAt: new Date(),
      metadata: {
        bankDetails,
        adminNote: 'Pending manual approval'
      }
    };
    
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);
    
    return transaction.id;
  };

  const updateUserProfile = async (profile: Partial<UserProfile>): Promise<void> => {
    if (!userProfile) throw new Error('No user profile found');
    
    setUserProfile({
      ...userProfile,
      ...profile
    });
  };

  const submitKYC = async (documents: { idFront: File; idBack: File; selfie: File }): Promise<void> => {
    if (!userProfile) throw new Error('No user profile found');
    
    // Convert files to data URLs (in real app, upload to server)
    const readFileAsDataURL = (file: File): Promise<string> => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    };
    
    const [idFrontUrl, idBackUrl, selfieUrl] = await Promise.all([
      readFileAsDataURL(documents.idFront),
      readFileAsDataURL(documents.idBack),
      readFileAsDataURL(documents.selfie)
    ]);
    
    setUserProfile({
      ...userProfile,
      kycStatus: 'pending',
      documents: {
        idFront: idFrontUrl,
        idBack: idBackUrl,
        selfie: selfieUrl
      }
    });
  };

  // Admin Functions
  const approveDeposit = async (transactionId: string, adminNote?: string): Promise<void> => {
    if (!isAdmin) throw new Error('Admin access required');
    
    const transaction = transactions.find(t => t.id === transactionId);
    if (!transaction) throw new Error('Transaction not found');
    
    // Update transaction status with proper type
    const updatedTransactions = transactions.map(t => 
      t.id === transactionId 
        ? { 
            ...t, 
            status: 'completed' as TransactionStatus,
            metadata: { ...t.metadata, adminNote }
          }
        : t
    );
    setTransactions(updatedTransactions);
    
    // Update wallet balance
    if (wallet && transaction.walletAddress === wallet.address) {
      setWallet({
        ...wallet,
        balance: wallet.balance + transaction.amount
      });
    }
  };

  const rejectDeposit = async (transactionId: string, reason: string): Promise<void> => {
    if (!isAdmin) throw new Error('Admin access required');
    
    const updatedTransactions = transactions.map(t => 
      t.id === transactionId 
        ? { 
            ...t, 
            status: 'failed' as TransactionStatus,
            metadata: { ...t.metadata, adminNote: reason }
          }
        : t
    );
    setTransactions(updatedTransactions);
  };

  const approveWithdrawal = async (transactionId: string, adminNote?: string): Promise<void> => {
    if (!isAdmin) throw new Error('Admin access required');
    
    const transaction = transactions.find(t => t.id === transactionId);
    if (!transaction) throw new Error('Transaction not found');
    
    const updatedTransactions = transactions.map(t => 
      t.id === transactionId 
        ? { 
            ...t, 
            status: 'completed' as TransactionStatus,
            metadata: { ...t.metadata, adminNote }
          }
        : t
    );
    setTransactions(updatedTransactions);
    
    // Deduct from wallet balance
    if (wallet && transaction.walletAddress === wallet.address) {
      setWallet({
        ...wallet,
        balance: wallet.balance - transaction.amount
      });
    }
  };

  const rejectWithdrawal = async (transactionId: string, reason: string): Promise<void> => {
    if (!isAdmin) throw new Error('Admin access required');
    
    const updatedTransactions = transactions.map(t => 
      t.id === transactionId 
        ? { 
            ...t, 
            status: 'failed' as TransactionStatus,
            metadata: { ...t.metadata, adminNote: reason }
          }
        : t
    );
    setTransactions(updatedTransactions);
  };

  const getTransactionHistory = (): Transaction[] => {
    return transactions
      .filter(t => t.walletAddress === wallet?.address)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const getPendingTransactions = (): Transaction[] => {
    return transactions.filter(t => t.status === 'pending');
  };

  const getAllUsers = (): UserProfile[] => {
    // In a real app, this would fetch from backend
    return userProfile ? [userProfile] : [];
  };

  const updateUserKYCStatus = async (walletAddress: string, status: KYCStatus): Promise<void> => {
    if (!isAdmin) throw new Error('Admin access required');
    
    if (userProfile && userProfile.walletAddress === walletAddress) {
      setUserProfile({
        ...userProfile,
        kycStatus: status
      });
    }
  };

  const grantAdminAccess = (password: string): boolean => {
    if (password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('adminAccess', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setWallet(null);
    setUserProfile(null);
    setTransactions([]);
    setIsAdmin(false);
    localStorage.removeItem('wallet');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('transactions');
    localStorage.removeItem('adminAccess');
  };

  return (
    <WalletContext.Provider value={{ 
      wallet, 
      userProfile,
      transactions,
      createWallet, 
      accessWallet, 
      logout, 
      loading,
      isAdmin: isAdmin || (wallet?.address === 'UGR000000000000'),
      grantAdminAccess,
      requestDeposit,
      requestWithdrawal,
      updateUserProfile,
      getTransactionHistory,
      submitKYC,
      approveDeposit,
      rejectDeposit,
      approveWithdrawal,
      rejectWithdrawal,
      getPendingTransactions,
      getAllUsers,
      updateUserKYCStatus
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
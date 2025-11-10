// contexts/WalletContext.tsx - ENHANCED VERSION
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface Wallet {
  address: string;
  balance: number;
  secretPhrase: string;
  createdAt: Date;
}

type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';
type TransactionType = 'deposit' | 'withdrawal' | 'transfer' | 'payment' | 'manual_add' | 'manual_deduct';

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
    proofImage?: string;
    telegramContact?: string;
    adminActionBy?: string;
  };
}

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
  telegram?: string;
  lastActive?: Date;
}

interface DepositRequest {
  id: string;
  walletAddress: string;
  amount: number;
  paymentMethod: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  adminNote?: string;
  proofImage?: string;
  telegramContact?: string;
}

interface WithdrawalRequest {
  id: string;
  walletAddress: string;
  amount: number;
  bankDetails: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  createdAt: Date;
  adminNote?: string;
}

interface WalletContextType {
  // User Functions
  wallet: Wallet | null;
  userProfile: UserProfile | null;
  transactions: Transaction[];
  createWallet: () => Promise<Wallet>;
  accessWallet: (secretPhrase: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  
  // Deposit System
  requestDeposit: (amount: number, paymentMethod: string, telegramContact: string, proofImage?: File) => Promise<string>;
  getPendingDeposits: () => DepositRequest[];
  getUserDeposits: () => DepositRequest[];
  
  // Withdrawal System
  requestWithdrawal: (amount: number, bankDetails: string) => Promise<string>;
  getPendingWithdrawals: () => WithdrawalRequest[];
  getUserWithdrawals: () => WithdrawalRequest[];
  
  // User Management
  updateUserProfile: (profile: Partial<UserProfile>) => Promise<void>;
  getTransactionHistory: () => Transaction[];
  submitKYC: (documents: { idFront: File; idBack: File; selfie: File }) => Promise<void>;
  
  // ADMIN FUNCTIONS
  isAdmin: boolean;
  grantAdminAccess: (password: string) => boolean;
  
  // Manual Fund Management
  manualAddFunds: (walletAddress: string, amount: number, note: string) => Promise<void>;
  manualDeductFunds: (walletAddress: string, amount: number, note: string) => Promise<void>;
  manualTransfer: (fromAddress: string, toAddress: string, amount: number, note: string) => Promise<void>;
  
  // Deposit Request Management
  approveDeposit: (depositId: string, adminNote?: string) => Promise<void>;
  rejectDeposit: (depositId: string, reason: string) => Promise<void>;
  getDepositRequests: (status?: 'pending' | 'approved' | 'rejected') => DepositRequest[];
  
  // Withdrawal Request Management
  approveWithdrawal: (withdrawalId: string, adminNote?: string) => Promise<void>;
  rejectWithdrawal: (withdrawalId: string, reason: string) => Promise<void>;
  processWithdrawal: (withdrawalId: string, transactionProof?: string) => Promise<void>;
  getWithdrawalRequests: (status?: 'pending' | 'approved' | 'rejected' | 'processing') => WithdrawalRequest[];
  
  // User Management (Admin)
  getAllUsers: () => UserProfile[];
  updateUserKYCStatus: (walletAddress: string, status: KYCStatus) => Promise<void>;
  updateUserTier: (walletAddress: string, tier: UserTier) => Promise<void>;
  
  // System Management
  getSystemStats: () => {
    totalUsers: number;
    totalBalance: number;
    pendingDeposits: number;
    pendingWithdrawals: number;
    totalDeposits: number;
    totalWithdrawals: number;
  };
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [depositRequests, setDepositRequests] = useState<DepositRequest[]>([]);
  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load all data from localStorage
  useEffect(() => {
    const loadData = () => {
      try {
        const savedWallet = localStorage.getItem('wallet');
        const savedAdmin = localStorage.getItem('adminAccess');
        const savedProfile = localStorage.getItem('userProfile');
        const savedTransactions = localStorage.getItem('transactions');
        const savedDeposits = localStorage.getItem('depositRequests');
        const savedWithdrawals = localStorage.getItem('withdrawalRequests');
        const savedUsers = localStorage.getItem('users');
        
        if (savedWallet) {
          const parsedWallet = JSON.parse(savedWallet);
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
          setTransactions(parsedTransactions.map((t: any) => ({
            ...t,
            createdAt: new Date(t.createdAt)
          })));
        }
        
        if (savedDeposits) {
          const parsedDeposits = JSON.parse(savedDeposits);
          setDepositRequests(parsedDeposits.map((d: any) => ({
            ...d,
            createdAt: new Date(d.createdAt)
          })));
        }
        
        if (savedWithdrawals) {
          const parsedWithdrawals = JSON.parse(savedWithdrawals);
          setWithdrawalRequests(parsedWithdrawals.map((w: any) => ({
            ...w,
            createdAt: new Date(w.createdAt)
          })));
        }
        
        if (savedUsers) {
          setUsers(JSON.parse(savedUsers));
        }
        
        if (savedAdmin === 'true') {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Save data to localStorage when changes occur
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

  useEffect(() => {
    localStorage.setItem('depositRequests', JSON.stringify(depositRequests));
  }, [depositRequests]);

  useEffect(() => {
    localStorage.setItem('withdrawalRequests', JSON.stringify(withdrawalRequests));
  }, [withdrawalRequests]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Wallet Creation & Access (Keep your existing functions)
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
        documents: {},
        lastActive: new Date()
      };
      setUserProfile(defaultProfile);
      
      // Add to users list
      setUsers(prev => [...prev.filter(u => u.walletAddress !== address), defaultProfile]);
      
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
      
      // Try to load existing profile and update last active
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile.walletAddress === address) {
          const updatedProfile = { ...profile, lastActive: new Date() };
          setUserProfile(updatedProfile);
          setUsers(prev => prev.map(u => 
            u.walletAddress === address ? updatedProfile : u
          ));
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // DEPOSIT SYSTEM - Manual Contact Based
  const requestDeposit = async (
    amount: number, 
    paymentMethod: string, 
    telegramContact: string, 
    proofImage?: File
  ): Promise<string> => {
    if (!wallet) throw new Error('No wallet found');
    
    const depositId = Date.now().toString();
    let proofImageUrl = '';
    
    if (proofImage) {
      // Convert to data URL for storage
      proofImageUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(proofImage);
      });
    }
    
    const depositRequest: DepositRequest = {
      id: depositId,
      walletAddress: wallet.address,
      amount,
      paymentMethod,
      status: 'pending',
      createdAt: new Date(),
      telegramContact,
      proofImage: proofImageUrl
    };
    
    setDepositRequests(prev => [...prev, depositRequest]);
    
    return depositId;
  };

  const getPendingDeposits = (): DepositRequest[] => {
    return depositRequests.filter(d => d.status === 'pending');
  };

  const getUserDeposits = (): DepositRequest[] => {
    if (!wallet) return [];
    return depositRequests.filter(d => d.walletAddress === wallet.address)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  // WITHDRAWAL SYSTEM
  const requestWithdrawal = async (amount: number, bankDetails: string): Promise<string> => {
    if (!wallet) throw new Error('No wallet found');
    if (wallet.balance < amount) throw new Error('Insufficient balance');
    
    const withdrawalId = Date.now().toString();
    
    const withdrawalRequest: WithdrawalRequest = {
      id: withdrawalId,
      walletAddress: wallet.address,
      amount,
      bankDetails,
      status: 'pending',
      createdAt: new Date()
    };
    
    setWithdrawalRequests(prev => [...prev, withdrawalRequest]);
    
    return withdrawalId;
  };

  const getPendingWithdrawals = (): WithdrawalRequest[] => {
    return withdrawalRequests.filter(w => w.status === 'pending');
  };

  const getUserWithdrawals = (): WithdrawalRequest[] => {
    if (!wallet) return [];
    return withdrawalRequests.filter(w => w.walletAddress === wallet.address)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  // MANUAL FUND MANAGEMENT (ADMIN ONLY)
  const manualAddFunds = async (walletAddress: string, amount: number, note: string): Promise<void> => {
    if (!isAdmin) throw new Error('Admin access required');
    
    // Update user balance
    setUsers(prev => prev.map(user => 
      user.walletAddress === walletAddress 
        ? { ...user } // Balance update handled in transaction
        : user
    ));
    
    // Update wallet if it's the current user
    if (wallet && wallet.address === walletAddress) {
      setWallet(prev => prev ? { ...prev, balance: prev.balance + amount } : null);
    }
    
    // Create transaction record
    const transaction: Transaction = {
      id: Date.now().toString(),
      walletAddress,
      type: 'manual_add',
      amount,
      status: 'completed',
      description: `Manual funds addition: ${note}`,
      createdAt: new Date(),
      metadata: {
        adminNote: note,
        adminActionBy: 'admin'
      }
    };
    
    setTransactions(prev => [...prev, transaction]);
  };

  const manualDeductFunds = async (walletAddress: string, amount: number, note: string): Promise<void> => {
    if (!isAdmin) throw new Error('Admin access required');
    
    // Update wallet if it's the current user
    if (wallet && wallet.address === walletAddress) {
      if (wallet.balance < amount) throw new Error('Insufficient balance');
      setWallet(prev => prev ? { ...prev, balance: prev.balance - amount } : null);
    }
    
    // Create transaction record
    const transaction: Transaction = {
      id: Date.now().toString(),
      walletAddress,
      type: 'manual_deduct',
      amount,
      status: 'completed',
      description: `Manual funds deduction: ${note}`,
      createdAt: new Date(),
      metadata: {
        adminNote: note,
        adminActionBy: 'admin'
      }
    };
    
    setTransactions(prev => [...prev, transaction]);
  };

  const manualTransfer = async (fromAddress: string, toAddress: string, amount: number, note: string): Promise<void> => {
    if (!isAdmin) throw new Error('Admin access required');
    
    // Deduct from sender
    await manualDeductFunds(fromAddress, amount, `Transfer to ${toAddress}: ${note}`);
    
    // Add to receiver
    await manualAddFunds(toAddress, amount, `Transfer from ${fromAddress}: ${note}`);
  };

  // DEPOSIT REQUEST MANAGEMENT (ADMIN)
  const approveDeposit = async (depositId: string, adminNote?: string): Promise<void> => {
    if (!isAdmin) throw new Error('Admin access required');
    
    const deposit = depositRequests.find(d => d.id === depositId);
    if (!deposit) throw new Error('Deposit request not found');
    
    // Update deposit status
    setDepositRequests(prev => prev.map(d => 
      d.id === depositId 
        ? { ...d, status: 'approved', adminNote }
        : d
    ));
    
    // Add funds to user wallet
    await manualAddFunds(deposit.walletAddress, deposit.amount, `Deposit approved: ${deposit.paymentMethod}`);
    
    // Create transaction record
    const transaction: Transaction = {
      id: Date.now().toString(),
      walletAddress: deposit.walletAddress,
      type: 'deposit',
      amount: deposit.amount,
      status: 'completed',
      description: `Deposit via ${deposit.paymentMethod}`,
      createdAt: new Date(),
      metadata: {
        adminNote,
        paymentMethod: deposit.paymentMethod,
        adminActionBy: 'admin'
      }
    };
    
    setTransactions(prev => [...prev, transaction]);
  };

  const rejectDeposit = async (depositId: string, reason: string): Promise<void> => {
    if (!isAdmin) throw new Error('Admin access required');
    
    setDepositRequests(prev => prev.map(d => 
      d.id === depositId 
        ? { ...d, status: 'rejected', adminNote: reason }
        : d
    ));
  };

  const getDepositRequests = (status?: 'pending' | 'approved' | 'rejected'): DepositRequest[] => {
    if (!isAdmin) return [];
    if (status) {
      return depositRequests.filter(d => d.status === status)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return depositRequests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  // WITHDRAWAL REQUEST MANAGEMENT (ADMIN)
  const approveWithdrawal = async (withdrawalId: string, adminNote?: string): Promise<void> => {
    if (!isAdmin) throw new Error('Admin access required');
    
    const withdrawal = withdrawalRequests.find(w => w.id === withdrawalId);
    if (!withdrawal) throw new Error('Withdrawal request not found');
    
    // Update withdrawal status
    setWithdrawalRequests(prev => prev.map(w => 
      w.id === withdrawalId 
        ? { ...w, status: 'approved', adminNote }
        : w
    ));
    
    // Deduct funds from user wallet
    await manualDeductFunds(withdrawal.walletAddress, withdrawal.amount, `Withdrawal approved`);
    
    // Create transaction record
    const transaction: Transaction = {
      id: Date.now().toString(),
      walletAddress: withdrawal.walletAddress,
      type: 'withdrawal',
      amount: withdrawal.amount,
      status: 'completed',
      description: `Withdrawal processed`,
      createdAt: new Date(),
      metadata: {
        adminNote,
        bankDetails: withdrawal.bankDetails,
        adminActionBy: 'admin'
      }
    };
    
    setTransactions(prev => [...prev, transaction]);
  };

  const rejectWithdrawal = async (withdrawalId: string, reason: string): Promise<void> => {
    if (!isAdmin) throw new Error('Admin access required');
    
    setWithdrawalRequests(prev => prev.map(w => 
      w.id === withdrawalId 
        ? { ...w, status: 'rejected', adminNote: reason }
        : w
    ));
  };

  const processWithdrawal = async (withdrawalId: string, transactionProof?: string): Promise<void> => {
    if (!isAdmin) throw new Error('Admin access required');
    
    setWithdrawalRequests(prev => prev.map(w => 
      w.id === withdrawalId 
        ? { ...w, status: 'processing', adminNote: transactionProof ? `Transaction proof: ${transactionProof}` : 'Processing' }
        : w
    ));
  };

  const getWithdrawalRequests = (status?: 'pending' | 'approved' | 'rejected' | 'processing'): WithdrawalRequest[] => {
    if (!isAdmin) return [];
    if (status) {
      return withdrawalRequests.filter(w => w.status === status)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return withdrawalRequests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  // USER MANAGEMENT (ADMIN)
  const getAllUsers = (): UserProfile[] => {
    if (!isAdmin) return [];
    return users.sort((a, b) => 
      new Date(b.lastActive || 0).getTime() - new Date(a.lastActive || 0).getTime()
    );
  };

  const updateUserKYCStatus = async (walletAddress: string, status: KYCStatus): Promise<void> => {
    if (!isAdmin) throw new Error('Admin access required');
    
    setUsers(prev => prev.map(user => 
      user.walletAddress === walletAddress 
        ? { ...user, kycStatus: status }
        : user
    ));
    
    if (userProfile && userProfile.walletAddress === walletAddress) {
      setUserProfile(prev => prev ? { ...prev, kycStatus: status } : null);
    }
  };

  const updateUserTier = async (walletAddress: string, tier: UserTier): Promise<void> => {
    if (!isAdmin) throw new Error('Admin access required');
    
    setUsers(prev => prev.map(user => 
      user.walletAddress === walletAddress 
        ? { ...user, tier }
        : user
    ));
    
    if (userProfile && userProfile.walletAddress === walletAddress) {
      setUserProfile(prev => prev ? { ...prev, tier } : null);
    }
  };

  // SYSTEM STATS (ADMIN)
  const getSystemStats = () => {
    if (!isAdmin) throw new Error('Admin access required');
    
    const totalUsers = users.length;
    const totalBalance = users.reduce((sum, user) => {
      const userWallet = wallet && wallet.address === user.walletAddress ? wallet : null;
      // In real app, you'd have balance in user object
      return sum + (userWallet ? userWallet.balance : 0);
    }, 0);
    const pendingDeposits = depositRequests.filter(d => d.status === 'pending').length;
    const pendingWithdrawals = withdrawalRequests.filter(w => w.status === 'pending').length;
    const totalDeposits = depositRequests.filter(d => d.status === 'approved')
      .reduce((sum, d) => sum + d.amount, 0);
    const totalWithdrawals = withdrawalRequests.filter(w => w.status === 'approved')
      .reduce((sum, w) => sum + w.amount, 0);
    
    return {
      totalUsers,
      totalBalance,
      pendingDeposits,
      pendingWithdrawals,
      totalDeposits,
      totalWithdrawals
    };
  };

  // Keep existing functions
  const updateUserProfile = async (profile: Partial<UserProfile>): Promise<void> => {
    if (!userProfile) throw new Error('No user profile found');
    
    const updatedProfile = { ...userProfile, ...profile, lastActive: new Date() };
    setUserProfile(updatedProfile);
    setUsers(prev => prev.map(u => 
      u.walletAddress === userProfile.walletAddress ? updatedProfile : u
    ));
  };

  const submitKYC = async (documents: { idFront: File; idBack: File; selfie: File }): Promise<void> => {
    if (!userProfile) throw new Error('No user profile found');
    
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
    
    const updatedProfile = {
      ...userProfile,
      kycStatus: 'pending' as KYCStatus,
      documents: {
        idFront: idFrontUrl,
        idBack: idBackUrl,
        selfie: selfieUrl
      },
      lastActive: new Date()
    };
    
    setUserProfile(updatedProfile);
    setUsers(prev => prev.map(u => 
      u.walletAddress === userProfile.walletAddress ? updatedProfile : u
    ));
  };

  const getTransactionHistory = (): Transaction[] => {
    if (!wallet) return [];
    return transactions
      .filter(t => t.walletAddress === wallet.address)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const grantAdminAccess = (password: string): boolean => {
    // Use environment variable in production
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
    if (password === adminPassword) {
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
    setDepositRequests([]);
    setWithdrawalRequests([]);
    setIsAdmin(false);
    localStorage.removeItem('wallet');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('transactions');
    localStorage.removeItem('depositRequests');
    localStorage.removeItem('withdrawalRequests');
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
      isAdmin,
      grantAdminAccess,
      
      // Deposit System
      requestDeposit,
      getPendingDeposits,
      getUserDeposits,
      
      // Withdrawal System
      requestWithdrawal,
      getPendingWithdrawals,
      getUserWithdrawals,
      
      // User Management
      updateUserProfile,
      getTransactionHistory,
      submitKYC,
      
      // Manual Fund Management (Admin)
      manualAddFunds,
      manualDeductFunds,
      manualTransfer,
      
      // Deposit Request Management (Admin)
      approveDeposit,
      rejectDeposit,
      getDepositRequests,
      
      // Withdrawal Request Management (Admin)
      approveWithdrawal,
      rejectWithdrawal,
      processWithdrawal,
      getWithdrawalRequests,
      
      // User Management (Admin)
      getAllUsers,
      updateUserKYCStatus,
      updateUserTier,
      
      // System Management
      getSystemStats
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
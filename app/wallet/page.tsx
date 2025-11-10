'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@/contexts/WalletContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FaWallet, 
  FaMoneyBillWave, 
  FaDownload, 
  FaHistory, 
  FaUser, 
  FaShieldAlt,
  FaCopy,
  FaCheck
} from 'react-icons/fa';

export default function WalletPage() {
  const { wallet, userProfile, getTransactionHistory, logout } = useWallet();
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (wallet && isClient) {
      const transactions = getTransactionHistory();
      setRecentTransactions(transactions.slice(0, 3));
    }
  }, [wallet, getTransactionHistory, isClient]);

  const copyToClipboard = (text: string) => {
    if (!isClient) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (isClient && !wallet) {
      router.push('/wallet/access');
    }
  }, [wallet, isClient, router]);

  if (!isClient || !wallet) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-helvetica-bold">Loading wallet...</p>
        </div>
      </div>
    );
  }

  const quickActions = [
    {
      icon: FaMoneyBillWave,
      label: 'Deposit',
      description: 'Add funds',
      href: '/wallet/deposit',
    },
    {
      icon: FaDownload,
      label: 'Withdraw',
      description: 'Get funds',
      href: '/wallet/withdraw',
    },
    {
      icon: FaHistory,
      label: 'Transactions',
      description: 'View history',
      href: '/wallet/transactions',
    },
    {
      icon: FaUser,
      label: 'Profile',
      description: 'KYC & Settings',
      href: '/wallet/profile',
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-white bg-white/10 border-white/20';
      case 'pending': return 'text-white/80 bg-white/5 border-white/10';
      case 'failed': return 'text-white/60 bg-white/5 border-white/5';
      default: return 'text-white/60 bg-white/5 border-white/5';
    }
  };

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="liquid-glass rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-black text-white brand-ugarit">MY WALLET</h1>
                <p className="text-white/60 font-helvetica">Manage your funds securely</p>
              </div>
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-full text-xs font-helvetica-bold border ${getStatusColor(userProfile?.kycStatus === 'verified' ? 'completed' : 'pending')}`}>
                  {userProfile?.kycStatus?.toUpperCase() || 'NOT VERIFIED'}
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all duration-300 font-helvetica-bold"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Balance Card */}
            <div className="liquid-glass rounded-2xl p-6 mb-6 border border-white/10">
              <p className="text-white/60 font-helvetica-bold mb-2">TOTAL BALANCE</p>
              <p className="text-4xl font-black text-white brand-ugarit mb-4">
                ${wallet.balance.toFixed(2)}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaWallet className="w-4 h-4 text-white" />
                  <span className="text-white font-helvetica-bold text-sm">Wallet Address:</span>
                </div>
                <button
                  onClick={() => copyToClipboard(wallet.address)}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  <span className="text-white font-helvetica-bold text-sm">
                    {wallet.address.slice(0, 8)}...{wallet.address.slice(-6)}
                  </span>
                  {copied ? <FaCheck className="w-3 h-3 text-white" /> : <FaCopy className="w-3 h-3 text-white" />}
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={action.href}
                    className="liquid-glass rounded-xl p-4 block text-white hover:scale-105 transition-all duration-300 group border border-white/10 hover:border-white/20"
                  >
                    <action.icon className="w-6 h-6 mb-2 text-white" />
                    <p className="font-helvetica-bold">{action.label}</p>
                    <p className="text-white/60 text-sm font-helvetica">{action.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="liquid-glass rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-white brand-ugarit">RECENT TRANSACTIONS</h2>
              <Link 
                href="/wallet/transactions"
                className="text-white hover:text-white/80 font-helvetica-bold text-sm transition-colors"
              >
                View All
              </Link>
            </div>

            {recentTransactions.length === 0 ? (
              <div className="text-center py-8">
                <FaHistory className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/60 font-helvetica-bold">No recent transactions</p>
                <p className="text-white/40 font-helvetica text-sm mt-2">
                  Your transaction history will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg border ${
                        transaction.type === 'deposit' 
                          ? 'bg-white/10 border-white/20 text-white'
                          : 'bg-white/5 border-white/10 text-white'
                      }`}>
                        {transaction.type === 'deposit' ? <FaMoneyBillWave className="w-4 h-4" /> : <FaDownload className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-white font-helvetica-bold text-sm">
                          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                        </p>
                        <p className="text-white/60 font-helvetica text-xs">
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-helvetica-bold ${
                        transaction.type === 'deposit' ? 'text-white' : 'text-white'
                      }`}>
                        {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </p>
                      <p className={`text-xs font-helvetica-bold ${
                        transaction.status === 'completed' ? 'text-white' :
                        transaction.status === 'pending' ? 'text-white/80' : 'text-white/60'
                      }`}>
                        {transaction.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Security Notice */}
          <div className="liquid-glass rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <FaShieldAlt className="w-5 h-5 text-white" />
              <div>
                <p className="text-white font-helvetica-bold">Security First</p>
                <p className="text-white/60 font-helvetica text-sm">
                  Never share your secret phrase. All transactions are manually verified for security.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
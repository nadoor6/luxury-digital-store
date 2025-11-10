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
  const router = useRouter();

  useEffect(() => {
    if (wallet) {
      const transactions = getTransactionHistory();
      setRecentTransactions(transactions.slice(0, 3));
    }
  }, [wallet, getTransactionHistory]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!wallet) {
    router.push('/wallet/access');
    return null;
  }

  const quickActions = [
    {
      icon: FaMoneyBillWave,
      label: 'Deposit',
      description: 'Add funds',
      href: '/wallet/deposit',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FaDownload,
      label: 'Withdraw',
      description: 'Get funds',
      href: '/wallet/withdraw',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FaHistory,
      label: 'Transactions',
      description: 'View history',
      href: '/wallet/transactions',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FaUser,
      label: 'Profile',
      description: 'KYC & Settings',
      href: '/wallet/profile',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="glass-card rounded-2xl p-8 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-black text-white brand-ugarit">MY WALLET</h1>
                <p className="text-gray-400 font-helvetica font-bold">Manage your funds securely</p>
              </div>
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-full text-xs font-helvetica font-bold ${
                  userProfile?.kycStatus === 'verified' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : userProfile?.kycStatus === 'pending'
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                }`}>
                  {userProfile?.kycStatus?.toUpperCase() || 'NOT VERIFIED'}
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors font-helvetica font-bold"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Balance Card */}
            <div className="bg-gradient-to-r from-turquoise to-neon-blue rounded-2xl p-6 text-black mb-6">
              <p className="text-black/70 font-helvetica font-bold mb-2">TOTAL BALANCE</p>
              <p className="text-4xl font-black font-helvetica-heavy mb-4">
                ${wallet.balance.toFixed(2)}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaWallet className="w-4 h-4" />
                  <span className="font-helvetica font-bold text-sm">Wallet Address:</span>
                </div>
                <button
                  onClick={() => copyToClipboard(wallet.address)}
                  className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-lg hover:bg-black/30 transition-colors"
                >
                  <span className="font-helvetica font-bold text-sm">
                    {wallet.address.slice(0, 8)}...{wallet.address.slice(-6)}
                  </span>
                  {copied ? <FaCheck className="w-3 h-3" /> : <FaCopy className="w-3 h-3" />}
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
                    className={`bg-gradient-to-r ${action.color} rounded-xl p-4 block text-white hover:scale-105 transition-transform group`}
                  >
                    <action.icon className="w-6 h-6 mb-2" />
                    <p className="font-helvetica font-bold">{action.label}</p>
                    <p className="text-white/70 text-sm font-helvetica">{action.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-white font-helvetica-heavy">RECENT TRANSACTIONS</h2>
              <Link 
                href="/wallet/transactions"
                className="text-turquoise hover:text-neon-blue font-helvetica font-bold text-sm"
              >
                View All
              </Link>
            </div>

            {recentTransactions.length === 0 ? (
              <div className="text-center py-8">
                <FaHistory className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 font-helvetica font-bold">No recent transactions</p>
                <p className="text-gray-500 font-helvetica text-sm mt-2">
                  Your transaction history will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        transaction.type === 'deposit' 
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {transaction.type === 'deposit' ? <FaMoneyBillWave /> : <FaDownload />}
                      </div>
                      <div>
                        <p className="text-white font-helvetica font-bold text-sm">
                          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                        </p>
                        <p className="text-gray-400 font-helvetica text-xs">
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-helvetica font-bold ${
                        transaction.type === 'deposit' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </p>
                      <p className={`text-xs font-helvetica font-bold ${
                        transaction.status === 'completed' ? 'text-green-400' :
                        transaction.status === 'pending' ? 'text-yellow-400' : 'text-red-400'
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
          <div className="glass-card rounded-2xl p-6 border border-yellow-500/20 bg-yellow-500/5">
            <div className="flex items-center gap-3">
              <FaShieldAlt className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-yellow-400 font-helvetica font-bold">Security First</p>
                <p className="text-yellow-400/80 font-helvetica text-sm">
                  Never share your secret phrase. Enable 2FA for extra security.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
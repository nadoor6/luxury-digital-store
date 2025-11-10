// app/admin/dashboard/page.tsx - CORRECTED VERSION
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@/contexts/WalletContext';
import Link from 'next/link';
import { 
  FaBox, 
  FaUsers, 
  FaShoppingCart, 
  FaChartBar, 
  FaCog, 
  FaPlus, 
  FaMoneyBillWave,
  FaDownload,
  FaExchangeAlt,
  FaUserCheck,
  FaWallet,
  FaTelegram,
  FaUpload // ADD THIS IMPORT
} from 'react-icons/fa';

export default function AdminDashboard() {
  const { isAdmin, wallet, getSystemStats, getDepositRequests, getWithdrawalRequests, getAllUsers } = useWallet();
  const [stats, setStats] = useState<any>(null);
  const [pendingDeposits, setPendingDeposits] = useState<any[]>([]);
  const [pendingWithdrawals, setPendingWithdrawals] = useState<any[]>([]);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);

  useEffect(() => {
    if (isAdmin) {
      const systemStats = getSystemStats();
      setStats(systemStats);
      setPendingDeposits(getDepositRequests('pending'));
      setPendingWithdrawals(getWithdrawalRequests('pending'));
      setRecentUsers(getAllUsers().slice(0, 5));
    }
  }, [isAdmin, getSystemStats, getDepositRequests, getWithdrawalRequests, getAllUsers]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4 border border-white/20">
            <FaCog className="w-8 h-8 text-white" />
          </div>
          <p className="text-white text-xl font-helvetica font-bold">ADMIN ACCESS REQUIRED</p>
          <p className="text-gray-400 mt-2 font-helvetica">
            Please use admin access to view this page
          </p>
          <Link 
            href="/admin/access"
            className="inline-block mt-4 px-6 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
          >
            Admin Access
          </Link>
        </div>
      </div>
    );
  }

  const adminCards = [
    {
      title: 'Manual Fund Management',
      description: 'Add/deduct funds manually',
      icon: FaMoneyBillWave,
      href: '/admin/funds',
      count: 'Manual',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Deposit Requests',
      description: 'Approve pending deposits',
      icon: FaDownload,
      href: '/admin/deposits',
      count: pendingDeposits.length,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Withdrawal Requests',
      description: 'Process withdrawals',
      icon: FaUpload, // NOW THIS IS CORRECT
      href: '/admin/withdrawals',
      count: pendingWithdrawals.length,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'User Management',
      description: 'Manage users & KYC',
      icon: FaUsers,
      href: '/admin/users',
      count: stats?.totalUsers || 0,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Products',
      description: 'Manage digital products',
      icon: FaBox,
      href: '/admin',
      count: '25+',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'System Analytics',
      description: 'View system statistics',
      icon: FaChartBar,
      href: '/admin/analytics',
      count: 'Stats',
      color: 'from-teal-500 to-blue-500'
    }
  ];

  const quickActions = [
    {
      title: 'Add Funds to User',
      description: 'Manual fund addition',
      icon: FaMoneyBillWave,
      action: () => window.open('/admin/funds?action=add', '_self')
    },
    {
      title: 'Process Deposit',
      description: 'Approve pending deposit',
      icon: FaDownload,
      action: () => window.open('/admin/deposits', '_self')
    },
    {
      title: 'KYC Verification',
      description: 'Verify user documents',
      icon: FaUserCheck,
      action: () => window.open('/admin/users?filter=kyc_pending', '_self')
    },
    {
      title: 'System Settings',
      description: 'Platform configuration',
      icon: FaCog,
      action: () => window.open('/admin/settings', '_self')
    }
  ];

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="liquid-glass rounded-2xl p-8 mb-8 border border-white/10"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-black text-white mb-2 brand-ugarit">
                ADMIN DASHBOARD
              </h1>
              <p className="text-gray-400 font-helvetica font-bold">
                Manual Control Panel - Complete System Management
              </p>
              {wallet && (
                <p className="text-turquoise text-sm mt-2 font-helvetica">
                  Admin Wallet: {wallet.address} | Balance: ${wallet.balance.toFixed(2)}
                </p>
              )}
            </div>
            <div className="flex gap-4 mt-4 lg:mt-0">
              <Link href="/admin/deposits" className="magnetic-btn">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-luxury flex items-center gap-3 px-6 py-3 text-lg font-black font-helvetica"
                >
                  <FaDownload className="w-5 h-5" />
                  MANAGE DEPOSITS
                </motion.div>
              </Link>
            </div>
          </div>

          {/* System Stats */}
          {stats && (
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mt-6">
              <div className="liquid-glass rounded-xl p-4 text-center border border-white/10">
                <p className="text-white/60 font-helvetica-bold text-sm">TOTAL USERS</p>
                <p className="text-2xl font-black text-white">{stats.totalUsers}</p>
              </div>
              <div className="liquid-glass rounded-xl p-4 text-center border border-white/10">
                <p className="text-white/60 font-helvetica-bold text-sm">TOTAL BALANCE</p>
                <p className="text-2xl font-black text-white">${stats.totalBalance.toFixed(2)}</p>
              </div>
              <div className="liquid-glass rounded-xl p-4 text-center border border-white/10">
                <p className="text-white/60 font-helvetica-bold text-sm">PENDING DEPOSITS</p>
                <p className="text-2xl font-black text-white">{stats.pendingDeposits}</p>
              </div>
              <div className="liquid-glass rounded-xl p-4 text-center border border-white/10">
                <p className="text-white/60 font-helvetica-bold text-sm">PENDING WITHDRAWALS</p>
                <p className="text-2xl font-black text-white">{stats.pendingWithdrawals}</p>
              </div>
              <div className="liquid-glass rounded-xl p-4 text-center border border-white/10">
                <p className="text-white/60 font-helvetica-bold text-sm">TOTAL DEPOSITS</p>
                <p className="text-2xl font-black text-white">${stats.totalDeposits.toFixed(2)}</p>
              </div>
              <div className="liquid-glass rounded-xl p-4 text-center border border-white/10">
                <p className="text-white/60 font-helvetica-bold text-sm">TOTAL WITHDRAWALS</p>
                <p className="text-2xl font-black text-white">${stats.totalWithdrawals.toFixed(2)}</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={action.action}
                className="w-full liquid-glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer text-left"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 flex items-center justify-center mb-4`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-white mb-2 font-helvetica-heavy">
                  {action.title}
                </h3>
                <p className="text-gray-400 text-sm font-helvetica font-bold">
                  {action.description}
                </p>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Main Admin Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {adminCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={card.href}>
                <div className="liquid-glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer h-full">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center mb-4`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-2 font-helvetica-heavy">
                    {card.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 font-helvetica font-bold">
                    {card.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm font-helvetica font-bold bg-white/10 px-3 py-1 rounded-full">
                      {card.count}
                    </span>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Deposits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="liquid-glass rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-white font-helvetica-heavy">PENDING DEPOSITS</h2>
              <span className="text-white/60 text-sm font-helvetica-bold">{pendingDeposits.length} requests</span>
            </div>
            <div className="space-y-3">
              {pendingDeposits.slice(0, 5).map((deposit) => (
                <div key={deposit.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div>
                    <p className="text-white font-helvetica-bold text-sm">
                      {deposit.walletAddress.slice(0, 8)}...{deposit.walletAddress.slice(-6)}
                    </p>
                    <p className="text-white/60 font-helvetica text-xs">${deposit.amount} • {deposit.paymentMethod}</p>
                  </div>
                  <Link 
                    href={`/admin/deposits`}
                    className="px-3 py-1 bg-white/10 text-white rounded-lg text-xs font-helvetica-bold hover:bg-white/20 transition-colors"
                  >
                    Review
                  </Link>
                </div>
              ))}
              {pendingDeposits.length === 0 && (
                <p className="text-white/60 font-helvetica text-center py-4">No pending deposits</p>
              )}
            </div>
          </motion.div>

          {/* Recent Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="liquid-glass rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-white font-helvetica-heavy">RECENT USERS</h2>
              <span className="text-white/60 text-sm font-helvetica-bold">{recentUsers.length} users</span>
            </div>
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div key={user.walletAddress} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div>
                    <p className="text-white font-helvetica-bold text-sm">
                      {user.walletAddress.slice(0, 8)}...{user.walletAddress.slice(-6)}
                    </p>
                    <p className="text-white/60 font-helvetica text-xs">
                      {user.kycStatus} • {user.tier}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-helvetica-bold ${
                    user.kycStatus === 'verified' ? 'bg-green-500/20 text-green-500' :
                    user.kycStatus === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-gray-500/20 text-gray-500'
                  }`}>
                    {user.kycStatus}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaWallet, FaArrowRight, FaMoneyBillWave, FaChartLine, FaPiggyBank, FaCreditCard, FaBell, FaSearch, FaUniversity } from 'react-icons/fa';
import { SiNetflix, SiAmazon } from 'react-icons/si';

// Types for real data
interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  icon: any;
  time: string;
  date: string;
}

interface Wallet {
  id: string;
  name: string;
  balance: number;
  currency: string;
  cardNumber: string;
}

interface User {
  name: string;
  email: string;
}

export default function FinanceHome() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalBalance, setTotalBalance] = useState(0);

  const quickActions = [
    { name: 'Transfer', icon: FaArrowRight },
    { name: 'Pay', icon: FaCreditCard },
    { name: 'Invest', icon: FaChartLine },
    { name: 'Save', icon: FaPiggyBank },
  ];

  // Initialize with empty state - ready for real data
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      
      // TODO: Replace with actual API calls
      // const userData = await fetchUser();
      // const walletData = await fetchWallet();
      // const transactionsData = await fetchTransactions();
      
      // For now, set empty state
      setUser(null);
      setWallet(null);
      setTransactions([]);
      setTotalBalance(0);
      
      setIsLoading(false);
    };

    initializeData();
  }, []);

  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-black text-white pb-32 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4"
          />
          <p className="text-white/60 font-helvetica-medium">Loading your finances...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black text-white pb-32">
      {/* Header Section */}
      <div className="p-6 w-full">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8 w-full"
        >
          <div>
            <p className="text-white/40 text-sm font-helvetica-medium mb-1">
              {currentTime}
            </p>
            <h1 className="text-2xl font-helvetica-black">
              {user ? `Welcome, ${user.name}` : 'Welcome to Ugarit'}
            </h1>
            <p className="text-white/30 text-xs font-helvetica-medium mt-1">
              {currentDate}
            </p>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-luxury p-3"
            >
              <FaSearch className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-luxury p-3"
            >
              <FaBell className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Total Balance */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="budget-stat p-6 mb-6 w-full"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-white/40 text-sm font-helvetica-medium mb-1">Total Balance</p>
              <h2 className="text-3xl font-helvetica-black">
                {totalBalance > 0 ? `$${totalBalance.toLocaleString()}` : '$0.00'}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-white/40 text-sm font-helvetica-medium">USD</p>
              <p className="text-white/30 text-xs">All accounts</p>
            </div>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '0%' }}
              transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
              className="bg-white h-1.5 rounded-full"
            />
          </div>
        </motion.div>

        {/* Wallet Card - Only show if wallet exists */}
        {wallet ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="wallet-card p-6 mb-6 w-full"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-white/40 text-sm font-helvetica-medium mb-1">Primary Wallet</p>
                <h3 className="text-xl font-helvetica-black">{wallet.name}</h3>
              </div>
              <FaWallet className="w-5 h-5 text-white/60" />
            </div>
            
            <div className="mb-4">
              <p className="text-white/30 text-xs font-helvetica-medium mb-2">Card Number</p>
              <p className="text-white text-lg font-helvetica-black tracking-widest">
                {wallet.cardNumber}
              </p>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white/30 text-xs font-helvetica-medium">Available</p>
                <p className="text-white font-helvetica-black text-lg">
                  ${wallet.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-luxury-primary px-4 py-2 text-sm font-helvetica-bold"
              >
                Details
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="wallet-card p-6 mb-6 w-full text-center"
          >
            <FaWallet className="w-12 h-12 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-helvetica-black text-white mb-2">No Wallet Connected</h3>
            <p className="text-white/50 text-sm font-helvetica-medium mb-4">
              Connect your wallet to start managing your finances
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-luxury-primary px-6 py-3 font-helvetica-bold"
            >
              Connect Wallet
            </motion.button>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8 w-full"
        >
          <h3 className="text-lg font-helvetica-black mb-4">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-3 w-full">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.name}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: 0.4 + index * 0.1,
                  type: "spring",
                  stiffness: 500
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="quick-action flex flex-col items-center gap-2 py-4 w-full"
              >
                <action.icon className="w-5 h-5 text-white" />
                <span className="text-xs font-helvetica-medium">{action.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Transactions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full"
        >
          <div className="flex justify-between items-center mb-4 w-full">
            <h3 className="text-lg font-helvetica-black">Recent Transactions</h3>
            <p className="text-white/40 text-sm font-helvetica-medium">
              {transactions.length > 0 ? 'Latest' : 'No transactions'}
            </p>
          </div>
          
          {transactions.length > 0 ? (
            <>
              <div className="space-y-3 w-full">
                {transactions.slice(0, 5).map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ 
                      delay: 0.6 + index * 0.1,
                      type: "spring",
                      stiffness: 400
                    }}
                    className="transaction-item p-4 flex items-center justify-between w-full"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl glass-simple flex items-center justify-center">
                        <transaction.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-helvetica-bold text-white">{transaction.name}</p>
                        <p className="text-white/40 text-xs font-helvetica-medium">{transaction.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-helvetica-black text-sm ${
                        transaction.amount > 0 ? 'text-green-400' : 'text-white'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <p className="text-white/30 text-xs font-helvetica-medium">{transaction.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-luxury py-4 rounded-2xl mt-4 font-helvetica-bold text-sm"
              >
                View All Transactions
              </motion.button>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center py-12"
            >
              <FaMoneyBillWave className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h4 className="text-lg font-helvetica-black text-white mb-2">No Transactions Yet</h4>
              <p className="text-white/50 text-sm font-helvetica-medium">
                Your transaction history will appear here
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom spacing for mobile navigation */}
      <div className="h-20 w-full"></div>
    </div>
  );
}
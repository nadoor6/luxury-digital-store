'use client';

import { motion } from 'framer-motion';
import { FaWallet, FaArrowRight, FaMoneyBillWave, FaChartLine, FaPiggyBank, FaCreditCard, FaUniversity, FaShieldAlt, FaCog, FaBell, FaSearch } from 'react-icons/fa';
import { SiNetflix, SiAmazon } from 'react-icons/si';

export default function FinanceHome() {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });

  const transactions = [
    { id: 1, name: 'Netflix', category: 'Entertainment', amount: -56.99, icon: SiNetflix, time: '9:30 AM' },
    { id: 2, name: 'Amazon', category: 'Shopping', amount: -15.49, icon: SiAmazon, time: '10:15 AM' },
    { id: 3, name: 'Salary', category: 'Income', amount: 4500.00, icon: FaUniversity, time: '8:00 AM' },
    { id: 4, name: 'Starbucks', category: 'Food & Drink', amount: -8.75, icon: FaMoneyBillWave, time: '7:45 AM' },
  ];

  const quickActions = [
    { name: 'Transfer', icon: FaArrowRight, color: 'text-white' },
    { name: 'Pay', icon: FaCreditCard, color: 'text-white' },
    { name: 'Invest', icon: FaChartLine, color: 'text-white' },
    { name: 'Save', icon: FaPiggyBank, color: 'text-white' },
  ];

  return (
    <div className="min-h-screen finance-gradient-bg text-white pb-20">
      {/* Header */}
      <div className="p-6">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <p className="text-white/60 text-sm font-helvetica-bold">Good morning</p>
            <h1 className="text-2xl font-helvetica-black">Mark Williamson</h1>
          </div>
          <div className="flex gap-3">
            <motion.button whileTap={{ scale: 0.9 }} className="btn-glass-modern p-3">
              <FaSearch className="w-4 h-4" />
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} className="btn-glass-modern p-3">
              <FaBell className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Total Budget */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="budget-stat rounded-2xl p-6 mb-6"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-white/60 text-sm font-helvetica-bold mb-1">Total Budget</p>
              <h2 className="text-3xl font-helvetica-black">$25,567.40</h2>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-sm font-helvetica-bold">USD</p>
              <p className="text-white/40 text-xs">This month</p>
            </div>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div className="bg-white h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </motion.div>

        {/* Wallet Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="wallet-card-gradient rounded-2xl p-6 mb-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-white/60 text-sm font-helvetica-bold mb-1">My Wallet</p>
                <h3 className="text-xl font-helvetica-black">Mark Williamson</h3>
              </div>
              <FaWallet className="w-6 h-6 text-white/80" />
            </div>
            <div className="mb-4">
              <p className="text-white/40 text-sm font-helvetica-bold mb-1">Card Number</p>
              <p className="text-white text-lg font-helvetica-black tracking-widest">**** **** 5274 5678</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white/40 text-xs font-helvetica-bold">Balance</p>
                <p className="text-white font-helvetica-black text-lg">$8,245.67</p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="luxury-primary-btn px-4 py-2 text-sm font-helvetica-bold"
              >
                View Details
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-lg font-helvetica-black mb-4">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.name}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2 btn-glass-modern py-4 rounded-xl"
              >
                <action.icon className={`w-6 h-6 ${action.color}`} />
                <span className="text-xs font-helvetica-bold">{action.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Transactions */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-helvetica-black">Transactions</h3>
            <p className="text-white/60 text-sm font-helvetica-bold">Today</p>
          </div>
          <div className="space-y-3">
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="transaction-card rounded-xl p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg glass-card flex items-center justify-center">
                    <transaction.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-helvetica-bold text-white">{transaction.name}</p>
                    <p className="text-white/60 text-xs font-helvetica-bold">{transaction.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-helvetica-black ${transaction.amount > 0 ? 'text-green-400' : 'text-white'}`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <p className="text-white/40 text-xs font-helvetica-bold">{transaction.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="w-full luxury-secondary-btn py-3 rounded-xl mt-4 font-helvetica-bold"
          >
            View All Transactions
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom Navigation Space */}
      <div className="h-20"></div>
    </div>
  );
}
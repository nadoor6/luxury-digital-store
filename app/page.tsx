'use client';

import { motion } from 'framer-motion';
import { FaWallet, FaArrowRight, FaMoneyBillWave, FaChartLine, FaPiggyBank, FaCreditCard, FaBell, FaSearch, FaCog } from 'react-icons/fa';
import { SiNetflix, SiAmazon } from 'react-icons/si';

export default function FinanceHome() {
  const transactions = [
    { id: 1, name: 'Netflix', category: 'Entertainment', amount: -56.99, icon: SiNetflix, time: '9:30 AM' },
    { id: 2, name: 'Amazon', category: 'Shopping', amount: -15.49, icon: SiAmazon, time: '10:15 AM' },
    { id: 3, name: 'Salary', category: 'Income', amount: 4500.00, icon: FaMoneyBillWave, time: '8:00 AM' },
  ];

  const quickActions = [
    { name: 'Transfer', icon: FaArrowRight },
    { name: 'Pay', icon: FaCreditCard },
    { name: 'Invest', icon: FaChartLine },
    { name: 'Save', icon: FaPiggyBank },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <div className="p-6">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <p className="text-white/40 text-sm font-helvetica-medium mb-1">Good morning</p>
            <h1 className="text-2xl font-helvetica-black">Mark Williamson</h1>
          </div>
          <div className="flex gap-2">
            <button className="btn-luxury p-3">
              <FaSearch className="w-4 h-4" />
            </button>
            <button className="btn-luxury p-3">
              <FaBell className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Total Budget */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="budget-stat p-6 mb-6"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-white/40 text-sm font-helvetica-medium mb-1">Total Balance</p>
              <h2 className="text-3xl font-helvetica-black">$25,567.40</h2>
            </div>
            <div className="text-right">
              <p className="text-white/40 text-sm font-helvetica-medium">USD</p>
            </div>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div className="bg-white h-1.5 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </motion.div>

        {/* Wallet Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="wallet-card p-6 mb-6"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-white/40 text-sm font-helvetica-medium mb-1">My Wallet</p>
              <h3 className="text-xl font-helvetica-black">Mark Williamson</h3>
            </div>
            <FaWallet className="w-5 h-5 text-white/60" />
          </div>
          
          <div className="mb-4">
            <p className="text-white/30 text-xs font-helvetica-medium mb-2">Card Number</p>
            <p className="text-white text-lg font-helvetica-black tracking-widest">•••• •••• 5274 5678</p>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white/30 text-xs font-helvetica-medium">Available</p>
              <p className="text-white font-helvetica-black text-lg">$8,245.67</p>
            </div>
            <button className="btn-luxury-primary px-4 py-2 text-sm">
              Details
            </button>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h3 className="text-lg font-helvetica-black mb-4">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.name}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="quick-action flex flex-col items-center gap-2 py-4"
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
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-helvetica-black">Transactions</h3>
            <p className="text-white/40 text-sm font-helvetica-medium">Today</p>
          </div>
          
          <div className="space-y-3">
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="transaction-item p-4 flex items-center justify-between"
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
            transition={{ delay: 0.9 }}
            className="w-full btn-luxury py-4 rounded-2xl mt-4 font-helvetica-bold text-sm"
          >
            View All Transactions
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
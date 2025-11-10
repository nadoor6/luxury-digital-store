'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@/contexts/WalletContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaCheck, FaClock, FaTimes, FaExchangeAlt, FaMoneyBillWave, FaDownload } from 'react-icons/fa';

export default function TransactionsPage() {
  const { getTransactionHistory, wallet } = useWallet();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'failed'>('all');
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get('success');

  useEffect(() => {
    if (wallet) {
      setTransactions(getTransactionHistory());
    }
  }, [wallet, getTransactionHistory]);

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    return transaction.status === filter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <FaCheck className="w-4 h-4 text-green-400" />;
      case 'pending': return <FaClock className="w-4 h-4 text-yellow-400" />;
      case 'failed': return <FaTimes className="w-4 h-4 text-red-400" />;
      default: return <FaExchangeAlt className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'failed': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit': return <FaMoneyBillWave className="w-4 h-4 text-blue-400" />;
      case 'withdrawal': return <FaDownload className="w-4 h-4 text-purple-400" />;
      default: return <FaExchangeAlt className="w-4 h-4 text-gray-400" />;
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-8 border border-white/10"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/wallet" className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors magnetic-btn">
              <FaArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <div>
              <h1 className="text-3xl font-black text-white brand-ugarit">TRANSACTION HISTORY</h1>
              <p className="text-gray-400 font-helvetica font-bold">All your wallet transactions</p>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6">
              <p className="text-green-400 text-sm font-helvetica font-bold text-center">
                ✅ Transaction request submitted successfully! It's now pending admin approval.
              </p>
            </div>
          )}

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { value: 'all', label: 'All Transactions' },
              { value: 'pending', label: 'Pending' },
              { value: 'completed', label: 'Completed' },
              { value: 'failed', label: 'Failed' }
            ].map((filterOption) => (
              <button
                key={filterOption.value}
                onClick={() => setFilter(filterOption.value as any)}
                className={`px-4 py-2 rounded-xl font-helvetica font-bold whitespace-nowrap transition-all ${
                  filter === filterOption.value
                    ? 'bg-turquoise text-black'
                    : 'bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>

          {/* Transactions List */}
          <div className="space-y-4">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12">
                <FaExchangeAlt className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 font-helvetica font-bold text-lg">No transactions found</p>
                <p className="text-gray-500 font-helvetica mt-2">
                  {filter === 'all' 
                    ? "You haven't made any transactions yet."
                    : `No ${filter} transactions found.`
                  }
                </p>
                {(filter === 'all' && wallet?.balance === 0) && (
                  <Link
                    href="/wallet/deposit"
                    className="btn-luxury inline-flex items-center gap-2 mt-4"
                  >
                    <FaMoneyBillWave className="w-4 h-4" />
                    Make Your First Deposit
                  </Link>
                )}
              </div>
            ) : (
              filteredTransactions.map((transaction) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getTypeIcon(transaction.type)}
                      <div>
                        <p className="text-white font-helvetica font-bold">
                          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                        </p>
                        <p className="text-gray-400 text-sm font-helvetica">
                          {formatDate(transaction.createdAt)}
                        </p>
                        <p className="text-gray-500 text-sm font-helvetica mt-1">
                          {transaction.description}
                        </p>
                        {transaction.metadata?.adminNote && (
                          <p className="text-gray-500 text-sm font-helvetica mt-1">
                            Note: {transaction.metadata.adminNote}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className={`text-lg font-helvetica font-bold ${
                        transaction.type === 'deposit' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </p>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-helvetica font-bold mt-2 ${getStatusColor(transaction.status)}`}>
                        {getStatusIcon(transaction.status)}
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
            <Link
              href="/wallet/deposit"
              className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors group"
            >
              <FaMoneyBillWave className="w-6 h-6 text-turquoise mx-auto mb-2" />
              <p className="text-white font-helvetica font-bold">Deposit</p>
              <p className="text-gray-400 text-sm font-helvetica">Add Funds</p>
            </Link>
            <Link
              href="/wallet/withdraw"
              className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors group"
            >
              <FaDownload className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-white font-helvetica font-bold">Withdraw</p>
              <p className="text-gray-400 text-sm font-helvetica">Get Funds</p>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
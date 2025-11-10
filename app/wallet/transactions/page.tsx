'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@/contexts/WalletContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaCheck, FaClock, FaTimes, FaExchangeAlt, FaMoneyBillWave, FaDownload } from 'react-icons/fa';

function TransactionsContent() {
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
      case 'completed': return <FaCheck className="w-4 h-4 text-white" />;
      case 'pending': return <FaClock className="w-4 h-4 text-white/80" />;
      case 'failed': return <FaTimes className="w-4 h-4 text-white/60" />;
      default: return <FaExchangeAlt className="w-4 h-4 text-white/60" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-white bg-white/10 border-white/20';
      case 'pending': return 'text-white/80 bg-white/5 border-white/10';
      case 'failed': return 'text-white/60 bg-white/5 border-white/5';
      default: return 'text-white/60 bg-white/5 border-white/5';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit': return <FaMoneyBillWave className="w-4 h-4 text-white" />;
      case 'withdrawal': return <FaDownload className="w-4 h-4 text-white" />;
      default: return <FaExchangeAlt className="w-4 h-4 text-white" />;
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
          className="liquid-glass rounded-2xl p-8 border border-white/10"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/wallet" className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 magnetic-btn">
              <FaArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <div>
              <h1 className="text-3xl font-black text-white brand-ugarit">TRANSACTION HISTORY</h1>
              <p className="text-white/60 font-helvetica">All your wallet transactions</p>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="liquid-glass border border-white/10 rounded-xl p-4 mb-6">
              <p className="text-white font-helvetica-bold text-sm text-center">
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
                className={`px-4 py-2 rounded-xl font-helvetica-bold whitespace-nowrap transition-all duration-300 ${
                  filter === filterOption.value
                    ? 'bg-white text-black'
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
                <FaExchangeAlt className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/60 font-helvetica-bold text-lg">No transactions found</p>
                <p className="text-white/40 font-helvetica mt-2">
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
                  className="liquid-glass rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getTypeIcon(transaction.type)}
                      <div>
                        <p className="text-white font-helvetica-bold">
                          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                        </p>
                        <p className="text-white/60 font-helvetica text-sm">
                          {formatDate(transaction.createdAt)}
                        </p>
                        <p className="text-white/40 font-helvetica text-sm mt-1">
                          {transaction.description}
                        </p>
                        {transaction.metadata?.adminNote && (
                          <p className="text-white/40 font-helvetica text-sm mt-1">
                            Note: {transaction.metadata.adminNote}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className={`text-lg font-helvetica-bold ${
                        transaction.type === 'deposit' ? 'text-white' : 'text-white'
                      }`}>
                        {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </p>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-helvetica-bold mt-2 ${getStatusColor(transaction.status)}`}>
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
              className="liquid-glass rounded-xl p-4 text-center hover:border-white/20 transition-all duration-300 group border border-white/10"
            >
              <FaMoneyBillWave className="w-6 h-6 text-white mx-auto mb-2" />
              <p className="text-white font-helvetica-bold">Deposit</p>
              <p className="text-white/60 font-helvetica text-sm">Add Funds</p>
            </Link>
            <Link
              href="/wallet/withdraw"
              className="liquid-glass rounded-xl p-4 text-center hover:border-white/20 transition-all duration-300 group border border-white/10"
            >
              <FaDownload className="w-6 h-6 text-white mx-auto mb-2" />
              <p className="text-white font-helvetica-bold">Withdraw</p>
              <p className="text-white/60 font-helvetica text-sm">Get Funds</p>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function TransactionsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-helvetica-bold">Loading transactions...</p>
        </div>
      </div>
    }>
      <TransactionsContent />
    </Suspense>
  );
}
// app/admin/funds/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@/contexts/WalletContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaMoneyBillWave, FaDownload, FaExchangeAlt, FaUser, FaCheck } from 'react-icons/fa';

export default function AdminFundsManagement() {
  const { 
    isAdmin, 
    manualAddFunds, 
    manualDeductFunds, 
    manualTransfer, 
    getAllUsers 
  } = useWallet();
  const [activeTab, setActiveTab] = useState<'add' | 'deduct' | 'transfer'>('add');
  const [walletAddress, setWalletAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const users = isAdmin ? getAllUsers() : [];

  if (!isAdmin) {
    router.push('/admin/access');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress || !amount) return;

    setIsSubmitting(true);
    setMessage('');

    try {
      const amountNum = parseFloat(amount);
      
      if (activeTab === 'add') {
        await manualAddFunds(walletAddress, amountNum, note);
        setMessage(`Successfully added $${amount} to ${walletAddress}`);
      } else if (activeTab === 'deduct') {
        await manualDeductFunds(walletAddress, amountNum, note);
        setMessage(`Successfully deducted $${amount} from ${walletAddress}`);
      } else if (activeTab === 'transfer') {
        if (!toAddress) {
          setMessage('Please enter recipient wallet address');
          return;
        }
        await manualTransfer(walletAddress, toAddress, amountNum, note);
        setMessage(`Successfully transferred $${amount} from ${walletAddress} to ${toAddress}`);
      }

      // Reset form
      setWalletAddress('');
      setToAddress('');
      setAmount('');
      setNote('');
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickAmounts = [10, 50, 100, 500, 1000];

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
            <Link href="/admin/dashboard" className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 magnetic-btn">
              <FaArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <div>
              <h1 className="text-3xl font-black text-white brand-ugarit">MANUAL FUNDS MANAGEMENT</h1>
              <p className="text-white/60 font-helvetica">Manual fund operations</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            {[
              { value: 'add', label: 'Add Funds', icon: FaMoneyBillWave },
              { value: 'deduct', label: 'Deduct Funds', icon: FaDownload },
              { value: 'transfer', label: 'Transfer Funds', icon: FaExchangeAlt }
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-helvetica-bold transition-all ${
                  activeTab === tab.value
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Message */}
          {message && (
            <div className={`liquid-glass rounded-xl p-4 mb-6 border ${
              message.includes('Error') ? 'border-red-500/20 text-red-400' : 'border-green-500/20 text-green-400'
            }`}>
              <p className="font-helvetica-bold">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Wallet Address */}
            <div>
              <label className="block text-white font-helvetica-bold mb-2">
                {activeTab === 'transfer' ? 'FROM WALLET ADDRESS' : 'WALLET ADDRESS'}
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent font-helvetica"
                  placeholder="Enter wallet address"
                />
              </div>
              
              {/* Quick User Selection */}
              {users.length > 0 && (
                <div className="mt-2">
                  <p className="text-white/60 font-helvetica text-sm mb-2">Quick select:</p>
                  <div className="flex flex-wrap gap-2">
                    {users.slice(0, 5).map((user) => (
                      <button
                        key={user.walletAddress}
                        type="button"
                        onClick={() => setWalletAddress(user.walletAddress)}
                        className="px-3 py-1 bg-white/5 text-white/80 rounded-lg text-xs font-helvetica hover:bg-white/10 transition-colors"
                      >
                        {user.walletAddress.slice(0, 8)}...{user.walletAddress.slice(-6)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* To Address (for transfers) */}
            {activeTab === 'transfer' && (
              <div>
                <label className="block text-white font-helvetica-bold mb-2">
                  TO WALLET ADDRESS
                </label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                  <input
                    type="text"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent font-helvetica"
                    placeholder="Enter recipient wallet address"
                  />
                </div>
              </div>
            )}

            {/* Quick Amount Buttons */}
            <div>
              <label className="block text-white font-helvetica-bold mb-3">
                QUICK AMOUNT (USD)
              </label>
              <div className="grid grid-cols-5 gap-3">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    type="button"
                    onClick={() => setAmount(quickAmount.toString())}
                    className={`p-3 rounded-xl border font-helvetica-bold transition-all duration-300 ${
                      amount === quickAmount.toString()
                        ? 'bg-white text-black border-white'
                        : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                    }`}
                  >
                    ${quickAmount}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-white font-helvetica-bold mb-2">
                AMOUNT (USD)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white font-helvetica-bold">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  min="0.01"
                  step="0.01"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent font-helvetica"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="block text-white font-helvetica-bold mb-2">
                ADMIN NOTE
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent font-helvetica resize-none"
                placeholder="Enter reason for this manual operation..."
              />
            </div>

            {/* Action Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting || !walletAddress || !amount || (activeTab === 'transfer' && !toAddress)}
              whileHover={{ scale: (isSubmitting || !walletAddress || !amount) ? 1 : 1.02 }}
              whileTap={{ scale: (isSubmitting || !walletAddress || !amount) ? 1 : 0.98 }}
              className="w-full btn-luxury flex items-center justify-center gap-3 text-lg font-helvetica-bold disabled:opacity-50 py-4"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FaCheck className="w-5 h-5" />
              )}
              {isSubmitting ? 'PROCESSING...' : 
                activeTab === 'add' ? 'ADD FUNDS' :
                activeTab === 'deduct' ? 'DEDUCT FUNDS' : 'TRANSFER FUNDS'
              }
            </motion.button>
          </form>

          {/* Info Box */}
          <div className="liquid-glass border border-white/10 rounded-xl p-4 mt-6">
            <p className="text-white font-helvetica-bold text-sm">
              ⚠️ Manual fund operations are irreversible. All actions are logged in transaction history.
              {activeTab === 'deduct' && ' Ensure user has sufficient balance before deduction.'}
              {activeTab === 'transfer' && ' Both sender and receiver wallets must be valid.'}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
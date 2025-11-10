'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@/contexts/WalletContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaMoneyBillWave, FaExclamationTriangle } from 'react-icons/fa';

export default function WithdrawPage() {
  const [amount, setAmount] = useState('');
  const [bankDetails, setBankDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { requestWithdrawal, wallet, loading } = useWallet();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet || !amount || !bankDetails) return;

    setIsSubmitting(true);
    try {
      const transactionId = await requestWithdrawal(parseFloat(amount), bankDetails);
      router.push('/wallet/transactions?success=true');
    } catch (error: any) {
      alert(error.message || 'Withdrawal request failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickAmounts = [50, 100, 200, 500, 1000].filter(amt => amt <= (wallet?.balance || 0));

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="container mx-auto max-w-2xl">
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
              <h1 className="text-3xl font-black text-white brand-ugarit">REQUEST WITHDRAWAL</h1>
              <p className="text-white/60 font-helvetica">Withdraw funds from your wallet</p>
            </div>
          </div>

          {/* Current Balance */}
          <div className="liquid-glass rounded-2xl p-6 mb-6 border border-white/10">
            <p className="text-white/60 font-helvetica-bold mb-2">AVAILABLE BALANCE</p>
            <p className="text-3xl font-black text-white brand-ugarit">
              ${wallet?.balance.toFixed(2) || '0.00'}
            </p>
            <p className="text-white/60 font-helvetica text-sm mt-2">
              Maximum withdrawal: ${wallet?.balance.toFixed(2) || '0.00'}
            </p>
          </div>

          {/* Insufficient Balance Warning */}
          {wallet && wallet.balance === 0 && (
            <div className="liquid-glass border border-white/10 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <FaExclamationTriangle className="w-5 h-5 text-white" />
                <p className="text-white font-helvetica-bold text-sm">
                  You need funds in your wallet to make a withdrawal.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Quick Amount Buttons */}
            {quickAmounts.length > 0 && (
              <div>
                <label className="block text-white font-helvetica-bold mb-3">
                  QUICK AMOUNT (USD)
                </label>
                <div className="grid grid-cols-3 gap-3">
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
            )}

            {/* Amount Input */}
            <div>
              <label className="block text-white font-helvetica-bold mb-2">
                WITHDRAWAL AMOUNT (USD)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white font-helvetica-bold">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  min="1"
                  max={wallet?.balance}
                  step="0.01"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent font-helvetica"
                  placeholder="0.00"
                />
              </div>
              {wallet && amount && parseFloat(amount) > wallet.balance && (
                <p className="text-white font-helvetica text-sm mt-2">
                  Amount exceeds available balance
                </p>
              )}
            </div>

            {/* Bank Details */}
            <div>
              <label className="block text-white font-helvetica-bold mb-2">
                BANK ACCOUNT DETAILS
              </label>
              <textarea
                value={bankDetails}
                onChange={(e) => setBankDetails(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent font-helvetica resize-none"
                placeholder="Bank Name, Account Holder Name, Account Number, Routing Number, SWIFT/BIC Code"
              />
              <p className="text-white/60 font-helvetica text-sm mt-2">
                Provide complete bank details for wire transfer
              </p>
            </div>

            {/* Info Box */}
            <div className="liquid-glass border border-white/10 rounded-xl p-4">
              <p className="text-white font-helvetica-bold text-sm text-center">
                ⏳ Withdrawals are processed manually within 24-48 hours. You'll receive email confirmation.
              </p>
            </div>

            <motion.button
              type="submit"
              disabled={loading || isSubmitting || !amount || !bankDetails || (wallet && parseFloat(amount) > wallet.balance)}
              whileHover={{ scale: (loading || isSubmitting || !amount || !bankDetails) ? 1 : 1.02 }}
              whileTap={{ scale: (loading || isSubmitting || !amount || !bankDetails) ? 1 : 0.98 }}
              className="w-full btn-luxury flex items-center justify-center gap-3 text-lg font-helvetica-bold disabled:opacity-50 py-4"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FaMoneyBillWave className="w-5 h-5" />
              )}
              {isSubmitting ? 'PROCESSING...' : 'REQUEST WITHDRAWAL'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
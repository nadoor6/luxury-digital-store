'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@/contexts/WalletContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaMoneyBillWave, FaCreditCard, FaUniversity, FaExchangeAlt } from 'react-icons/fa';

const paymentMethods = [
  { value: 'bank_transfer', label: 'Bank Transfer', icon: FaUniversity, description: 'Wire transfer to our bank account' },
  { value: 'credit_card', label: 'Credit Card', icon: FaCreditCard, description: 'Visa, Mastercard, Amex' },
  { value: 'debit_card', label: 'Debit Card', icon: FaMoneyBillWave, description: 'Direct debit from your bank' },
  { value: 'crypto', label: 'Cryptocurrency', icon: FaExchangeAlt, description: 'BTC, ETH, USDT' },
];

export default function DepositPage() {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [bankDetails, setBankDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { requestDeposit, wallet, loading } = useWallet();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet || !amount) return;

    setIsSubmitting(true);
    try {
      const transactionId = await requestDeposit(
        parseFloat(amount), 
        paymentMethod, 
        bankDetails
      );
      router.push('/wallet/transactions?success=true');
    } catch (error) {
      console.error('Deposit request failed:', error);
      alert('Deposit request failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickAmounts = [50, 100, 200, 500, 1000];

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="container mx-auto max-w-2xl">
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
              <h1 className="text-3xl font-black text-white brand-ugarit">REQUEST DEPOSIT</h1>
              <p className="text-gray-400 font-helvetica font-bold">Add funds to your wallet</p>
            </div>
          </div>

          {/* Current Balance */}
          <div className="bg-white/5 rounded-xl p-6 mb-6 border border-white/10">
            <p className="text-gray-400 text-sm font-helvetica font-bold">CURRENT BALANCE</p>
            <p className="text-3xl font-black text-white font-helvetica-heavy">
              ${wallet?.balance.toFixed(2) || '0.00'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Quick Amount Buttons */}
            <div>
              <label className="block text-sm font-black text-white mb-3 font-helvetica">
                QUICK AMOUNT (USD)
              </label>
              <div className="grid grid-cols-3 gap-3">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    type="button"
                    onClick={() => setAmount(quickAmount.toString())}
                    className={`p-3 rounded-xl border font-helvetica font-bold transition-all ${
                      amount === quickAmount.toString()
                        ? 'bg-turquoise border-turquoise text-black'
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
              <label className="block text-sm font-black text-white mb-2 font-helvetica">
                CUSTOM AMOUNT (USD)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white font-bold">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  min="1"
                  step="0.01"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-transparent font-helvetica font-bold"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-black text-white mb-4 font-helvetica">
                PAYMENT METHOD
              </label>
              <div className="grid grid-cols-1 gap-3">
                {paymentMethods.map((method) => (
                  <label 
                    key={method.value} 
                    className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-turquoise focus:ring-turquoise mt-1"
                    />
                    <method.icon className="w-5 h-5 text-white mt-0.5" />
                    <div className="flex-1">
                      <span className="text-white font-helvetica font-bold block">{method.label}</span>
                      <span className="text-gray-400 text-sm font-helvetica">{method.description}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Bank Details for Transfer */}
            {paymentMethod === 'bank_transfer' && (
              <div>
                <label className="block text-sm font-black text-white mb-2 font-helvetica">
                  BANK TRANSFER DETAILS
                </label>
                <textarea
                  value={bankDetails}
                  onChange={(e) => setBankDetails(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-transparent font-helvetica font-bold resize-none"
                  placeholder="Please provide bank name, account number, transfer reference, etc."
                />
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <p className="text-blue-400 text-sm font-helvetica font-bold text-center">
                💡 Deposits are processed manually within 24 hours. You'll receive email confirmation once approved.
              </p>
            </div>

            <motion.button
              type="submit"
              disabled={loading || isSubmitting || !amount}
              whileHover={{ scale: (loading || isSubmitting || !amount) ? 1 : 1.02 }}
              whileTap={{ scale: (loading || isSubmitting || !amount) ? 1 : 0.98 }}
              className="w-full btn-luxury flex items-center justify-center gap-3 text-lg font-black font-helvetica disabled:opacity-50 py-4"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <FaMoneyBillWave className="w-5 h-5" />
              )}
              {isSubmitting ? 'PROCESSING...' : 'REQUEST DEPOSIT'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
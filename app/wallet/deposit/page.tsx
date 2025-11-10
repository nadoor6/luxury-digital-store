// app/wallet/deposit/page.tsx - ENHANCED VERSION
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@/contexts/WalletContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaMoneyBillWave, FaCreditCard, FaUniversity, FaExchangeAlt, FaTelegram, FaCopy } from 'react-icons/fa';

const paymentMethods = [
  { 
    value: 'bank_transfer', 
    label: 'Bank Transfer', 
    icon: FaUniversity, 
    description: 'Wire transfer to our bank account',
    instructions: 'Contact admin on Telegram with your transaction details'
  },
  { 
    value: 'crypto', 
    label: 'Cryptocurrency', 
    icon: FaExchangeAlt, 
    description: 'BTC, ETH, USDT, USDC',
    instructions: 'Contact admin on Telegram for wallet address'
  },
  { 
    value: 'paypal', 
    label: 'PayPal', 
    icon: FaCreditCard, 
    description: 'PayPal transfer',
    instructions: 'Contact admin on Telegram for PayPal details'
  },
  { 
    value: 'western_union', 
    label: 'Western Union', 
    icon: FaMoneyBillWave, 
    description: 'Western Union Money Transfer',
    instructions: 'Contact admin on Telegram for recipient details'
  },
];

export default function DepositPage() {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [telegramContact, setTelegramContact] = useState('');
  const [proofImage, setProofImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'form' | 'instructions'>('form');
  const { requestDeposit, wallet, loading } = useWallet();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet || !amount || !telegramContact) return;

    setIsSubmitting(true);
    try {
      const depositId = await requestDeposit(
        parseFloat(amount), 
        paymentMethod, 
        telegramContact,
        proofImage || undefined
      );
      
      setStep('instructions');
    } catch (error) {
      console.error('Deposit request failed:', error);
      alert('Deposit request failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickAmounts = [50, 100, 200, 500, 1000];
  const selectedMethod = paymentMethods.find(m => m.value === paymentMethod);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  if (step === 'instructions') {
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
              <button
                onClick={() => setStep('form')}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 magnetic-btn"
              >
                <FaArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-3xl font-black text-white brand-ugarit">CONTACT ADMIN</h1>
                <p className="text-white/60 font-helvetica">Complete your deposit</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Success Message */}
              <div className="liquid-glass border border-white/10 rounded-xl p-6 text-center">
                <div className="w-16 h-16 liquid-glass rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                  <FaTelegram className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-black text-white brand-ugarit mb-4">
                  DEPOSIT REQUEST SUBMITTED
                </h2>
                <p className="text-white/60 font-helvetica mb-2">
                  Contact our admin on Telegram to complete your deposit
                </p>
              </div>

              {/* Contact Information */}
              <div className="liquid-glass rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-helvetica-bold mb-4 flex items-center gap-2">
                  <FaTelegram className="w-5 h-5 text-blue-400" />
                  CONTACT ADMIN ON TELEGRAM
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-white/60 font-helvetica">Your Wallet:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-helvetica-bold">
                        {wallet?.address.slice(0, 8)}...{wallet?.address.slice(-6)}
                      </span>
                      <button
                        onClick={() => copyToClipboard(wallet?.address || '')}
                        className="p-1 rounded bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        <FaCopy className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-white/60 font-helvetica">Amount:</span>
                    <span className="text-white font-helvetica-bold">${amount}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-white/60 font-helvetica">Method:</span>
                    <span className="text-white font-helvetica-bold">{selectedMethod?.label}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-white/60 font-helvetica">Your Telegram:</span>
                    <span className="text-white font-helvetica-bold">{telegramContact}</span>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="liquid-glass rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-helvetica-bold mb-3">NEXT STEPS:</h3>
                <ol className="text-white/60 font-helvetica space-y-2 list-decimal list-inside">
                  <li>Contact @YourAdminUsername on Telegram</li>
                  <li>Provide your wallet address and deposit amount</li>
                  <li>Send the payment using your preferred method</li>
                  <li>Wait for admin confirmation (usually within 24 hours)</li>
                  <li>Check your transaction history for status updates</li>
                </ol>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setStep('form')}
                  className="liquid-glass rounded-xl p-4 text-center hover:border-white/20 transition-all duration-300 border border-white/10 font-helvetica-bold"
                >
                  BACK
                </button>
                <Link
                  href="/wallet/transactions"
                  className="btn-luxury rounded-xl p-4 text-center font-helvetica-bold"
                >
                  VIEW TRANSACTIONS
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

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
              <h1 className="text-3xl font-black text-white brand-ugarit">REQUEST DEPOSIT</h1>
              <p className="text-white/60 font-helvetica">Add funds to your wallet</p>
            </div>
          </div>

          {/* Current Balance */}
          <div className="liquid-glass rounded-2xl p-6 mb-6 border border-white/10">
            <p className="text-white/60 font-helvetica-bold mb-2">CURRENT BALANCE</p>
            <p className="text-3xl font-black text-white brand-ugarit">
              ${wallet?.balance.toFixed(2) || '0.00'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Quick Amount Buttons */}
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

            {/* Amount Input */}
            <div>
              <label className="block text-white font-helvetica-bold mb-2">
                CUSTOM AMOUNT (USD)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white font-helvetica-bold">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  min="1"
                  step="0.01"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent font-helvetica resize-none"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-white font-helvetica-bold mb-4">
                PAYMENT METHOD
              </label>
              <div className="grid grid-cols-1 gap-3">
                {paymentMethods.map((method) => (
                  <label 
                    key={method.value} 
                    className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-all duration-300"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-white focus:ring-white/20 mt-1"
                    />
                    <method.icon className="w-5 h-5 text-white mt-0.5" />
                    <div className="flex-1">
                      <span className="text-white font-helvetica-bold block">{method.label}</span>
                      <span className="text-white/60 font-helvetica text-sm">{method.description}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Telegram Contact */}
            <div>
              <label className="block text-white font-helvetica-bold mb-2">
                YOUR TELEGRAM USERNAME
              </label>
              <div className="relative">
                <FaTelegram className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <input
                  type="text"
                  value={telegramContact}
                  onChange={(e) => setTelegramContact(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent font-helvetica"
                  placeholder="@username"
                />
              </div>
              <p className="text-white/60 font-helvetica text-sm mt-2">
                Admin will contact you on this Telegram username
              </p>
            </div>

            {/* Proof Image (Optional) */}
            <div>
              <label className="block text-white font-helvetica-bold mb-2">
                PAYMENT PROOF (OPTIONAL)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProofImage(e.target.files?.[0] || null)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
              />
              <p className="text-white/60 font-helvetica text-sm mt-2">
                Upload screenshot of payment confirmation if available
              </p>
            </div>

            {/* Info Box */}
            <div className="liquid-glass border border-white/10 rounded-xl p-4">
              <p className="text-white font-helvetica-bold text-sm">
                💡 After submitting, you'll receive instructions to contact admin on Telegram. 
                Funds will be added manually after payment verification.
              </p>
            </div>

            <motion.button
              type="submit"
              disabled={loading || isSubmitting || !amount || !telegramContact}
              whileHover={{ scale: (loading || isSubmitting || !amount) ? 1 : 1.02 }}
              whileTap={{ scale: (loading || isSubmitting || !amount) ? 1 : 0.98 }}
              className="w-full btn-luxury flex items-center justify-center gap-3 text-lg font-helvetica-bold disabled:opacity-50 py-4"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FaTelegram className="w-5 h-5" />
              )}
              {isSubmitting ? 'SUBMITTING...' : 'SUBMIT DEPOSIT REQUEST'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
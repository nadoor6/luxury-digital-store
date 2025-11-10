'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@/contexts/WalletContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaKey, FaArrowLeft, FaWallet } from 'react-icons/fa';

export default function AccessWallet() {
  const [secretPhrase, setSecretPhrase] = useState('');
  const [error, setError] = useState('');
  const { accessWallet, loading } = useWallet();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (secretPhrase.split(' ').length !== 12) {
      setError('Please enter your 12-word secret phrase');
      return;
    }

    try {
      await accessWallet(secretPhrase);
      router.push('/wallet');
    } catch (error: any) {
      setError('Invalid secret phrase');
    }
  };

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
            <Link
              href="/"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 magnetic-btn"
            >
              <FaArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <div>
              <h1 className="text-3xl font-black text-white brand-ugarit">
                ACCESS WALLET
              </h1>
              <p className="text-white/60 font-helvetica">
                Enter your secret phrase
              </p>
            </div>
          </div>

          {error && (
            <div className="liquid-glass border border-white/10 text-white px-4 py-3 rounded-xl mb-6 font-helvetica-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-helvetica-bold mb-2">
                SECRET PHRASE (12 WORDS)
              </label>
              <textarea
                value={secretPhrase}
                onChange={(e) => setSecretPhrase(e.target.value)}
                required
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all duration-300 font-helvetica resize-none"
                placeholder="Enter your 12-word secret phrase separated by spaces"
              />
              <p className="text-white/60 font-helvetica text-sm mt-2">
                Enter all 12 words in order, separated by spaces
              </p>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full btn-luxury flex items-center justify-center gap-3 text-lg font-helvetica-bold disabled:opacity-50 py-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FaKey className="w-5 h-5" />
              )}
              {loading ? 'ACCESSING WALLET...' : 'ACCESS WALLET'}
            </motion.button>
          </form>

          <div className="text-center mt-6 pt-6 border-t border-white/10">
            <p className="text-white/60 font-helvetica">
              Don't have a wallet?{' '}
              <Link
                href="/wallet/create"
                className="text-white hover:text-white/80 transition-colors font-helvetica-bold"
              >
                Create one now
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
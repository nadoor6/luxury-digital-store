'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@/contexts/WalletContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaWallet, FaCopy, FaCheck, FaArrowLeft, FaShieldAlt } from 'react-icons/fa';

export default function CreateWallet() {
  const [showPhrase, setShowPhrase] = useState(false);
  const [copied, setCopied] = useState(false);
  const { createWallet, wallet, loading } = useWallet();
  const router = useRouter();

  const handleCreateWallet = async () => {
    const newWallet = await createWallet();
    setShowPhrase(true);
  };

  const copyToClipboard = () => {
    if (wallet?.secretPhrase) {
      navigator.clipboard.writeText(wallet.secretPhrase);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleContinue = () => {
    router.push('/');
  };

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
            <Link
              href="/"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors magnetic-btn"
            >
              <FaArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <div>
              <h1 className="text-3xl font-black text-white brand-ugarit">
                CREATE WALLET
              </h1>
              <p className="text-gray-400 font-helvetica font-bold">
                Secure your digital assets
              </p>
            </div>
          </div>

          {!showPhrase ? (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-turquoise to-neon-blue flex items-center justify-center mx-auto mb-4 glow">
                <FaShieldAlt className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-black text-white font-helvetica-heavy">
                SECURE WALLET SETUP
              </h2>
              
              <p className="text-gray-400 font-helvetica font-bold">
                Your wallet will be secured with a 12-word secret phrase. 
                Write it down and store it safely - it cannot be recovered if lost.
              </p>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-left">
                <p className="text-yellow-400 text-sm font-helvetica font-bold">
                  ⚠️ WARNING: Never share your secret phrase. Anyone with this phrase can access your wallet and funds.
                </p>
              </div>

              <motion.button
                onClick={handleCreateWallet}
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full btn-luxury flex items-center justify-center gap-3 text-lg font-black font-helvetica disabled:opacity-50 py-4"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FaWallet className="w-5 h-5" />
                )}
                {loading ? 'CREATING WALLET...' : 'CREATE SECURE WALLET'}
              </motion.button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                  <FaCheck className="w-6 h-6 text-green-400" />
                </div>
                <h2 className="text-2xl font-black text-white font-helvetica-heavy mb-2">
                  WALLET CREATED
                </h2>
                <p className="text-gray-400 font-helvetica font-bold">
                  Your secret phrase is ready
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-black text-white font-helvetica">
                    YOUR SECRET PHRASE
                  </label>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white text-sm"
                  >
                    {copied ? <FaCheck className="w-3 h-3" /> : <FaCopy className="w-3 h-3" />}
                    {copied ? 'COPIED' : 'COPY'}
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {wallet?.secretPhrase.split(' ').map((word, index) => (
                    <div
                      key={index}
                      className="bg-black/50 border border-white/10 rounded-lg p-3 text-center"
                    >
                      <span className="text-white text-sm font-helvetica font-bold">
                        {word}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <p className="text-red-400 text-sm font-helvetica font-bold text-center">
                  🔒 WRITE THIS DOWN AND STORE IT SECURELY. DO NOT SHARE WITH ANYONE.
                </p>
              </div>

              <motion.button
                onClick={handleContinue}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-luxury flex items-center justify-center gap-3 text-lg font-black font-helvetica py-4"
              >
                <FaWallet className="w-5 h-5" />
                ACCESS MY WALLET
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
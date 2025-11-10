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
    router.push('/wallet');
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
              href="/wallet/access"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 magnetic-btn"
            >
              <FaArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <div>
              <h1 className="text-3xl font-black text-white brand-ugarit">
                CREATE WALLET
              </h1>
              <p className="text-white/60 font-helvetica">
                Secure your digital assets
              </p>
            </div>
          </div>

          {!showPhrase ? (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 liquid-glass rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                <FaShieldAlt className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-black text-white brand-ugarit">
                SECURE WALLET SETUP
              </h2>
              
              <p className="text-white/60 font-helvetica">
                Your wallet will be secured with a 12-word secret phrase. 
                Write it down and store it safely - it cannot be recovered if lost.
              </p>

              <div className="liquid-glass border border-white/10 rounded-xl p-4 text-left">
                <p className="text-white font-helvetica-bold text-sm">
                  ⚠️ WARNING: Never share your secret phrase. Anyone with this phrase can access your wallet and funds.
                </p>
              </div>

              <motion.button
                onClick={handleCreateWallet}
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full btn-luxury flex items-center justify-center gap-3 text-lg font-helvetica-bold disabled:opacity-50 py-4"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FaWallet className="w-5 h-5" />
                )}
                {loading ? 'CREATING WALLET...' : 'CREATE SECURE WALLET'}
              </motion.button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 liquid-glass flex items-center justify-center mx-auto mb-4 border border-white/20">
                  <FaCheck className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-black text-white brand-ugarit mb-2">
                  WALLET CREATED
                </h2>
                <p className="text-white/60 font-helvetica">
                  Your secret phrase is ready
                </p>
              </div>

              <div className="liquid-glass rounded-xl p-6 border border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-white font-helvetica-bold">
                    YOUR SECRET PHRASE
                  </label>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-white text-sm font-helvetica-bold"
                  >
                    {copied ? <FaCheck className="w-3 h-3" /> : <FaCopy className="w-3 h-3" />}
                    {copied ? 'COPIED' : 'COPY'}
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {wallet?.secretPhrase.split(' ').map((word, index) => (
                    <div
                      key={index}
                      className="liquid-glass rounded-lg p-3 text-center border border-white/10"
                    >
                      <span className="text-white font-helvetica-bold text-sm">
                        {word}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="liquid-glass border border-white/10 rounded-xl p-4">
                <p className="text-white font-helvetica-bold text-sm text-center">
                  🔒 WRITE THIS DOWN AND STORE IT SECURELY. DO NOT SHARE WITH ANYONE.
                </p>
              </div>

              <motion.button
                onClick={handleContinue}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-luxury flex items-center justify-center gap-3 text-lg font-helvetica-bold py-4"
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
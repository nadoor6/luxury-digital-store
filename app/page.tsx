'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaWallet, FaShieldAlt, FaRocket, FaGem, FaCoins } from 'react-icons/fa';

export default function HomePage() {
  const { wallet, loading } = useWallet();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsRedirecting(true);
      const timer = setTimeout(() => {
        if (wallet) {
          router.push('/wallet');
        } else {
          router.push('/wallet/access');
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [wallet, loading, router]);

  // Show loading/redirect screen
  if (loading || isRedirecting) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          {/* Animated Logo */}
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity }
            }}
            className="w-20 h-20 bg-gradient-to-r from-turquoise to-neon-blue rounded-2xl flex items-center justify-center mx-auto mb-6 glow"
          >
            <FaGem className="w-8 h-8 text-white" />
          </motion.div>
          
          {/* Brand */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-black text-white brand-ugarit mb-4"
          >
            UGARIT
          </motion.h1>
          
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 font-helvetica font-bold text-lg mb-8"
          >
            Premium Digital Finance
          </motion.p>
          
          {/* Loading Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center space-y-4"
          >
            <div className="w-8 h-8 border-2 border-turquoise border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 font-helvetica font-bold">
              {wallet ? 'Entering your wallet...' : 'Redirecting to access...'}
            </p>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 gap-4 mt-12 max-w-md mx-auto"
          >
            {[
              { icon: FaShieldAlt, text: 'Secure', color: 'text-green-400' },
              { icon: FaCoins, text: 'Multi-Currency', color: 'text-yellow-400' },
              { icon: FaRocket, text: 'Fast', color: 'text-blue-400' },
              { icon: FaWallet, text: 'Managed', color: 'text-purple-400' },
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="flex items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/10"
              >
                <feature.icon className={`w-4 h-4 ${feature.color}`} />
                <span className="text-white text-sm font-helvetica font-bold">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl max-w-md mx-auto"
          >
            <p className="text-yellow-400 text-sm font-helvetica font-bold text-center">
              🔒 Your security is our priority. All transactions are manually verified.
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Fallback - This should rarely show as redirect happens quickly
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-turquoise border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white font-helvetica font-bold">Preparing Ugarit...</p>
      </div>
    </div>
  );
}
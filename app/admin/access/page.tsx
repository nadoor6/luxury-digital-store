'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@/contexts/WalletContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaLock, FaArrowLeft, FaUserShield } from 'react-icons/fa';

export default function AdminAccess() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isAdmin, wallet } = useWallet();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple admin password - you can change this
    if (password === 'admin123') {
      // Grant admin access by setting a special wallet
      const adminWallet = {
        address: 'UGR000000000000',
        balance: 0,
        secretPhrase: 'admin-access',
        createdAt: new Date()
      };
      localStorage.setItem('wallet', JSON.stringify(adminWallet));
      localStorage.setItem('adminAccess', 'true');
      router.push('/admin');
      router.refresh(); // Refresh to update wallet context
    } else {
      setError('Invalid admin password');
    }
  };

  // If already admin, redirect to admin panel
  if (isAdmin) {
    router.push('/admin');
    return null;
  }

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="container mx-auto max-w-md">
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
                ADMIN ACCESS
              </h1>
              <p className="text-gray-400 font-helvetica font-bold">
                Enter admin credentials
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl mb-6 font-helvetica font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-black text-white mb-2 font-helvetica">
                ADMIN PASSWORD
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 font-helvetica font-bold"
                  placeholder="Enter admin password"
                />
              </div>
              <p className="text-gray-500 text-sm mt-2 font-helvetica">
                Default password: admin123
              </p>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-luxury flex items-center justify-center gap-3 text-lg font-black font-helvetica py-4"
            >
              <FaUserShield className="w-5 h-5" />
              ACCESS ADMIN PANEL
            </motion.button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-gray-400 text-sm text-center font-helvetica">
              Don't have admin access? Contact system administrator.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
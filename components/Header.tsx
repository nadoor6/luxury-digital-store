'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWallet, FaHome, FaChartLine, FaCreditCard, FaPiggyBank, FaCog, FaUser, FaTimes, FaBars, FaMoneyBillWave, FaUniversity } from 'react-icons/fa';
import { useWallet } from '@/contexts/WalletContext';
import Link from 'next/link';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { wallet, logout } = useWallet();

  const financeNavigation = [
    { name: 'Dashboard', href: '/', icon: FaHome },
    { name: 'Invest', href: '/invest', icon: FaChartLine },
    { name: 'Cards', href: '/cards', icon: FaCreditCard },
    { name: 'Savings', href: '/savings', icon: FaPiggyBank },
    { name: 'Transactions', href: '/transactions', icon: FaMoneyBillWave },
    { name: 'Profile', href: '/profile', icon: FaUser },
  ];

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-md">
        <motion.div
          className="glass-card rounded-2xl border border-white/20"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="px-2 py-2">
            <div className="flex items-center justify-between">
              {financeNavigation.slice(0, 5).map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="flex flex-col items-center justify-center w-14 h-14 magnetic-hover"
                  >
                    <item.icon className="w-5 h-5 text-white mb-1" />
                    <span className="text-[10px] font-helvetica-bold text-white/80">{item.name}</span>
                  </Link>
                </motion.div>
              ))}
              
              {/* Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex flex-col items-center justify-center w-14 h-14 magnetic-hover"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="w-5 h-5 text-white mb-1" />
                ) : (
                  <FaBars className="w-5 h-5 text-white mb-1" />
                )}
                <span className="text-[10px] font-helvetica-bold text-white/80">Menu</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-2xl border border-white/20 m-4 mt-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Wallet Info */}
                {wallet && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-4 mb-4 rounded-xl border border-white/20"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-full glass-card border border-white/20 flex items-center justify-center">
                        <FaWallet className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-helvetica-bold text-white text-sm">{formatAddress(wallet.address)}</p>
                        <p className="text-white/60 text-xs font-helvetica-bold">${wallet.balance.toFixed(2)}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Full Navigation */}
                <nav className="space-y-2">
                  {financeNavigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-4 px-4 py-3 font-helvetica-bold text-white hover:bg-white/5 rounded-xl transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Wallet Actions */}
                <div className="mt-6 pt-4 border-t border-white/20">
                  {wallet ? (
                    <motion.button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full luxury-primary-btn py-3 font-helvetica-bold"
                    >
                      Lock Wallet
                    </motion.button>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        href="/wallet/access"
                        className="block w-full luxury-primary-btn py-3 text-center font-helvetica-bold"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Access Wallet
                      </Link>
                      <Link
                        href="/wallet/create"
                        className="block w-full luxury-secondary-btn py-3 text-center font-helvetica-bold"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Create Wallet
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Header */}
      <header className="hidden lg:block fixed top-0 left-0 right-0 z-50">
        <motion.div
          className="glass-card border-b border-white/20"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg glass-card border border-white/20 flex items-center justify-center">
                  <span className="text-white font-helvetica-black text-lg">U</span>
                </div>
                <span className="luxury-main-title text-xl font-helvetica-black">
                  Ugarit Finance
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="flex items-center gap-1">
                {financeNavigation.map((item, index) => (
                  <motion.div key={item.name} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                    <Link href={item.href} className="flex items-center gap-2 px-4 py-2 font-helvetica-bold text-white/80 hover:text-white transition-colors">
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Wallet Section */}
              <div className="flex items-center gap-3">
                {wallet ? (
                  <>
                    <div className="flex items-center gap-2 glass-card px-3 py-2 rounded-lg">
                      <FaWallet className="w-4 h-4 text-white" />
                      <span className="font-helvetica-bold text-sm">{formatAddress(wallet.address)}</span>
                      <span className="text-white/60 text-sm">${wallet.balance.toFixed(2)}</span>
                    </div>
                    <button onClick={logout} className="luxury-primary-btn px-4 py-2 text-sm font-helvetica-bold">
                      Lock
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link href="/wallet/access" className="luxury-primary-btn px-4 py-2 text-sm font-helvetica-bold">
                      Access Wallet
                    </Link>
                    <Link href="/wallet/create" className="luxury-secondary-btn px-4 py-2 text-sm font-helvetica-bold">
                      Create Wallet
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </header>
    </>
  );
}
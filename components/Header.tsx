'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWallet, FaSearch, FaBars, FaTimes, FaCog, FaHome, FaBox, FaEnvelope, FaGem, FaUser, FaKey, FaUserShield } from 'react-icons/fa';
import { useWallet } from '@/contexts/WalletContext';
import Cart from './ui/Cart';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { wallet, logout, isAdmin } = useWallet();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/', icon: FaHome },
    { name: 'Products', href: '/products', icon: FaBox },
    { name: 'Contact', href: '/contact', icon: FaEnvelope },
  ];

  if (isAdmin) {
    navigation.push({ name: 'Admin', href: '/admin', icon: FaCog });
  } else {
    navigation.push({ name: 'Admin Access', href: '/admin/access', icon: FaUserShield });
  }

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      {/* Desktop Header - Top */}
      <header className="hidden lg:block fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl">
        <motion.div
          className={`glass-card rounded-2xl transition-all duration-500 ${
            isScrolled ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/15'
          }`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Simplified Logo - Only Ugarit */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3"
              >
                <Link href="/" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl glass-card border border-white/20 flex items-center justify-center group-hover:border-white/30 transition-all duration-300">
                    <span className="text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">U</span>
                  </div>
                  
                  <span className="brand-ugarit text-xl font-bold">
                    Ugarit
                  </span>
                </Link>
              </motion.div>

              {/* Desktop Navigation */}
              <nav className="flex items-center gap-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="btn-glass-modern flex items-center gap-2 px-4 py-2 text-sm font-medium magnetic-hover"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                      
                      {/* Status Indicators */}
                      {item.name === 'Admin' && (
                        <div className="w-2 h-2 bg-green-400 rounded-full ml-1 glow-soft" />
                      )}
                      {item.name === 'Admin Access' && (
                        <div className="w-2 h-2 bg-yellow-400 rounded-full ml-1 glow-soft" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center gap-2">
                {/* Search Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-glass-modern p-2 magnetic-hover"
                  title="Search"
                >
                  <FaSearch className="w-4 h-4" />
                </motion.button>

                {/* Shopping Cart */}
                <Cart />

                {/* Wallet Section */}
                {wallet ? (
                  <div className="flex items-center gap-2">
                    {/* Wallet Profile */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="glass-card flex items-center gap-2 px-3 py-2 rounded-xl magnetic-hover"
                    >
                      <div className="w-8 h-8 rounded-full glass-card border border-white/20 flex items-center justify-center">
                        <FaWallet className="w-3 h-3 text-white" />
                      </div>
                      
                      <div className="flex flex-col">
                        <span className="text-white text-sm font-medium leading-none">
                          {formatAddress(wallet.address)}
                        </span>
                        <span className="text-white/60 text-xs">
                          ${wallet.balance.toFixed(2)}
                        </span>
                      </div>
                    </motion.div>

                    {/* Logout Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      className="btn-glass-modern px-3 py-2 text-sm font-medium magnetic-hover"
                    >
                      Lock Wallet
                    </motion.button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      href="/wallet/access"
                      className="btn-glass-modern flex items-center gap-2 px-3 py-2 text-sm font-medium magnetic-hover"
                    >
                      <FaKey className="w-3 h-3" />
                      Access Wallet
                    </Link>
                    <Link
                      href="/wallet/create"
                      className="btn-liquid-glass flex items-center gap-2 px-3 py-2 text-sm font-medium text-white magnetic-hover"
                    >
                      <FaWallet className="w-3 h-3" />
                      Create Wallet
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-md">
        <motion.div
          className="glass-card rounded-2xl border border-white/20"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="px-4">
            <div className="flex items-center justify-between h-14">
              {/* Mobile Logo - Smaller */}
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-7 h-7 rounded-lg glass-card border border-white/20 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">U</span>
                </div>
                <span className="brand-ugarit text-base font-bold">
                  Ugarit
                </span>
              </Link>

              {/* Mobile Navigation Icons - Better Spacing */}
              <div className="flex items-center gap-3">
                {navigation.slice(0, 3).map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-center w-10 h-10 btn-glass-modern magnetic-hover"
                      title={item.name}
                    >
                      <item.icon className="w-4 h-4" />
                    </Link>
                  </motion.div>
                ))}
                
                {/* Cart for Mobile */}
                <div className="flex items-center justify-center w-10 h-10">
                  <Cart />
                </div>
                
                {/* Mobile Menu Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="flex items-center justify-center w-10 h-10 btn-glass-modern magnetic-hover"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <FaTimes className="w-4 h-4" />
                  ) : (
                    <FaBars className="w-4 h-4" />
                  )}
                </motion.button>
              </div>
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
                {/* Wallet Info Section */}
                {wallet && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-4 mb-4 rounded-xl border border-white/20 stagger-animate"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full glass-card border border-white/20 flex items-center justify-center">
                        <FaWallet className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-white text-sm">{formatAddress(wallet.address)}</p>
                        <p className="text-white/60 text-xs">${wallet.balance.toFixed(2)}</p>
                      </div>
                      {isAdmin && (
                        <div className="w-2 h-2 bg-green-400 rounded-full glow-soft" />
                      )}
                    </div>
                    {isAdmin && (
                      <div className="flex items-center gap-2 text-xs glass-card px-2 py-1 rounded-lg">
                        <FaCog className="w-3 h-3 text-green-400" />
                        <span className="text-green-400 font-medium">Administrator</span>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Full Navigation Links */}
                <nav className="space-y-2 stagger-animate">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <Link
                        href={item.href}
                        className="btn-glass-modern flex items-center gap-3 px-4 py-3 font-medium w-full text-left"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                        {item.name === 'Admin' && (
                          <div className="w-2 h-2 bg-green-400 rounded-full ml-auto glow-soft" />
                        )}
                        {item.name === 'Admin Access' && (
                          <div className="w-2 h-2 bg-yellow-400 rounded-full ml-auto glow-soft" />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Wallet Actions */}
                <div className="mt-4 pt-4 border-t border-white/20 stagger-animate">
                  {wallet ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <button
                        onClick={handleLogout}
                        className="btn-glass-modern w-full flex items-center justify-center gap-2 px-4 py-3 font-medium"
                      >
                        <FaTimes className="w-4 h-4" />
                        Lock Wallet
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-2"
                    >
                      <Link
                        href="/wallet/access"
                        className="btn-glass-modern block w-full text-center py-3 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Access Wallet
                      </Link>
                      <Link
                        href="/wallet/create"
                        className="btn-liquid-glass block w-full text-center py-3 font-medium text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Create Wallet
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWallet, FaSearch, FaBars, FaTimes, FaCog, FaHome, FaBox, FaEnvelope, FaGem, FaUser, FaKey } from 'react-icons/fa';
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

  // Add Admin tab if user is admin
  if (isAdmin) {
    navigation.push({ name: 'Admin', href: '/admin', icon: FaCog });
  }

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      {/* Floating Liquid Glass Bar */}
      <motion.div
        className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl transition-all duration-300 ${
          isScrolled ? 'bg-white/15 border-white/30' : 'bg-white/5 border-white/15'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3"
            >
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <span className="text-white font-bold text-lg">U</span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-white font-bold text-xl leading-none">
                    Ugarit
                  </span>
                  <span className="text-white/60 text-xs font-medium">
                    DIGITAL
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="group relative flex items-center gap-2 text-white/80 hover:text-white font-medium px-4 py-2 rounded-xl transition-all duration-300"
                  >
                    {/* Hover Background */}
                    <div className="absolute inset-0 bg-white/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300" />
                    
                    {/* Icon */}
                    <item.icon className="w-4 h-4 relative z-10" />
                    
                    {/* Text */}
                    <span className="relative z-10 text-sm font-medium">
                      {item.name}
                    </span>

                    {/* Admin Badge */}
                    {item.name === 'Admin' && (
                      <div className="relative z-10 w-2 h-2 bg-green-400 rounded-full ml-1" />
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
                className="p-2 text-white/80 hover:text-white transition-colors rounded-xl hover:bg-white/10"
                title="Search"
              >
                <FaSearch className="w-4 h-4" />
              </motion.button>

              {/* Shopping Cart */}
              <Cart />

              {/* Wallet Status */}
              {wallet ? (
                <div className="hidden md:flex items-center gap-2">
                  {/* Wallet Profile */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-turquoise to-neon-blue flex items-center justify-center">
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
                    className="px-3 py-2 rounded-xl bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors border border-white/20"
                  >
                    Lock Wallet
                  </motion.button>
                </div>
              ) : (
                <motion.div className="hidden md:flex items-center gap-2">
                  <Link
                    href="/wallet/access"
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 text-white rounded-xl font-medium text-sm hover:bg-white/20 transition-colors border border-white/20"
                  >
                    <FaKey className="w-3 h-3" />
                    Access Wallet
                  </Link>
                  <Link
                    href="/wallet/create"
                    className="flex items-center gap-2 px-3 py-2 bg-white text-black rounded-xl font-medium text-sm hover:bg-gray-100 transition-colors"
                  >
                    <FaWallet className="w-3 h-3" />
                    Create Wallet
                  </Link>
                </motion.div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
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

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="border-t border-white/20 pt-4 pb-4">
                  {/* Wallet Info Section */}
                  {wallet && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="p-4 mb-4 bg-white/10 rounded-xl border border-white/20"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-turquoise to-neon-blue flex items-center justify-center">
                          <FaWallet className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-white text-sm">{formatAddress(wallet.address)}</p>
                          <p className="text-white/60 text-xs">${wallet.balance.toFixed(2)}</p>
                        </div>
                        {isAdmin && (
                          <div className="w-2 h-2 bg-green-400 rounded-full" />
                        )}
                      </div>
                      {isAdmin && (
                        <div className="flex items-center gap-2 text-xs bg-white/10 px-2 py-1 rounded-lg">
                          <FaCog className="w-3 h-3 text-green-400" />
                          <span className="text-green-400 font-medium">Administrator</span>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Navigation Links */}
                  <nav className="space-y-2">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <Link
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <item.icon className="w-4 h-4" />
                          <span className="font-medium">{item.name}</span>
                          {item.name === 'Admin' && (
                            <div className="w-2 h-2 bg-green-400 rounded-full ml-auto" />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Wallet Actions */}
                  <div className="mt-4 pt-4 border-t border-white/20">
                    {wallet ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors"
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
                          className="block w-full text-center bg-white/10 text-white py-3 rounded-xl font-medium hover:bg-white/20 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Access Wallet
                        </Link>
                        <Link
                          href="/wallet/create"
                          className="block w-full text-center bg-white text-black py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Create Wallet
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </header>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes, FaCog, FaHome, FaBox, FaEnvelope, FaGem, FaSparkles } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from './ui/ThemeToggle';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Demo cart items - replace with your actual cart logic
  useEffect(() => {
    setCartItemsCount(user ? 3 : 0);
  }, [user]);

  const navigation = [
    { name: 'Home', href: '/', icon: FaHome },
    { name: 'Products', href: '/products', icon: FaBox },
    { name: 'Contact', href: '/contact', icon: FaEnvelope },
  ];

  // Add Admin tab if user is admin
  if (user?.isAdmin) {
    navigation.push({ name: 'Admin', href: '/admin', icon: FaCog });
  }

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass border-b border-white/20 shadow-2xl'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      {/* Header Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-turquoise/10 via-neon-blue/5 to-neon-purple/10 rounded-b-3xl"
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 magnetic-btn"
          >
            <Link href="/" className="flex items-center gap-3 group">
              {/* Animated Logo Container */}
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-turquoise to-neon-blue flex items-center justify-center shadow-lg glow"
              >
                <FaGem className="w-6 h-6 text-white" />
              </motion.div>
              
              {/* Logo Text */}
              <div className="flex flex-col">
                <motion.span
                  className="text-2xl font-bold gradient-text bg-gradient-to-r from-turquoise to-neon-blue"
                  whileHover={{ scale: 1.05 }}
                >
                  Luxury
                </motion.span>
                <span className="text-lg text-gray-700 dark:text-gray-300 font-medium tracking-wider">
                  Digital
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="relative"
              >
                <Link
                  href={item.href}
                  className="group relative flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium px-6 py-3 rounded-2xl transition-all duration-300 magnetic-btn"
                >
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-turquoise/0 via-turquoise/5 to-neon-blue/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="relative z-10"
                  >
                    <item.icon className="w-4 h-4 text-turquoise group-hover:text-neon-blue transition-colors duration-300" />
                  </motion.div>

                  {/* Text */}
                  <span className="relative z-10 text-sm font-semibold group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                    {item.name}
                  </span>

                  {/* Admin Badge */}
                  {item.name === 'Admin' && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full glow"
                    />
                  )}

                  {/* Hover Underline */}
                  <motion.div
                    className="absolute bottom-2 left-1/2 w-0 h-0.5 bg-gradient-to-r from-turquoise to-neon-blue rounded-full"
                    whileHover={{ width: '80%', x: '-40%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 text-gray-600 dark:text-gray-400 hover:text-turquoise transition-colors rounded-2xl magnetic-btn relative group"
              title="Search"
            >
              <FaSearch className="w-5 h-5" />
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-turquoise/10 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-300" />
            </motion.button>

            {/* Theme Toggle */}
            <motion.div
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="magnetic-btn"
            >
              <ThemeToggle />
            </motion.div>

            {/* Shopping Cart */}
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 text-gray-600 dark:text-gray-400 hover:text-turquoise transition-colors rounded-2xl magnetic-btn relative group"
              title="Shopping Cart"
            >
              <FaShoppingCart className="w-5 h-5" />
              
              {/* Cart Counter */}
              {cartItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-gradient-to-r from-red-400 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg glow"
                >
                  {cartItemsCount}
                </motion.span>
              )}
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-turquoise/10 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-300" />
            </motion.button>

            {/* User Status */}
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                {/* User Profile */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 magnetic-btn"
                >
                  {/* User Avatar */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-turquoise to-neon-blue flex items-center justify-center shadow-lg"
                  >
                    <FaUser className="w-4 h-4 text-white" />
                  </motion.div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-800 dark:text-white leading-none">
                      {user.name.split(' ')[0]}
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {user.isAdmin ? 'Administrator' : 'Member'}
                    </span>
                  </div>

                  {/* Admin Badge */}
                  {user.isAdmin && (
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-green-400"
                    >
                      <FaSparkles className="w-3 h-3" />
                    </motion.div>
                  )}
                </motion.div>

                {/* Logout Button */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-2xl bg-gradient-to-r from-red-400 to-pink-500 text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 magnetic-btn"
                >
                  Sign Out
                </motion.button>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block magnetic-btn"
              >
                <Link
                  href="/auth/signin"
                  className="btn-liquid flex items-center gap-2 px-6 py-3 text-sm font-semibold"
                >
                  <FaUser className="w-4 h-4" />
                  Sign In
                </Link>
              </motion.div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 text-gray-600 dark:text-gray-400 hover:text-turquoise rounded-2xl magnetic-btn relative group"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-turquoise/10 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-300" />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="lg:hidden glass-card-dark border border-white/10 rounded-3xl shadow-2xl overflow-hidden mt-4"
            >
              {/* User Info Section */}
              {user && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-6 border-b border-white/10 bg-gradient-to-r from-turquoise/5 to-neon-blue/5"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      className="w-12 h-12 rounded-2xl bg-gradient-to-r from-turquoise to-neon-blue flex items-center justify-center shadow-lg"
                    >
                      <FaUser className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 dark:text-white text-lg">{user.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                    </div>
                    {user.isAdmin && (
                      <motion.div
                        animate={{ rotate: [0, 180, 360] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-green-400"
                      >
                        <FaSparkles className="w-5 h-5" />
                      </motion.div>
                    )}
                  </div>
                  {user.isAdmin && (
                    <div className="flex items-center gap-2 text-sm bg-gradient-to-r from-green-400/10 to-cyan-400/10 px-3 py-2 rounded-xl">
                      <FaCog className="w-3 h-3 text-green-400" />
                      <span className="text-green-600 dark:text-green-400 font-semibold">Administrator Account</span>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Navigation Links */}
              <nav className="p-4">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-4 px-4 py-4 text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-black/10 rounded-2xl transition-all duration-300 group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="w-10 h-10 rounded-xl bg-gradient-to-r from-turquoise/10 to-neon-blue/10 flex items-center justify-center group-hover:from-turquoise/20 group-hover:to-neon-blue/20 transition-all duration-300"
                      >
                        <item.icon className="w-4 h-4 text-turquoise" />
                      </motion.div>
                      <span className="font-semibold text-gray-900 dark:text-white flex-1">
                        {item.name}
                      </span>
                      {item.name === 'Admin' && (
                        <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full glow" />
                      )}
                      <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                        className="text-turquoise"
                      >
                        <FaSparkles className="w-3 h-3" />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Auth Actions */}
              <div className="p-4 border-t border-white/10">
                {user ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-3"
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 magnetic-btn"
                    >
                      <FaTimes className="w-4 h-4" />
                      Sign Out
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-3"
                  >
                    <Link
                      href="/auth/signin"
                      className="block w-full text-center btn-liquid font-semibold py-4 rounded-2xl"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block w-full text-center btn-glass font-semibold py-4 rounded-2xl"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Create Account
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, Menu, X, Crown, User, LogOut, Settings } from 'lucide-react'
import ThemeToggle from './ui/ThemeToggle'
import { useAuth } from '../contexts/AuthContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, logout, isAdmin } = useAuth()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '/contact' },
    ...(isAdmin ? [{ name: 'Admin', href: '/admin' }] : [])
  ]

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
  }

  return (
    <motion.header 
      className="sticky top-0 z-50 glass dark:glass-dark backdrop-blur-md border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-turquoise to-cyan-400 rounded-xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-dark-grey" />
            </div>
            <Link href="/" className="text-2xl font-bold text-turquoise font-serif">
              LuxuryStore.nd
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-turquoise dark:hover:text-turquoise transition-colors font-medium font-display relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-turquoise group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu or Auth Buttons */}
            {user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-2 text-gray-700 dark:text-gray-300 hover:text-turquoise transition-colors bg-white/50 dark:bg-gray-800/50 rounded-xl hover:bg-turquoise/10"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-turquoise to-cyan-400 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-dark-grey" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium font-display">
                    {user.name.split(' ')[0]}
                  </span>
                </motion.button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 top-12 glass dark:glass-dark rounded-2xl p-2 min-w-48 shadow-2xl border border-white/20"
                  >
                    <div className="p-3 border-b border-white/10">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      {isAdmin && (
                        <span className="inline-block mt-1 px-2 py-1 bg-turquoise text-dark-grey text-xs rounded-full font-bold">
                          Admin
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-1 mt-2">
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      
                      <Link
                        href="/settings"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/auth/signin"
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-turquoise transition-colors font-medium font-display"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signin?tab=signup"
                  className="bg-turquoise text-dark-grey px-4 py-2 rounded-xl font-medium font-display hover:scale-105 transition-transform"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3 text-gray-700 dark:text-gray-300 hover:text-turquoise transition-colors bg-white/50 dark:bg-gray-800/50 rounded-xl hover:bg-turquoise/10"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-turquoise text-dark-grey text-xs rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-3 text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 rounded-xl hover:bg-turquoise/10 hover:text-turquoise transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={item.href}
                    className="block text-gray-700 dark:text-gray-300 hover:text-turquoise dark:hover:text-turquoise transition-colors font-medium font-display py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              {!user && (
                <>
                  <Link
                    href="/auth/signin"
                    className="block text-gray-700 dark:text-gray-300 hover:text-turquoise dark:hover:text-turquoise transition-colors font-medium font-display py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signin?tab=signup"
                    className="block text-gray-700 dark:text-gray-300 hover:text-turquoise dark:hover:text-turquoise transition-colors font-medium font-display py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}
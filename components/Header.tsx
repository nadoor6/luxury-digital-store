'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaCreditCard, FaHistory, FaWallet, FaUser, FaCog, FaChartLine } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const mainNavigation = [
    { name: 'Home', href: '/', icon: FaHome },
    { name: 'Cards', href: '/cards', icon: FaCreditCard },
    { name: 'History', href: '/history', icon: FaHistory },
  ];

  const menuNavigation = [
    { name: 'Wallet', href: '/wallet', icon: FaWallet },
    { name: 'Invest', href: '/invest', icon: FaChartLine },
    { name: 'Profile', href: '/profile', icon: FaUser },
    { name: 'Settings', href: '/settings', icon: FaCog },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* iOS Liquid Glass Bottom Navigation */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-sm">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative"
        >
          {/* Liquid Glass Background */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 shadow-2xl" />
          
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-3xl" />
          
          {/* Navigation Items */}
          <div className="relative flex items-center justify-between p-2">
            {mainNavigation.map((item, index) => {
              const active = isActive(item.href);
              return (
                <motion.div
                  key={item.name}
                  className="relative flex-1 flex justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.href}
                    className={`relative flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300 ${
                      active ? 'text-white' : 'text-white/60'
                    }`}
                  >
                    {/* Active Background Bubble */}
                    {active && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white/20 backdrop-blur-2xl rounded-2xl border border-white/30 shadow-lg"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    {/* Icon */}
                    <div className="relative z-10">
                      <item.icon className={`w-6 h-6 transition-all duration-300 ${
                        active ? 'scale-110' : 'scale-100'
                      }`} />
                    </div>
                    
                    {/* Active Dot */}
                    {active && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute bottom-2 w-1 h-1 bg-white rounded-full"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
            
            {/* Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative flex flex-col items-center justify-center w-16 h-16 rounded-2xl text-white/60 hover:text-white transition-colors"
            >
              {/* Menu Icon Dots */}
              <div className="relative z-10 flex flex-col gap-1">
                <div className={`w-1.5 h-1.5 bg-current rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`} />
                <div className={`w-1.5 h-1.5 bg-current rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`} />
                <div className={`w-1.5 h-1.5 bg-current rounded-full transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`} />
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Full Screen Liquid Glass Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={() => setIsMenuOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            
            {/* Menu Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-[90%] max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Liquid Glass Menu Card */}
              <div className="relative">
                {/* Glass Background */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 shadow-2xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-3xl" />
                
                {/* Menu Content */}
                <div className="relative p-6">
                  {/* User Info */}
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center mx-auto mb-3">
                      <FaWallet className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-helvetica-black text-white mb-1">Mark Williamson</h3>
                    <p className="text-white/40 text-sm font-helvetica-medium">•••• 5678</p>
                    <p className="text-white font-helvetica-black text-xl mt-2">$8,245.67</p>
                  </div>

                  {/* Menu Items Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {menuNavigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <item.icon className="w-6 h-6 text-white mb-2 group-hover:scale-110 transition-transform duration-300" />
                          <span className="text-white text-sm font-helvetica-medium">{item.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    <button className="flex-1 py-3 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-white font-helvetica-bold text-sm hover:bg-white/15 transition-all duration-300">
                      Lock
                    </button>
                    <button className="flex-1 py-3 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 text-white font-helvetica-bold text-sm hover:bg-white/25 transition-all duration-300">
                      Settings
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Header (Simplified) */}
      <header className="hidden lg:block fixed top-0 left-0 right-0 z-50">
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="glass-card border-b border-white/20"
        >
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl glass-simple flex items-center justify-center">
                  <span className="text-white font-helvetica-black text-lg">U</span>
                </div>
                <span className="luxury-title text-xl font-helvetica-black">
                  Ugarit
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="flex items-center gap-1">
                {mainNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-helvetica-bold transition-all ${
                      isActive(item.href)
                        ? 'bg-white/20 text-white'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>

              {/* Wallet Info */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 glass-simple px-3 py-2 rounded-2xl">
                  <FaWallet className="w-4 h-4 text-white" />
                  <span className="font-helvetica-bold text-sm">$8,245.67</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </header>
    </>
  );
}
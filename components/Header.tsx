'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWallet, FaHome, FaChartLine, FaCreditCard, FaPiggyBank, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: FaHome },
    { name: 'Invest', href: '/invest', icon: FaChartLine },
    { name: 'Cards', href: '/cards', icon: FaCreditCard },
    { name: 'Savings', href: '/savings', icon: FaPiggyBank },
    { name: 'Profile', href: '/profile', icon: FaUser },
  ];

  return (
    <>
      {/* Bottom Navigation */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-card rounded-2xl"
        >
          <div className="flex items-center justify-between p-3">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all hover:bg-white/5"
                >
                  <item.icon className="w-5 h-5 text-white mb-1" />
                </Link>
              </motion.div>
            ))}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all hover:bg-white/5"
            >
              {isMenuOpen ? (
                <FaTimes className="w-5 h-5 text-white mb-1" />
              ) : (
                <FaBars className="w-5 h-5 text-white mb-1" />
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card rounded-3xl m-6 mt-20 p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Wallet Section */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl glass-simple flex items-center justify-center mx-auto mb-4">
                  <FaWallet className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-helvetica-black text-white mb-2">Mark Williamson</h3>
                <p className="text-white/40 text-sm font-helvetica-medium">•••• 5678</p>
                <p className="text-white font-helvetica-black text-lg mt-2">$8,245.67</p>
              </div>

              {/* Menu Items */}
              <nav className="space-y-4">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-white/5"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5 text-white" />
                      <span className="font-helvetica-bold text-white">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                <button className="flex-1 btn-luxury py-3 font-helvetica-bold text-sm">
                  Lock Wallet
                </button>
                <button className="flex-1 btn-luxury-primary py-3 font-helvetica-bold text-sm">
                  Settings
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
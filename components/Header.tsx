'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaCreditCard, FaHistory, FaWallet, FaUser, FaCog, FaChartLine, FaChevronDown } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
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

  // Optimized mobile menu handler
  const handleMobileMenuToggle = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    // Reset animation flag after transition
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDesktopMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ULTRA COMPACT iOS Style Bottom Navigation */}
      <div className="lg:hidden fixed bottom-3 left-0 right-0 z-50 px-3 performance-optimize">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="w-full max-w-xs">
            {/* Ultra Compact Glass Background */}
            <div className="absolute inset-0 bg-white/8 backdrop-blur-3xl rounded-2xl border border-white/15 shadow-lg" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/4 to-transparent rounded-2xl" />
            
            {/* Compact Navigation Items */}
            <div className="relative flex items-center justify-between p-1">
              {mainNavigation.map((item, index) => {
                const active = isActive(item.href);
                return (
                  <motion.div
                    key={item.name}
                    className="relative flex-1 flex justify-center"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Link
                      href={item.href}
                      className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 ${
                        active ? 'text-white' : 'text-white/70'
                      }`}
                    >
                      {active && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-xl border border-white/25"
                          transition={{ type: "spring", stiffness: 400, damping: 35 }}
                        />
                      )}
                      
                      <div className="relative z-10">
                        <item.icon className={`w-4 h-4 transition-all duration-200 ${
                          active ? 'scale-110' : 'scale-100'
                        }`} />
                      </div>
                      
                      {active && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute bottom-0.5 w-1 h-1 bg-white rounded-full"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
              
              {/* Compact Menu Button */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleMobileMenuToggle}
                className="relative flex flex-col items-center justify-center w-12 h-12 rounded-xl text-white/70 hover:text-white transition-colors"
              >
                <div className="relative z-10 flex flex-col gap-0.5">
                  <div className={`w-1 h-1 bg-current rounded-full transition-all duration-200 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''
                  }`} />
                  <div className={`w-1 h-1 bg-current rounded-full transition-all duration-200 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`} />
                  <div className={`w-1 h-1 bg-current rounded-full transition-all duration-200 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
                  }`} />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Compact Mobile Full Screen Menu */}
      <div className={`lg:hidden fixed inset-0 z-40 mobile-menu-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
           style={{ pointerEvents: isMobileMenuOpen ? 'auto' : 'none' }}
           onClick={handleMobileMenuToggle}>
        <div className="absolute inset-0 bg-black/40" />
        
        <div className={`absolute bottom-16 left-3 right-3 z-50 mobile-menu-content ${isMobileMenuOpen ? 'open' : ''}`}
             onClick={(e) => e.stopPropagation()}>
          <div className="relative">
            <div className="absolute inset-0 bg-white/12 backdrop-blur-2xl rounded-2xl border border-white/18 shadow-xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/6 to-transparent rounded-2xl" />
            
            <div className="relative p-4">
              <div className="text-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-lg border border-white/15 flex items-center justify-center mx-auto mb-2">
                  <FaWallet className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-helvetica-black text-white mb-1">Mark Williamson</h3>
                <p className="text-white/50 text-xs font-helvetica-medium">•••• 5678</p>
                <p className="text-white font-helvetica-black text-lg mt-1">$8,245.67</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {menuNavigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/8 backdrop-blur-lg border border-white/10 hover:bg-white/12 hover:border-white/20 transition-all duration-200 group"
                    onClick={handleMobileMenuToggle}
                  >
                    <item.icon className="w-5 h-5 text-white mb-1 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-white text-xs font-helvetica-medium">{item.name}</span>
                  </Link>
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                <button className="flex-1 py-2 rounded-xl bg-white/10 backdrop-blur-lg border border-white/15 text-white font-helvetica-bold text-xs hover:bg-white/15 transition-all duration-200">
                  Lock
                </button>
                <button className="flex-1 py-2 rounded-xl bg-white/20 backdrop-blur-lg border border-white/20 text-white font-helvetica-bold text-xs hover:bg-white/25 transition-all duration-200">
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <header className="hidden lg:block fixed top-0 left-0 right-0 z-50">
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white/5 backdrop-blur-3xl border-b border-white/10"
        >
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 flex items-center justify-center">
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
                        ? 'bg-white/15 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>

              {/* Desktop Wallet & Menu */}
              <div className="flex items-center gap-3">
                {/* Wallet Info */}
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-lg px-3 py-2 rounded-2xl border border-white/10">
                  <FaWallet className="w-4 h-4 text-white" />
                  <span className="font-helvetica-bold text-sm">$8,245.67</span>
                </div>

                {/* Desktop Menu Button */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsDesktopMenuOpen(!isDesktopMenuOpen)}
                    className="flex items-center gap-2 bg-white/5 backdrop-blur-lg px-3 py-2 rounded-2xl border border-white/10 text-white/70 hover:text-white transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-xs font-helvetica-bold">M</span>
                    </div>
                    <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                      isDesktopMenuOpen ? 'rotate-180' : ''
                    }`} />
                  </motion.button>

                  {/* Desktop Dropdown Menu */}
                  <AnimatePresence>
                    {isDesktopMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 w-64 z-50"
                      >
                        <div className="glass-desktop-menu rounded-2xl border border-white/25 shadow-2xl overflow-hidden">
                          {/* User Info */}
                          <div className="p-4 border-b border-white/20 bg-white/10">
                            <p className="text-white font-helvetica-bold text-sm">Mark Williamson</p>
                            <p className="text-white/70 text-xs mt-1">•••• 5678</p>
                            <p className="text-white font-helvetica-black text-lg mt-2">$8,245.67</p>
                          </div>

                          {/* Menu Items */}
                          <div className="p-2 bg-white/5">
                            {menuNavigation.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-3 p-3 rounded-xl text-white hover:bg-white/15 transition-all duration-200 group"
                                onClick={() => setIsDesktopMenuOpen(false)}
                              >
                                <item.icon className="w-4 h-4 text-white/80 group-hover:text-white" />
                                <span className="text-sm font-helvetica-medium">{item.name}</span>
                              </Link>
                            ))}
                          </div>

                          {/* Action Buttons */}
                          <div className="p-3 border-t border-white/20 bg-white/10">
                            <div className="flex gap-2">
                              <button className="flex-1 py-2.5 rounded-xl bg-white/15 text-white text-sm font-helvetica-bold hover:bg-white/20 transition-all">
                                Lock Wallet
                              </button>
                              <button className="flex-1 py-2.5 rounded-xl bg-white/25 text-white text-sm font-helvetica-bold hover:bg-white/30 transition-all">
                                Settings
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Close desktop menu when clicking outside */}
      {isDesktopMenuOpen && (
        <div 
          className="hidden lg:block fixed inset-0 z-40" 
          onClick={() => setIsDesktopMenuOpen(false)}
        />
      )}
    </>
  );
}